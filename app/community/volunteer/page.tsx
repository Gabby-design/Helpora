'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  HeartHandshake, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { VolunteerOpportunity } from '@/lib/types';

export default function CommunityVolunteerPage() {
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOpp, setSelectedOpp] = useState<VolunteerOpportunity | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantNote, setApplicantNote] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/community/volunteer')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOpportunities(data);
      })
      .catch(err => console.error('Failed to load volunteer roles:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setSelectedOpp(null);
      setApplicantName('');
      setApplicantPhone('');
      setApplicantNote('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Top Bar */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/community"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-emerald-700 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Community Hub
          </Link>
          <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Verified Civic Volunteer Network
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-neutral-200 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block mb-2">
              Lend Your Skills & Time
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Community Volunteer Opportunities
            </h1>
            <p className="text-sm md:text-base text-neutral-600 mt-2 leading-relaxed">
              Connect with vetted non-profits, youth literacy initiatives, free medical outreaches, and environmental drives in Abuja, Lagos, and surrounding cities.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-neutral-500 text-xs">Loading volunteer programs...</p>
          </div>
        ) : opportunities.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-md mx-auto">
            <HeartHandshake className="w-12 h-12 text-neutral-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-neutral-800">No Volunteer Roles Currently Open</h3>
            <p className="text-xs text-neutral-500 mt-1">Check back soon as local initiatives register new community outreach drives.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map((opp) => (
              <div 
                key={opp.id}
                className="bg-white rounded-2xl border border-neutral-200 hover:border-emerald-500/60 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {opp.category}
                    </span>
                    <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {opp.commitment}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-neutral-900 mb-1">
                    {opp.title}
                  </h2>

                  <p className="text-xs font-bold text-emerald-800 mb-3">
                    Host: {opp.organization}
                  </p>

                  <p className="text-xs md:text-sm text-neutral-600 leading-relaxed mb-4">
                    {opp.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-4">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{opp.city}, Nigeria</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    <strong>{opp.spotsRemaining} spots</strong> remaining
                  </span>

                  <button
                    onClick={() => setSelectedOpp(opp)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-sm"
                  >
                    Sign Up to Help
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Volunteer Signup Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-neutral-900 mb-1">
              Volunteer for: {selectedOpp.title}
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Organization: {selectedOpp.organization} &bull; {selectedOpp.city}
            </p>

            {appliedSuccess ? (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Application Received!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you for contributing to your community. The coordinator at {selectedOpp.organization} will contact you via WhatsApp / phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g., Amaka Okafor"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="e.g., 0803 123 4567"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Relevant Skills or Experience (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={applicantNote}
                    onChange={(e) => setApplicantNote(e.target.value)}
                    placeholder="Tell the organizer briefly how you'd like to help..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedOpp(null)}
                    className="px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Confirm Volunteer Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
