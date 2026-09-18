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
  Store,
  Navigation
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
      const res = await fetch('/api/saved');
      const saved: SavedItems = await res.json();
      setSavedData(saved);

      const [pRes, hRes] = await Promise.all([
        fetch('/api/providers').then(r => r.json()),
        fetch('/api/health-resources').then(r => r.json())
      ]);

      const provList = pRes.success && Array.isArray(pRes.data) ? pRes.data : Array.isArray(pRes) ? pRes : [];
      const healthList = hRes.success && Array.isArray(hRes.data) ? hRes.data : Array.isArray(hRes) ? hRes : [];

      const provIds = saved.providers || [];
      setProviderDetails(provList.filter((p: Provider) => provIds.includes(p.id)));

      const healthIds = saved.healthResources || saved.health || [];
      setHealthDetails(healthList.filter((h: HealthResource) => healthIds.includes(h.id)));
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

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Helpora Saved Items
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <Bookmark className="w-7 h-7 text-emerald-600" />
            My Saved Bookmarks
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Quickly access tradespeople, medical centers, and study guides you bookmarked for later.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Saved Providers */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-600" />
            Bookmarked Service Providers ({providerDetails.length})
          </h2>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-500">Loading saved items...</div>
          ) : providerDetails.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
              No saved providers yet. Tap the bookmark icon on any provider card to save for quick access.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {providerDetails.map(p => (
                <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-subtle">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
                      <p className="text-xs text-slate-500 capitalize">{p.category}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveProvider(p.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">{p.address}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={`tel:${p.phone}`}
                      className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{p.phone}</span>
                    </a>
                    <Link
                      href={`/services/provider/${p.id}`}
                      className="text-xs font-bold text-slate-900 hover:underline"
                    >
                      View Profile →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
