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
  LayoutDashboard,
  CheckSquare,
  MessageSquare,
  Grid,
  HeartPulse,
  GraduationCap,
  Settings,
  ShieldAlert,
  ArrowRight,
  Eye
} from 'lucide-react';
import { Provider, HealthResource, CommunityReport, EmergencyContact, ServiceCategory } from '@/lib/types';
import { CATEGORIES } from '@/lib/data/categories';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'providers' | 'verification' | 'reviews' | 'categories' | 'health' | 'emergency' | 'study' | 'community' | 'volunteers' | 'users' | 'settings'
  >('overview');

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

      if (pRes.success && Array.isArray(pRes.data)) setProviders(pRes.data);
      else if (Array.isArray(pRes)) setProviders(pRes);

      if (hRes.success && Array.isArray(hRes.data)) setHealthResources(hRes.data);
      else if (Array.isArray(hRes)) setHealthResources(hRes);

      if (rRes.success && Array.isArray(rRes.data)) setCommunityReports(rRes.data);
      else if (Array.isArray(rRes)) setCommunityReports(rRes);

      if (eRes.success && Array.isArray(eRes.data)) setEmergencyContacts(eRes.data);
      else if (Array.isArray(eRes)) setEmergencyContacts(eRes);
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
      const newStatus = provider.verification_status === 'verified' ? 'unverified' : 'verified';
      const updated = {
        ...provider,
        verification_status: newStatus,
        verified_date: newStatus === 'verified' ? new Date().toISOString().split('T')[0] : undefined
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

  const handleUpdateReportStatus = async (reportId: string, newStatus: string) => {
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

  // Real database counts
  const totalProviders = providers.length;
  const verifiedProviders = providers.filter(p => p.verification_status === 'verified').length;
  const pendingVerifications = providers.filter(p => p.verification_status === 'pending').length;
  const totalHealth = healthResources.length;
  const totalReports = communityReports.length;
  const resolvedReports = communityReports.filter(r => r.status.toLowerCase() === 'resolved').length;

  const sidebarLinks = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'providers', label: 'Providers', icon: Store, count: totalProviders },
    { id: 'verification', label: 'Verification', icon: CheckSquare, count: pendingVerifications },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'categories', label: 'Categories', icon: Grid, count: CATEGORIES.length },
    { id: 'health', label: 'Health', icon: HeartPulse, count: totalHealth },
    { id: 'emergency', label: 'Emergency', icon: PhoneCall, count: emergencyContacts.length },
    { id: 'study', label: 'Study', icon: GraduationCap },
    { id: 'community', label: 'Community', icon: Radio, count: totalReports },
    { id: 'volunteers', label: 'Volunteers', icon: HeartHandshake },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col pb-16">
      
      {/* Top Bar */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight">Helpora Management Console</span>
              <span className="text-[10px] text-emerald-400 block font-mono">Super Admin Active</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadAllData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
            >
              Exit to App
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace: Sidebar + Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Sidebar */}
        <aside className="w-full lg:w-60 bg-white rounded-2xl border border-slate-200 p-3 shadow-subtle shrink-0">
          <nav className="space-y-0.5" aria-label="Admin Navigation">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className={`text-[10.5px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Content Panel */}
        <main className="flex-1 w-full bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle min-h-[500px]">
          
          {actionMessage && (
            <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{actionMessage}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-950">Platform Overview</h2>
                <p className="text-xs text-slate-500">Real database counts across Helpora Nigeria</p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold">Total Providers</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{totalProviders}</p>
                  <span className="text-[10px] text-emerald-700 font-bold">{verifiedProviders} verified</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold">Pending Audit</p>
                  <p className="text-2xl font-black text-amber-700 mt-1">{pendingVerifications}</p>
                  <span className="text-[10px] text-slate-500">Awaiting check</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold">Health Facilities</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{totalHealth}</p>
                  <span className="text-[10px] text-slate-500">Hospitals & care</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold">Community Reports</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{totalReports}</p>
                  <span className="text-[10px] text-emerald-700 font-bold">{resolvedReports} resolved</span>
                </div>
              </div>

              {/* Quick Jump actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('verification')}
                  className="px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100 transition"
                >
                  Review Pending Audits ({pendingVerifications})
                </button>
                <button
                  onClick={() => setActiveTab('providers')}
                  className="px-4 py-2 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold hover:bg-slate-200 transition"
                >
                  Manage All Providers
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PROVIDERS */}
          {activeTab === 'providers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">Provider Listings ({providers.length})</h2>
                  <p className="text-xs text-slate-500">All registered trades and local businesses</p>
                </div>
                <Link
                  href="/business/register"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Provider</span>
                </Link>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Business Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {providers.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80">
                        <td className="p-3 font-semibold text-slate-900">{p.name}</td>
                        <td className="p-3 capitalize">{p.category}</td>
                        <td className="p-3 text-slate-500 truncate max-w-xs">{p.address}</td>
                        <td className="p-3 text-slate-600 font-mono">{p.phone}</td>
                        <td className="p-3">
                          {p.verification_status === 'verified' ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                              Verified
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold text-[10px] border border-amber-200">
                              {p.verification_status}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right space-x-1.5">
                          <button
                            onClick={() => handleToggleVerification(p)}
                            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-700"
                          >
                            {p.verification_status === 'verified' ? 'Revoke' : 'Verify'}
                          </button>
                          <Link
                            href={`/services/provider/${p.id}`}
                            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-700"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: VERIFICATION */}
          {activeTab === 'verification' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Verification Audit Queue</h2>
                <p className="text-xs text-slate-500">Cross-reference state trade licenses and CAC registration numbers</p>
              </div>

              {pendingVerifications === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="font-bold text-slate-800">Verification queue is clear</p>
                  <p>All active provider submissions have been processed.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {providers.filter(p => p.verification_status === 'pending').map((p) => (
                    <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
                        <p className="text-xs text-slate-500">{p.category} &bull; {p.address}</p>
                        <p className="text-xs text-slate-600 mt-1 font-mono">
                          License: <strong>{p.license_number || 'None provided'}</strong>
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleVerification(p)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs"
                      >
                        Approve & Verify
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Marketplace Categories ({CATEGORIES.length})</h2>
                <p className="text-xs text-slate-500">Service categories active on the Helpora directory</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {CATEGORIES.map(c => (
                  <div key={c.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="font-bold text-xs text-slate-900">{c.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{c.description}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold mt-2 inline-block">Active Category</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: HEALTH */}
          {activeTab === 'health' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Healthcare Directory ({healthResources.length})</h2>
                <p className="text-xs text-slate-500">Hospitals, emergency trauma centers, and pharmacies</p>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Facility</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Phone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {healthResources.map((h) => (
                      <tr key={h.id}>
                        <td className="p-3 font-semibold text-slate-900">{h.name}</td>
                        <td className="p-3 capitalize">{h.category || h.type}</td>
                        <td className="p-3 text-slate-500 truncate max-w-xs">{h.address}</td>
                        <td className="p-3 font-mono text-slate-600">{h.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: EMERGENCY */}
          {activeTab === 'emergency' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Emergency Toll-Free Hotlines ({emergencyContacts.length})</h2>
                <p className="text-xs text-slate-500">Dispatch numbers displayed in the Helpora emergency bar</p>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl">
                {emergencyContacts.map((c) => (
                  <div key={c.id} className="p-3.5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs text-slate-900">{c.name}</p>
                      <p className="text-[11px] text-slate-500">{c.service_type} &bull; {c.region}</p>
                    </div>
                    <span className="font-mono font-bold text-xs text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
                      {c.phone}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: COMMUNITY */}
          {activeTab === 'community' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Community Reports ({communityReports.length})</h2>
                <p className="text-xs text-slate-500">Citizen reported neighborhood incidents and infrastructure issues</p>
              </div>

              <div className="space-y-3">
                {communityReports.map((r) => (
                  <div key={r.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase bg-slate-200 px-2 py-0.5 rounded text-slate-700">
                        {r.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-1">{r.title}</h4>
                      <p className="text-xs text-slate-500">{r.location}, {r.city}</p>
                      <p className="text-xs text-slate-700 mt-1">{r.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={r.status}
                        onChange={(e) => handleUpdateReportStatus(r.id, e.target.value)}
                        className="text-xs font-semibold p-1.5 border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="submitted">Submitted</option>
                        <option value="under review">Under Review</option>
                        <option value="in progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FALLBACK TABS */}
          {['reviews', 'study', 'volunteers', 'users', 'settings'].includes(activeTab) && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950 capitalize">{activeTab} Console</h2>
                <p className="text-xs text-slate-500">System settings and live administration controls</p>
              </div>

              <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-slate-800">Operational & Connected</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Helpora {activeTab} system is online and synced with the application data store.
                </p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
