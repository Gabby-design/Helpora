'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Building2, 
  Pill, 
  Stethoscope, 
  ChevronRight,
  HeartPulse,
  Navigation,
  Compass,
  Radio,
  List,
  Map as MapIcon,
  Loader2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { HealthResource } from '@/lib/types';
import ServicesMap, { MapPlace } from '@/components/services/Map';
import { findClosestEntity, calculateDistanceKm, formatDistanceKm } from '@/lib/services/navigator';
import { DEFAULT_CITY } from '@/lib/data/cities';

function HealthDirectoryContent() {
  const searchParams = useSearchParams();
  const navigateClosestParam = searchParams.get('navigateClosest') === 'true';
  const targetIdParam = searchParams.get('targetId');

  const [resources, setResources] = useState<HealthResource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyEmergency, setOnlyEmergency] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  // Navigator & Geolocation State
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [activeDestination, setActiveDestination] = useState<MapPlace | null>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  useEffect(() => {
    fetchHealthData();
  }, [selectedCategory, onlyEmergency]);

  const fetchHealthData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      if (onlyEmergency) params.set('emergency', 'true');
      
      const res = await fetch(`/api/health-resources?${params.toString()}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setResources(data);
      }
    } catch (e) {
      console.error('Failed to load health resources:', e);
    } finally {
      setLoading(false);
    }
  };

  // Environment scanner: finds current GPS and immediately routes to closest hospital/clinic
  const handleScanClosestHospital = () => {
    setIsScanning(true);
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      setIsScanning(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const uLat = pos.coords.latitude;
        const uLng = pos.coords.longitude;
        const coords: [number, number] = [uLat, uLng];
        setUserLocation(coords);

        if (resources.length > 0) {
          // Filter to hospitals / emergency centers if available
          const validResources = resources.filter(r => typeof r.lat === 'number' && typeof r.lng === 'number');
          const closest = findClosestEntity({ lat: uLat, lng: uLng }, validResources);
          if (closest) {
            const destPlace: MapPlace = {
              id: closest.item.id,
              name: closest.item.name,
              category: closest.item.category || (closest.item as any).type || 'hospital',
              type: (closest.item as any).type || closest.item.category,
              lat: closest.item.lat,
              lng: closest.item.lng,
              address: closest.item.address,
              phone: closest.item.phone,
              distanceKm: closest.distanceKm,
              is24Hours: closest.item.is24Hours,
              emergency_available: closest.item.emergency_available || (closest.item as any).emergencyServices,
              services: closest.item.servicesOffered || closest.item.services || []
            };
            setActiveDestination(destPlace);
            setSelectedFacilityId(closest.item.id);
            setMobileView('map');
          }
        }
        setIsScanning(false);
      },
      (err) => {
        console.warn('Geolocation failed or denied, using Abuja center', err);
        const coords: [number, number] = [DEFAULT_CITY.lat, DEFAULT_CITY.lng];
        setUserLocation(coords);

        if (resources.length > 0) {
          const validResources = resources.filter(r => typeof r.lat === 'number' && typeof r.lng === 'number');
          const closest = findClosestEntity({ lat: DEFAULT_CITY.lat, lng: DEFAULT_CITY.lng }, validResources);
          if (closest) {
            const destPlace: MapPlace = {
              id: closest.item.id,
              name: closest.item.name,
              category: closest.item.category || (closest.item as any).type || 'hospital',
              type: (closest.item as any).type || closest.item.category,
              lat: closest.item.lat,
              lng: closest.item.lng,
              address: closest.item.address,
              phone: closest.item.phone,
              distanceKm: closest.distanceKm,
              is24Hours: closest.item.is24Hours,
              emergency_available: closest.item.emergency_available || (closest.item as any).emergencyServices,
              services: closest.item.servicesOffered || closest.item.services || []
            };
            setActiveDestination(destPlace);
            setSelectedFacilityId(closest.item.id);
            setMobileView('map');
          }
        }
        setIsScanning(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Auto-scan if navigateClosest is in URL params
  useEffect(() => {
    if (navigateClosestParam && resources.length > 0 && !activeDestination) {
      handleScanClosestHospital();
    }
  }, [navigateClosestParam, resources.length]);

  // Handle targetId parameter if requested from detail page
  useEffect(() => {
    if (targetIdParam && resources.length > 0 && !activeDestination) {
      const match = resources.find(r => r.id === targetIdParam);
      if (match) {
        startNavigationToFacility(match);
      }
    }
  }, [targetIdParam, resources.length]);

  const startNavigationToFacility = (item: HealthResource) => {
    let distanceKm: number | undefined;
    if (userLocation) {
      distanceKm = calculateDistanceKm(userLocation[0], userLocation[1], item.lat, item.lng);
    }
    const destPlace: MapPlace = {
      id: item.id,
      name: item.name,
      category: item.category || (item as any).type || 'hospital',
      type: (item as any).type || item.category,
      lat: item.lat,
      lng: item.lng,
      address: item.address,
      phone: item.phone,
      distanceKm,
      is24Hours: item.is24Hours,
      emergency_available: item.emergency_available || (item as any).emergencyServices,
      services: item.servicesOffered || item.services || []
    };
    setActiveDestination(destPlace);
    setSelectedFacilityId(item.id);
    setMobileView('map');
  };

  const filtered = useMemo(() => {
    return resources.filter(item => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      const cityStr = item.city || '';
      const sOffered = item.servicesOffered || item.services || [];
      return (
        item.name.toLowerCase().includes(q) ||
        cityStr.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        sOffered.some((s: string) => s.toLowerCase().includes(q))
      );
    });
  }, [resources, searchQuery]);

  // Convert resources to MapPlace format
  const mapPlaces: MapPlace[] = useMemo(() => {
    return filtered
      .filter(item => typeof item.lat === 'number' && typeof item.lng === 'number')
      .map(item => {
        let dist: number | undefined;
        if (userLocation) {
          dist = calculateDistanceKm(userLocation[0], userLocation[1], item.lat, item.lng);
        }
        return {
          id: item.id,
          name: item.name,
          category: item.category || (item as any).type || 'hospital',
          type: (item as any).type || item.category,
          lat: item.lat,
          lng: item.lng,
          address: item.address,
          phone: item.phone,
          distanceKm: dist,
          is24Hours: item.is24Hours,
          emergency_available: item.emergency_available || (item as any).emergencyServices,
          services: item.servicesOffered || item.services || []
        };
      });
  }, [filtered, userLocation]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hospital': return <Building2 className="w-4 h-4 text-emerald-700" />;
      case 'pharmacy': return <Pill className="w-4 h-4 text-blue-600" />;
      case 'clinic': return <Stethoscope className="w-4 h-4 text-purple-600" />;
      case 'emergency': return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      default: return <HeartPulse className="w-4 h-4 text-emerald-700" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Banner / Emergency Callout */}
      <div className="bg-slate-900 text-white px-4 py-2.5 border-b border-slate-800">
        <div className="w-full max-w-[96%] 2xl:max-w-[1760px] mx-auto px-3 sm:px-4 lg:px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="font-medium text-slate-300">
              In an acute life-threatening emergency in Nigeria, dial the unified dispatch line toll-free:
            </span>
            <a href="tel:112" className="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-0.5 rounded-md font-bold transition">
              112
            </a>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Police &bull; Ambulance &bull; Fire Service
          </span>
        </div>
      </div>

      {/* Main Hero Header with Scanner Button */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[96%] 2xl:max-w-[1760px] mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block">
                Helpora Health &bull; Live Emergency Navigator
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Find & Navigate to Closest Healthcare
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Scan your environment for verified general hospitals, trauma centers, and 24-hour pharmacies with real-time road routing.
              </p>
            </div>

            {/* Prominent Scanner Action Card */}
            <div className="bg-gradient-to-br from-emerald-950 to-slate-950 text-white p-5 rounded-2xl border border-emerald-800/40 shadow-xl flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                <Compass className={`w-7 h-7 text-emerald-400 ${isScanning ? 'animate-spin' : ''}`} />
              </div>
              <div className="text-center sm:text-left">
                <div className="font-bold text-sm text-white flex items-center justify-center sm:justify-start gap-2">
                  <span>Scan Environment</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 max-w-xs">
                  Detect your location and get live turn-by-turn routing to the closest hospital.
                </p>
              </div>
              <button
                type="button"
                onClick={handleScanClosestHospital}
                disabled={isScanning}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold tracking-wide uppercase shadow-lg shadow-emerald-500/20 transition active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2 shrink-0"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Scanning GPS...</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 text-slate-950" />
                    <span>Route to Closest</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Search, Category, and Mobile View Switcher */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search facility name, area (e.g. Garki, Maitama, Ikeja), or specialty..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white shadow-xs font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl text-xs font-semibold px-3 py-2 text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
              >
                <option value="all">All Healthcare Types</option>
                <option value="hospital">Hospitals</option>
                <option value="pharmacy">Pharmacies</option>
                <option value="clinic">Clinics & Diagnostic</option>
                <option value="emergency">Emergency Centers</option>
              </select>

              <button
                type="button"
                onClick={() => setOnlyEmergency(!onlyEmergency)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition border flex items-center gap-1.5 shadow-xs ${
                  onlyEmergency 
                    ? 'bg-rose-600 text-white border-rose-700' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>24/7 Emergency</span>
              </button>

              {/* Mobile List / Map Switcher */}
              <div className="flex lg:hidden items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setMobileView('list')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    mobileView === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileView('map')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    mobileView === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual-Pane Section: Facilities List + Interactive Navigator Map */}
      <div className="w-full max-w-[96%] 2xl:max-w-[1760px] mx-auto px-3 sm:px-4 lg:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
            Verified Healthcare Centers ({filtered.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Turn-by-turn routing powered by Helpora Navigator
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Facilities Cards */}
          <div className={`lg:col-span-7 space-y-4 ${mobileView === 'map' ? 'hidden lg:block' : 'block'}`}>
            {loading ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">Verifying healthcare facility records...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs space-y-3">
                <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No Healthcare Facilities Found</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Try adjusting your search criteria or resetting filters to view all medical centers.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setOnlyEmergency(false);
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((item) => {
                  const isSelected = selectedFacilityId === item.id;
                  const distKm = userLocation ? calculateDistanceKm(userLocation[0], userLocation[1], item.lat, item.lng) : undefined;

                  return (
                    <div 
                      key={item.id}
                      id={`facility-${item.id}`}
                      className={`bg-white rounded-2xl border transition flex flex-col justify-between group overflow-hidden ${
                        isSelected 
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' 
                          : 'border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 capitalize">
                            {getCategoryIcon(item.category || (item as any).type || 'health')}
                            <span>{item.category || (item as any).type || 'Healthcare'}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {distKm !== undefined && (
                              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                {formatDistanceKm(distKm)}
                              </span>
                            )}
                            {(item.is24Hours || item.emergency_available || (item as any).emergencyServices) && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                24/7 Emergency
                              </span>
                            )}
                          </div>
                        </div>

                        <Link href={`/health/${item.id}`} className="block group-hover:text-emerald-700 transition">
                          <h3 className="text-base font-bold text-slate-900 line-clamp-1 mb-1">
                            {item.name}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="line-clamp-1">{item.address}, {item.city || 'Abuja'}</span>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {(item.servicesOffered || item.services || []).slice(0, 3).map((service: string, idx: number) => (
                            <span key={idx} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                              {service}
                            </span>
                          ))}
                          {(item.servicesOffered || item.services || []).length > 3 && (
                            <span className="text-[10px] text-slate-400 px-1 py-0.5">
                              +{(item.servicesOffered || item.services || []).length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Actions Footer: Call, Navigate on Map, Details */}
                      <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                        <a
                          href={`tel:${item.phone}`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 transition shadow-xs"
                          title={`Call ${item.phone}`}
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="truncate">{item.phone}</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => startNavigationToFacility(item)}
                          className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition active:scale-95 shadow-xs"
                          title="Navigate on Map"
                        >
                          <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Navigate</span>
                        </button>

                        <Link
                          href={`/health/${item.id}`}
                          className="inline-flex items-center justify-center py-2 px-3.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition shadow-xs"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Interactive Sticky Leaflet Navigator Map */}
          <div
            className={`lg:col-span-5 sticky top-24 h-[calc(100vh-140px)] min-h-[460px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm ${
              mobileView === 'list' ? 'hidden lg:block' : 'block'
            }`}
          >
            <ServicesMap
              providers={mapPlaces}
              selectedProviderId={selectedFacilityId}
              onSelectProvider={(id) => {
                setSelectedFacilityId(id);
                const element = document.getElementById(`facility-${id}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              userLocation={userLocation}
              activeDestination={activeDestination}
              onStartNavigation={(place) => {
                setActiveDestination(place);
                setSelectedFacilityId(place.id);
                setMobileView('map');
              }}
              onStopNavigation={() => setActiveDestination(null)}
              onScanClosest={handleScanClosestHospital}
              isScanning={isScanning}
              center={userLocation || [DEFAULT_CITY.lat, DEFAULT_CITY.lng]}
              searchLabel={searchQuery || selectedCategory !== 'all' ? selectedCategory : 'hospital'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HealthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">Loading healthcare directory...</p>
          </div>
        </div>
      }
    >
      <HealthDirectoryContent />
    </Suspense>
  );
}
