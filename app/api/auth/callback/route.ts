import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/auth/supabaseServer';
import { AUTH_COOKIE_NAME } from '@/lib/auth/adapter';
import { User, UserRole } from '@/lib/types';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const returnTo = requestUrl.searchParams.get('returnTo') || '/account';

  if (code) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error && data.user) {
        const metadata = data.user.user_metadata || {};
        const user: User = {
          id: data.user.id,
          name: metadata.name || data.user.email?.split('@')[0] || 'Helpora User',
          email: data.user.email || '',
          role: (metadata.role as UserRole) || 'user',
          avatar: metadata.avatar || `https://avatar.vercel.sh/${encodeURIComponent(data.user.email || '')}`,
          email_verified: !!data.user.email_confirmed_at,
          created_at: data.user.created_at
        };

        const response = NextResponse.redirect(new URL(returnTo, request.url));
        response.cookies.set({
          name: AUTH_COOKIE_NAME,
          value: JSON.stringify(user),
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        });
        return response;
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL(returnTo, request.url));
}
