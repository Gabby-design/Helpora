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
  Share2
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
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
            Resolved
          </span>
        );
      case 'in progress':
      case 'investigating':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-300">
            In Progress
          </span>
        );
      case 'under review':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
            Under Review
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-300">
            Submitted
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block">
              Helpora Community Action &bull; Nigeria
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
              Help Your Community
            </h1>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Report public infrastructure issues (potholes, streetlights, drainage), track civic resolution stages, and discover volunteer initiatives making real neighborhood impact.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/community/report"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition"
              >
                <PlusCircle className="w-4 h-4" />
                Report an Issue
              </Link>
              <Link
                href="/community/volunteer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                Volunteer Opportunities
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
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Radio className="w-5 h-5 text-emerald-600" />
                Neighborhood Issue Reports
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Civic reports filed by citizens across Nigerian metropolitan areas.
              </p>
            </div>

            <Link
              href="/community/report"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 transition"
            >
              <span>View All Reports</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-slate-500 text-xs">Loading community reports...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {reports.map((report) => (
                <div 
                  key={report.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {report.category}
                      </span>
                      {getStatusBadge(report.status)}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {report.title}
                    </h3>

                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{report.location}, {report.city}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {report.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>Reported {new Date(report.created_at).toLocaleDateString()}</span>
                    <span className="font-semibold text-emerald-700">Track Status →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Volunteer Opportunities */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-600" />
                Active Volunteer Opportunities
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Support environmental cleanups, STEM mentoring, and neighborhood food banks.
              </p>
            </div>

            <Link
              href="/community/volunteer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 transition"
            >
              <span>All Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {opportunities.map((opp) => (
              <div 
                key={opp.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {opp.category}
                    </span>
                    <span className="text-xs text-slate-400">{opp.city}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {opp.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {opp.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">{opp.organization || (opp as any).organizationName}</span>
                  <Link
                    href={`/community/volunteer?id=${opp.id}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    Apply to Volunteer →
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
