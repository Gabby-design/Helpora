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
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

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

  const featuredProviders = providers.slice(0, 3);

  // Real provider counts per category
  const getProviderCount = (categoryId: string) => {
    const count = providers.filter(p => p.category === categoryId).length;
    return count > 0 ? `${count} available` : null;
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <SearchHero />

      {/* 2. TRUST STRIP (Immediately below Hero) */}
      <section className="border-y border-slate-200/80 bg-slate-50 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center sm:text-left">
            
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Verified Providers</p>
                <p className="text-[11px] text-slate-500">Identity & trade checked</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Local Professionals</p>
                <p className="text-[11px] text-slate-500">Serving your neighborhood</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Transparent Ratings</p>
                <p className="text-[11px] text-slate-500">Real customer feedback</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Easy Contact</p>
                <p className="text-[11px] text-slate-500">Call & get map directions</p>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 flex items-center gap-2.5 justify-center sm:justify-start">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Community-Focused</p>
                <p className="text-[11px] text-slate-500">Built for Nigeria</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. POPULAR SERVICES (Visual Category Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              Marketplace Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-2">
              Popular Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse trusted trades and essential local service providers near you.
            </p>
          </div>

          <Link
            href="/services"
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
                className="group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-white hover:border-emerald-500/50 hover:shadow-card-hover transition-all duration-300 flex flex-col"
              >
                {/* Image top with aspect ratio */}
                <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                  <img
                    src={image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/10 to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/95 backdrop-blur-sm flex items-center justify-center text-emerald-700 shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>

                  {count && (
                    <span className="absolute bottom-2.5 right-3 text-[10.5px] font-semibold text-white bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded">
                      {count}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span>Find specialists</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. SERVICE DISCOVERY & FEATURED PROVIDERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-md">
                Verified Local Talent
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-2">
                Trusted Professionals Near You
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Whatever you need, find someone nearby with verified ratings and direct contact.
              </p>
            </div>

            <Link
              href="/services/search"
              className="py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-xs self-start sm:self-auto"
            >
              Explore All Listings
            </Link>
          </div>

          {/* Quick Filter Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition ${
                selectedCategory === 'all'
                  ? 'bg-slate-950 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Providers
            </button>
            {categories.slice(0, 6).map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition ${
                  selectedCategory === c.id
                    ? 'bg-emerald-700 text-white'
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
                <div key={i} className="h-72 bg-white rounded-2xl animate-pulse border border-slate-200 p-5 space-y-4">
                  <div className="h-32 bg-slate-100 rounded-xl" />
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProviders.length === 0 ? (
            <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200 space-y-3">
              <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">More trusted professionals are joining Helpora.</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Are you a skilled tradesperson or business in Nigeria? List your services to start receiving inquiries today.
              </p>
              <div className="pt-2">
                <Link
                  href="/business/register"
                  className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition"
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

      {/* 5. HOW HELPORA WORKS (01 Search, 02 Compare, 03 Connect) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
            Simple & Transparent
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-2">
            How Helpora Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Getting quality help nearby in Nigeria shouldn&apos;t be stressful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 text-center sm:text-left space-y-4 relative">
            <span className="text-4xl font-black text-emerald-100 block">01</span>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto sm:mx-0">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Search</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tell us what you need. Filter by category, location, or find who is open right now near you.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 text-center sm:text-left space-y-4 relative">
            <span className="text-4xl font-black text-emerald-100 block">02</span>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto sm:mx-0">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Compare</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore profiles, verified ratings, specific services, and distance to make the right choice.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 text-center sm:text-left space-y-4 relative">
            <span className="text-4xl font-black text-emerald-100 block">03</span>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto sm:mx-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Connect</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Call directly, get turn-by-turn map directions, or bookmark listings for future work.
            </p>
          </div>

        </div>
      </section>

      {/* 6. TRUST & SAFETY SECTION ("Your safety comes first.") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Helpora Trust Standards</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Your safety comes first.
            </h2>
            
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              We know trust is the single most important factor when hiring local help. Helpora is built around transparent identity standards, review moderation, and clear verification badges.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <FileCheck2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Look for the Helpora Verified Badge</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Verified badges are only awarded when business registration and contact details have been manually audited.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Transparent Profiles & History</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    View real operating hours, physical workshop addresses, and services before calling.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Moderated Community Reviews</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Customer feedback is screened to prevent fabricated ratings or spam.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Flag className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Direct Listing Reporting</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Any user can flag inaccurate pricing, contact issues, or safety concerns with our moderation team.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/safety"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition"
              >
                <span>Read our full Safety & Trust Guidance →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AI STUDY SECTION ("Learn Something New") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              Helpora Learning
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Learn Something New
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              Helpora is more than a service directory. We provide patient, step-by-step AI learning support for technical trades, WAEC/JAMB prep, and science subjects.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs font-bold text-slate-900">AI Tutor</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Interactive guided Q&A</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs font-bold text-slate-900">Study Materials</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Formulas & cheatsheets</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs font-bold text-slate-900">Practice Quizzes</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Instant test scoring</p>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/study"
                className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 transition shadow-xs"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-5 text-white space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs">
                  AI
                </div>
                <span className="text-xs font-bold text-slate-200">Helpora Study Tutor</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full">Active</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-800/80 text-slate-300">
                <p className="font-semibold text-amber-300 text-[11px]">Prompt:</p>
                <p>&ldquo;How do I size an inverter battery bank for a 3kVA setup in Nigeria?&rdquo;</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800 text-slate-200">
                <p className="font-semibold text-emerald-400 text-[11px]">Tutor:</p>
                <p className="text-[11.5px] leading-relaxed">
                  Let&apos;s break it down step-by-step! First, calculate your total continuous load in Watts, then choose between a 24V or 48V DC bus architecture...
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. HEALTH & HELP SECTION ("Important Help When You Need It") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
              Healthcare Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Important Help When You Need It
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              Access verified emergency lines, 24/7 pharmacies, general hospitals, and community clinics near you. Information is kept clear, accurate, and non-alarmist.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">Hospitals & Trauma</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">24/7 Pharmacies</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">Emergency Toll-Free (112)</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">Mental Health Support</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">Dental & Labs</span>
            </div>

            <div className="pt-3">
              <Link
                href="/health"
                className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition shadow-xs"
              >
                <span>Find Health & Help</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-rose-50/70 rounded-2xl p-6 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <HeartPulse className="w-5 h-5 text-rose-600" />
              <span>National Emergency Hotline</span>
            </div>
            <p className="text-xs text-slate-600">
              For life-threatening emergencies, dial Nigeria&apos;s unified 112 dispatch toll-free from any network.
            </p>
            <div className="pt-2">
              <a
                href="tel:112"
                className="inline-flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Dial 112 Toll-Free</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 9. COMMUNITY SECTION ("Help Your Community") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-md">
              Civic Action
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Help Your Community
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Report public infrastructure issues (broken water mains, road potholes, streetlight outages) or volunteer with grassroots community development groups.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/community/report"
              className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 transition shadow-xs"
            >
              Report an Issue
            </Link>
            <Link
              href="/community/volunteer"
              className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-xs"
            >
              Find Volunteer Roles
            </Link>
            <Link
              href="/community"
              className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 hover:underline"
            >
              Explore Community →
            </Link>
          </div>
        </div>
      </section>

      {/* 10. BUSINESS ONBOARDING SECTION ("Grow Your Business With Helpora") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-800/40 relative overflow-hidden">
          <div className="max-w-3xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>For Nigerian Trades & Enterprises</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Grow Your Business With Helpora
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Put your services in front of people looking for trusted professionals near them. Create a professional digital profile, showcase verified credentials, and receive customer calls with zero middleman fees.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Create your profile</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Show your services</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Receive customer enquiries</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Build your reputation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Manage your listing</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No commissions</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/business/register"
                className="py-3 px-6 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-white hover:bg-emerald-50 transition shadow-sm"
              >
                List Your Business
              </Link>
              <Link
                href="/dashboard/business"
                className="text-xs sm:text-sm font-semibold text-emerald-300 hover:text-white transition flex items-center gap-1"
              >
                <span>Already listed? Manage your business</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
