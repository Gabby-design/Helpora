'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AlertOctagon, Send, CheckCircle2, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function ReportViolationPage() {
  const [targetType, setTargetType] = useState('provider');
  const [targetName, setTargetName] = useState('');
  const [reason, setReason] = useState('fraud');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/safety"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Safety & Trust
          </Link>
          <span className="text-xs uppercase tracking-wider font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
            Helpora Trust & Audit Desk
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Report a Violation or Safety Concern
              </h1>
              <p className="text-xs text-slate-500">
                Submit an urgent review for fraudulent behavior, counterfeit licenses, or harassment.
              </p>
            </div>
          </div>

          <div className="my-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
            <strong>Confidential Submission:</strong> All reports are reviewed by Helpora compliance officers. Your identity is kept confidential and will not be disclosed to the reported entity without your written permission.
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-950">Violation Report Logged</h3>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                Thank you for protecting our marketplace. The Helpora review committee has opened an investigation file for &quot;{targetName}&quot;. We will review any transaction logs and follow up at {contactEmail}.
              </p>
              <Link
                href="/"
                className="mt-4 inline-block px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow"
              >
                Return to Helpora Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Entity Type *
                  </label>
                  <select
                    value={targetType}
                    onChange={(e) => setTargetType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-600"
                  >
                    <option value="provider">Service Provider / Tradesperson</option>
                    <option value="health">Healthcare Center / Pharmacy</option>
                    <option value="review">Deceptive Review or Spam</option>
                    <option value="other">Other Platform Abuse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Name of Business or Individual *
                  </label>
                  <input
                    type="text"
                    required
                    value={targetName}
                    onChange={(e) => setTargetName(e.target.value)}
                    placeholder="e.g., Banex Fast Electricals"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Violation Category *
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-600"
                >
                  <option value="fraud">Financial Fraud or Upfront Deposit Theft</option>
                  <option value="fake_credential">Fake License or Falsified CAC Registration</option>
                  <option value="shoddy_work">Dangerous / Shoddy Electrical or Plumbing Work</option>
                  <option value="harassment">Unprofessional Conduct or Harassment</option>
                  <option value="fake_review">Fake or Manipulated Reviews</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Contact Email (For Investigation Follow-Up) *
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="e.g., citizen@domain.ng"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Incident Evidence & Summary *
                </label>
                <textarea
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the timeline, what was quoted versus charged, dates, and any WhatsApp receipts or evidence..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-600 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Incident Report to Helpora Trust Committee
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
