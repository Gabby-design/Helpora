import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowUpRight, Heart, PhoneCall, Mail, CheckCircle2, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-400 text-xs border-t border-slate-800/80 transition-colors pb-16 lg:pb-0 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-[96%] 2xl:max-w-[1760px] mx-auto px-3 sm:px-4 lg:px-6 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Col 1: HELPORA Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-glow-brand group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  HELP<span className="text-emerald-400">ORA</span>
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-emerald-400 font-bold -mt-0.5">Nigeria</span>
              </div>
            </Link>
            
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              Nigeria&apos;s trusted local service marketplace and community platform. Connect with vetted trade professionals, learn with patient AI study guidance, and navigate directly to emergency healthcare near you.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-[11px] font-semibold w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live in Abuja, Lagos, Port Harcourt & Ibadan</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Toll-Free Emergency Dispatch: <a href="tel:112" className="text-rose-400 font-bold hover:underline">112</a> &bull; Zero Lead Fees for Artisans
              </p>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Services
            </p>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition">All Categories</Link>
              </li>
              <li>
                <Link href="/services/search?category=electrician" className="hover:text-emerald-400 transition">Electricians & Solar</Link>
              </li>
              <li>
                <Link href="/services/search?category=plumber" className="hover:text-emerald-400 transition">Plumbers & Borehole</Link>
              </li>
              <li>
                <Link href="/services/search?category=mechanic" className="hover:text-emerald-400 transition">Auto Mechanics</Link>
              </li>
              <li>
                <Link href="/services/search?category=phone-laptop" className="hover:text-emerald-400 transition">Phone & PC Repair</Link>
              </li>
              <li>
                <Link href="/services/search?category=cleaner" className="hover:text-emerald-400 transition">Cleaning & Fumigation</Link>
              </li>
              <li>
                <Link href="/services/search?category=tutor" className="hover:text-emerald-400 transition">Home & Exam Tutors</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: AI Study */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              AI Learning
            </p>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/study" className="hover:text-teal-400 transition">Study Hub</Link>
              </li>
              <li>
                <Link href="/study/tutor" className="hover:text-teal-400 transition flex items-center gap-1">
                  <span>AI Tutor</span>
                  <span className="text-[9px] bg-teal-900/60 text-teal-300 font-bold px-1.5 py-0.5 rounded-full border border-teal-700/50">24/7</span>
                </Link>
              </li>
              <li>
                <Link href="/study/practice" className="hover:text-teal-400 transition">Practice Quizzes</Link>
              </li>
              <li>
                <Link href="/study/materials" className="hover:text-teal-400 transition">Formula Cheatsheets</Link>
              </li>
              <li>
                <Link href="/study/dashboard" className="hover:text-teal-400 transition">Student Progress</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Health & Help */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              Healthcare
            </p>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/health" className="hover:text-rose-400 transition">Care Directory</Link>
              </li>
              <li>
                <Link href="/health?type=hospital" className="hover:text-rose-400 transition">Hospitals & Clinics</Link>
              </li>
              <li>
                <Link href="/health?type=pharmacy" className="hover:text-rose-400 transition">24/7 Pharmacies</Link>
              </li>
              <li>
                <Link href="/health?emergencyOnly=true" className="hover:text-rose-400 transition font-medium text-rose-300">Emergency Dispatch</Link>
              </li>
              <li>
                <Link href="/health?type=mental_health" className="hover:text-rose-400 transition">Mental Health</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Community & Businesses */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Community
            </p>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/community" className="hover:text-amber-400 transition">Community Hub</Link>
              </li>
              <li>
                <Link href="/community/report" className="hover:text-amber-400 transition">Report an Issue</Link>
              </li>
              <li>
                <Link href="/community/volunteer" className="hover:text-amber-400 transition">Volunteer Needs</Link>
              </li>
              <li>
                <Link href="/business/register" className="hover:text-emerald-300 font-bold text-emerald-400 flex items-center gap-1 transition">
                  <span>List Your Business</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard/business" className="hover:text-white transition">Business Portal</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Support Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-400 flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} Helpora Technologies Ltd. Built for Nigeria.</span>
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <Link href="/about" className="hover:text-white transition">About Helpora</Link>
            <Link href="/#how-it-works" className="hover:text-white transition">How It Works</Link>
            <Link href="/safety" className="hover:text-white transition">Safety & Trust</Link>
            <Link href="/contact" className="hover:text-white transition">Support Contact</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/report" className="hover:text-rose-400 transition">Report an Abuse</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
