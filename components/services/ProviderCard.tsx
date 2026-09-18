'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Provider } from '@/lib/types';
import { 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Navigation, 
  Clock, 
  Star, 
  ArrowRight,
  Bookmark,
  FlaskConical,
  Building
} from 'lucide-react';
import { getBusinessStatus } from '@/lib/utils/hours';
import { formatDistance } from '@/lib/utils/distance';
import { getCategoryById } from '@/lib/data/categories';

interface ProviderCardProps {
  provider: Provider & { distanceMiles?: number; isOpen?: boolean };
  isSelected?: boolean;
  onHover?: () => void;
  onNavigate?: (provider: Provider & { distanceMiles?: number; isOpen?: boolean }) => void;
  isSavedInitial?: boolean;
}

export default function ProviderCard({
  provider,
  isSelected,
  onHover,
  onNavigate,
  isSavedInitial = false
}: ProviderCardProps) {
  const [isSaved, setIsSaved] = useState(isSavedInitial);
  const status = getBusinessStatus(provider.hours);
  const categoryInfo = getCategoryById(provider.category);
  const isVerified = provider.verification_status === 'verified';

  // Category image fallbacks for visual richness
  const categoryImages: { [key: string]: string } = {
    electrician: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    plumber: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80',
    mechanic: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    'phone-laptop': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
    cleaner: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    tutor: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
    other: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
  };

  const cardImage = provider.photos?.[0] || categoryImages[provider.category] || categoryImages.other;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    provider.address
  )}`;

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    try {
      await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'usr-demo-1',
          type: 'providers',
          itemId: provider.id
        })
      });
    } catch (err) {
      console.error('Failed to toggle save:', err);
    }
  };

  return (
    <div
      id={`provider-${provider.id}`}
      onMouseEnter={onHover}
      className={`group bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
        isSelected
          ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-subtle'
      }`}
    >
      <div>
        {/* Top Visual Image Banner */}
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
          <img
            src={cardImage}
            alt={provider.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10" />

          {/* Top floating badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md text-slate-800 shadow-xs">
              {categoryInfo?.name || provider.category}
            </span>

            <div className="flex items-center gap-1.5">
              {provider.is_demo && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-amber-500/90 text-white backdrop-blur-sm shadow-xs">
                  <FlaskConical className="w-3 h-3" />
                  <span>Demo</span>
                </span>
              )}

              <button
                type="button"
                onClick={handleToggleSave}
                className={`p-1.5 rounded-full backdrop-blur-md shadow-xs transition ${
                  isSaved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/90 text-slate-700 hover:bg-white hover:text-emerald-600'
                }`}
                title={isSaved ? 'Remove from saved' : 'Save provider'}
                aria-label="Bookmark provider"
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Bottom on-image badges: Verified & Open Status */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
            {isVerified ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-600/95 backdrop-blur-sm text-white font-semibold text-[11px] shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Helpora Verified</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/80 backdrop-blur-sm text-slate-300 text-[10.5px]">
                <span>Registered Provider</span>
              </span>
            )}

            <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold backdrop-blur-sm ${
              status.isOpen ? 'bg-white/95 text-emerald-700' : 'bg-slate-900/80 text-slate-300'
            }`}>
              {status.isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          {/* Provider Title & Ratings */}
          <div className="mb-2">
            <Link
              href={`/services/provider/${provider.id}`}
              className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center justify-between"
            >
              <span className="line-clamp-1">{provider.name}</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </Link>

            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-amber-950">
                  {provider.avg_rating > 0 ? provider.avg_rating.toFixed(1) : 'New'}
                </span>
              </div>
              <span className="text-xs text-slate-500">
                ({provider.review_count} {provider.review_count === 1 ? 'review' : 'reviews'})
              </span>
              {provider.distanceMiles !== undefined && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded ml-auto">
                  {formatDistance(provider.distanceMiles)}
                </span>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-1.5 text-xs text-slate-600 mt-2.5 mb-2.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
            <span className="line-clamp-1">{provider.address}</span>
          </div>

          {/* Services Pills */}
          {provider.services && provider.services.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {provider.services.slice(0, 3).map((service, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                >
                  {service}
                </span>
              ))}
              {provider.services.length > 3 && (
                <span className="text-[11px] text-slate-400 self-center px-1">
                  +{provider.services.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Actions Footer: Call, Directions, View Profile */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
        <a
          href={`tel:${provider.phone.replace(/[^0-9+]/g, '')}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 transition shadow-xs"
          title={`Call ${provider.phone}`}
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span className="truncate">{provider.phone}</span>
        </a>

        {onNavigate ? (
          <button
            type="button"
            onClick={() => onNavigate(provider)}
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition active:scale-95"
            title="Navigate on Map"
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-600" />
            <span>Navigate</span>
          </button>
        ) : (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
            title="Open Directions in Map"
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Directions</span>
          </a>
        )}

        <Link
          href={`/services/provider/${provider.id}`}
          className="inline-flex items-center justify-center py-2 px-3.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition shadow-xs"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}
