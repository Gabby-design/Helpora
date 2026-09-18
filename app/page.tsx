'use client';

import React, { useState, useEffect } from 'react';
import SearchHero from '@/components/services/SearchHero';
import ProviderCard from '@/components/services/ProviderCard';
import { Provider, ServiceCategory } from '@/lib/types';
import { 
  ShieldCheck, 
  GraduationCap, 
  HeartPulse, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  HelpCircle,
  Building2,
  BookOpen,
  PlusCircle,
  PhoneCall,
  Search,
  Check,
  Star,
  MapPin,
  Sparkles,
  Zap,
  Wrench,
  Car,
  Smartphone,
  Scissors,
  Truck,
  Utensils,
  Camera,
  Activity,
  Hammer,
  Shield,
  FileCheck2,
  Lock,
  Flag,
  ArrowUpRight,
  Navigation,
  Compass,
  Radio
} from 'lucide-react';
import Link from 'next/link';
import { CITIES } from '@/lib/data/cities';

export default function HomePage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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

  // Category imagery for rich visual cards
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

  // Filtered providers for discovery
  const filteredProviders = selectedCategory === 'all'
    ? providers
    : providers.filter(p => p.category === selectedCategory);

  // Real provider counts per category
  const getProviderCount = (categoryId: string) => {
    const count = providers.filter(p => p.category === categoryId).length;
    return count > 0 ? `${count} available` : null;
  };

  return (
    <div className="space-y-16 sm:space-y-28 pb-24">
      
      {/* 1. HERO SECTION */}
      <SearchHero />

      {/* 2. TRUST STRIP (High-Impact Guarantees) */}
      <section className="border-y border-slate-200/80 bg-white/70 backdrop-blur-md py-6 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-left">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-950">Verified Pros</p>
                <p className="text-[11px] text-slate-500 font-medium">CAC & identity audited</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                <Navigation className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-950">GPS Road Routing</p>
                <p className="text-[11px] text-slate-500 font-medium">Live road navigator</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-950">Transparent Reviews</p>
                <p className="text-[11px] text-slate-500 font-medium">100% genuine feedback</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                <PhoneCall className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-950">Direct Contact</p>
                <p className="text-[11px] text-slate-500 font-medium">Zero middleman fees</p>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 flex items-center gap-3 justify-start">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                <Building2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-950">Across Nigeria</p>
                <p className="text-[11px] text-slate-500 font-medium">Abuja, Lagos & Nationwide</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. POPULAR SERVICES (Visual Category Grid with Smooth Hover) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80">
              Essential Trades
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-2.5">
              Popular Service Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Find skilled local technicians and service providers in your neighborhood.
            </p>
          </div>

          <Link
            href="/services"
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 group self-start sm:self-auto"
          >
            <span>Explore All 12+ Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.slice(0, 8).map((cat) => {
            const Icon = iconMap[cat.iconName] || Wrench;
            const count = getProviderCount(cat.id);
            const image = categoryImages[cat.id] || categoryImages.other;

            return (
              <Link
                key={cat.id}
                href={`/services/search?category=${cat.id}`}
                className="group relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white hover:border-emerald-500/50 hover:shadow-card-hover transition-all duration-300 flex flex-col"
              >
                {/* Image top with aspect ratio */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/15 to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-emerald-700 shadow-sm border border-white/40">
                    <Icon className="w-4 h-4" />
                  </div>

                  {count && (
                    <span className="absolute bottom-3 right-3 text-[11px] font-bold text-white bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/20">
                      {count}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-950 group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed font-medium">
                      {cat.description}
                    </p>
                  </div>
                  <div className="pt-3.5 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>Find specialists</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. SERVICE DISCOVERY & FEATURED PROVIDERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-md border border-emerald-200">
                Verified Local Talent
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-2.5">
                Trusted Professionals Near You
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                Vetted Nigerian professionals with customer reviews, direct phone, and turn-by-turn map routing.
              </p>
            </div>

            <Link
              href="/services/search"
              className="py-2.5 px-5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-subtle self-start sm:self-auto active:scale-95"
            >
              Explore All Listings
            </Link>
          </div>

          {/* Quick Filter Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
                selectedCategory === 'all'
                  ? 'bg-slate-950 text-white shadow-subtle'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Providers
            </button>
            {categories.slice(0, 7).map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
                  selectedCategory === c.id
                    ? 'bg-emerald-700 text-white shadow-subtle'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Provider Results Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border border-slate-200 p-6 space-y-4">
                  <div className="h-40 bg-slate-100 rounded-2xl" />
                  <div className="h-5 bg-slate-100 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProviders.length === 0 ? (
            <div className="text-center py-14 px-4 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-subtle">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">More verified professionals are joining Helpora.</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Are you a skilled tradesperson or business in Nigeria? List your services to start receiving client enquiries directly today.
              </p>
              <div className="pt-2">
                <Link
                  href="/business/register"
                  className="inline-flex items-center gap-2 py-2.5 px-6 rounded-2xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>List Your Business</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.slice(0, 6).map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. HOW HELPORA WORKS (01 Search, 02 Verify, 03 Connect & Route) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            Simple, Transparent & Fast
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-2.5">
            How Helpora Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium">
            Connecting with verified local help in Nigeria takes less than 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 text-left space-y-4 shadow-subtle hover:shadow-elevated transition duration-300 relative group">
            <span className="text-5xl font-black text-emerald-100/90 block select-none">01</span>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/60 shadow-xs">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950">Search or Scan</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Search by trade, service, or tap <strong>&ldquo;Scan Closest&rdquo;</strong> to pinpoint providers or healthcare nearest to your GPS coordinates.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 text-left space-y-4 shadow-subtle hover:shadow-elevated transition duration-300 relative group">
            <span className="text-5xl font-black text-emerald-100/90 block select-none">02</span>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/60 shadow-xs">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950">Verify & Compare</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Review verified CAC audit badges, customer ratings, operating hours, and specialty services before making contact.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 text-left space-y-4 shadow-subtle hover:shadow-elevated transition duration-300 relative group">
            <span className="text-5xl font-black text-emerald-100/90 block select-none">03</span>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/60 shadow-xs">
              <Navigation className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950">Route & Connect</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Call the provider directly or launch turn-by-turn road navigation with live driving instructions and zero middleman fees.
            </p>
          </div>

        </div>
      </section>

      {/* 6. TRUST & SAFETY SECTION (Luxury Dark Aesthetics) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-14 overflow-hidden relative border border-emerald-800/30 shadow-elevated-lg">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Helpora Trust & Quality Standard</span>
            </div>
            
            <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Your safety comes first.
            </h2>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
              Trust is the single most important factor when inviting someone to your home or workshop. Helpora is built around verified identity standards, review moderation, and physical address checks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                <FileCheck2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Helpora Verified Badge</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Awarded only after business registration, contact verification, and identity auditing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Physical Workshop Addresses</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    View real operating hours, physical street locations, and specialties before reaching out.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                <Star className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Moderated Community Reviews</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Customer ratings are screened to prevent fake reviews and ensure genuine marketplace trust.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                <Flag className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Direct Listing Reporting</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Promptly flag inaccurate pricing, contact issues, or safety concerns directly to our audit desk.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/safety"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 transition"
              >
                <span>Read our complete Nigerian Safety & Trust Guidance</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SPOTLIGHT A: HEALTH EMERGENCY NAVIGATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-md border border-rose-200">
              Live Healthcare Directory
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Emergency Healthcare & Hospital Navigator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl font-medium">
              Find verified general hospitals, federal medical centers, trauma units, and 24-hour pharmacies near you with real-time road routing and direct desk phone numbers.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">Hospitals & Trauma Units</span>
              <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">24/7 Pharmacies</span>
              <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">Emergency Toll-Free (112)</span>
              <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">Diagnostic Labs</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/health?navigateClosest=true"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm active:scale-95"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Route to Closest Hospital</span>
              </Link>

              <Link
                href="/health"
                className="inline-flex items-center gap-2 py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition"
              >
                <span>Browse All Facilities</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-rose-950 to-slate-950 text-white rounded-3xl p-7 border border-rose-900/40 shadow-elevated space-y-4">
            <div className="flex items-center justify-between border-b border-rose-900/50 pb-3">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <HeartPulse className="w-5 h-5 text-rose-500" />
                <span>Unified Emergency Line</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-900/40 px-2 py-0.5 rounded border border-rose-800/40">
                Toll-Free 24/7
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              In any life-threatening emergency across Nigeria, dial 112 directly for unified dispatch across Police, Ambulance, and Fire Service.
            </p>

            <div className="pt-2">
              <a
                href="tel:112"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-rose-600 hover:bg-rose-700 transition shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 112 Toll-Free</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 8. SPOTLIGHT B: AI STUDY TUTOR ("Learn Something New") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
              Helpora Learning
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Patient AI Study Tutors & Practice
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl font-medium">
              Helpora provides interactive AI learning support for technical trade calculations, solar sizing, electrical formulas, WAEC, and JAMB exam preparation.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left">
                <p className="text-xs font-bold text-slate-900">AI Tutor</p>
                <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Step-by-step Q&A</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left">
                <p className="text-xs font-bold text-slate-900">Formulas</p>
                <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Engineering cheatsheets</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left">
                <p className="text-xs font-bold text-slate-900">Quizzes</p>
                <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Instant test scoring</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/study"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 transition shadow-subtle active:scale-95"
              >
                <span>Start Learning With AI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 rounded-3xl p-6 text-white space-y-3.5 border border-slate-800 shadow-elevated">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold text-xs">
                  AI
                </div>
                <span className="text-xs font-bold text-slate-200">Helpora Study Tutor</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40 font-bold">
                Online
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                <p className="font-bold text-amber-300 text-[11px]">User Prompt:</p>
                <p className="mt-0.5 font-medium">&ldquo;How do I size an inverter battery bank for a 3kVA setup in Nigeria?&rdquo;</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-slate-200">
                <p className="font-bold text-emerald-400 text-[11px]">Helpora AI Tutor:</p>
                <p className="text-[11.5px] leading-relaxed mt-0.5 font-medium">
                  Let&apos;s calculate your energy requirement! First, determine your total continuous Wattage load. For a 3kVA inverter at 24V DC bus, four 200Ah deep cycle gel batteries wired in 2S2P will deliver approximately 4.8kWh storage...
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. NIGERIAN CITIES COVERAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            Nationwide Reach
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-2.5">
            Active Across Major Nigerian Hubs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Find vetted local talent and verified emergency care across key cities.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CITIES.map((city) => (
            <Link
              key={city.id}
              href={`/services/search?cityId=${city.id}`}
              className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-card-hover transition-all text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-700 flex items-center justify-center mx-auto mb-2 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {city.name}
              </h4>
              <p className="text-[11px] text-slate-400 font-medium">{city.state}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 10. BUSINESS ONBOARDING SECTION ("Grow Your Business With Helpora") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-emerald-800/40 relative overflow-hidden shadow-elevated-lg">
          <div className="max-w-3xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Building2 className="w-4 h-4" />
              <span>For Nigerian Trades & Enterprises</span>
            </div>

            <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Grow Your Business With Helpora
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl font-medium">
              Put your services in front of thousands of customers searching near you. Create a verified business listing, show your credentials, and get phone calls directly with zero broker fees.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2 text-xs text-slate-200 font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified profile badge</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Showcase previous work</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct client phone calls</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Turn-by-turn road navigation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Customer review management</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero commission deductions</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/business/register"
                className="py-3 px-7 rounded-2xl text-xs sm:text-sm font-extrabold text-slate-950 bg-white hover:bg-emerald-50 transition shadow-sm active:scale-95"
              >
                Register Your Business Free
              </Link>
              <Link
                href="/dashboard/business"
                className="text-xs sm:text-sm font-bold text-emerald-300 hover:text-white transition flex items-center gap-1.5"
              >
                <span>Already listed? Access business portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
