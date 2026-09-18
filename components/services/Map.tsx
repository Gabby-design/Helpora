'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  Navigation, 
  Phone, 
  MapPin, 
  Compass, 
  CheckCircle2, 
  X, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Building2, 
  Pill, 
  Stethoscope, 
  ShieldAlert, 
  LocateFixed, 
  Loader2,
  ExternalLink,
  Car,
  Footprints
} from 'lucide-react';
import { 
  Coordinates, 
  RouteResult, 
  fetchLiveRoute, 
  calculateDistanceKm, 
  formatDistanceKm 
} from '@/lib/services/navigator';

export interface MapPlace {
  id: string;
  name: string;
  category?: string;
  type?: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  avg_rating?: number;
  review_count?: number;
  verification_status?: string;
  distanceMiles?: number;
  distanceKm?: number;
  isOpen?: boolean;
  hours?: any;
  is24Hours?: boolean;
  emergency_available?: boolean;
  services?: string[];
  photos?: string[];
}

interface MapProps {
  providers: MapPlace[];
  selectedProviderId?: string | null;
  onSelectProvider?: (id: string) => void;
  userLocation?: [number, number] | null;
  activeDestination?: MapPlace | null;
  onStartNavigation?: (place: MapPlace) => void;
  onStopNavigation?: () => void;
  onScanClosest?: () => void;
  isScanning?: boolean;
  center?: [number, number];
  zoom?: number;
  searchLabel?: string;
}

export default function ServicesMap({
  providers,
  selectedProviderId,
  onSelectProvider,
  userLocation,
  activeDestination,
  onStartNavigation,
  onStopNavigation,
  onScanClosest,
  isScanning = false,
  center = [9.0765, 7.3986], // Default Abuja, Nigeria
  zoom = 13,
  searchLabel
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [id: string]: any }>({});
  const userMarkerRef = useRef<any>(null);
  const routePolylinesRef = useRef<any[]>([]);

  // Navigation State
  const [liveRoute, setLiveRoute] = useState<RouteResult | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState<boolean>(false);
  const [showSteps, setShowSteps] = useState<boolean>(false);

  // Initialize and Update Leaflet Map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    let isMounted = true;

    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous instance if needed
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const initialCenter: [number, number] = userLocation 
        ? userLocation 
        : activeDestination 
        ? [activeDestination.lat, activeDestination.lng] 
        : center;

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: zoom,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // OpenStreetMap high quality tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
      markersRef.current = {};
      routePolylinesRef.current = [];

      // 1. Plot User Location if available
      if (userLocation && typeof userLocation[0] === 'number' && typeof userLocation[1] === 'number') {
        const userIconHtml = `
          <div class="relative flex items-center justify-center">
            <div class="w-7 h-7 rounded-full bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center text-white user-gps-marker">
              <div class="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>
            <div class="absolute -inset-2 rounded-full border-2 border-blue-400 animate-ping opacity-70 pointer-events-none"></div>
          </div>
        `;

        const userIcon = L.divIcon({
          className: 'custom-map-pin',
          html: userIconHtml,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -14]
        });

        const userMarker = L.marker(userLocation, { icon: userIcon, zIndexOffset: 1000 }).addTo(map);
        userMarker.bindPopup(`
          <div style="font-family: sans-serif; padding: 6px 10px; font-size: 12px; font-weight: bold; color: #1e3a8a;">
            📍 Your Current Location
          </div>
        `);
        userMarkerRef.current = userMarker;
      }

      // 2. Plot Places / Providers Markers
      const markerBounds: [number, number][] = [];
      if (userLocation) markerBounds.push(userLocation);

      providers.forEach((place) => {
        if (typeof place.lat !== 'number' || typeof place.lng !== 'number') return;

        const isDestination = activeDestination?.id === place.id;
        const isSelected = selectedProviderId === place.id;
        const isVerified = place.verification_status === 'verified';
        const isHealth = place.category === 'hospital' || place.category === 'clinic' || place.type === 'hospital' || place.type === 'clinic';
        const isEmergency = place.category === 'emergency' || place.is24Hours || place.emergency_available;

        // Pin styling
        let pinBg = 'bg-slate-800';
        let pinIcon = '•';

        if (isDestination) {
          pinBg = 'bg-emerald-600 ring-4 ring-emerald-300 animate-bounce';
          pinIcon = '🎯';
        } else if (isEmergency) {
          pinBg = 'bg-rose-600';
          pinIcon = '🚑';
        } else if (isHealth) {
          pinBg = 'bg-purple-600';
          pinIcon = '🏥';
        } else if (isVerified) {
          pinBg = 'bg-emerald-600';
          pinIcon = '✓';
        }

        const iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer transition-transform duration-200 ${
            isDestination ? 'scale-125 z-50' : isSelected ? 'scale-115 z-40' : 'hover:scale-110'
          }">
            <div class="w-8 h-8 rounded-full shadow-lg border-2 border-white flex items-center justify-center font-bold text-xs text-white ${pinBg}">
              ${pinIcon}
            </div>
            ${
              isDestination
                ? '<div class="absolute -inset-2 rounded-full border-2 border-emerald-500 animate-ping opacity-80"></div>'
                : ''
            }
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: iconHtml,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -16]
        });

        const marker = L.marker([place.lat, place.lng], { icon: customIcon }).addTo(map);

        const distKm = userLocation 
          ? calculateDistanceKm(userLocation[0], userLocation[1], place.lat, place.lng)
          : place.distanceKm;

        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          `${place.name} ${place.address}`
        )}`;

        const popupContent = `
          <div style="font-family: sans-serif; min-width: 230px; padding: 12px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 4px;">
              <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 2px 6px; border-radius: 4px; ${
                isVerified
                  ? 'background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0;'
                  : 'background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1;'
              }">
                ${isVerified ? '✓ Helpora Verified' : 'Community Listing'}
              </span>
              ${distKm !== undefined ? `<span style="font-size: 11px; font-weight: 700; color: #047857; background: #ecfdf5; padding: 2px 6px; border-radius: 4px;">${distKm} km</span>` : ''}
            </div>

            <h4 style="margin: 4px 0 2px 0; font-size: 14px; font-weight: 700; color: #0f172a;">
              ${place.name}
            </h4>
            <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748b;">
              ${place.category || place.type || 'Local Service'}
            </p>
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #475569; line-height: 1.3;">
              📍 ${place.address}
            </p>

            <div style="display: flex; gap: 6px; margin-top: 10px;">
              <button 
                id="nav-btn-${place.id}"
                style="flex: 1; text-align: center; background: #059669; color: white; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; border: none; cursor: pointer;"
              >
                🧭 Navigate Here
              </button>
              <a 
                href="tel:${place.phone.replace(/[^0-9+]/g, '')}"
                style="background: #f1f5f9; color: #0f172a; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 600; text-decoration: none;"
              >
                📞 Call
              </a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, { className: 'custom-popup' });

        marker.on('popupopen', () => {
          const btn = document.getElementById(`nav-btn-${place.id}`);
          if (btn) {
            btn.onclick = () => {
              if (onStartNavigation) {
                onStartNavigation(place);
              }
              marker.closePopup();
            };
          }
        });

        marker.on('click', () => {
          if (onSelectProvider) {
            onSelectProvider(place.id);
          }
        });

        markersRef.current[place.id] = marker;
        markerBounds.push([place.lat, place.lng]);
      });

      // Fit bounds appropriately
      if (!activeDestination) {
        if (markerBounds.length > 1) {
          map.fitBounds(markerBounds, { padding: [40, 40], maxZoom: 14 });
        } else if (markerBounds.length === 1) {
          map.setView(markerBounds[0], 13);
        }
      }
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [providers, userLocation]);

  // Handle active navigation route calculation & polyline drawing
  useEffect(() => {
    if (!activeDestination || !mapInstanceRef.current) {
      setLiveRoute(null);
      // Clean up previous route lines
      if (routePolylinesRef.current.length > 0) {
        routePolylinesRef.current.forEach((p) => p.remove());
        routePolylinesRef.current = [];
      }
      return;
    }

    let isSubscribed = true;
    setIsLoadingRoute(true);

    const originCoords: Coordinates = userLocation
      ? { lat: userLocation[0], lng: userLocation[1] }
      : { lat: center[0], lng: center[1] };

    const destCoords: Coordinates = {
      lat: activeDestination.lat,
      lng: activeDestination.lng
    };

    fetchLiveRoute(originCoords, destCoords)
      .then((route) => {
        if (!isSubscribed || !mapInstanceRef.current) return;

        setLiveRoute(route);
        setIsLoadingRoute(false);

        import('leaflet').then((L) => {
          if (!isSubscribed || !mapInstanceRef.current) return;

          // Remove any existing route polylines
          routePolylinesRef.current.forEach((p) => p.remove());
          routePolylinesRef.current = [];

          // 1. Outer Route Glow Line
          const glowPolyline = L.polyline(route.coordinates, {
            color: '#10B981',
            weight: 9,
            opacity: 0.35,
            lineCap: 'round',
            lineJoin: 'round'
          }).addTo(mapInstanceRef.current);

          // 2. Inner Primary Navigation Line
          const mainPolyline = L.polyline(route.coordinates, {
            color: '#059669',
            weight: 5,
            opacity: 0.95,
            lineCap: 'round',
            lineJoin: 'round'
          }).addTo(mapInstanceRef.current);

          routePolylinesRef.current = [glowPolyline, mainPolyline];

          // Fit map bounds to frame both user and destination with padding
          const routeBounds = L.latLngBounds(route.coordinates);
          mapInstanceRef.current.fitBounds(routeBounds, {
            padding: [60, 60],
            maxZoom: 16
          });
        });
      })
      .catch((err) => {
        console.error('Failed to load route:', err);
        setIsLoadingRoute(false);
      });

    return () => {
      isSubscribed = false;
    };
  }, [activeDestination, userLocation]);

  // Handle manual provider selection from card hover or click
  useEffect(() => {
    if (!selectedProviderId || !mapInstanceRef.current || activeDestination) return;
    const targetMarker = markersRef.current[selectedProviderId];
    if (targetMarker) {
      const latLng = targetMarker.getLatLng();
      mapInstanceRef.current.panTo(latLng, { animate: true, duration: 0.5 });
      targetMarker.openPopup();
    }
  }, [selectedProviderId, activeDestination]);

  const googleMapsUrl = activeDestination
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        `${activeDestination.name} ${activeDestination.address}`
      )}${userLocation ? `&origin=${userLocation[0]},${userLocation[1]}` : ''}`
    : '#';

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-3xl overflow-hidden shadow-inner border border-slate-200 flex flex-col">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full flex-1" />

      {/* Floating Header Controls */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
        {/* Scan Environment Button */}
        {onScanClosest && (
          <button
            type="button"
            onClick={onScanClosest}
            disabled={isScanning}
            className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900/90 hover:bg-slate-950 text-white rounded-xl shadow-lg backdrop-blur-md text-xs font-bold border border-slate-700 transition active:scale-95"
          >
            {isScanning ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            ) : (
              <LocateFixed className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span>{isScanning ? 'Scanning Environment...' : '📡 Scan Closest to Me'}</span>
          </button>
        )}

        {/* Live Navigation Active Badge */}
        {activeDestination && (
          <div className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>LIVE NAVIGATOR</span>
          </div>
        )}
      </div>

      {/* Active Navigation Heads-Up Display (HUD) */}
      {activeDestination && (
        <div className="absolute bottom-3 left-3 right-3 z-30 pointer-events-auto space-y-2">
          {/* Top Turn Maneuver Card */}
          <div className="bg-slate-950 text-white rounded-2xl p-4 shadow-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Compass className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-400">
                      Heading to
                    </span>
                    <span className="text-xs text-slate-400">&bull;</span>
                    <span className="text-xs text-slate-300 font-medium line-clamp-1">
                      {activeDestination.name}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {isLoadingRoute
                      ? 'Calculating optimal route...'
                      : liveRoute?.steps?.[0]?.instruction || `Navigate towards ${activeDestination.address}`}
                  </h3>
                </div>
              </div>

              {onStopNavigation && (
                <button
                  onClick={onStopNavigation}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                  title="Exit Navigation"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Distance & Travel Time Stats */}
            {liveRoute && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-2 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                  <Car className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block leading-tight">Drive ETA</span>
                    <span className="font-bold text-white">
                      {liveRoute.durationMinutes} mins ({liveRoute.distanceKm} km)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                  <Footprints className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block leading-tight">Walk ETA</span>
                    <span className="font-bold text-white">
                      ~{liveRoute.walkingMinutes} mins
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Start in Google Maps</span>
              </a>

              <a
                href={`tel:${activeDestination.phone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition border border-slate-700"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call</span>
              </a>

              {liveRoute?.steps && liveRoute.steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => setShowSteps(!showSteps)}
                  className="inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition border border-slate-700"
                >
                  <span>Steps</span>
                  {showSteps ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>

            {/* Expandable Step-by-Step Maneuver List */}
            {showSteps && liveRoute?.steps && (
              <div className="max-h-44 overflow-y-auto space-y-1.5 pt-2 border-t border-slate-800 text-xs text-slate-300 pr-1">
                {liveRoute.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 py-1 border-b border-slate-900 last:border-0">
                    <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-white leading-tight">{step.instruction}</p>
                      {step.distanceMeters > 0 && (
                        <span className="text-[10px] text-slate-400">
                          {step.distanceMeters > 1000 
                            ? `${(step.distanceMeters / 1000).toFixed(1)} km` 
                            : `${step.distanceMeters} m`}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
