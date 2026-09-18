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
  Hammer
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
    mechanic: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    beauty: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    moving: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    catering: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
    photography: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    fitness: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    other: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200/90 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Helpora Verified Directory</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Find Trusted Help For Everyday Needs
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect with vetted electricians, plumbers, auto mechanics, technicians, cleaners, and tutors across Nigeria.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/business/register"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition"
              >
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <span>List Your Business</span>
              </Link>

              <Link
                href="/services/search"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-xs"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Open Map & Filter Search</span>
              </Link>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service are you looking for? (e.g. Inverter, AC gas, plumber, math tutor)"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium"
              />
            </div>

            <div className="sm:col-span-4 flex items-center gap-2">
              <select
                value={selectedCity.id}
                onChange={(e) => {
                  const c = CITIES.find(city => city.id === e.target.value);
                  if (c) setSelectedCity(c);
                }}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {CITIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}, {c.state}</option>
                ))}
              </select>

              <Link
                href={`/services/search?search=${encodeURIComponent(searchQuery)}&cityId=${selectedCity.id}`}
                className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-xs shrink-0"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
              All Service Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Select a trade to view verified providers and availability
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
                className="group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-white hover:border-emerald-500/50 hover:shadow-card-hover transition-all duration-300 flex flex-col"
              >
                <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                  <img
                    src={image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/10 to-transparent" />
                  
                  <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-lg bg-white/95 backdrop-blur-sm flex items-center justify-center text-emerald-700 shadow-xs">
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  {count > 0 && (
                    <span className="absolute bottom-2 right-2 text-[10px] font-semibold text-white bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded">
                      {count} {count === 1 ? 'provider' : 'providers'}
                    </span>
                  )}
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span>Browse specialists</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Providers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
              Featured Providers in {selectedCity.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Highest rated local professionals ready for service requests
            </p>
          </div>

          <Link
            href={`/services/search?cityId=${selectedCity.id}`}
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
          >
            <span>View All Providers on Map</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 bg-white rounded-2xl animate-pulse border border-slate-200 p-5 space-y-4">
                <div className="h-32 bg-slate-100 rounded-xl" />
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
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
