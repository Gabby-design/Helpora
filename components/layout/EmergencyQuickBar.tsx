'use client';

import React, { useState, useEffect } from 'react';
import { PhoneCall, AlertCircle, Copy, Check, ChevronDown, ChevronUp, HeartPulse } from 'lucide-react';
import Link from 'next/link';
import { EmergencyContact } from '@/lib/types';

export default function EmergencyQuickBar() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  useEffect(() => {
    fetch('/api/emergency-contacts')
      .then(res => res.json())
      .then(json => {
        if (json.success && Array.isArray(json.data)) {
          setContacts(json.data);
        }
      })
      .catch(err => {
        console.warn('Could not load emergency contacts:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleCopy = (num: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(num);
      setCopiedNumber(num);
      setTimeout(() => setCopiedNumber(null), 2000);
    }
  };

  const urgentContact = contacts.find(c => c.urgent) || contacts[0];

  return (
    <aside
      aria-label="Emergency quick access bar"
      className="bg-slate-950 text-white text-xs border-b border-rose-950 transition-all relative z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Emergency Tagline & Critical Notice */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <div className="flex items-center gap-1.5 font-bold text-rose-300">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="tracking-wider uppercase text-[10.5px]">Emergency Dispatch:</span>
          </div>
          <span className="hidden md:inline text-slate-300 text-[11px]">
            For immediate danger, contact your local emergency service or dial 112.
          </span>
        </div>

        {/* Desktop Verified Contacts List */}
        <div className="hidden sm:flex items-center gap-2.5">
          {isLoading ? (
            <span className="text-slate-400 text-[11px]">Loading emergency lines...</span>
          ) : contacts.length === 0 ? (
            <span className="text-slate-400 text-[11px]">
              For immediate danger, please dial your municipal or regional emergency services line.
            </span>
          ) : (
            contacts.slice(0, 4).map(contact => (
              <div
                key={contact.id}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] transition ${
                  contact.urgent
                    ? 'bg-rose-950/80 border-rose-600/70 text-white font-semibold'
                    : 'bg-slate-900/90 border-slate-800 text-slate-200'
                }`}
              >
                <span className="text-[10px] text-slate-400">{contact.name}:</span>
                <a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:underline flex items-center gap-1 font-bold text-rose-300 tracking-wide"
                  title={`Call ${contact.name} at ${contact.phone}`}
                >
                  <PhoneCall className="w-3 h-3 text-rose-400" />
                  <span>{contact.phone}</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(contact.phone)}
                  className="text-slate-400 hover:text-white ml-0.5"
                  title="Copy number"
                  aria-label={`Copy ${contact.name} phone number`}
                >
                  {copiedNumber === contact.phone ? (
                    <Check className="w-2.5 h-2.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-2.5 h-2.5" />
                  )}
                </button>
              </div>
            ))
          )}

          <Link
            href="/health"
            className="text-[11px] font-semibold text-rose-300 hover:text-white underline ml-1 flex items-center gap-1 transition"
          >
            <HeartPulse className="w-3 h-3" />
            <span>Health & Help Directory →</span>
          </Link>
        </div>

        {/* Mobile Quick Action Buttons */}
        <div className="sm:hidden flex items-center gap-2">
          {urgentContact && (
            <a
              href={`tel:${urgentContact.phone.replace(/[^0-9+]/g, '')}`}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 shadow-sm"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Call {urgentContact.phone}</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="text-slate-300 text-xs flex items-center gap-1 px-1.5 py-1 rounded bg-slate-900 border border-slate-800"
            aria-expanded={isMobileExpanded}
          >
            <span>All lines</span>
            {isMobileExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expanded Mobile Tray */}
      {isMobileExpanded && (
        <div className="sm:hidden px-4 pb-3 pt-2 border-t border-slate-800 bg-slate-950/98 space-y-2">
          <p className="text-[11px] text-slate-400 leading-tight">
            For immediate danger or lifethreatening emergencies, contact your local authority directly.
          </p>

          <div className="divide-y divide-slate-800/80">
            {contacts.map(contact => (
              <div key={contact.id} className="py-1.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-200">{contact.name}</p>
                  <p className="text-[10px] text-slate-400">{contact.service_type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-bold text-rose-400 hover:underline flex items-center gap-1"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>{contact.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(contact.phone)}
                    className="text-slate-400 p-1"
                    aria-label={`Copy ${contact.name}`}
                  >
                    {copiedNumber === contact.phone ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center border-t border-slate-800">
            <Link
              href="/health"
              onClick={() => setIsMobileExpanded(false)}
              className="text-xs font-semibold text-rose-300 hover:text-white underline inline-flex items-center gap-1"
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Open Local Health & Care Facilities Directory →</span>
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
