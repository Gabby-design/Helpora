'use client';

import React, { useState, useEffect } from 'react';
import ProviderCard from '@/components/services/ProviderCard';
import { Provider, ServiceCategory } from '@/lib/types';
import { 
  ShieldCheck, 
  PlusCircle, 
  ArrowRight, 
  Wrench, 
  Loader2, 
  Search, 
  MapPin,
  SlidersHorizontal,
  Zap,
  Car,
  Smartphone,
  Sparkles,
  GraduationCap,
  Scissors,
  Truck,
  Utensils,
  Camera,
  Activity,
  Hammer,
  Navigation
} from 'lucide-react';
import Link from 'next/link';
import { CITIES, DEFAULT_CITY } from '@/lib/data/cities';

export default function ServicesPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/providers').then(r => r.json()),
      fetch('/api/categories').then(r => r.json())
    ])
      .then(([provData, catData]) => {
        if (provData.success && Array.isArray(provData.data)) {
          setProviders(provData.data);
        }
        if (catData.success && Array.isArray(catData.data)) {
          setCategories(catData.data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const iconMap: { [key: string]: any } = {
    Zap,
    Wrench,
    Car,
    Smartphone,
    Sparkles,
    GraduationCap,
    Scissors,
    Truck,
    Utensils,
    Camera,
    Activity,
    Hammer
  };

  const categoryImages: { [key: string]: string } = {
    cleaner: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    tutor: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
    'phone-laptop': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
    electrician: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    plumber: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80',
    mechanic: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    beauty: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    moving: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    catering: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
    photography: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    fitness: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    other: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
  };

  return (
    <div className="space-y-12 pb-24 bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <section className="relative bg-gradient-to-b from-white via-emerald-50/30 to-slate-50 border-b border-slate-200/80 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-bold border border-emerald-300 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Helpora Verified Directory &bull; Nigeria</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Find Trusted Help For <span className="text-emerald-700">Everyday Needs</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Connect with vetted electricians, solar installers, plumbers, auto mechanics, technicians, cleaners, and tutors across Abuja, Lagos, Port Harcourt, and Ibadan.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/business/register"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold bg-white text-slate-800 border border-slate-200 hover:border-emerald-300 hover:bg-slate-50 transition shadow-subtle"
              >
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <span>List Your Business</span>
              </Link>

              <Link
                href="/services/search"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-glow-brand"
              >
                <Navigation className="w-4 h-4" />
                <span>Live Map & Routing</span>
              </Link>
            </div>
          </div>

          {/* Luxury Segmented Search Bar */}
          <div className="mt-8 p-3 rounded-3xl bg-white border border-slate-200/90 shadow-elevated grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-7 relative flex items-center">
              <Search className="w-4 h-4 text-emerald-600 absolute left-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service do you need? (e.g. Solar inverter, AC repair, plumber, math tutor)"
                className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-50 border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium placeholder:text-slate-400"
              />
            </div>

            <div className="sm:col-span-3 flex items-center">
              <div className="relative w-full">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <select
                  value={selectedCity.id}
                  onChange={(e) => {
                    const c = CITIES.find(city => city.id === e.target.value);
                    if (c) setSelectedCity(c);
                  }}
                  className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-50 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer border-none"
                >
                  {CITIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}, {c.state}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2 flex items-center">
              <Link
                href={`/services/search?search=${encodeURIComponent(searchQuery)}&cityId=${selectedCity.id}`}
                className="w-full py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-2xl transition shadow-subtle flex items-center justify-center gap-1.5"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              All Service Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select a trade to view verified providers and real-time road distances
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = iconMap[cat.iconName] || Wrench;
            const image = categoryImages[cat.id] || categoryImages.other;
            const count = providers.filter(p => p.category === cat.id).length;

            return (
              <Link
                key={cat.id}
                href={`/services/search?category=${cat.id}&cityId=${selectedCity.id}`}
                className="group relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white hover:border-emerald-500/50 hover:shadow-card-hover transition-all duration-300 flex flex-col"
              >
                <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                  <img
                    src={image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-2xl bg-white/95 backdrop-blur-md flex items-center justify-center text-emerald-700 shadow-subtle group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>

                  {count > 0 && (
                    <span className="absolute bottom-2.5 right-3 text-[10px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {count} {count === 1 ? 'specialist' : 'specialists'}
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>Browse providers</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Providers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Featured Providers in {selectedCity.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Top-rated local professionals with verified credentials & direct contact
            </p>
          </div>

          <Link
            href={`/services/search?cityId=${selectedCity.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition group"
          >
            <span>Explore Map Directory</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border border-slate-200 p-6 space-y-4 shadow-subtle">
                <div className="h-36 bg-slate-100 rounded-2xl" />
                <div className="h-4 bg-slate-100 rounded-full w-3/4" />
                <div className="h-3 bg-slate-100 rounded-full w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.slice(0, 6).map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
