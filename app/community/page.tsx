'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  AlertTriangle, 
  HeartHandshake, 
  PlusCircle, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building,
  Radio
} from 'lucide-react';
import { CommunityReport, VolunteerOpportunity } from '@/lib/types';

export default function CommunityPage() {
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/community/reports').then(res => res.json()),
      fetch('/api/community/volunteer').then(res => res.json())
    ])
      .then(([repData, volData]) => {
        if (Array.isArray(repData)) setReports(repData.slice(0, 4));
        if (Array.isArray(volData)) setOpportunities(volData.slice(0, 4));
      })
      .catch(err => console.error('Failed to load community items:', err))
      .finally(() => setLoading(false));
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Resolved</span>;
      case 'investigating':
        return <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">In Progress</span>;
      default:
        return <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">Submitted</span>;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Hero Header */}
      <div className="bg-white border-b border-neutral-200 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block mb-3">
              Civic Engagement &bull; Abuja & Beyond
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Community Action & Reporting
            </h1>
            <p className="text-sm md:text-base text-neutral-600 mt-2 leading-relaxed">
              Report neighborhood civic concerns, track civic infrastructure resolutions, and discover local volunteer opportunities making real impacts across our communities.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/community/report"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition"
              >
                <PlusCircle className="w-4 h-4" />
                Report a Community Issue
              </Link>
              <Link
                href="/community/volunteer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs font-bold transition"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-700" />
                Explore Volunteer Roles
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {/* Reports Section */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Radio className="w-5 h-5 text-emerald-700" />
                Recent Neighborhood Reports
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Issues reported by citizens regarding roads, drainage, sanitation, and electrical fixtures.
              </p>
            </div>

            <Link
              href="/community/report"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 transition"
            >
              View All & Report
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-neutral-500 text-xs">Loading community reports...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {reports.map((report) => (
                <div 
                  key={report.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
                        {report.category}
                      </span>
                      {getStatusBadge(report.status)}
                    </div>

                    <h3 className="text-base font-bold text-neutral-900 mb-1">
                      {report.title}
                    </h3>

                    <div className="flex items-center gap-1 text-xs text-neutral-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{report.location}, {report.city}</span>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                      {report.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Reported {new Date(report.createdAt || report.created_at || Date.now()).toLocaleDateString()}
                    </span>
                    <span>{report.upvotes || 0} citizens supported</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Volunteer Opportunities Section */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-700" />
                Active Volunteer Initiatives
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Join grassroots efforts supporting education, medical outreaches, and youth mentoring.
              </p>
            </div>

            <Link
              href="/community/volunteer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 transition"
            >
              All Volunteer Roles
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {opportunities.map((opp) => (
              <div 
                key={opp.id}
                className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {opp.category}
                    </span>
                    <span className="text-xs font-semibold text-neutral-500">
                      {opp.commitment}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 mb-1">
                    {opp.title}
                  </h3>

                  <p className="text-xs font-semibold text-emerald-800 mb-2">
                    Organized by: {opp.organization}
                  </p>

                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    {opp.description}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-neutral-500 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{opp.city}, Nigeria</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    Spots: <strong>{opp.spotsRemaining} remaining</strong>
                  </span>

                  <Link
                    href="/community/volunteer"
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold transition"
                  >
                    Apply to Volunteer
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Civic Pledge Card */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-2xl p-8 text-white">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
              CivicTrust Community Integrity Policy
            </h3>
            <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed mb-4">
              Our community boards do not accept unverified commercial spam or false claims. All citizen reports and volunteer postings are reviewed for authenticity to ensure public resources remain genuine and impactful.
            </p>
            <div className="flex gap-4 text-xs text-emerald-200">
              <span>&bull; Zero fake analytics</span>
              <span>&bull; Direct government & NGO escalation</span>
              <span>&bull; Community-first moderation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
