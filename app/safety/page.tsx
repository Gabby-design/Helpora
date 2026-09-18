import React from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertTriangle, Phone, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <div className="bg-white border-b border-neutral-200 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 inline-block mb-3">
            Civic Community Guidelines
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Trust & Community Safety
          </h1>
          <p className="text-sm md:text-base text-neutral-600 mt-2 max-w-xl mx-auto">
            Practical guidelines for safely hiring local tradespeople, avoiding impersonation scams, and verifying credentials in Nigeria.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Safety Tips Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-neutral-900">Check the Badge</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Always verify that a provider has a &quot;Verified Partner&quot; badge on CivicTrust. Beware of unverified third parties claiming affiliation without an active profile.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-neutral-900">Never Pay Full Upfront</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Agree on milestone-based payments (e.g., initial materials deposit upon physical arrival, balance upon inspection of working equipment).
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-neutral-900">Document Work Orders</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Request written invoices or WhatsApp message agreements specifying repair warranties, replacement parts, and labor costs before work begins.
            </p>
          </div>
        </div>

        {/* Emergency Escalation */}
        <div className="bg-rose-900 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Direct Emergency Dispatch
            </div>
            <h3 className="text-xl font-bold">Encountered an Acute Danger or Crime?</h3>
            <p className="text-xs text-rose-100/90 leading-relaxed">
              If you suspect fraud, physical danger, or domestic emergencies, immediately dial the Nigerian National Toll-Free Dispatcher: <strong>112</strong>.
            </p>
          </div>

          <a
            href="tel:112"
            className="px-6 py-3 bg-white text-rose-900 font-bold text-xs rounded-xl shadow-md hover:bg-neutral-100 transition shrink-0 inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Dial 112 Toll-Free
          </a>
        </div>

        {/* Report Misconduct */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm text-center max-w-xl mx-auto space-y-3">
          <h3 className="text-base font-bold text-neutral-900">Report an Unethical Provider</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            If a listed tradesperson charged unauthorized fees, failed to appear, or displayed unprofessional behavior, report them immediately to protect the community.
          </p>
          <Link
            href="/report"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-xl transition"
          >
            File a Violation Report
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
