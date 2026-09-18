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
  PhoneCall
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
    <div className="relative bg-white text-slate-900 pt-10 sm:pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 overflow-hidden">
      {/* Subtle warm decorative background accent */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-slate-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Description & Universal Search */}
          <div className="lg:col-span-7 space-y-6">
            {/* Safety Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Helpora Verified Network • Nigeria</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
              Find Trusted Help <br className="hidden sm:inline" />
              <span className="text-emerald-700">For Everyday Needs</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Connect with trusted local professionals for services, learning, health resources, and everyday help — all in one place.
            </p>

            {/* Universal Search Box */}
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-2xl p-3 sm:p-4 text-slate-900 shadow-elevated border border-slate-200/90 space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                {/* Search Query Input */}
                <div className="sm:col-span-12 md:col-span-5 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What do you need help with?"
                    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium placeholder:text-slate-400"
                  />
                </div>

                {/* Category Selector */}
                <div className="sm:col-span-6 md:col-span-3 relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 text-slate-800 font-medium cursor-pointer"
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
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <select
                    value={selectedCityId}
                    onChange={(e) => {
                      setSelectedCityId(e.target.value);
                      setUserCoords(null);
                      const c = CITIES.find(city => city.id === e.target.value);
                      if (c) setLocationLabel(c.name);
                    }}
                    className="w-full pl-9 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 text-slate-800 font-medium appearance-none cursor-pointer"
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
                    className="absolute right-2 p-1.5 text-slate-400 hover:text-emerald-700 transition"
                    title="Use my location"
                    aria-label="Use current location"
                  >
                    {isLocating ? (
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                    ) : (
                      <Navigation className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action row: Search Button, Scanner, and Examples */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Quick:</span>
                  {[
                    { label: '🏥 Closest Hospital', query: 'hospital', isHealth: true },
                    { label: '🩺 24/7 Clinic', query: 'clinic', isHealth: true },
                    { label: 'Plumber', query: 'Find a plumber', isHealth: false },
                    { label: 'Electrician', query: 'Electrician', isHealth: false },
                    { label: 'Mechanic', query: 'Mechanic', isHealth: false }
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        if (item.isHealth) {
                          router.push('/health?navigateClosest=true');
                        } else {
                          setSearchQuery(item.query);
                        }
                      }}
                      className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 transition font-medium"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleScanEnvironment}
                    className="py-2.5 px-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 shadow-xs shrink-0 active:scale-95"
                    title="Scan my location and route to the closest service or hospital"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Scan Closest</span>
                  </button>

                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-xs shrink-0"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: High-Quality Service Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Service Visual Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-slate-200/80 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
                  alt="Verified Nigerian Service Professional"
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                {/* On-card caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10.5px] font-bold uppercase tracking-wider">
                      Solar & Electrical
                    </span>
                    <span className="text-xs text-slate-200">Abuja, FCT</span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Verified Inverter & Power System Specialists
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Identity Verified • Trade Audited</span>
                  </div>
                </div>
              </div>

              {/* Floating Mini Card 1: Fast Response & Rating */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white rounded-2xl p-3 shadow-elevated border border-slate-200 flex items-center gap-3 animate-fadeIn">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-extrabold text-slate-900">4.9 / 5.0</span>
                    <span className="text-[10.5px] text-slate-500 font-medium">Rating</span>
                  </div>
                  <p className="text-[11px] text-slate-600">From verified customers</p>
                </div>
              </div>

              {/* Floating Mini Card 2: Local Service Categories */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white rounded-2xl p-3.5 shadow-elevated border border-slate-200 max-w-[210px] space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Providers</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Electricians, Plumbers, Tutors & Techs nearby.
                </p>
                <div className="flex items-center gap-1 text-[10.5px] text-emerald-700 font-semibold pt-0.5">
                  <span>Direct phone & maps</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
