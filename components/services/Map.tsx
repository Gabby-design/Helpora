'use client';

import React, { useEffect, useRef } from 'react';
import { Provider } from '@/lib/types';

interface MapProps {
  providers: (Provider & { distanceMiles?: number })[];
  selectedProviderId?: string | null;
  onSelectProvider?: (id: string) => void;
  center?: [number, number];
  zoom?: number;
}

export default function ServicesMap({
  providers,
  selectedProviderId,
  onSelectProvider,
  center = [30.2672, -97.7431], // Default Austin, TX
  zoom = 12
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [id: string]: any }>({});

  useEffect(() => {
    // Only run on browser
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    let isMounted = true;

    // Dynamically import Leaflet
    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initialize map
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
      markersRef.current = {};

      // Add provider markers
      const markerBounds: [number, number][] = [];

      providers.forEach((provider) => {
        if (typeof provider.lat !== 'number' || typeof provider.lng !== 'number') return;

        const isVerified = provider.verification_status === 'verified';
        const isSelected = provider.id === selectedProviderId;

        // Create custom HTML icon
        const iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer transition-transform duration-200 ${
            isSelected ? 'scale-125 z-50' : 'hover:scale-110'
          }">
            <div class="w-8 h-8 rounded-full shadow-lg border-2 flex items-center justify-center font-bold text-xs ${
              isVerified
                ? 'bg-emerald-600 border-white text-white'
                : 'bg-slate-700 border-white text-white'
            }">
              ${isVerified ? '✓' : '•'}
            </div>
            ${
              isSelected
                ? '<div class="absolute -inset-1.5 rounded-full border-2 border-brand-500 animate-ping opacity-75"></div>'
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

        const marker = L.marker([provider.lat, provider.lng], { icon: customIcon }).addTo(map);

        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          provider.address
        )}`;

        const popupContent = `
          <div style="font-family: sans-serif; min-width: 220px; padding: 12px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <span style="display: inline-block; font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 2px 6px; border-radius: 4px; ${
                isVerified
                  ? 'background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0;'
                  : 'background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1;'
              }">
                ${isVerified ? '✓ Verified Provider' : 'Unverified Listing'}
              </span>
            </div>
            <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0f172a;">
              ${provider.name}
            </h4>
            <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b;">
              ★ <strong>${provider.avg_rating || 'New'}</strong> (${provider.review_count} reviews)
            </p>
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #475569; line-height: 1.3;">
              📍 ${provider.address}
            </p>
            <div style="display: flex; gap: 6px; margin-top: 8px;">
              <a 
                href="/services/provider/${provider.id}" 
                style="flex: 1; text-align: center; background: #0f172a; color: white; padding: 5px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; text-decoration: none;"
              >
                View Profile
              </a>
              <a 
                href="${directionsUrl}" 
                target="_blank" 
                rel="noopener noreferrer" 
                style="background: #e2e8f0; color: #1e293b; padding: 5px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; text-decoration: none;"
              >
                Directions
              </a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, { className: 'custom-popup' });

        marker.on('click', () => {
          if (onSelectProvider) {
            onSelectProvider(provider.id);
          }
        });

        markersRef.current[provider.id] = marker;
        markerBounds.push([provider.lat, provider.lng]);
      });

      // Fit bounds if markers exist
      if (markerBounds.length > 1) {
        map.fitBounds(markerBounds, { padding: [40, 40], maxZoom: 14 });
      } else if (markerBounds.length === 1) {
        map.setView(markerBounds[0], 13);
      }
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [providers]);

  // Handle selected provider pan
  useEffect(() => {
    if (!selectedProviderId || !mapInstanceRef.current) return;
    const targetMarker = markersRef.current[selectedProviderId];
    if (targetMarker) {
      const latLng = targetMarker.getLatLng();
      mapInstanceRef.current.panTo(latLng, { animate: true, duration: 0.5 });
      targetMarker.openPopup();
    }
  }, [selectedProviderId]);

  return (
    <div className="relative w-full h-full min-h-[350px] rounded-2xl overflow-hidden shadow-inner border border-slate-200">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
        <span>Interactive Map: Click a pin to view & navigate</span>
      </div>
    </div>
  );
}
