import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Target, HeartHandshake, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Hero */}
      <div className="bg-white border-b border-neutral-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 inline-block mb-4">
            About CivicTrust
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
            Building Trusted Civic Infrastructure for Nigeria
          </h1>
          <p className="text-base md:text-lg text-neutral-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            CivicTrust is a unified technology network connecting Nigerian citizens with authentic local trades, accredited healthcare centers, free AI-guided revision tools, and community action forums.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* The Problem & Our Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-neutral-900">
              Why CivicTrust Was Built
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              In Nigerian cities like Abuja, Lagos, and Port Harcourt, finding a dependable electrician, emergency hospital desk, or verified secondary school study resources is often fraught with guesswork, inflated prices, and unverified claims.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              CivicTrust establishes an uncompromising verification standard. We do not tolerate fake reviews, paid artificial badges, or fabricated analytics. Every listing is audited against government records or verified community proof of work.
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-3xl p-8 text-white space-y-4 shadow-sm">
            <h3 className="text-xl font-bold">Our Three Core Pillars</h3>
            <div className="space-y-3 text-xs text-emerald-100">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span><strong>Verified Trades:</strong> Certified solar technicians, plumbers, mechanics, and laptop engineers.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span><strong>AI Study Engine:</strong> Accessible WAEC, JAMB, and NECO exam guidance powered by ethical AI tutoring.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span><strong>Essential Healthcare:</strong> Accurate hospital numbers, 24/7 trauma emergency care, and licensed pharmacies.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Standards */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">
            The CivicTrust Verification Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-sm font-bold text-neutral-900">Identity & CAC Vetting</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                National Identity Number (NIN) confirmation, Corporate Affairs Commission (CAC) business registry check, and permanent workshop address confirmation.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-sm font-bold text-neutral-900">Practical Demonstration</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Verification of past completed jobs, customer receipts, and trade association membership (e.g. Electrical or Mechanic union credentials).
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-sm font-bold text-neutral-900">Continuous Accountability</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Any verified provider with unresolved fraud, safety complaints, or price-gouging reports is immediately audited and suspended.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-neutral-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Get Involved with CivicTrust</h3>
            <p className="text-xs text-neutral-300">
              Whether you are a tradesperson, a student, or a community volunteer, join the verified network.
            </p>
          </div>
          <Link
            href="/services"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shrink-0 inline-flex items-center gap-2"
          >
            Explore the Platform
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
