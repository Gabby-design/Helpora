'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  Store, 
  HeartHandshake, 
  Radio, 
  PhoneCall, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Edit3, 
  Plus, 
  Search, 
  Clock, 
  MapPin, 
  AlertTriangle,
  RefreshCw,
  Award
} from 'lucide-react';
import { Provider, HealthResource, CommunityReport, EmergencyContact } from '@/lib/types';

export default function UnifiedAdminPage() {
  const [activeTab, setActiveTab] = useState<'providers' | 'health' | 'reports' | 'emergency'>('providers');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [healthResources, setHealthResources] = useState<HealthResource[]>([]);
  const [communityReports, setCommunityReports] = useState<CommunityReport[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionMessage, setActionMessage] = useState<string>('');

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [pRes, hRes, rRes, eRes] = await Promise.all([
        fetch('/api/providers').then(r => r.json()),
        fetch('/api/health-resources').then(r => r.json()),
        fetch('/api/community/reports').then(r => r.json()),
        fetch('/api/emergency-contacts').then(r => r.json())
      ]);

      if (Array.isArray(pRes)) setProviders(pRes);
      if (Array.isArray(hRes)) setHealthResources(hRes);
      if (Array.isArray(rRes)) setCommunityReports(rRes);
      if (Array.isArray(eRes)) setEmergencyContacts(eRes);
    } catch (e) {
      console.error('Failed to load admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleToggleVerification = async (provider: Provider) => {
    try {
      const updated = {
        ...provider,
        verified: !provider.verified,
        verificationTier: !provider.verified ? 'verified_partner' : 'none'
      };

      const res = await fetch(`/api/providers/${provider.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });

      if (res.ok) {
        setActionMessage(`Updated verification status for ${provider.name}`);
        loadAllData();
        setTimeout(() => setActionMessage(''), 4000);
      }
    } catch (e) {
      console.error('Error toggling verification', e);
    }
  };

  const handleUpdateReportStatus = async (reportId: string, newStatus: 'investigating' | 'resolved' | 'submitted') => {
    try {
      const res = await fetch('/api/community/reports', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: reportId, status: newStatus })
      });

      if (res.ok) {
        setActionMessage(`Updated incident report status to ${newStatus}`);
        loadAllData();
        setTimeout(() => setActionMessage(''), 4000);
      }
    } catch (e) {
      console.error('Error updating report status', e);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Top Header */}
      <div className="bg-neutral-900 text-white border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded">
                Super Admin Console
              </span>
              <span className="text-xs text-neutral-400">&bull; CivicTrust Management</span>
            </div>
            <h1 className="text-2xl font-bold">
              Civic Operations & Verification Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
            >
              Exit to Website
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto px-4 flex gap-2 border-t border-neutral-800 pt-2">
          <button
            onClick={() => setActiveTab('providers')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
              activeTab === 'providers'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Store className="w-4 h-4" />
            Service Providers ({providers.length})
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
              activeTab === 'health'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            Health Facilities ({healthResources.length})
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
              activeTab === 'reports'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Radio className="w-4 h-4" />
            Citizen Reports ({communityReports.length})
          </button>

          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
              activeTab === 'emergency'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            Emergency Contacts ({emergencyContacts.length})
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {actionMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2 shadow-sm animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Tab 1: Providers */}
        {activeTab === 'providers' && (
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-neutral-900">Local Service Providers</h2>
                <p className="text-xs text-neutral-500">
                  Verify legitimate tradespeople, inspect credentials, and manage marketplace listings.
                </p>
              </div>
              <Link
                href="/business/register"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New Provider
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-600">
                <thead className="bg-neutral-50 text-[11px] uppercase tracking-wider font-bold text-neutral-500 border-b border-neutral-200">
                  <tr>
                    <th className="px-5 py-3">Business / Provider</th>
                    <th className="px-5 py-3">Trade Category</th>
                    <th className="px-5 py-3">Location</th>
                    <th className="px-5 py-3">Verification Tier</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {providers.map((p) => (
                    <tr key={p.id} className="hover:bg-neutral-50/70 transition">
                      <td className="px-5 py-4 font-semibold text-neutral-900">
                        <div className="flex items-center gap-2">
                          <Link href={`/services/provider/${p.id}`} className="hover:text-emerald-700 underline">
                            {p.name}
                          </Link>
                          {p.is_demo && (
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.2 rounded">
                              Demo
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-normal">{p.phone}</div>
                      </td>
                      <td className="px-5 py-4 capitalize">{p.category}</td>
                      <td className="px-5 py-4">{p.city}, {p.state}</td>
                      <td className="px-5 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                          p.verificationTier === 'verified_partner'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : p.verificationTier === 'cac_verified'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                        }`}>
                          {(p.verificationTier || 'unverified').replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {p.verified ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-neutral-400">
                            Unverified
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleToggleVerification(p)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition border ${
                            p.verified
                              ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {p.verified ? 'Revoke Badge' : 'Grant Verified'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Health Resources */}
        {activeTab === 'health' && (
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-neutral-900">Healthcare Facilities Directory</h2>
                <p className="text-xs text-neutral-500">
                  Hospitals, licensed pharmacies, and 24/7 trauma emergency care providers.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-600">
                <thead className="bg-neutral-50 text-[11px] uppercase tracking-wider font-bold text-neutral-500 border-b border-neutral-200">
                  <tr>
                    <th className="px-5 py-3">Facility Name</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">District / City</th>
                    <th className="px-5 py-3">Contact</th>
                    <th className="px-5 py-3">Emergency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {healthResources.map((h) => (
                    <tr key={h.id} className="hover:bg-neutral-50/70 transition">
                      <td className="px-5 py-4 font-semibold text-neutral-900">
                        <Link href={`/health/${h.id}`} className="hover:text-emerald-700 underline">
                          {h.name}
                        </Link>
                      </td>
                      <td className="px-5 py-4 capitalize">{h.category}</td>
                      <td className="px-5 py-4">{h.address}, {h.city}</td>
                      <td className="px-5 py-4">{h.phone}</td>
                      <td className="px-5 py-4">
                        {h.emergencyServices ? (
                          <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                            24/7 Emergency
                          </span>
                        ) : (
                          <span className="text-neutral-400">Regular</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Citizen Reports */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-neutral-200">
              <h2 className="text-base font-bold text-neutral-900">Citizen Community Incident Reports</h2>
              <p className="text-xs text-neutral-500">
                Manage status workflows (Submitted &rarr; In Progress &rarr; Resolved).
              </p>
            </div>

            <div className="divide-y divide-neutral-200">
              {communityReports.map((r) => (
                <div key={r.id} className="p-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded">
                        {r.category}
                      </span>
                      <span className="text-xs text-neutral-400">&bull;</span>
                      <span className="text-xs text-neutral-600 font-medium">{r.location}, {r.city}</span>
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 mb-1">{r.title}</h3>
                    <p className="text-xs text-neutral-600 line-clamp-2">{r.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateReportStatus(r.id, 'submitted')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                        r.status === 'submitted'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200'
                      }`}
                    >
                      Submitted
                    </button>
                    <button
                      onClick={() => handleUpdateReportStatus(r.id, 'investigating')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                        r.status === 'investigating'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200'
                      }`}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleUpdateReportStatus(r.id, 'resolved')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                        r.status === 'resolved'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200'
                      }`}
                    >
                      Resolved
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Emergency Contacts */}
        {activeTab === 'emergency' && (
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-neutral-200">
              <h2 className="text-base font-bold text-neutral-900">Verified Emergency Dispatch Numbers</h2>
              <p className="text-xs text-neutral-500">
                Federal and state emergency hotlines rendered dynamically in the CivicTrust emergency bar.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-600">
                <thead className="bg-neutral-50 text-[11px] uppercase tracking-wider font-bold text-neutral-500 border-b border-neutral-200">
                  <tr>
                    <th className="px-5 py-3">Service Agency</th>
                    <th className="px-5 py-3">Dial Number</th>
                    <th className="px-5 py-3">Country / Region</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {emergencyContacts.map((c) => (
                    <tr key={c.id} className="hover:bg-neutral-50/70 transition">
                      <td className="px-5 py-4 font-semibold text-neutral-900">{c.name}</td>
                      <td className="px-5 py-4">
                        <a href={`tel:${c.number}`} className="font-bold text-emerald-800 underline">
                          {c.number}
                        </a>
                      </td>
                      <td className="px-5 py-4">{c.region || 'Nationwide'}, {c.country}</td>
                      <td className="px-5 py-4 capitalize">{c.category}</td>
                      <td className="px-5 py-4">
                        {c.is24_7 ? (
                          <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            24/7 Toll-Free
                          </span>
                        ) : (
                          <span className="text-neutral-400">Standard Office Hours</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
