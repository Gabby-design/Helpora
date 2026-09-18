'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Provider, ServiceCategory } from '@/lib/types';
import ProviderCard from '@/components/services/ProviderCard';
import ServicesMap from '@/components/services/Map';
import { 
  ShieldCheck, 
  Clock, 
  Map as MapIcon, 
  List, 
  Search, 
  ArrowUpDown, 
  PlusCircle, 
  MapPin, 
  RotateCcw, 
  Loader2, 
  AlertCircle,
  Navigation
} from 'lucide-react';
import { CITIES, DEFAULT_CITY } from '@/lib/data/cities';
import Link from 'next/link';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL Params
  const categoryParam = searchParams.get('category') || 'all';
  const cityIdParam = searchParams.get('cityId') || DEFAULT_CITY.id;
  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');
  const queryParam = searchParams.get('search') || searchParams.get('query') || '';

  // Local Filter & Search States
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState<string>(queryParam);
  const [selectedCityId, setSelectedCityId] = useState<string>(cityIdParam);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [openNow, setOpenNow] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'reviews'>('rating');
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Database categories
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  // Selected card for map sync
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);

  // Data loading state
  const [providers, setProviders] = useState<(Provider & { distanceMiles?: number; isOpen?: boolean })[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from database
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

  // Fetch providers from API whenever filters change
  const fetchProviders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
      if (selectedCityId && selectedCityId !== 'all') params.set('cityId', selectedCityId);
      if (searchQuery.trim()) params.set('search', searchQuery.trim());
      if (verifiedOnly) params.set('verifiedOnly', 'true');
      if (openNow) params.set('openNow', 'true');
      if (sortBy) params.set('sortBy', sortBy);

      const cityObj = CITIES.find(c => c.id === selectedCityId) || DEFAULT_CITY;

      if (latParam && lngParam) {
        params.set('lat', latParam);
        params.set('lng', lngParam);
      } else {
        params.set('lat', cityObj.lat.toString());
        params.set('lng', cityObj.lng.toString());
      }

      const res = await fetch(`/api/providers?${params.toString()}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProviders(json.data);
      } else {
        setError(json.error || 'Failed to load providers');
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError('Network error while retrieving service providers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [selectedCategory, selectedCityId, verifiedOnly, openNow, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProviders();
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const params = new URLSearchParams(window.location.search);
        params.set('lat', pos.coords.latitude.toString());
        params.set('lng', pos.coords.longitude.toString());
        router.push(`/services/search?${params.toString()}`);
      },
      (err) => {
        setIsLocating(false);
        alert('Could not determine your location. Please select your city.');
      }
    );
  };

  const currentCity = useMemo(() => {
    return CITIES.find((c) => c.id === selectedCityId) || DEFAULT_CITY;
  }, [selectedCityId]);

  const activeCategoryObj = useMemo(() => {
    return categories.find((c) => c.id === selectedCategory);
  }, [categories, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-16">
      {/* Top Search & Filter Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input & City Info */}
            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by provider name, trade (e.g. Inverter, leak, AC), or area..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium"
                />
              </div>

              {/* City selector */}
              <div className="relative shrink-0">
                <select
                  value={selectedCityId}
                  onChange={(e) => setSelectedCityId(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {CITIES.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 shadow-xs"
              >
                Search
              </button>
            </form>

            {/* Quick Filter Toggles & Sorting */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Verified Only Toggle */}
              <button
                type="button"
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  verifiedOnly
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${verifiedOnly ? 'text-white' : 'text-emerald-600'}`} />
                <span>Verified Only</span>
              </button>

              {/* Open Now Toggle */}
              <button
                type="button"
                onClick={() => setOpenNow(!openNow)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  openNow
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <Clock className={`w-3.5 h-3.5 ${openNow ? 'text-white' : 'text-emerald-600'}`} />
                <span>Open Now</span>
              </button>

              {/* Geolocation Button */}
              <button
                type="button"
                onClick={handleUseLocation}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium"
                title="Use my location"
              >
                {isLocating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                ) : (
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                )}
                <span className="hidden sm:inline">Nearby</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1 text-xs">
                <ArrowUpDown className="w-3 h-3 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer"
                  aria-label="Sort providers by"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="distance">Nearest Distance</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>

              {/* Mobile List / Map Switcher */}
              <div className="flex lg:hidden items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                <button
                  onClick={() => setMobileView('list')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    mobileView === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List</span>
                </button>
                <button
                  onClick={() => setMobileView('map')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    mobileView === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Map</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap transition ${
                selectedCategory === 'all'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Trades
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Results Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col">
        {/* Results Header Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
              {activeCategoryObj ? `${activeCategoryObj.name}s` : 'Local Professionals'} in {currentCity.name}, {currentCity.state}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Showing {providers.length} {providers.length === 1 ? 'provider' : 'providers'} • Sorted by {
                sortBy === 'distance' ? 'proximity' : sortBy === 'rating' ? 'highest rating' : 'review count'
              }
            </p>
          </div>

          <Link
            href="/business/register"
            className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>List your business on Helpora</span>
          </Link>
        </div>

        {/* Dual Pane Layout (List + Interactive Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
          {/* Left: Cards List */}
          <div
            className={`lg:col-span-7 space-y-4 ${
              mobileView === 'map' ? 'hidden lg:block' : 'block'
            }`}
          >
            {isLoading ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">Finding trusted providers in {currentCity.name}...</p>
                <p className="text-xs text-slate-400">Verifying Helpora credentials and operating hours</p>
              </div>
            ) : error ? (
              <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-center text-rose-800 space-y-2">
                <AlertCircle className="w-6 h-6 text-rose-600 mx-auto" />
                <p className="font-semibold text-sm">{error}</p>
                <button
                  onClick={fetchProviders}
                  className="text-xs underline font-medium hover:text-rose-950"
                >
                  Try loading again
                </button>
              </div>
            ) : providers.length === 0 ? (
              /* Empty State matching prompt guidelines */
              <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                  <MapPin className="w-7 h-7" />
                </div>

                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    No providers found nearby
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Try another location or category, or clear your search filters.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setVerifiedOnly(false);
                      setOpenNow(false);
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear filters</span>
                  </button>

                  <Link
                    href="/business/register"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>List your business</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {providers.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    isSelected={selectedProviderId === provider.id}
                    onHover={() => setSelectedProviderId(provider.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Interactive Sticky Leaflet Map */}
          <div
            className={`lg:col-span-5 sticky top-40 h-[calc(100vh-200px)] min-h-[420px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm ${
              mobileView === 'list' ? 'hidden lg:block' : 'block'
            }`}
          >
            <ServicesMap
              providers={providers}
              selectedProviderId={selectedProviderId}
              onSelectProvider={(id) => {
                setSelectedProviderId(id);
                const element = document.getElementById(`provider-${id}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              center={[currentCity.lat, currentCity.lng]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">Loading service providers...</p>
          </div>
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}
