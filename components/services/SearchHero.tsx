'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Zap, 
  Wrench, 
  Car, 
  Smartphone, 
  Sparkles, 
  GraduationCap,
  Hammer, 
  MapPin, 
  Navigation, 
  Search, 
  ShieldCheck, 
  ArrowRight,
  Loader2,
  Star,
  CheckCircle2,
  PhoneCall,
  Clock,
  Compass,
  Check
} from 'lucide-react';
import { CITIES, DEFAULT_CITY } from '@/lib/data/cities';
import { ServiceCategory } from '@/lib/types';
import Link from 'next/link';

export default function SearchHero() {
  const router = useRouter();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCityId, setSelectedCityId] = useState<string>(DEFAULT_CITY.id);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationLabel, setLocationLabel] = useState<string>(DEFAULT_CITY.name);

  // Fetch database categories
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(json => {
        if (json.success && Array.isArray(json.data)) {
          setCategories(json.data);
        }
      })
      .catch(console.error);
  }, []);

  const handleUseGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationLabel('Current Location');
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation error:', err.message);
        alert('Could not retrieve current location. Please select your city from the dropdown.');
      }
    );
  };

  const isHealthQuery = (query: string) => {
    const q = query.toLowerCase();
    return (
      q.includes('hospital') || 
      q.includes('clinic') || 
      q.includes('pharmacy') || 
      q.includes('doctor') || 
      q.includes('emergency') || 
      q.includes('chemist') || 
      q.includes('medical')
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (isHealthQuery(searchQuery)) {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set('search', searchQuery.trim());
      params.set('navigateClosest', 'true');
      router.push(`/health?${params.toString()}`);
      return;
    }

    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }
    if (selectedCityId) {
      params.set('cityId', selectedCityId);
    }
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }
    if (userCoords) {
      params.set('lat', userCoords.lat.toString());
      params.set('lng', userCoords.lng.toString());
    }

    router.push(`/services/search?${params.toString()}`);
  };

  const handleScanEnvironment = () => {
    if (isHealthQuery(searchQuery)) {
      router.push('/health?navigateClosest=true');
    } else {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
      if (searchQuery.trim()) params.set('search', searchQuery.trim());
      params.set('navigateClosest', 'true');
      router.push(`/services/search?${params.toString()}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-white via-slate-50/50 to-white text-slate-900 pt-10 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 overflow-hidden">
      {/* Decorative ambient lighting elements */}
      <div className="absolute top-0 right-1/4 -mt-16 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headline, Description & Universal Search */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Safety Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold shadow-subtle badge-shimmer">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Helpora Verified Network • Built for Nigeria</span>
            </div>

            {/* Main Heading with High-End Editorial Typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-950 leading-[1.12]">
              Find Trusted Help, <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700">
                Right Near You
              </span>
            </h1>

            {/* Supporting Subhead */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl leading-relaxed">
              Connect directly with vetted local electricians, plumbers, phone & PC techs, home tutors, and verified emergency healthcare — all in one unified Nigerian marketplace.
            </p>

            {/* Universal Search Box - Luxury Card with Segmented Controls */}
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-3xl p-3.5 sm:p-4 text-slate-900 shadow-elevated-lg border border-slate-200/90 space-y-3.5 relative"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                {/* Search Query Input */}
                <div className="sm:col-span-12 md:col-span-5 relative">
                  <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What do you need help with?"
                    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/70 font-medium placeholder:text-slate-400 transition"
                  />
                </div>

                {/* Category Selector */}
                <div className="sm:col-span-6 md:col-span-3 relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/70 text-slate-800 font-semibold cursor-pointer transition"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Selector with 'Use my location' button */}
                <div className="sm:col-span-6 md:col-span-4 relative flex items-center">
                  <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5" />
                  <select
                    value={selectedCityId}
                    onChange={(e) => {
                      setSelectedCityId(e.target.value);
                      setUserCoords(null);
                      const c = CITIES.find(city => city.id === e.target.value);
                      if (c) setLocationLabel(c.name);
                    }}
                    className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/70 text-slate-800 font-semibold appearance-none cursor-pointer transition"
                  >
                    {CITIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}, {c.state}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleUseGeolocation}
                    className="absolute right-2.5 p-1 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition"
                    title="Use my current GPS location"
                    aria-label="Use current location"
                  >
                    {isLocating ? (
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                    ) : (
                      <Navigation className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action row: Search Button, Scanner, and Examples */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="font-bold text-slate-700">Quick Help:</span>
                  {[
                    { label: '🏥 Closest Hospital', isHealth: true },
                    { label: '🩺 24/7 Clinic', isHealth: true },
                    { label: '⚡ Electrician', query: 'electrician', isHealth: false },
                    { label: '🔧 Plumber', query: 'plumber', isHealth: false },
                    { label: '💻 Laptop Repair', query: 'laptop', isHealth: false }
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        if (item.isHealth) {
                          router.push('/health?navigateClosest=true');
                        } else {
                          setSearchQuery(item.query || '');
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100/80 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 transition font-medium border border-transparent hover:border-emerald-200"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleScanEnvironment}
                    className="py-2.5 px-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/90 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 shadow-subtle shrink-0 active:scale-95"
                    title="Scan current environment and route to closest help"
                  >
                    <Compass className="w-4 h-4 text-emerald-600" />
                    <span>Scan Closest</span>
                  </button>

                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-sm shrink-0 active:scale-95"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>

            {/* Micro stats counter */}
            <div className="flex flex-wrap items-center gap-6 pt-1 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Verified Nigerian Trades</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Zero Broker Fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Direct Phone & GPS Routing</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Quality Service Showcase Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Service Visual Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-elevated-lg border border-slate-200/80 bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
                  alt="Verified Nigerian Service Professional"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                
                {/* On-card caption */}
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10.5px] font-bold uppercase tracking-wider shadow-xs">
                      Solar & Power Systems
                    </span>
                    <span className="text-xs text-slate-200 font-medium">Abuja • Lagos • Nationwide</span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    Vetted Inverter Technicians & Certified Electricians
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium pt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>CAC & ID Audited • Community Recommended</span>
                  </div>
                </div>
              </div>

              {/* Floating Mini Card 1: Fast Response & Rating */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-elevated border border-slate-200/90 flex items-center gap-3 animate-float">
                <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                  <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-extrabold text-slate-900">4.9 / 5.0</span>
                    <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Verified</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">From 250+ Nigerian clients</p>
                </div>
              </div>

              {/* Floating Mini Card 2: Live GPS Navigation Indicator */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-elevated border border-slate-200/90 max-w-[220px] space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>Turn-by-Turn Navigator</span>
                </div>
                <p className="text-[11.5px] text-slate-600 leading-snug">
                  Real-time driving ETA & step-by-step road guidance on map.
                </p>
                <div className="flex items-center gap-1 text-[10.5px] text-emerald-700 font-bold pt-0.5">
                  <span>Direct contact with pros</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
