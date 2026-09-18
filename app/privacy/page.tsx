import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <div className="bg-white border-b border-neutral-200 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 inline-block mb-3">
            Legal & Compliance
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Privacy Policy & Data Protection
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 mt-2">
            Effective Date: September 2026 &bull; Compliant with Nigeria Data Protection Act (NDPA)
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm space-y-8 text-neutral-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              1. Our Data Protection Commitment
            </h2>
            <p>
              CivicTrust is dedicated to safeguarding the personal data of Nigerian citizens, service providers, students, and healthcare administrators. We collect only what is strictly necessary to facilitate verified connections and improve community civic awareness.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 text-xs md:text-sm">
              <li><strong>Provider Listings:</strong> Business name, CAC registration number, workshop address, phone number, and trade qualifications.</li>
              <li><strong>Citizen Usage:</strong> Bookmarked listings and volunteer application submissions.</li>
              <li><strong>AI Tutor Interactions:</strong> Question prompts submitted to our AI study engine are processed strictly to return educational guidance. We do not sell student query histories.</li>
              <li><strong>Device & Location:</strong> Browser-provided city or coordinate inputs (used solely to show proximate services and emergency resources with your consent).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">
              3. Zero Sale of Personal Data
            </h2>
            <p>
              CivicTrust does not monetize citizen data, nor do we sell lead lists or contact phone numbers to third-party telemarketers or predatory financial services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">
              4. Community Incident Reports
            </h2>
            <p>
              Information posted on public community reporting feeds (such as photos and descriptions of road hazards or electrical faults) is publicly visible to foster transparency and accelerate government resolution. Citizens may submit community reports anonymously.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">
              5. Contacting the Data Protection Officer
            </h2>
            <p>
              To request deletion of your account or inspect the records stored under your profile, contact our compliance desk at <strong>privacy@civictrust.ng</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
