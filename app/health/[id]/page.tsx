'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldAlert, 
  ArrowLeft, 
  CheckCircle2, 
  Navigation, 
  Share2, 
  Pill, 
  Stethoscope, 
  HeartHandshake,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { HealthResource } from '@/lib/types';

export default function HealthDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [resource, setResource] = useState<HealthResource | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/health-resources/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.id) setResource(data);
      })
      .catch(err => console.error('Failed to load health facility:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = () => {
    if (navigator.share && resource) {
      navigator.share({
        title: resource.name,
        text: `Healthcare Resource: ${resource.name} in ${resource.city}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-neutral-500 text-sm">Loading verified healthcare facility...</p>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 text-center max-w-md shadow-sm">
          <Building2 className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-neutral-800">Facility Not Found</h2>
          <p className="text-xs text-neutral-500 mt-1 mb-6">
            The healthcare listing requested could not be retrieved from the Helpora directory.
          </p>
          <Link
            href="/health"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Health Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Emergency Notice */}
      {resource.emergencyServices && (
        <div className="bg-rose-900 text-white px-4 py-3 border-b border-rose-950">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-300 shrink-0" />
              <span>
                <strong>24-Hour Emergency Trauma Unit:</strong> Available at this facility.
              </span>
            </div>
            <a href={`tel:${resource.phone}`} className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded font-bold underline">
              Direct Desk: {resource.phone}
            </a>
          </div>
        </div>
      )}

      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/health"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-emerald-700 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Health Directory
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? 'Link Copied!' : 'Share Facility'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 capitalize">
              {resource.category}
            </span>

            {resource.is24Hours && (
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Open 24 Hours
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-2">
            {resource.name}
          </h1>

          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{resource.address}, {resource.city}, {resource.state}</span>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2 pb-6 border-b border-neutral-200">
            <a
              href={`tel:${resource.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-sm transition"
            >
              <Phone className="w-4 h-4" />
              Call {resource.phone}
            </a>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${resource.name} ${resource.address} ${resource.city}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-sm transition border border-neutral-300"
            >
              <Navigation className="w-4 h-4 text-neutral-600" />
              Directions & Map
            </a>
          </div>

          {/* Overview */}
          <div className="py-6 border-b border-neutral-200">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-3">
              About This Healthcare Center
            </h2>
            <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
              {resource.description}
            </p>
          </div>

          {/* Services Provided */}
          <div className="py-6 border-b border-neutral-200">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4">
              Services & Departments
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(resource.servicesOffered || resource.services || []).map((service: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Info */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <span className="text-xs font-semibold text-neutral-500 block mb-1">Operating Schedule</span>
              <p className="text-sm font-bold text-neutral-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700" />
                {resource.operatingHours}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <span className="text-xs font-semibold text-neutral-500 block mb-1">Emergency Readiness</span>
              <p className="text-sm font-bold text-neutral-800 flex items-center gap-2">
                <ShieldAlert className={`w-4 h-4 ${resource.emergencyServices ? 'text-rose-600' : 'text-neutral-400'}`} />
                {resource.emergencyServices ? 'Equipped for Emergencies' : 'Standard Routine Consultations'}
              </p>
            </div>
          </div>
        </div>

        {/* Verification Note */}
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-950 leading-relaxed">
            <p className="font-bold text-emerald-900 mb-0.5">Helpora Verified Healthcare Resource</p>
            This healthcare resource has been verified against official public listings in the Federal Capital Territory / Nigerian health registry. If you notice any discrepancy or emergency desk updates, please contact Helpora moderators.
          </div>
        </div>
      </div>
    </div>
  );
}
