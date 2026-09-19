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
  Radio,
  Building2,
  Share2,
  Sparkles
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
    switch (status.toLowerCase()) {
      case 'resolved':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs">
            Resolved
          </span>
        );
      case 'in progress':
      case 'investigating':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-300 shadow-xs">
            In Progress
          </span>
        );
      case 'under review':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 shadow-xs">
            Under Review
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-300">
            Submitted
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200/80 py-16 px-4 relative z-10">
        <div className="w-full max-w-[96%] 2xl:max-w-[1760px] mx-auto px-3 sm:px-4 lg:px-6">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 inline-flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Helpora Civic Action &bull; Nigeria</span>
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Empower Your <span className="text-emerald-700">Community</span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Report neighborhood infrastructure challenges (potholes, streetlights, flooded drainage), track official civic resolution progress, and connect with grassroots volunteer initiatives across Nigeria.
            </p>

            <div className="pt-3 flex flex-wrap gap-3">
              <Link
                href="/community/report"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-glow-brand transition active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>File Civic Report</span>
              </Link>
              <Link
                href="/community/volunteer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition shadow-subtle"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                <span>Volunteer Opportunities</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[96%] 2xl:max-w-[1760px] mx-auto px-3 sm:px-4 lg:px-6 py-12 space-y-14">
        {/* Reports Section */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-950 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Radio className="w-4 h-4" />
                </div>
                <span>Neighborhood Issue Reports</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Active civic reports submitted by residents across Abuja, Lagos, Port Harcourt, and Ibadan.
              </p>
            </div>

            <Link
              href="/community/report"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200 transition"
            >
              <span>View All Reports</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-slate-500 text-xs font-semibold">Loading community reports...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((report) => (
                <div 
                  key={report.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-elevated hover:border-emerald-400 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                        {report.category}
                      </span>
                      {getStatusBadge(report.status)}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1.5">
                      {report.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{report.location}, {report.city}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {report.description}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>Filed {new Date(report.created_at).toLocaleDateString()}</span>
                    <span className="font-bold text-emerald-700 hover:underline">Track Resolution &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Volunteer Opportunities */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-950 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <span>Active Volunteer Opportunities</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Support drainage clearing, STEM mentoring, solar training, and neighborhood food banks.
              </p>
            </div>

            <Link
              href="/community/volunteer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200 transition"
            >
              <span>All Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map((opp) => (
              <div 
                key={opp.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-elevated hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {opp.category}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{opp.city}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1.5">
                    {opp.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {opp.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">{opp.organization || (opp as any).organizationName}</span>
                  <Link
                    href={`/community/volunteer?id=${opp.id}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>Apply to Volunteer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
