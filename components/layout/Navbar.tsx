'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  ShieldCheck, 
  MapPin, 
  GraduationCap, 
  HeartPulse, 
  Wrench, 
  Users,
  Menu, 
  X, 
  User as UserIcon, 
  ChevronDown, 
  PlusCircle, 
  ShieldAlert, 
  LogOut,
  Bookmark,
  Search,
  Building2,
  Home
} from 'lucide-react';
import { CITIES, DEFAULT_CITY } from '@/lib/data/cities';

export default function Navbar() {
  const pathname = usePathname();
  const { user, openAuthModal, logout, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCityDropdownOpen(false);
  }, [pathname]);

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      active: pathname === '/'
    },
    {
      name: 'Local Services',
      href: '/services',
      icon: Wrench,
      active: pathname.startsWith('/services')
    },
    {
      name: 'AI Study',
      href: '/study',
      icon: GraduationCap,
      active: pathname.startsWith('/study')
    },
    {
      name: 'Health & Help',
      href: '/health',
      icon: HeartPulse,
      active: pathname.startsWith('/health') || pathname.startsWith('/help-directory')
    },
    {
      name: 'Community',
      href: '/community',
      icon: Users,
      active: pathname.startsWith('/community')
    }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Left: Brand Logo & Region Selector */}
            <div className="flex items-center gap-4 lg:gap-6">
              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:bg-brand-600 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">
                    Civic<span className="text-brand-600">Trust</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase mt-0.5">
                    Verified Civic Network
                  </span>
                </div>
              </Link>

              {/* City / Metro Selector */}
              <div className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/90 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
                  aria-haspopup="listbox"
                  aria-expanded={cityDropdownOpen}
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-600" />
                  <span className="font-semibold">{selectedCity.name}</span>
                  <span className="text-slate-400 text-[11px]">({selectedCity.country})</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {cityDropdownOpen && (
                  <div className="absolute left-0 mt-1.5 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs animate-fadeIn">
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Select Region
                    </div>
                    {CITIES.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => {
                          setSelectedCity(city);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition ${
                          selectedCity.id === city.id ? 'font-bold text-brand-600 bg-brand-50/60' : 'text-slate-700'
                        }`}
                      >
                        <div>
                          <p className="font-semibold">{city.name}</p>
                          <p className="text-[10px] text-slate-400">{city.state}</p>
                        </div>
                        {selectedCity.id === city.id && <span className="w-2 h-2 rounded-full bg-brand-600"></span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                      item.active
                        ? 'bg-slate-100 text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${item.active ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Tools: Search, List Business, Saved, Admin, Auth */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Quick Search trigger */}
              <Link
                href="/services/search"
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                title="Search services"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </Link>

              {/* Saved Items */}
              <Link
                href="/saved"
                className={`p-2 rounded-xl transition ${
                  pathname === '/saved'
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
                title="View saved items"
                aria-label="Saved items"
              >
                <Bookmark className="w-4 h-4" />
              </Link>

              {/* List Your Business */}
              <Link
                href="/business/register"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
              >
                <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>List Business</span>
              </Link>

              {/* Admin Link */}
              <Link
                href="/admin"
                className={`flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold rounded-xl transition ${
                  pathname.startsWith('/admin')
                    ? 'bg-purple-100 text-purple-800 border border-purple-300'
                    : 'text-purple-700 hover:bg-purple-50'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
                <span>Admin</span>
              </Link>

              {/* Auth Profile / Login */}
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 transition"
                    aria-expanded={userDropdownOpen}
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                      alt={user.name}
                      className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-300"
                    />
                    <div className="text-left hidden xl:block">
                      <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
                      <p className="text-[10px] text-slate-500 capitalize">{user.role}</p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs animate-fadeIn">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-bold text-slate-800 text-sm">{user.name}</p>
                        <p className="text-slate-500 text-xs truncate">{user.email}</p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              user.role === 'admin'
                                ? 'bg-purple-100 text-purple-800'
                                : user.role === 'provider'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {user.role} role
                          </span>
                        </div>
                      </div>

                      {/* Role switcher for easy paired testing */}
                      <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/80">
                        <p className="text-[11px] font-medium text-slate-500 mb-1.5">Test as role:</p>
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            onClick={() => { switchRole('user'); setUserDropdownOpen(false); }}
                            className={`px-1.5 py-1 rounded text-[11px] font-medium border ${user.role === 'user' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}
                          >
                            User
                          </button>
                          <button
                            onClick={() => { switchRole('provider'); setUserDropdownOpen(false); }}
                            className={`px-1.5 py-1 rounded text-[11px] font-medium border ${user.role === 'provider' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200'}`}
                          >
                            Provider
                          </button>
                          <button
                            onClick={() => { switchRole('admin'); setUserDropdownOpen(false); }}
                            className={`px-1.5 py-1 rounded text-[11px] font-medium border ${user.role === 'admin' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-700 border-slate-200'}`}
                          >
                            Admin
                          </button>
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                        >
                          <UserIcon className="w-4 h-4 text-slate-500" />
                          <span>My Account Profile</span>
                        </Link>
                        <Link
                          href="/saved"
                          onClick={() => setUserDropdownOpen(false)}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                        >
                          <Bookmark className="w-4 h-4 text-brand-600" />
                          <span>Saved Items</span>
                        </Link>
                        {user.role === 'provider' && (
                          <Link
                            href="/dashboard/business"
                            onClick={() => setUserDropdownOpen(false)}
                            className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                          >
                            <Building2 className="w-4 h-4 text-emerald-600" />
                            <span>Business Dashboard</span>
                          </Link>
                        )}
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                        >
                          <ShieldAlert className="w-4 h-4 text-purple-600" />
                          <span>Admin Portal</span>
                        </Link>
                        <button
                          onClick={() => { logout(); setUserDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition shadow-sm"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile menu hamburger button */}
            <div className="flex lg:hidden items-center gap-1">
              <Link
                href="/services/search"
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-fadeIn max-h-[85vh] overflow-y-auto">
            {/* Region selection in mobile drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs text-slate-500 font-semibold">Active Region:</span>
              <select
                value={selectedCity.id}
                onChange={(e) => {
                  const c = CITIES.find(city => city.id === e.target.value);
                  if (c) setSelectedCity(c);
                }}
                className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1"
              >
                {CITIES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}, {c.state}
                  </option>
                ))}
              </select>
            </div>

            {/* Main Nav Links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl text-sm font-semibold ${
                      item.active
                        ? 'bg-slate-100 text-slate-900 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${item.active ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <Link
                href="/saved"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                <Bookmark className="w-5 h-5 text-brand-600" />
                <span>Saved Bookmarks</span>
              </Link>
            </nav>

            {/* Action buttons in mobile drawer */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <Link
                href="/business/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                <PlusCircle className="w-4 h-4" />
                <span>List Your Business</span>
              </Link>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-purple-50 text-purple-700 border border-purple-200"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Admin Portal</span>
              </Link>

              {user ? (
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">{user.name}</p>
                        <p className="text-[10px] text-slate-500 capitalize">{user.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="text-xs text-rose-600 font-bold hover:underline"
                    >
                      Sign Out
                    </button>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800"
                  >
                    View Account Profile
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); openAuthModal('signin'); }}
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-bold bg-slate-900 text-white"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Quick-Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-2 flex items-center justify-around shadow-lg">
        <Link
          href="/services"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10.5px] font-semibold transition ${
            pathname.startsWith('/services') ? 'text-brand-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Services</span>
        </Link>
        <Link
          href="/study"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10.5px] font-semibold transition ${
            pathname.startsWith('/study') ? 'text-brand-600 font-bold' : 'text-slate-500'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Study</span>
        </Link>
        <Link
          href="/health"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10.5px] font-semibold transition ${
            pathname.startsWith('/health') ? 'text-brand-600 font-bold' : 'text-slate-500'
          }`}
        >
          <HeartPulse className="w-4 h-4" />
          <span>Health</span>
        </Link>
        <Link
          href="/community"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10.5px] font-semibold transition ${
            pathname.startsWith('/community') ? 'text-brand-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Community</span>
        </Link>
        <Link
          href={user ? '/profile' : '#'}
          onClick={(e) => {
            if (!user) {
              e.preventDefault();
              openAuthModal('signin');
            }
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10.5px] font-semibold transition ${
            pathname.startsWith('/profile') ? 'text-brand-600 font-bold' : 'text-slate-500'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span>{user ? 'Account' : 'Sign In'}</span>
        </Link>
      </div>
    </>
  );
}
