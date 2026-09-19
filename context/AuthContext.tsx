'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/lib/types';
import { AuthAdapter } from '@/lib/auth/adapter';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password?: string, returnTo?: string) => Promise<{ success: boolean; message?: string; redirectTo?: string; user?: User }>;
  loginWithGoogle: (returnTo?: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, password: string, role?: UserRole, turnstileToken?: string) => Promise<{ success: boolean; message?: string; redirectTo?: string }>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
  isAuthModalOpen: boolean;
  openAuthModal: (initialMode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  authModalMode: 'signin' | 'signup';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'helpora_user_session';
const LEGACY_STORAGE_KEY = 'civictrust_user_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        // Sync cookie
        fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: parsed })
        }).catch(() => {});
      } else {
        // Guests start unauthenticated so they experience guest browsing and see Sign In
        setUser(null);
      }
    } catch (e) {
      console.error('Error reading auth state:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = async (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: newUser })
      }).catch(() => {});
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    }
  };

  const login = async (email: string, password = '', returnTo?: string) => {
    const result = await AuthAdapter.signInWithPassword(email, password, returnTo);
    if (result.success && result.user) {
      await saveUser(result.user);
      setIsAuthModalOpen(false);
    }
    return result;
  };

  const loginWithGoogle = async (returnTo = '/account') => {
    return await AuthAdapter.signInWithGoogle(returnTo);
  };

  const signup = async (
    name: string,
    email: string,
    password = '',
    role: UserRole = 'user',
    turnstileToken?: string
  ) => {
    const result = await AuthAdapter.signUp(name, email, password, role, turnstileToken);
    if (result.success && result.user) {
      await saveUser(result.user);
      setIsAuthModalOpen(false);
    }
    return result;
  };

  const logout = async () => {
    await saveUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  const switchRole = async (newRole: UserRole) => {
    if (!user) return;
    const updated: User = { ...user, role: newRole };
    await saveUser(updated);
  };

  const openAuthModal = (initialMode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(initialMode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithGoogle,
        signup,
        logout,
        switchRole,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
