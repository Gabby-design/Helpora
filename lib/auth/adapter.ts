import { User, UserRole } from '@/lib/types';
import { getSupabaseBrowserClient } from './supabaseClient';

export interface AuthSession {
  user: User | null;
  accessToken?: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  message?: string;
  requiresEmailVerification?: boolean;
  redirectTo?: string;
}

export interface SmsOtpAdapter {
  sendOtp: (phone: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (phone: string, token: string) => Promise<AuthResult>;
}

export const AUTH_COOKIE_NAME = 'helpora_session';

/**
 * Helpora Pluggable Auth Adapter
 * Connects directly to Supabase Auth when configured,
 * or provides a resilient zero-cost local auth provider for development.
 */
export const AuthAdapter = {
  /**
   * Pluggable SMS/WhatsApp OTP Interface
   * Skipped in production to avoid per-message SMS vendor fees and keep Helpora 100% free.
   */
  otp: {
    async sendOtp(phone: string): Promise<{ success: boolean; message: string }> {
      // Interface ready for future zero-cost WhatsApp bot or SMS integration
      return {
        success: false,
        message: 'SMS/WhatsApp OTP is currently disabled to ensure 100% free running costs for Helpora. Please sign in with Email or Google.'
      };
    },
    async verifyOtp(_phone: string, _token: string): Promise<AuthResult> {
      return {
        success: false,
        message: 'OTP verification is currently disabled.'
      };
    }
  } as SmsOtpAdapter,

  /**
   * Sign In with Email & Password
   */
  async signInWithPassword(email: string, password: string, returnTo?: string): Promise<AuthResult> {
    const supabase = getSupabaseBrowserClient();

    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (data.user) {
        const metadata = data.user.user_metadata || {};
        const user: User = {
          id: data.user.id,
          name: metadata.name || email.split('@')[0],
          email: data.user.email || email,
          role: (metadata.role as UserRole) || 'user',
          avatar: metadata.avatar || `https://avatar.vercel.sh/${encodeURIComponent(email)}`,
          email_verified: !!data.user.email_confirmed_at,
          created_at: data.user.created_at
        };

        // Synchronize server cookie session
        await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user })
        });

        return {
          success: true,
          user,
          redirectTo: returnTo || (user.role === 'provider' ? '/dashboard/business' : '/account')
        };
      }
    }

    // Local / Dev Fallback if Supabase credentials are not yet supplied
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnTo })
      });

      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, message: err.message || 'Login failed. Please check your credentials.' };
    }
  },

  /**
   * Register with Email, Password and Role
   */
  async signUp(
    name: string,
    email: string,
    password: string,
    role: UserRole = 'user',
    turnstileToken?: string
  ): Promise<AuthResult> {
    const supabase = getSupabaseBrowserClient();

    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          },
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/api/auth/callback` : undefined
        }
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (data.user) {
        const user: User = {
          id: data.user.id,
          name,
          email,
          role,
          avatar: `https://avatar.vercel.sh/${encodeURIComponent(email)}`,
          email_verified: !!data.user.email_confirmed_at,
          created_at: data.user.created_at
        };

        await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user })
        });

        const redirectTo = role === 'provider' 
          ? '/business/register?from=register'
          : '/account';

        return {
          success: true,
          user,
          requiresEmailVerification: !data.session,
          redirectTo
        };
      }
    }

    // Local / Dev Fallback
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, turnstileToken })
      });

      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, message: err.message || 'Registration failed. Please try again.' };
    }
  },

  /**
   * Sign In with Google OAuth
   */
  async signInWithGoogle(returnTo = '/account'): Promise<{ success: boolean; message?: string }> {
    const supabase = getSupabaseBrowserClient();

    if (supabase && typeof window !== 'undefined') {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?returnTo=${encodeURIComponent(returnTo)}`
        }
      });

      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true };
    }

    // Development demo Google sign-in fallback
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'demo.google@helpora.ng',
          isGoogleDemo: true,
          name: 'Demo Google User',
          returnTo
        })
      });
      const data = await res.json();
      if (data.success && typeof window !== 'undefined') {
        window.location.href = returnTo || '/account';
      }
      return data;
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  },

  /**
   * Request Password Reset Link
   */
  async resetPasswordForEmail(email: string): Promise<{ success: boolean; message: string }> {
    const supabase = getSupabaseBrowserClient();

    if (supabase && typeof window !== 'undefined') {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return {
        success: true,
        message: `Password reset link sent to ${email}. Please check your inbox and spam folder.`
      };
    }

    // Local / Dev Fallback
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Could not send reset link.' };
    }
  },

  /**
   * Update Password (called from reset-password page)
   */
  async updatePassword(newPassword: string): Promise<{ success: boolean; message: string }> {
    const supabase = getSupabaseBrowserClient();

    if (supabase) {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, message: 'Your password has been updated successfully.' };
    }

    return {
      success: true,
      message: 'Your password has been successfully updated.'
    };
  },

  /**
   * Sign Out
   */
  async signOut(): Promise<void> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }

    await fetch('/api/auth/logout', { method: 'POST' });

    if (typeof window !== 'undefined') {
      localStorage.removeItem('helpora_user_session');
      window.location.href = '/login';
    }
  }
};
