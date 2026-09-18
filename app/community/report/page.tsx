'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  AlertTriangle, 
  MapPin, 
  ArrowLeft, 
  CheckCircle2, 
  Send, 
  FileText, 
  Radio, 
  Clock,
  ThumbsUp,
  Filter
} from 'lucide-react';
import { CommunityReport } from '@/lib/types';
import { NIGERIAN_CITIES } from '@/lib/data/cities';

export default function CommunityReportPage() {
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('roads');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('Abuja');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/community/reports');
      const data = await res.json();
      if (Array.isArray(data)) setReports(data);
    } catch (e) {
      console.error('Failed to load reports:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/community/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          description,
          location,
          city
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage('Report submitted successfully! It has been entered into the civic database.');
        setTitle('');
        setDescription('');
        setLocation('');
        fetchReports();
        setTimeout(() => setSuccessMessage(''), 5000);
      }
    } catch (e) {
      console.error('Failed to submit report', e);
    } finally {
      setSubmitting(false);
    }
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
            Citizen Action Registry
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Submission Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm sticky top-20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h2 className="text-base font-bold text-neutral-900">
                  Report a Civic Issue
                </h2>
              </div>
              <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
                Notice broken streetlights, open trenches, dangerous potholes, or uncleared sanitation in your district? Document it here.
              </p>

              {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Issue Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Damaged Drainage Grid on Ahmadu Bello Way"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <option value="roads">Roads & Drainage</option>
                      <option value="electricity">Electrical & Lights</option>
                      <option value="sanitation">Waste & Sanitation</option>
                      <option value="water">Public Water</option>
                      <option value="safety">Public Safety</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      {NIGERIAN_CITIES.map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Specific Location / Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Near Banex Plaza, Wuse 2"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Description & Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the condition, how long it has persisted, and potential hazards to pedestrians or motorists..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    'Recording Report...'
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Publish Citizen Report
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Live Reports Feed */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <div>
                <h1 className="text-lg font-bold text-neutral-900">
                  Active Civic Reports Feed
                </h1>
                <p className="text-xs text-neutral-500">
                  Verified citizen submissions tracked across Nigerian districts.
                </p>
              </div>

              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {reports.length} Total Reports
              </span>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-neutral-500 text-xs">Loading incident feed...</p>
              </div>
            ) : reports.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200 p-10 text-center">
                <Radio className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                <p className="text-xs text-neutral-500">No reports submitted yet. Be the first to record a civic issue.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((r) => (
                  <div key={r.id} className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
                          {r.category}
                        </span>
                        <span className="text-xs text-neutral-400">&bull;</span>
                        <span className="text-xs font-semibold text-neutral-600">{r.city}</span>
                      </div>

                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        r.status === 'resolved' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : r.status === 'investigating'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {r.status}
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-neutral-900">
                      {r.title}
                    </h2>

                    <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{r.location}, {r.city}</span>
                    </div>

                    <p className="text-xs md:text-sm text-neutral-700 leading-relaxed">
                      {r.description}
                    </p>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        Submitted on {new Date(r.createdAt || r.created_at || Date.now()).toLocaleDateString()}
                      </span>

                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <ThumbsUp className="w-3 h-3" />
                        {r.upvotes || 0} Citizens Confirmed
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
