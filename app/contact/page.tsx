'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-neutral-200 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 inline-block mb-3">
            Get in Touch
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Contact CivicTrust Team
          </h1>
          <p className="text-sm md:text-base text-neutral-600 mt-2 max-w-xl mx-auto">
            Have questions about business verification, need technical help, or wish to partner with our civic initiatives? We are here to assist.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Direct Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4">
                  Civic Headquarters
                </h3>
                <div className="space-y-4 text-xs text-neutral-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Central Business District, Abuja, Federal Capital Territory, Nigeria</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>+234 (0) 9 461 4000</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>support@civictrust.ng</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Mon &ndash; Fri: 8:00 AM &ndash; 5:00 PM WAT</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <p className="text-[11px] text-neutral-400">
                  For immediate police, fire, or road emergencies, please dial <strong>112</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-neutral-900 mb-1">
                Send Us a Message
              </h2>
              <p className="text-xs text-neutral-500 mb-6">
                Our operations team usually responds within 24 business hours.
              </p>

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                  <h3 className="text-base font-bold text-emerald-950">Thank You, {name}!</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                    Your inquiry has been received by our Abuja dispatch team. A verification coordinator will reach out to you at {email}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="mt-4 px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-xl hover:bg-emerald-900 transition"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Tunde Adeleke"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., tunde@domain.ng"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Inquiry Type *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <option value="general">General Question</option>
                      <option value="verification">Provider Verification & CAC Inspection</option>
                      <option value="partner">Non-Profit / Health Facility Partnership</option>
                      <option value="report">Feedback or Bug Report</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Explain your question or request in detail..."
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
