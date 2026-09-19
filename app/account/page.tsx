'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/lib/types';
import { 
  User as UserIcon, 
  Mail, 
  ShieldCheck, 
  Bookmark, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  LogOut,
  Wrench,
  HeartHandshake,
  ShieldAlert,
  Star,
  FileText,
  Building2,
  PhoneCall,
  Loader2,
  ExternalLink,
  MapPin,
  Sparkles
} from 'lucide-react';

function AccountDashboard() {
  const searchParams = useSearchParams();
  const welcome = searchParams.get('welcome');
  const message = searchParams.get('message');

  const { user, logout, switchRole, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'saved' | 'reviews' | 'reports'>('profile');

  // Local state for profile edits
  const [name, setName] = useState(user?.name || '');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  // Demo user data for saved items & activities
  const savedItems = [
    {
      id: 'p-1',
      title: 'Kolawole Power & Solar Works',
      category: 'Electrician & Solar',
      city: 'Abuja (FCT)',
      phone: '+234 802 334 5566',
      href: '/services/provider/prov-1'
    },
    {
      id: 'h-1',
      title: 'National Hospital Abuja',
      category: 'Emergency Hospital & Trauma Center',
      city: 'Central Business District, Abuja',
      phone: '0803 123 4567',
      href: '/health'
    }
  ];

  const userReviews = [
    {
      id: 'rev-1',
      provider: 'Kolawole Power & Solar Works',
      rating: 5,
      date: '12 Sep 2026',
      comment: 'Arrived within 30 minutes in Garki when our inverter blew a fuse. Very transparent pricing.',
      status: 'Approved'
    }
  ];

  const userReports = [
    {
      id: 'rep-1',
      title: 'Exposed transformer cable on Ahmadu Bello Way',
      category: 'Public Safety / Electrical',
      date: '04 Sep 2026',
      status: 'Under Investigation',
      statusColor: 'bg-amber-100 text-amber-800'
    }
  ];

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-elevated">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
            <UserIcon className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Sign In Required</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Please sign in to your Helpora account to access your profile, bookmarked artisans, reviews, and community reports.
          </p>
          <div className="pt-2">
            <Link
              href="/login?returnTo=/account"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition shadow-xs"
            >
              <span>Sign In to Your Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Top Banner */}
      <div className="bg-white border-b border-slate-200/90 shadow-subtle">
        <div className="w-full max-w-[96%] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          
          {/* Welcome / Alert Messages */}
          {welcome && (
            <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">Welcome to Helpora Nigeria!</p>
                <p className="text-xs text-emerald-700">Your account is ready. Explore vetted artisans or configure your profile below.</p>
              </div>
            </div>
          )}

          {message && (
            <div className="mb-5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar || `https://avatar.vercel.sh/${encodeURIComponent(user.email)}`}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-200/80 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {user.name}
                  </h1>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800 border border-purple-200'
                        : user.role === 'provider'
                        ? 'bg-sky-100 text-sky-800 border border-sky-200'
                        : user.role === 'volunteer_org'
                        ? 'bg-teal-100 text-teal-800 border border-teal-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{user.role.replace('_', ' ')}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{user.email}</p>
              </div>
            </div>

            {/* Top Quick Actions */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {user.role === 'provider' && (
                <Link
                  href="/dashboard/business"
                  className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Business Dashboard</span>
                </Link>
              )}

              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>
              )}

              <button
                type="button"
                onClick={logout}
                className="px-3.5 py-2 rounded-xl border border-rose-200 hover:border-rose-300 bg-rose-50/50 hover:bg-rose-50 text-rose-700 text-xs font-bold transition flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-slate-200 overflow-x-auto text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Profile Settings</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'saved'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Items ({savedItems.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>My Reviews ({userReviews.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reports')}
              className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'reports'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Community Reports ({userReports.length})</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[96%] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tab 1: Profile Settings */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-subtle space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Personal Information</h3>
                <p className="text-xs text-slate-500">Update your public name and view account specifications.</p>
              </div>

              {isSaved && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/60 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-medium cursor-not-allowed"
                  />
                  <p className="text-[10.5px] text-slate-500">Email address is tied to your login identity.</p>
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>

            {/* Role Switcher & Dev Tester Tool */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-subtle space-y-5 h-fit">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Account Mode & Role</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Test and explore different Nigerian platform perspectives:
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(['user', 'provider', 'volunteer_org', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => switchRole(r)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold capitalize transition ${
                      user.role === r
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {r.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {user.role === 'user' && (
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-2">
                  <p className="font-bold text-emerald-900">Are you a skilled Nigerian artisan?</p>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    Electricians, plumbers, phone & laptop technicians, and tutors can list their business 100% free.
                  </p>
                  <Link
                    href="/business/register"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                  >
                    <span>Register your trade →</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Saved Items */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Saved Places & Services</h3>
                <p className="text-xs text-slate-500">Quickly reach verified artisans and healthcare centers you bookmarked.</p>
              </div>
              <Link
                href="/services"
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                Browse directory →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedItems.map((item) => (
                <div key={item.id} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-subtle flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.city}</span>
                    </p>
                    <p className="text-xs text-slate-700 font-semibold pt-1 flex items-center gap-1">
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.phone}</span>
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition"
                    title="View details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: My Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">My Submitted Reviews</h3>
              <p className="text-xs text-slate-500">Feedback you have provided to local Nigerian professionals.</p>
            </div>

            <div className="space-y-3">
              {userReviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-subtle space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{rev.provider}</h4>
                      <p className="text-[11px] text-slate-400">{rev.date}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">&ldquo;{rev.comment}&rdquo;</p>
                  <div className="pt-1">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Status: {rev.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: My Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Community Issue Reports</h3>
                <p className="text-xs text-slate-500">Civic issues and hazard reports you submitted for resolution.</p>
              </div>
              <Link
                href="/community/report"
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                + Submit new report
              </Link>
            </div>

            <div className="space-y-3">
              {userReports.map((rep) => (
                <div key={rep.id} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-subtle flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10.5px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {rep.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{rep.title}</h4>
                    <p className="text-[11px] text-slate-400">Filed on {rep.date}</p>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${rep.statusColor}`}>
                    {rep.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[75vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    }>
      <AccountDashboard />
    </Suspense>
  );
}
