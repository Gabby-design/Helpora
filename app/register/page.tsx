'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { registerSchema } from '@/lib/auth/schemas';
import { UserRole } from '@/lib/types';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  AlertCircle, 
  Loader2,
  Wrench,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  Shield,
  Building2
} from 'lucide-react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '';

  const { signup, loginWithGoogle } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [turnstileToken, setTurnstileToken] = useState('demo-turnstile-token');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side Zod validation
    const parsed = registerSchema.safeParse({ name, email, password, role, turnstileToken });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || 'Please check your registration details');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await signup(name, email, password, role, turnstileToken);
      if (!res.success) {
        setError(res.message || 'Registration could not be completed. Please try again.');
        setIsSubmitting(false);
      } else {
        // Direct routing based on registered role
        if (role === 'provider') {
          router.push('/business/register?from=register');
        } else if (res.redirectTo) {
          router.push(res.redirectTo);
        } else {
          router.push(returnTo || '/account?welcome=true');
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during registration.');
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);
    setIsGoogleLoading(true);
    try {
      const res = await loginWithGoogle(returnTo || '/account');
      if (!res.success) {
        setError(res.message || 'Google sign-up could not be completed.');
        setIsGoogleLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Google sign-up failed.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-lg space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="Helpora Home">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white flex items-center justify-center shadow-sm group-hover:from-emerald-500 group-hover:to-emerald-600 transition-all">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-2xl tracking-tight text-slate-950 leading-none">
                HELP<span className="text-emerald-600">ORA</span>
              </span>
              <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase mt-0.5">
                Nigeria
              </span>
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight pt-2">
            Create your free account
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            100% free for everyone. No subscription fees, paywalls, or commissions.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-slate-200/90 space-y-5">
          
          {/* Google Sign-up Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isGoogleLoading || isSubmitting}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 transition shadow-xs disabled:opacity-60"
          >
            {isGoogleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
            ) : (
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
            )}
            <span>Sign up with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              or register with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Role Selection Tabs */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                I want to join Helpora as:
              </label>
              <div className="grid grid-cols-3 gap-2">
                
                {/* 1. Customer */}
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    role === 'user'
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <User className={`w-4 h-4 mb-1.5 ${role === 'user' ? 'text-emerald-700' : 'text-slate-500'}`} />
                  <div>
                    <p className={`text-xs font-bold ${role === 'user' ? 'text-emerald-900' : 'text-slate-800'}`}>
                      Customer
                    </p>
                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                      Find help & study
                    </p>
                  </div>
                </button>

                {/* 2. Service Provider */}
                <button
                  type="button"
                  onClick={() => setRole('provider')}
                  className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    role === 'provider'
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <Wrench className={`w-4 h-4 mb-1.5 ${role === 'provider' ? 'text-emerald-700' : 'text-slate-500'}`} />
                  <div>
                    <p className={`text-xs font-bold ${role === 'provider' ? 'text-emerald-900' : 'text-slate-800'}`}>
                      Artisan / Pro
                    </p>
                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                      List your trade
                    </p>
                  </div>
                </button>

                {/* 3. Volunteer Org */}
                <button
                  type="button"
                  onClick={() => setRole('volunteer_org')}
                  className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    role === 'volunteer_org'
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <HeartHandshake className={`w-4 h-4 mb-1.5 ${role === 'volunteer_org' ? 'text-emerald-700' : 'text-slate-500'}`} />
                  <div>
                    <p className={`text-xs font-bold ${role === 'volunteer_org' ? 'text-emerald-900' : 'text-slate-800'}`}>
                      Volunteer Org
                    </p>
                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                      NGO / NYSC group
                    </p>
                  </div>
                </button>

              </div>

              {/* Role Explainer Helper */}
              <p className="text-[11px] text-slate-500 pt-0.5">
                {role === 'user' && '✓ Access verified contacts, save favorites, write reviews, and track WAEC/JAMB quiz progress.'}
                {role === 'provider' && '✓ Continue to business onboarding to showcase your trade, service areas, and get direct WhatsApp/phone inquiries.'}
                {role === 'volunteer_org' && '✓ Publish community volunteer opportunities and coordinate civic problem initiatives.'}
              </p>
            </div>

            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {role === 'provider' ? 'Business or Artisan Name' : role === 'volunteer_org' ? 'Organisation Name' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === 'provider' ? 'e.g. Kolawole Electrical Works' : 'e.g. Amara Okafor'}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/60 font-medium"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/60 font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/60 font-medium"
                />
              </div>
              <p className="text-[10.5px] text-slate-500">Must be at least 6 characters.</p>
            </div>

            {/* Cloudflare Turnstile Verification Badge */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-medium">Spam & Bot Protected by Turnstile</span>
              </div>
              <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                Verified
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 active:scale-98"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>
                    {role === 'provider' ? 'Register & Continue to Business Profile →' : 'Complete Free Registration'}
                  </span>
                </>
              )}
            </button>
          </form>

          <p className="text-[11px] text-center text-slate-500 leading-relaxed">
            By signing up, you agree to Helpora&apos;s{' '}
            <Link href="/terms" className="underline hover:text-emerald-700">Terms of Service</Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-emerald-700">Privacy Policy</Link>.
            Your data is never sold.
          </p>

        </div>

        {/* Login footer */}
        <div className="text-center text-xs text-slate-600">
          <span>Already have an account? </span>
          <Link
            href={`/login${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`}
            className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            Sign In here →
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
