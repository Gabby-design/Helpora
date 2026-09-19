'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, ShieldCheck, Mail, Lock, User as UserIcon, CheckCircle2 } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, loginWithGoogle, signup, authModalMode } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(authModalMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'provider'>('user');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync mode if changed by openAuthModal
  React.useEffect(() => {
    setMode(authModalMode);
  }, [authModalMode]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (mode === 'signin') {
        await login(email, password);
      } else {
        await signup(name, email, password, role);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (type: 'user' | 'provider' | 'admin') => {
    if (type === 'admin') {
      await login('admin@helpora.ng');
    } else if (type === 'provider') {
      await login('provider.voltcraft@example.com');
    } else {
      await login('citizen.sarah@example.com');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="auth-modal-title" className="font-semibold text-lg leading-tight">
                {mode === 'signin' ? 'Sign in to Helpora' : 'Create Helpora Account'}
              </h2>
              <p className="text-xs text-slate-300">One shared identity across all community tools</p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Quick Demo Logins for fast tester review */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
            <p className="font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
              <span>⚡ Fast Review Quick-Login:</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('user')}
                className="px-2 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-700 font-medium transition text-center"
              >
                👤 Citizen
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('provider')}
                className="px-2 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded text-emerald-700 font-medium transition text-center"
              >
                🛠️ Provider
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="px-2 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded text-brand-700 font-medium transition text-center"
              >
                🛡️ Admin
              </button>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={() => loginWithGoogle()}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-300 rounded-xl font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 transition shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-xs text-slate-400 font-medium uppercase tracking-wider">
              Or with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Lin"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Account Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`py-2 px-3 border rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition ${
                      role === 'user'
                        ? 'border-brand-600 bg-brand-50 text-brand-700 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {role === 'user' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    Citizen / Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('provider')}
                    className={`py-2 px-3 border rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition ${
                      role === 'provider'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {role === 'provider' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    Service Provider
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition shadow-sm hover:shadow"
            >
              {isSubmitting ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
            >
              {mode === 'signin'
                ? "Don't have an account yet? Register here"
                : 'Already have an account? Sign in here'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
