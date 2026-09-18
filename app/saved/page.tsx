'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bookmark, 
  Trash2, 
  ArrowLeft, 
  ExternalLink, 
  Phone, 
  MapPin, 
  Building2, 
  Sparkles, 
  GraduationCap,
  Store
} from 'lucide-react';
import { SavedItems, Provider, HealthResource } from '@/lib/types';

export default function SavedItemsPage() {
  const [savedData, setSavedData] = useState<SavedItems>({ providers: [], health: [], healthResources: [], materials: [], volunteer: [] });
  const [providerDetails, setProviderDetails] = useState<Provider[]>([]);
  const [healthDetails, setHealthDetails] = useState<HealthResource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadSavedItems();
  }, []);

  const loadSavedItems = async () => {
    setLoading(true);
    try {
      // 1. Fetch saved IDs from /api/saved
      const res = await fetch('/api/saved');
      const saved: SavedItems = await res.json();
      setSavedData(saved);

      // 2. Fetch full entity details
      const [pRes, hRes] = await Promise.all([
        fetch('/api/providers').then(r => r.json()),
        fetch('/api/health-resources').then(r => r.json())
      ]);

      if (Array.isArray(pRes)) {
        const provIds = saved.providers || [];
        setProviderDetails(pRes.filter((p: Provider) => provIds.includes(p.id)));
      }
      if (Array.isArray(hRes)) {
        const healthIds = saved.healthResources || saved.health || [];
        setHealthDetails(hRes.filter((h: HealthResource) => healthIds.includes(h.id)));
      }
    } catch (e) {
      console.error('Failed to load saved items:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProvider = async (id: string) => {
    try {
      await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'providers', id })
      });
      loadSavedItems();
    } catch (e) {
      console.error('Failed to remove provider', e);
    }
  };

  const totalSaved = (savedData.providers?.length || 0) + (savedData.healthResources?.length || 0) + (savedData.materials?.length || 0);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Top Bar */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-emerald-700 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Personal Civic Wallet
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-neutral-200 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 flex items-center gap-3">
            <Bookmark className="w-7 h-7 text-emerald-700" />
            My Saved Resources
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 mt-1">
            Quickly access tradespeople, medical centers, and study guides you bookmarked for later.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-neutral-500 text-xs">Loading saved bookmarks...</p>
          </div>
        ) : totalSaved === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-md mx-auto shadow-sm">
            <Bookmark className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h2 className="text-base font-bold text-neutral-800 mb-1">No Bookmarks Saved Yet</h2>
            <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
              When browsing electricians, clinics, or study formula sheets, tap the bookmark icon to save them here for offline reference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/services"
                className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition"
              >
                Find Services
              </Link>
              <Link
                href="/health"
                className="px-4 py-2 bg-neutral-100 text-neutral-800 text-xs font-bold rounded-xl hover:bg-neutral-200 transition"
              >
                Health Facilities
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Bookmarked Providers */}
            {providerDetails.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800 mb-4 flex items-center gap-2">
                  <Store className="w-4 h-4 text-emerald-700" />
                  Saved Service Providers ({providerDetails.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {providerDetails.map((p) => (
                    <div key={p.id} className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                            {p.category}
                          </span>
                          <button
                            onClick={() => handleRemoveProvider(p.id)}
                            className="text-neutral-400 hover:text-rose-600 transition p-1"
                            title="Remove bookmark"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <Link href={`/services/provider/${p.id}`} className="block hover:text-emerald-800 transition">
                          <h3 className="text-base font-bold text-neutral-900 mb-1">{p.name}</h3>
                        </Link>
                        
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-3">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span>{p.city}, {p.state}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                        <a
                          href={`tel:${p.phone}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-neutral-800 hover:text-emerald-700"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {p.phone}
                        </a>

                        <Link
                          href={`/services/provider/${p.id}`}
                          className="text-xs font-bold text-emerald-800 hover:underline"
                        >
                          View Profile &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bookmarked Health Facilities */}
            {healthDetails.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800 mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  Saved Healthcare Centers ({healthDetails.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {healthDetails.map((h) => (
                    <div key={h.id} className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                            {h.category}
                          </span>
                        </div>

                        <Link href={`/health/${h.id}`} className="block hover:text-emerald-800 transition">
                          <h3 className="text-base font-bold text-neutral-900 mb-1">{h.name}</h3>
                        </Link>
                        
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-3">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span>{h.address}, {h.city}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                        <a
                          href={`tel:${h.phone}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-neutral-800 hover:text-emerald-700"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {h.phone}
                        </a>

                        <Link
                          href={`/health/${h.id}`}
                          className="text-xs font-bold text-emerald-800 hover:underline"
                        >
                          View Facility &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
