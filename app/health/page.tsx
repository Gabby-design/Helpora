'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  HeartHandshake, 
  Search, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Building2, 
  Pill, 
  Stethoscope, 
  ChevronRight,
  AlertTriangle,
  HeartPulse,
  Navigation,
  ShieldCheck
} from 'lucide-react';
import { HealthResource } from '@/lib/types';

export default function HealthPage() {
  const [resources, setResources] = useState<HealthResource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyEmergency, setOnlyEmergency] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchHealthData();
  }, [selectedCategory, onlyEmergency]);

  const fetchHealthData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      if (onlyEmergency) params.set('emergency', 'true');
      
      const res = await fetch(`/api/health-resources?${params.toString()}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setResources(data);
      }
    } catch (e) {
      console.error('Failed to load health resources:', e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = resources.filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const cityStr = item.city || '';
    const sOffered = item.servicesOffered || item.services || [];
    return (
      item.name.toLowerCase().includes(q) ||
      cityStr.toLowerCase().includes(q) ||
      item.address.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      sOffered.some((s: string) => s.toLowerCase().includes(q))
    );
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hospital': return <Building2 className="w-4 h-4 text-emerald-700" />;
      case 'pharmacy': return <Pill className="w-4 h-4 text-blue-600" />;
      case 'clinic': return <Stethoscope className="w-4 h-4 text-purple-600" />;
      case 'emergency': return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      default: return <HeartPulse className="w-4 h-4 text-emerald-700" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Top Banner / Emergency Callout */}
      <div className="bg-slate-900 text-white px-4 py-2.5 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="font-medium text-slate-300">
              In an acute life-threatening emergency in Nigeria, dial the unified dispatch line toll-free:
            </span>
            <a href="tel:112" className="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-0.5 rounded-md font-bold transition">
              112
            </a>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Police &bull; Ambulance &bull; Fire Service
          </span>
        </div>
      </div>

      {/* Main Hero Header */}
      <div className="bg-white border-b border-slate-200 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block">
              Helpora Health & Help Directory &bull; Nigeria
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Important Help When You Need It
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Find verified federal medical centers, general hospitals, 24-hour pharmacies, and community emergency care centers across Nigeria.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search facility name, area (e.g. Garki, Maitama, Ikeja), or service..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white shadow-xs font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl text-xs font-semibold px-3 py-2.5 text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
              >
                <option value="all">All Healthcare Types</option>
                <option value="hospital">Hospitals</option>
                <option value="pharmacy">Pharmacies</option>
                <option value="clinic">Clinics & Diagnostic</option>
                <option value="emergency">Emergency Centers</option>
              </select>

              <button
                onClick={() => setOnlyEmergency(!onlyEmergency)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition border flex items-center gap-1.5 shadow-xs ${
                  onlyEmergency 
                    ? 'bg-rose-600 text-white border-rose-700' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                24/7 Emergency Only
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities List Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
            Verified Healthcare Facilities ({filtered.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Active in Abuja, Lagos & nationwide
          </span>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-slate-500 text-sm">Verifying healthcare records...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No Healthcare Facilities Found</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Try adjusting your search criteria or resetting filters to view all medical centers.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setOnlyEmergency(false);
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/60 p-5 shadow-subtle hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 capitalize">
                      {getCategoryIcon(item.category || item.type || 'health')}
                      {item.category || item.type}
                    </div>

                    {(item.is24Hours || item.emergency_available) && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        24/7 Emergency
                      </span>
                    )}
                  </div>

                  <Link href={`/health/${item.id}`} className="block group-hover:text-emerald-700 transition">
                    <h3 className="text-base font-bold text-slate-900 line-clamp-2 mb-1.5">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="line-clamp-1">{item.address}, {item.city || 'Abuja'}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-5">
                    {(item.servicesOffered || item.services || []).slice(0, 3).map((service: string, idx: number) => (
                      <span key={idx} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                        {service}
                      </span>
                    ))}
                    {(item.servicesOffered || item.services || []).length > 3 && (
                      <span className="text-[10px] text-slate-400 px-1 py-0.5">
                        +{(item.servicesOffered || item.services || []).length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${item.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    {item.phone}
                  </a>

                  <Link
                    href={`/health/${item.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition border border-emerald-200"
                  >
                    Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
