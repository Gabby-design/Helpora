'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  ShieldCheck, 
  PlusCircle, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle2, 
  ArrowLeft, 
  Loader2,
  Building2
} from 'lucide-react';
import { CITIES, DEFAULT_CITY } from '@/lib/data/cities';
import { ServiceCategory } from '@/lib/types';
import Link from 'next/link';

function BusinessRegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const claimId = searchParams.get('claim');
  const { user } = useAuth();

  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('electrician');
  const [cityId, setCityId] = useState(DEFAULT_CITY.id);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  
  // Specific services offered
  const [serviceTagInput, setServiceTagInput] = useState('');
  const [servicesList, setServicesList] = useState<string[]>([]);

  // Photos
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [photosList, setPhotosList] = useState<string[]>([
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
  ]);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdProviderId, setCreatedProviderId] = useState<string | null>(null);

  // Fetch categories from database
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(json => {
        if (json.success && Array.isArray(json.data)) {
          setCategories(json.data);
          if (json.data[0]) setCategory(json.data[0].id);
        }
      })
      .catch(console.error);
  }, []);

  // If claiming an existing business, prefill data
  useEffect(() => {
    if (claimId) {
      fetch(`/api/providers/${claimId}`)
        .then(res => res.json())
        .then(json => {
          if (json.success && json.data) {
            const p = json.data;
            setName(p.name);
            setCategory(p.category);
            setCityId(p.cityId || DEFAULT_CITY.id);
            setAddress(p.address);
            setPhone(p.phone);
            setDescription(p.description);
            setServicesList(p.services || []);
            setLicenseNumber(p.license_number || '');
          }
        });
    }
  }, [claimId]);

  const handleAddService = () => {
    if (serviceTagInput.trim() && !servicesList.includes(serviceTagInput.trim())) {
      setServicesList([...servicesList, serviceTagInput.trim()]);
      setServiceTagInput('');
    }
  };

  const handleRemoveService = (tag: string) => {
    setServicesList(servicesList.filter(s => s !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const cityObj = CITIES.find(c => c.id === cityId) || DEFAULT_CITY;
      const payload = {
        name: name.trim(),
        category,
        cityId,
        address: address.trim(),
        phone: phone.trim(),
        email: email.trim(),
        website: website.trim(),
        description: description.trim(),
        license_number: licenseNumber.trim(),
        services: servicesList.length > 0 ? servicesList : ['Standard Diagnostic', 'Emergency Service'],
        photos: photosList,
        verification_status: 'pending',
        claimed_by_user_id: user?.id || 'usr-demo-1',
        lat: cityObj.lat + (Math.random() - 0.5) * 0.04,
        lng: cityObj.lng + (Math.random() - 0.5) * 0.04,
        is_demo: false
      };

      const res = await fetch('/api/providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (json.success && json.data) {
        setCreatedProviderId(json.data.id);
      } else {
        alert(json.error || 'Failed to submit provider listing');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Network error submitting registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (createdProviderId) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 max-w-xl text-center space-y-6 shadow-xl animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Listing Submitted for Verification!
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your business <strong>{name}</strong> has been created with status <strong className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Pending Verification</strong>.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 text-xs text-slate-600 text-left space-y-2 border border-slate-200">
            <p className="font-bold text-slate-800">What happens next?</p>
            <p>1. The Helpora trust & verification team cross-checks your trade registration / CAC license details.</p>
            <p>2. Once verified, your listing receives the green <strong>Helpora Verified</strong> badge and appears in priority search results.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={`/services/provider/${createdProviderId}`}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition shadow"
            >
              View New Listing
            </Link>
            <Link
              href="/dashboard/business"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition shadow-sm"
            >
              Go to Business Dashboard &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero Lead Fees &bull; Zero Commissions</span>
          </span>
        </div>

        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            Helpora For Business
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {claimId ? 'Claim & Verify Existing Business' : 'Register Your Service Business on Helpora'}
          </h1>
          <p className="text-sm text-slate-600">
            Put your trade in front of customers looking for trusted local professionals near them. Direct calls, verified badges, and honest reviews.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              1. Business Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business / Contractor Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Abuja Solar & Electrical Masters"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Service Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Metro Region *
                </label>
                <select
                  value={cityId}
                  onChange={(e) => setCityId(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                >
                  {CITIES.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}, {city.state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Location */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              2. Location & Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street Address (Headquarters or Service Workshop) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Suite 12, Banex Plaza, Aminu Kano Crescent, Wuse II, Abuja"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Direct Contact Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 803 000 0000"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="support@yourdomain.ng"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Website or Social Profile (Optional)
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://instagram.com/yourhandle"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Vetting & Credentials */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                3. Verification & Credentials
              </h3>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Required for Verified Badge
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                State Trade Registration, CAC RC Number, or Technical License
              </label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="e.g. CAC BN-3129402, NEMSA Cert #AB-8910, TRCN #912"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Our verification team cross-checks this against regulatory databases to grant your green shield.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Description & Experience
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your trade background, experience with residential/commercial work, warranty guarantees..."
                className="w-full p-3.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Service Tags */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Specific Services Offered (Tags)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={serviceTagInput}
                  onChange={(e) => setServiceTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddService();
                    }
                  }}
                  placeholder="e.g. Inverter Installation, Changeover Switch, Borehole Pump"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="button"
                  onClick={handleAddService}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition"
                >
                  Add Tag
                </button>
              </div>

              {servicesList.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {servicesList.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-xs bg-slate-100 text-slate-800 px-3 py-1 rounded-lg border border-slate-200"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(tag)}
                        className="text-slate-400 hover:text-slate-600 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <PlusCircle className="w-4 h-4 text-emerald-100" />
              )}
              <span>Submit Listing for Verification</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BusinessRegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-brand-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">Loading registration form...</p>
          </div>
        </div>
      }
    >
      <BusinessRegisterContent />
    </Suspense>
  );
}
