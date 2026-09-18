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
      aria-label="Helpora Emergency Quick Bar"
      className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800 transition-all relative z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Emergency Tagline */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[11px] font-semibold text-slate-100">Helpora Emergency:</span>
          </div>
          <span className="hidden lg:inline text-slate-400 text-[11px]">
            Dial 112 for toll-free Nigerian emergency dispatch (Police, Fire & Ambulance).
          </span>
        </div>

        {/* Desktop Quick Contacts */}
        <div className="hidden sm:flex items-center gap-2">
          {isLoading ? (
            <span className="text-slate-400 text-[11px]">Connecting lines...</span>
          ) : contacts.length === 0 ? (
            <span className="text-slate-400 text-[11px]">Dial 112 for nationwide emergency dispatch.</span>
          ) : (
            contacts.slice(0, 3).map(contact => (
              <div
                key={contact.id}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-[11px] text-slate-300"
              >
                <span className="text-[10.5px] text-slate-400">{contact.name}:</span>
                <a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-emerald-400 font-bold text-slate-100 flex items-center gap-1 transition"
                  title={`Call ${contact.name}`}
                >
                  <PhoneCall className="w-2.5 h-2.5 text-emerald-400" />
                  <span>{contact.phone}</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(contact.phone)}
                  className="text-slate-400 hover:text-white ml-0.5"
                  title="Copy number"
                  aria-label={`Copy ${contact.name} number`}
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
            href="/health?navigateClosest=true"
            className="text-[11px] font-bold text-emerald-300 hover:text-white flex items-center gap-1 ml-1 bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/60 px-2.5 py-0.5 rounded-full transition shadow-xs"
          >
            <HeartPulse className="w-3 h-3 text-emerald-400" />
            <span>🏥 Route to Closest Hospital →</span>
          </Link>
        </div>

        {/* Mobile Quick Action Buttons */}
        <div className="sm:hidden flex items-center gap-2">
          {urgentContact && (
            <a
              href={`tel:${urgentContact.phone.replace(/[^0-9+]/g, '')}`}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-2.5 py-1 rounded-md text-xs flex items-center gap-1 shadow-sm transition"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Call {urgentContact.phone}</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="text-slate-300 text-xs flex items-center gap-1 px-2 py-1 rounded bg-slate-800 border border-slate-700"
            aria-expanded={isMobileExpanded}
          >
            <span>All Lines</span>
            {isMobileExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expanded Mobile Tray */}
      {isMobileExpanded && (
        <div className="sm:hidden px-4 pb-3 pt-2 border-t border-slate-800 bg-slate-900/98 space-y-2">
          <p className="text-[11px] text-slate-400 leading-tight">
            Dial 112 for nationwide Nigerian police, ambulance, or fire services.
          </p>

          <div className="divide-y divide-slate-800">
            {contacts.map(contact => (
              <div key={contact.id} className="py-1.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-slate-200">{contact.name}</p>
                  <p className="text-[10px] text-slate-400">{contact.service_type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-bold text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>{contact.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(contact.phone)}
                    className="text-slate-400 p-1 hover:text-white"
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
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Explore Nigerian Health Facilities →</span>
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
