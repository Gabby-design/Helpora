import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Legal & Compliance
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy & Data Protection
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-3">
            Effective Date: September 2026 &bull; Compliant with Nigeria Data Protection Act (NDPA)
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              1. Our Data Protection Commitment
            </h2>
            <p>
              Helpora is dedicated to safeguarding the personal information of Nigerian clients, service providers, students, and healthcare administrators. We collect only what is strictly necessary to facilitate verified connections and improve local service discoverability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-xs sm:text-sm">
              <li><strong>Provider Listings:</strong> Business name, CAC registration number, workshop address, telephone number, and trade qualifications.</li>
              <li><strong>Client Accounts:</strong> Name, contact email, bookmarked listings, and reviews submitted.</li>
              <li><strong>AI Tutor Interactions:</strong> Academic revision prompts submitted to our AI study engine are processed strictly to return educational explanations. We do not sell student query histories.</li>
              <li><strong>Device & Location:</strong> Browser-provided city or coordinate inputs (used solely with your explicit consent to calculate distance to nearby providers and health facilities).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              3. Zero Sale of Personal Data
            </h2>
            <p>
              Helpora does not monetize personal customer data, nor do we sell contact phone numbers to third-party telemarketers, cold-call agencies, or predatory financial services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              4. Community Incident Reports
            </h2>
            <p>
              Information posted on public community reporting feeds (such as photos and descriptions of road hazards or electrical faults) is publicly visible to foster civic transparency and help authorities take action. Citizens may submit community reports anonymously.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              5. Contacting Our Data Protection Desk
            </h2>
            <p>
              To request inspection, correction, or deletion of records stored under your profile, contact our compliance desk at <strong>privacy@helpora.ng</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
