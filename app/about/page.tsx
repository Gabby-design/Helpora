import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Target, HeartHandshake, Award, Users, CheckCircle2, ArrowRight, Sparkles, BookOpen, Building2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero */}
      <div className="bg-white border-b border-slate-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            About Helpora
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Find Trusted Help Near You
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Connect with trusted local professionals, learn with AI, and find essential resources — all in one place.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Mission Statement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Our Vision
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              Transforming Local Services in Nigeria
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              In Nigerian cities like Abuja, Lagos, Port Harcourt, and beyond, finding an honest electrician, skilled mechanic, reliable home tutor, or emergency health center is often burdened by guesswork and inflated prices.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Helpora bridges that gap. We provide a transparent marketplace where verified professionals showcase genuine skills, students access AI-guided study revision, and residents discover essential health and community resources.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-8 text-white space-y-5 shadow-lg">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              The Three Pillars of Helpora
            </h3>
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Trusted Marketplace:</strong> Verified tradespeople with transparent ratings, direct phone contact, and zero lead fees.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">AI Study Companion:</strong> Accessible secondary school and university prep (WAEC, JAMB, NECO) with step-by-step tutoring.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Essential Resources:</strong> Direct emergency dispatch numbers, accredited healthcare clinics, and community civic reports.</span>
              </div>
            </div>
          </div>
        </div>

        {/* The Helpora Trust Standards */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              The Helpora Verification Standard
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              How we build trust between local Nigerian customers and independent service providers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2.5 p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center">
                1
              </div>
              <h4 className="text-sm font-bold text-slate-900">Identity & CAC Vetting</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                National identification confirmation, Corporate Affairs Commission (CAC) business check, and physical service location verification.
              </p>
            </div>

            <div className="space-y-2.5 p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center">
                2
              </div>
              <h4 className="text-sm font-bold text-slate-900">Trade Demonstration</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review of past client receipts, trade association memberships (such as NEMSA or mechanics unions), and verified customer testimonials.
              </p>
            </div>

            <div className="space-y-2.5 p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center">
                3
              </div>
              <h4 className="text-sm font-bold text-slate-900">Ongoing Accountability</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Continuous review monitoring. Any provider with verified fraud, overcharging, or safety violations is immediately reviewed and delisted.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold">Join the Helpora Community</h3>
            <p className="text-xs text-slate-300 max-w-md">
              Whether you are looking for trusted everyday help or grow your service business, start with Helpora today.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-sm inline-flex items-center gap-2"
            >
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/business/register"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-xl transition"
            >
              List Your Business
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
