'use client';

import React, { useState, useEffect } from 'react';
import SearchHero from '@/components/services/SearchHero';
import ProviderCard from '@/components/services/ProviderCard';
import { Provider } from '@/lib/types';
import { ShieldCheck, PlusCircle, ArrowRight, Wrench, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/providers')
      .then(res => res.json())
      .then(json => {
        if (json.success && Array.isArray(json.data)) {
          setProviders(json.data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-12 pb-20">
      <SearchHero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Verified Local Service Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse trade specialists in Abuja and surrounding regions with verified master licenses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/business/register"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Register Your Trade</span>
            </Link>

            <Link
              href="/services/search"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition shadow-xs"
            >
              <span>Map & Filter View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-brand-600 mx-auto" />
            <p className="text-xs font-semibold text-slate-600">Loading service providers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map(provider => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
