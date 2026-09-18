import React from 'react';
import Link from 'next/link';
import { FileText, ShieldAlert, Scale, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
            <Scale className="w-4 h-4 text-emerald-600" />
            Platform Agreement
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-3">
            Effective Date: September 2026 &bull; Helpora Marketplace Platform
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the Helpora website, directory, and services (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the application.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              2. Independent Service Providers
            </h2>
            <p>
              Helpora audits business registration, identification, and professional credentials before conferring the verified badge. However, service agreements, payment schedules, and warranties for completed work remain directly between the customer and the independent service contractor.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              3. Emergency Information Disclaimer
            </h2>
            <p>
              Helpora provides verified dispatch numbers for Nigerian emergency agencies (such as 112 National Dispatch, 199 Fire, 122 FRSC, and 6232 NCDC). While we maintain accuracy with public directories, Helpora is a directory and marketplace platform and does not operate emergency response teams directly. In life-threatening emergencies, always dial <strong>112</strong> immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              4. Authentic Review Policy
            </h2>
            <p>
              Users agree to submit only genuine, firsthand reviews of service providers. Submitting fabricated ratings, competitor attacks, or deceptive endorsements violates our community standards and will result in permanent account suspension.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              5. Educational & AI Content
            </h2>
            <p>
              The Helpora AI Study Companion is designed for pedagogical revision and academic guidance. It is not an accredited degree-granting entity. Students should confirm examination dates and official syllabus changes directly with examination bodies (WAEC, NECO, JAMB).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
