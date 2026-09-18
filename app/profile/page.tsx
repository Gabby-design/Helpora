'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Bookmark, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Settings,
  Bell
} from 'lucide-react';
import { NIGERIAN_CITIES } from '@/lib/data/cities';

export default function ProfilePage() {
  const [name, setName] = useState('Emeka Nnamdi');
  const [email, setEmail] = useState('emeka.nnamdi@example.com');
  const [phone, setPhone] = useState('+234 803 555 0192');
  const [city, setCity] = useState('Abuja');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
              EN
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl md:text-2xl font-bold text-neutral-900">
                  {name}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Citizen
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                CivicTrust Community Member &bull; {city}, Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Quick Links Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/saved"
            className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-emerald-500/60 transition shadow-sm flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 group-hover:text-emerald-800 transition">
                  My Saved Bookmarks
                </h3>
                <p className="text-xs text-neutral-500">Access saved service providers and health centers</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-700 transition" />
          </Link>

          <Link
            href="/study/dashboard"
            className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-emerald-500/60 transition shadow-sm flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 group-hover:text-blue-800 transition">
                  Study Performance
                </h3>
                <p className="text-xs text-neutral-500">View WAEC/JAMB quiz test records and scores</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-700 transition" />
          </Link>
        </div>

        {/* Profile Details Form */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
            <div>
              <h2 className="text-base font-bold text-neutral-900">Personal Information</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Update your contact details and default Nigerian city for localized search.
              </p>
            </div>
          </div>

          {savedSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Profile preferences updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Default City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {NIGERIAN_CITIES.map(c => (
                    <option key={c.name} value={c.name}>{c.name} ({c.state})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Business Owner Section */}
        <div className="bg-neutral-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-base font-bold mb-1">Are you a trade professional or contractor?</h3>
            <p className="text-xs text-neutral-300">
              List your electrical, plumbing, mechanical, or tutoring service on the CivicTrust verified registry.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/business/register"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition"
            >
              List My Trade
            </Link>
            <Link
              href="/dashboard/business"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition"
            >
              Business Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
