import React from 'react';
import Link from 'next/link';
import { FileText, ShieldAlert, Scale, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <div className="bg-white border-b border-neutral-200 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 inline-block mb-3">
            Platform Agreement
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 mt-2">
            Effective Date: September 2026 &bull; CivicTrust Verified Civic Network
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm space-y-8 text-neutral-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-700" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the CivicTrust verified platform (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the application.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">
              2. Verified Service Providers
            </h2>
            <p>
              CivicTrust audits business registration, national identification, and professional references before conferring verified status. However, service agreements, payments, and warranties for completed work remain directly between the customer and the independent service contractor.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">
              3. Emergency Information Disclaimer
            </h2>
            <p>
              CivicTrust provides verified dispatch numbers for Nigerian emergency agencies (such as 112 National Dispatch, 199 Fire, 122 FRSC, and 6232 NCDC). While we maintain accuracy with federal agencies, CivicTrust is a directory technology platform and does not operate emergency response teams directly. In critical emergencies, always contact local authorities immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">
              4. Authentic Review Policy
            </h2>
            <p>
              Users agree to submit only genuine, firsthand reviews of service providers. Submitting fabricated ratings, competitor attacks, or deceptive endorsements violates our code of conduct and will result in permanent suspension.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">
              5. Educational & AI Content
            </h2>
            <p>
              The CivicTrust AI Study Engine is designed for pedagogical revision and academic guidance. It is not an accredited degree-granting entity. Students should verify syllabus changes directly with examination bodies (WAEC, NECO, JAMB).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
