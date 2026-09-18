'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Provider, Review } from '@/lib/types';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Navigation, 
  Globe, 
  Clock, 
  Star, 
  CheckCircle2, 
  ArrowLeft, 
  MessageSquare, 
  Send, 
  Share2, 
  Check, 
  FlaskConical,
  Bookmark,
  Flag,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { getCategoryById } from '@/lib/data/categories';
import { DAYS_OF_WEEK } from '@/lib/utils/hours';
import Link from 'next/link';

export default function ProviderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [provider, setProvider] = useState<(Provider & { reviews?: Review[]; businessStatus?: any }) | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Review Form State
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState<string | null>(null);

  // Report Listing State
  const [isReporting, setIsReporting] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const fetchProvider = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/providers/${id}`);
      const json = await res.json();
      if (json.success) {
        setProvider(json.data);
      } else {
        setError(json.error || 'Provider not found');
      }
    } catch (err) {
      console.error('Error fetching provider:', err);
      setError('Failed to load provider profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProvider();
  }, [id]);

  const handleToggleSave = async () => {
    setIsSaved(!isSaved);
    try {
      await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'usr-demo-1',
          type: 'providers',
          itemId: id
        })
      });
    } catch (e) {
      console.error('Failed to save bookmark:', e);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setIsSubmittingReview(true);
    setReviewSuccessMsg(null);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider_id: id,
          author: reviewerName.trim() || 'Verified Client',
          rating: rating,
          text: reviewText.trim()
        })
      });

      const json = await res.json();
      if (json.success) {
        setReviewText('');
        setReviewerName('');
        setReviewSuccessMsg('Your honest review has been posted to the community record!');
        await fetchProvider();
      } else {
        alert(json.error || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Review submit error:', err);
      alert('Network error submitting review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleReportListing = () => {
    setReportSubmitted(true);
    setTimeout(() => {
      setIsReporting(false);
      setReportSubmitted(false);
    }, 2500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-brand-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-700">Loading verified pro details...</p>
        </div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 max-w-md text-center space-y-4 shadow-sm">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">{error || 'Provider Not Found'}</h2>
          <p className="text-xs text-slate-500">
            This business may have been unlisted or the address link has expired.
          </p>
          <Link
            href="/services/search"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Search</span>
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategoryById(provider.category);
  const isVerified = provider.verification_status === 'verified';
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    provider.address
  )}`;

  const currentDayName = DAYS_OF_WEEK[new Date().getDay()];

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Top Breadcrumb & Share Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSave}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition ${
                isSaved
                  ? 'bg-brand-50 border-brand-300 text-brand-700'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-brand-600 text-brand-600' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied' : 'Share Profile'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Left Column: Overview, Photos, Hours, Reviews */}
          <div className="lg:col-span-8 space-y-8">
            {/* Business Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                  {category?.name || provider.category}
                </span>

                {/* Demo Badge */}
                {provider.is_demo && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    <FlaskConical className="w-3.5 h-3.5 text-amber-700" />
                    <span>Sample Demo Listing</span>
                  </span>
                )}

                {isVerified ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verified Professional</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Unverified Profile</span>
                  </span>
                )}

                {provider.license_number && (
                  <span className="text-xs text-slate-500 font-mono bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                    {provider.license_number}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                {provider.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
                <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-amber-950">
                    {provider.avg_rating > 0 ? provider.avg_rating.toFixed(1) : 'New'}
                  </span>
                  <span className="text-xs text-amber-800">
                    ({provider.review_count} community {provider.review_count === 1 ? 'review' : 'reviews'})
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{provider.address}</span>
                </div>
              </div>

              {/* Photo Gallery */}
              {provider.photos && provider.photos.length > 0 && (
                <div className="space-y-3 mb-6">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={provider.photos[activePhotoIndex]}
                      alt={`${provider.name} photo`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {provider.photos.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {provider.photos.map((photo, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActivePhotoIndex(idx)}
                          className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                            activePhotoIndex === idx
                              ? 'border-brand-600 ring-2 ring-brand-500/20'
                              : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={photo} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700">
                <h3 className="text-base font-bold text-slate-900 mb-2">About this Provider</h3>
                <p>{provider.description || 'Experienced local trade provider verified through CivicTrust.'}</p>
              </div>

              {/* Services Offered */}
              {provider.services && provider.services.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">Specific Services & Specialties</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {provider.services.map((svc, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{svc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Weekly Operating Hours */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-600" />
                <span>Weekly Hours of Operation</span>
              </h3>

              <div className="divide-y divide-slate-100">
                {DAYS_OF_WEEK.map((day) => {
                  const dayData = provider.hours ? provider.hours[day] : undefined;
                  const isToday = day === currentDayName;
                  const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);

                  return (
                    <div
                      key={day}
                      className={`py-2.5 px-3 flex items-center justify-between text-xs sm:text-sm rounded-lg ${
                        isToday ? 'bg-brand-50/80 font-bold text-brand-900' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{formattedDay}</span>
                        {isToday && (
                          <span className="text-[10px] uppercase font-extrabold tracking-wider bg-brand-600 text-white px-2 py-0.5 rounded-full">
                            Today
                          </span>
                        )}
                      </div>

                      <div className="text-right font-medium">
                        {dayData && !dayData.closed && dayData.open && dayData.close ? (
                          <span>
                            {dayData.open} – {dayData.close}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Closed</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  <span>Neighbor Reviews ({provider.reviews?.length || 0})</span>
                </h3>

                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-amber-900">
                    {provider.avg_rating > 0 ? provider.avg_rating.toFixed(1) : 'No reviews yet'}
                  </span>
                </div>
              </div>

              {/* Review Submission Form */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Leave an Honest Community Review</h4>
                <p className="text-xs text-slate-500">
                  Did this provider work on your home or car? Share your direct experience to help your neighbors.
                </p>

                {reviewSuccessMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{reviewSuccessMsg}</span>
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="e.g. Kelechi O."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
                      <div className="flex items-center gap-1 pt-1">
                        {[1, 2, 3, 4, 5].map((starVal) => (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setRating(starVal)}
                            onMouseEnter={() => setHoverRating(starVal)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 focus:outline-none"
                            aria-label={`Rate ${starVal} out of 5 stars`}
                          >
                            <Star
                              className={`w-6 h-6 transition ${
                                starVal <= (hoverRating || rating)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-slate-700 ml-2">
                          {hoverRating || rating} / 5
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Review</label>
                    <textarea
                      required
                      rows={3}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Describe what work was performed, promptness, transparency of price, and overall quality..."
                      className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    {isSubmittingReview ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    <span>Post Review</span>
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-4 pt-2">
                {!provider.reviews || provider.reviews.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-4">
                    Be the first neighbor to leave a review for {provider.name}.
                  </p>
                ) : (
                  provider.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700">
                            {rev.author.charAt(0)}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-slate-900">{rev.author}</p>
                            <span className="text-[10px] text-slate-400">
                              {new Date(rev.created_at).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed pl-9">
                        {rev.text}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Quick Actions Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-24 space-y-6">
              <h3 className="text-base font-bold text-slate-900">Direct Contact & Booking</h3>

              {/* Phone CTA */}
              <a
                href={`tel:${provider.phone.replace(/[^0-9+]/g, '')}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition"
              >
                <Phone className="w-4 h-4" />
                <span>Call {provider.phone}</span>
              </a>

              {/* Directions CTA */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 font-semibold text-sm transition"
              >
                <Navigation className="w-4 h-4 text-brand-600" />
                <span>Open Directions in Map</span>
              </a>

              {/* Location details */}
              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                <div className="flex items-start gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Service Location</span>
                    <span>{provider.address}</span>
                  </div>
                </div>

                {provider.website && (
                  <div className="flex items-center gap-2 text-slate-700">
                    <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                    <a
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 hover:underline truncate"
                    >
                      {provider.website.replace('https://', '')}
                    </a>
                  </div>
                )}
              </div>

              {/* Verification Audit Record */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>CivicTrust Audit Record</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  {isVerified ? (
                    <>
                      Verified by CivicTrust administrators on <strong>{provider.verified_date || 'Recent audit'}</strong>. Verified against regulatory trade records.
                    </>
                  ) : (
                    <>
                      This profile was registered directly and is awaiting formal license verification.
                    </>
                  )}
                </p>
              </div>

              {/* Claim Business CTA & Report */}
              <div className="space-y-2 text-center pt-2 border-t border-slate-100">
                <Link
                  href={`/business/register?claim=${provider.id}`}
                  className="block text-xs text-brand-600 hover:underline font-semibold"
                >
                  Do you own this business? Claim this listing →
                </Link>

                <button
                  onClick={() => setIsReporting(true)}
                  className="text-[11px] text-slate-400 hover:text-rose-600 inline-flex items-center gap-1"
                >
                  <Flag className="w-3 h-3" />
                  <span>Report inaccurate information</span>
                </button>

                {isReporting && (
                  <div className="mt-2 p-3 rounded-xl bg-slate-100 text-left space-y-2">
                    <p className="text-[11px] text-slate-600 font-semibold">Report Listing Issue:</p>
                    <button
                      onClick={handleReportListing}
                      className="w-full py-1 bg-rose-600 text-white rounded text-[11px] font-bold"
                    >
                      {reportSubmitted ? 'Report Logged — Thank you' : 'Submit Inaccuracy Report'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
