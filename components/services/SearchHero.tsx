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
  SlidersHorizontal
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

  const iconMap: { [key: string]: any } = {
    Zap,
    Wrench,
    Car,
    Smartphone,
    Sparkles,
    GraduationCap,
    Hammer
  };

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
        setLocationLabel('My GPS Location');
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation error:', err.message);
        alert('Could not retrieve current location. Please select your city from the list.');
      }
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-brand-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-tr from-brand-600/20 via-emerald-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
        {/* Verification Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>CivicTrust Verified Civic Network</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          Find help you can <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-brand-300">trust</span>.
        </h1>

        {/* Supporting Copy */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
          Discover trusted local services, learn with AI, and find essential resources — all in one place.
        </p>

        {/* Primary Search Container */}
        <form
          onSubmit={handleSearch}
          className="max-w-3xl mx-auto bg-white rounded-3xl p-3 sm:p-4 text-slate-900 shadow-2xl border border-white/20 mt-8 space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
            {/* Search Input Field */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you need help with? (e.g. Inverter, Plumber, Math tutor)"
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/70"
              />
            </div>

            {/* City / Location Selector */}
            <div className="sm:col-span-4 relative flex items-center">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <select
                value={selectedCityId}
                onChange={(e) => {
                  setSelectedCityId(e.target.value);
                  setUserCoords(null);
                  const c = CITIES.find(city => city.id === e.target.value);
                  if (c) setLocationLabel(c.name);
                }}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/70 text-slate-800 font-medium appearance-none cursor-pointer"
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
                className="absolute right-2 text-slate-400 hover:text-brand-600 p-1"
                title="Use current GPS location"
              >
                {isLocating ? <Loader2 className="w-4 h-4 animate-spin text-brand-600" /> : <Navigation className="w-4 h-4" />}
              </button>
            </div>

            {/* Primary CTA Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Find Help</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Quick Example Suggestions */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1 text-[11px] text-slate-500">
            <span className="font-semibold text-slate-600">Popular:</span>
            {[
              'Solar Inverter',
              'Borehole Pump',
              'Car AC Diagnostic',
              'Screen Repair',
              'Deep Cleaning',
              'JAMB Math Tutor',
              'Emergency Care'
            ].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </form>

        {/* Secondary Navigation Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/services/search"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/15 transition"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span>Explore All Local Services</span>
          </Link>
          <Link
            href="/study/tutor"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold border border-amber-400/30 transition"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Try AI Study Tutor</span>
          </Link>
          <Link
            href="/health"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold border border-rose-400/30 transition"
          >
            <span>Health & Emergency Directory</span>
          </Link>
        </div>

        {/* Service Category Cards Carousel/Grid */}
        <div className="pt-8">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">
            Browse Popular Service Categories
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((cat) => {
              const Icon = iconMap[cat.iconName] || Wrench;
              return (
                <Link
                  key={cat.id}
                  href={`/services/search?category=${cat.id}&cityId=${selectedCityId}`}
                  className="p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 hover:border-emerald-400/40 text-center flex flex-col items-center justify-center gap-2 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-white group-hover:text-emerald-300 transition">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
