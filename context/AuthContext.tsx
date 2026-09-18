'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, role?: 'user' | 'provider') => Promise<void>;
  logout: () => void;
  switchRole: (role: 'user' | 'provider' | 'admin') => void;
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
        setUser(JSON.parse(saved));
      } else {
        // Default demo user so the platform is immediately welcoming
        const defaultUser: User = {
          id: 'usr-demo-1',
          name: 'Amara Okafor',
          email: 'amara.okafor@example.com',
          role: 'user',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        };
        setUser(defaultUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUser));
      }
    } catch (e) {
      console.error('Error reading auth state:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = async (email: string, _password?: string) => {
    // Determine role based on email or default to user
    let role: 'user' | 'provider' | 'admin' = 'user';
    if (email.includes('admin')) role = 'admin';
    if (email.includes('provider') || email.includes('electric') || email.includes('plumb')) role = 'provider';

    const loggedUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').replace(/^\w/, c => c.toUpperCase()),
      email,
      role,
      avatar: `https://avatar.vercel.sh/${email}`
    };
    saveUser(loggedUser);
    setIsAuthModalOpen(false);
  };

  const loginWithGoogle = async () => {
    const googleUser: User = {
      id: 'usr-google-889',
      name: 'Jordan Martinez',
      email: 'jordan.martinez@gmail.com',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };
    saveUser(googleUser);
    setIsAuthModalOpen(false);
  };

  const signup = async (name: string, email: string, role: 'user' | 'provider' = 'user') => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      avatar: `https://avatar.vercel.sh/${email}`
    };
    saveUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    saveUser(null);
  };

  const switchRole = (newRole: 'user' | 'provider' | 'admin') => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    saveUser(updated);
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
