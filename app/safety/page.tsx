import React from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertTriangle, Phone, CheckCircle2, Lock, ArrowRight, Eye, Flag, ShieldAlert } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero */}
      <div className="bg-white border-b border-slate-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Safety & Trust at Helpora
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Your Safety Comes First
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Practical guidelines, verification standards, and reporting mechanisms designed to protect both clients and independent professionals in Nigeria.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        {/* Core Safety Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">Look for the Badge</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Always look for the <strong>Helpora Verified</strong> badge on provider cards and profiles. Verified listings have had their business documents and credentials manually audited.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900">Milestone Payments</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never pay 100% upfront for service work before materials arrive or diagnosis is performed. Agree on fair milestones: initial deposit for verifiable parts, balance upon satisfactory job completion.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900">Document Estimates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Request a clear breakdown of parts versus labor costs over WhatsApp or written invoice before work begins. Clarify warranty terms on repairs upfront.
            </p>
          </div>
        </div>

        {/* Safety Pillars Explained */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900">
            How Helpora Protects the Community
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600">
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Provider Verification
              </div>
              <p>We review government-issued identification, CAC company registrations, and verifiable work history before granting the verified status.</p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Eye className="w-4 h-4 text-emerald-600" />
                Transparent Profiles
              </div>
              <p>Every profile displays authentic customer reviews, listed services, direct telephone lines, and operating schedules without artificial paywalls.</p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Flag className="w-4 h-4 text-emerald-600" />
                Active Review Moderation
              </div>
              <p>We monitor feedback to prevent spam, counterfeit testimonials, and retaliatory ratings. Honest citizen experiences keep our community safe.</p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <ShieldAlert className="w-4 h-4 text-emerald-600" />
                Dispute & Reporting Desk
              </div>
              <p>If you encounter unprofessional conduct, deceptive pricing, or shoddy workmanship, our compliance team investigates promptly.</p>
            </div>
          </div>
        </div>

        {/* Emergency Escalation */}
        <div className="bg-gradient-to-r from-slate-900 to-rose-950 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Immediate Emergency Dispatch
            </div>
            <h3 className="text-xl font-bold">Encountered Acute Danger or Crime?</h3>
            <p className="text-xs text-rose-100/80 leading-relaxed">
              For active criminal behavior, physical danger, or medical trauma emergencies, immediately dial the Nigerian National Emergency Dispatcher toll-free: <strong>112</strong>.
            </p>
          </div>

          <a
            href="tel:112"
            className="px-6 py-3 bg-white text-rose-950 font-bold text-xs rounded-xl shadow-md hover:bg-slate-100 transition shrink-0 inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-rose-700" />
            Dial 112 Toll-Free
          </a>
        </div>

        {/* Report Misconduct */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center max-w-xl mx-auto space-y-3">
          <h3 className="text-base font-bold text-slate-900">Need to Report a Listing?</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            If you experienced counterfeit credentials, deposit fraud, or poor service from any listing on Helpora, file a confidential report with our audit desk.
          </p>
          <Link
            href="/report"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow"
          >
            File a Violation Report
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
