'use client';

import React, { useState, useEffect } from 'react';
import SearchHero from '@/components/services/SearchHero';
import ProviderCard from '@/components/services/ProviderCard';
import { Provider } from '@/lib/types';
import { 
  ShieldCheck, 
  Sparkles, 
  GraduationCap, 
  HeartPulse, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Compass, 
  HelpCircle,
  Building2,
  BookOpen,
  PlusCircle,
  Clock,
  PhoneCall,
  Search,
  Check
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [featuredProviders, setFeaturedProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/providers')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          // Show verified or sample providers
          setFeaturedProviders(json.data.slice(0, 3));
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Universal Search Hero & Category Bar */}
      <SearchHero />

      {/* 2. Three Core Pillars Overview Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            One Civic Platform
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Three Essential Pillars in One Account
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            CivicTrust integrates trusted local trade services, AI student learning, and community health access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Local Services */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Pillar 1 • Local Trades</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">Local Services</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Find licensed electricians, borehole technicians, mechanics, phone repairers, cleaners, and tutors verified against official registration records.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified credentials & trade licenses</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Honest community ratings & proximity</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero lead fees or job commissions</span>
                </li>
              </ul>
            </div>

            <Link
              href="/services"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition"
            >
              <span>Find Local Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pillar 2: AI Study */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-amber-300 hover:shadow-lg transition flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Pillar 2 • Education</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">AI Study & Prep</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Learn at your own pace with our patient AI tutor. Access step-by-step math derivations, electrical trade cheat sheets, and interactive practice exams.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Patient AI explanations (never just answers)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Instant-feedback drills with explanations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Curated formulas, guides & study materials</span>
                </li>
              </ul>
            </div>

            <Link
              href="/study"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition"
            >
              <span>Start Learning with AI</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>

          {/* Pillar 3: Health & Help */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-rose-300 hover:shadow-lg transition flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">Pillar 3 • Community Care</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">Health & Help</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Find essential care when every second matters. Locate 24/7 trauma hospitals, accredited community pharmacies, and urgent lines in your city.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Verified 24/7 emergency care tags</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Proximity sorting and direct phone taps</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Turn-by-turn navigation mapping</span>
                </li>
              </ul>
            </div>

            <Link
              href="/health"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs sm:text-sm shadow-sm transition"
            >
              <span>Find Health & Emergency Help</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Featured Verified Local Providers */}
      {featuredProviders.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Featured Listings</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Vetted Local Services in Abuja
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Audited credentials, live operating hours, and verified community reviews.
              </p>
            </div>

            <Link
              href="/services/search"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 transition"
            >
              <span>Explore All Verified Pros</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Community Module Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-slate-700/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/30">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                <span>Civic Action & Community Voice</span>
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Report neighborhood problems. Join volunteer efforts.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                CivicTrust isn't just a business directory. Citizens can publicly log local infrastructure issues (damaged roads, broken streetlights, water pipe bursts) and sign up for neighborhood cleanup and youth mentoring drives.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/community/report"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-sm"
                >
                  <span>Report a Community Issue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/community/volunteer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/15 transition"
                >
                  <span>Browse Volunteer Opportunities</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3 text-xs">
              <p className="font-bold text-teal-300 uppercase tracking-wider text-[10px]">Recent Community Reports</p>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-white/10">
                  <p className="font-semibold text-white">Damaged Storm Drain • Wuse II</p>
                  <span className="text-[10px] text-amber-300">Under Review by municipal team</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10">
                  <p className="font-semibold text-white">Burst Water Reticulation Pipe • Garki</p>
                  <span className="text-[10px] text-emerald-300">Resolved • Water restored</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How CivicTrust Works (3-Step Guide) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Simple, Transparent Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            How CivicTrust Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-center space-y-3 relative shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 font-extrabold text-lg flex items-center justify-center mx-auto border border-brand-200">
              1
            </div>
            <h3 className="font-bold text-lg text-slate-900">Search & Specify</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Tell us what you need — from emergency inverter troubleshooting to physics tutoring or nearby hospital trauma care.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-center space-y-3 relative shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 font-extrabold text-lg flex items-center justify-center mx-auto border border-emerald-200">
              2
            </div>
            <h3 className="font-bold text-lg text-slate-900">Compare & Verify</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Review verified licenses, real proximity distances, live operating status, and honest neighbor reviews.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-center space-y-3 relative shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 font-extrabold text-lg flex items-center justify-center mx-auto border border-purple-200">
              3
            </div>
            <h3 className="font-bold text-lg text-slate-900">Connect Directly</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Call directly or navigate using GPS coordinates. No middlemen, no commissions, and no hidden markups.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Why Trust CivicTrust (Trust & Verification Commitment) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/90 space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Trust & Verification Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Why CivicTrust is Different
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Unlike generic lead-generation sites that sell citizen contacts to the highest bidder, CivicTrust is built on civic transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-xs">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Trade License Audits</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Verification badges require cross-referencing national and state contractor registries.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-xs">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Zero Fake Reviews</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Reviews are authenticated and moderated to eliminate spam and paid astroturfing.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-xs">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">No Pay-For-Placement</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Providers cannot buy artificial top rankings. Relevance, distance, and ratings determine order.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-xs">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Clear Demo Disclosures</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sample development listings are distinctly tagged so users never confuse test data with real businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Business Registration Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
              For Professional Service Providers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Are you a licensed trade professional in Nigeria?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              List your business on CivicTrust today. Zero listing charges, zero commission fees on your jobs, and direct customer phone calls.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/business/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your Business Free</span>
            </Link>
            <Link
              href="/dashboard/business"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition"
            >
              <span>Owner Portal</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
