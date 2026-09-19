'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthAdapter } from '@/lib/auth/adapter';
import { forgotPasswordSchema } from '@/lib/auth/schemas';
import { 
  ShieldCheck, 
  Mail, 
  ArrowRight, 
  ArrowLeft,
  AlertCircle, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const parsed = forgotPasswordSchema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await AuthAdapter.resetPasswordForEmail(email);
      if (!res.success) {
        setError(res.message || 'Could not send reset link. Please try again.');
      } else {
        setSuccessMessage(
          res.message || `If an account is associated with ${email}, a password reset link has been dispatched.`
        );
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md space-y-6">
        
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
            Reset your password
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Enter your registered email and we&apos;ll send you a secure link to choose a new password.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-slate-200/90 space-y-5">
          {successMessage ? (
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Check your inbox</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {successMessage}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Registered Email Address
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center text-xs text-slate-600">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
