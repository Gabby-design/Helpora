import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowUpRight, Heart, PhoneCall, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 transition-colors pb-16 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Col 1: HELPORA Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                HELP<span className="text-emerald-500">ORA</span>
              </span>
            </Link>
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              Nigeria&apos;s trusted service marketplace and community platform. Connect with vetted local trade professionals, learn with AI study guidance, and access essential healthcare resources near you.
            </p>
            <div className="pt-1">
              <p className="text-xs text-emerald-400 font-semibold tracking-wide">
                &ldquo;Find Trusted Help Near You&rdquo;
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Active in Abuja FCT, Lagos, Port Harcourt, Ibadan, Kano, and expanding nationwide.
              </p>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Services</p>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-white transition">All Categories</Link>
              </li>
              <li>
                <Link href="/services/search?category=electrician" className="hover:text-white transition">Electricians & Solar</Link>
              </li>
              <li>
                <Link href="/services/search?category=plumber" className="hover:text-white transition">Plumbers & Borehole</Link>
              </li>
              <li>
                <Link href="/services/search?category=mechanic" className="hover:text-white transition">Auto Mechanics</Link>
              </li>
              <li>
                <Link href="/services/search?category=phone-laptop" className="hover:text-white transition">Phone & PC Repair</Link>
              </li>
              <li>
                <Link href="/services/search?category=cleaner" className="hover:text-white transition">Cleaning & Fumigation</Link>
              </li>
              <li>
                <Link href="/services/search?category=tutor" className="hover:text-white transition">Home & Exam Tutors</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: AI Study */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">AI Study</p>
            <ul className="space-y-2">
              <li>
                <Link href="/study" className="hover:text-white transition">Study Hub</Link>
              </li>
              <li>
                <Link href="/study/tutor" className="hover:text-white transition">AI Tutor</Link>
              </li>
              <li>
                <Link href="/study/practice" className="hover:text-white transition">Practice Quizzes</Link>
              </li>
              <li>
                <Link href="/study/materials" className="hover:text-white transition">Study Materials</Link>
              </li>
              <li>
                <Link href="/study/dashboard" className="hover:text-white transition">Student Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Health & Help */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Health & Help</p>
            <ul className="space-y-2">
              <li>
                <Link href="/health" className="hover:text-white transition">Care Directory</Link>
              </li>
              <li>
                <Link href="/health?type=hospital" className="hover:text-white transition">Hospitals & Clinics</Link>
              </li>
              <li>
                <Link href="/health?type=pharmacy" className="hover:text-white transition">24/7 Pharmacies</Link>
              </li>
              <li>
                <Link href="/health?emergencyOnly=true" className="hover:text-white transition">Emergency Resources</Link>
              </li>
              <li>
                <Link href="/health?type=mental_health" className="hover:text-white transition">Mental Health</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Community & Businesses */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Community & Business</p>
            <ul className="space-y-2">
              <li>
                <Link href="/community" className="hover:text-white transition">Community Hub</Link>
              </li>
              <li>
                <Link href="/community/report" className="hover:text-white transition">Report an Issue</Link>
              </li>
              <li>
                <Link href="/community/volunteer" className="hover:text-white transition">Volunteer Opportunities</Link>
              </li>
              <li>
                <Link href="/business/register" className="hover:text-emerald-400 font-semibold text-emerald-400 flex items-center gap-1 transition">
                  <span>List Your Business</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard/business" className="hover:text-white transition">Business Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Support Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} Helpora. All rights reserved. Built with pride for Nigeria.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/#how-it-works" className="hover:text-white transition">How It Works</Link>
            <Link href="/safety" className="hover:text-white transition">Safety & Trust</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/report" className="hover:text-rose-400 transition">Report a Problem</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
