'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Provider } from '@/lib/types';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Navigation, 
  Clock, 
  Star, 
  ArrowRight,
  Sparkles,
  Bookmark,
  FlaskConical
} from 'lucide-react';
import { getBusinessStatus } from '@/lib/utils/hours';
import { formatDistance } from '@/lib/utils/distance';
import { getCategoryById } from '@/lib/data/categories';

interface ProviderCardProps {
  provider: Provider & { distanceMiles?: number; isOpen?: boolean };
  isSelected?: boolean;
  onHover?: () => void;
  isSavedInitial?: boolean;
}

export default function ProviderCard({
  provider,
  isSelected,
  onHover,
  isSavedInitial = false
}: ProviderCardProps) {
  const [isSaved, setIsSaved] = useState(isSavedInitial);
  const status = getBusinessStatus(provider.hours);
  const categoryInfo = getCategoryById(provider.category);
  const isVerified = provider.verification_status === 'verified';

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
          ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-lg'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <div className="p-5">
        {/* Top Header: Category Tag & Status Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              {categoryInfo?.name || provider.category}
            </span>

            {/* Clear Demo indicator if sample record */}
            {provider.is_demo && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                <FlaskConical className="w-2.5 h-2.5 text-amber-700" />
                <span>Demo Record</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {isVerified ? (
              <span 
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300"
                title={provider.license_number ? `Audited: ${provider.license_number}` : 'CivicTrust Audited Listing'}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verified</span>
              </span>
            ) : provider.verification_status === 'pending' ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Pending Audit</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                <AlertTriangle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Unverified</span>
              </span>
            )}

            <button
              type="button"
              onClick={handleToggleSave}
              className={`p-1.5 rounded-lg border transition ${
                isSaved
                  ? 'bg-brand-50 border-brand-300 text-brand-600'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save provider'}
              aria-label="Bookmark provider"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-brand-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Provider Name and Ratings */}
        <div className="mb-2">
          <Link
            href={`/services/provider/${provider.id}`}
            className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors flex items-center justify-between"
          >
            <span className="line-clamp-1">{provider.name}</span>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
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
            {provider.license_number && (
              <span className="hidden sm:inline text-[11px] text-slate-400 truncate max-w-[160px]">
                • {provider.license_number}
              </span>
            )}
          </div>
        </div>

        {/* Address and Distance */}
        <div className="flex items-start gap-1.5 text-xs text-slate-600 mt-2 mb-2">
          <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
          <span className="line-clamp-1">{provider.address}</span>
          {provider.distanceMiles !== undefined && (
            <span className="font-semibold text-brand-700 shrink-0 bg-brand-50 px-1.5 py-0.5 rounded ml-auto">
              {formatDistance(provider.distanceMiles)}
            </span>
          )}
        </div>

        {/* Operating Hours & Status */}
        <div className="flex items-center gap-1.5 text-xs mt-1 mb-3">
          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span
            className={`font-semibold ${
              status.isOpen ? 'text-emerald-700' : 'text-slate-500'
            }`}
          >
            {status.statusText}
          </span>
          <span className="text-slate-400 hidden sm:inline">
            ({status.todayHoursText})
          </span>
        </div>

        {/* Specific Services Offered */}
        {provider.services && provider.services.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {provider.services.slice(0, 3).map((service, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md"
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

      {/* Card Actions Footer: Phone Call, Directions, Profile */}
      <div className="px-5 py-3 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between gap-2.5">
        <a
          href={`tel:${provider.phone.replace(/[^0-9+]/g, '')}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 transition shadow-xs"
          title={`Call ${provider.phone}`}
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span className="truncate">{provider.phone}</span>
        </a>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition"
          title="Open Directions in Map"
        >
          <Navigation className="w-3.5 h-3.5 text-brand-600" />
          <span className="hidden sm:inline">Directions</span>
        </a>

        <Link
          href={`/services/provider/${provider.id}`}
          className="inline-flex items-center justify-center py-2 px-3.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition shadow-xs"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}
