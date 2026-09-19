'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  RefreshCw,
  Clock 
} from 'lucide-react';

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setResendStatus('A fresh confirmation link has been sent to your email.');
    }, 1500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md space-y-6 text-center">
        
        {/* Brand Header */}
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

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-slate-200/90 space-y-5 text-center">
          
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Verify your email
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We&apos;ve sent a verification link to your email address. Please click the link inside to verify your Helpora account.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 text-left space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Did not receive the email?</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Check your spam or promotions folder. It can take up to 2 minutes to arrive.
            </p>
          </div>

          {resendStatus && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{resendStatus}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
              <span>{isResending ? 'Sending...' : 'Resend Email'}</span>
            </button>

            <Link
              href="/login"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Go to Sign In</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
