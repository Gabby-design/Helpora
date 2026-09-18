'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Activity, 
  Wrench, 
  Car, 
  Smartphone, 
  GraduationCap 
} from 'lucide-react';

interface HeroSlide {
  id: string;
  category: string;
  tag: string;
  tagColor: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  trustHighlight: string;
  imageUrl: string;
  href: string;
  ctaText: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'solar-power',
    category: 'electrician',
    tag: 'Solar & Power Systems',
    tagColor: 'bg-emerald-600 text-white',
    icon: Zap,
    title: 'Vetted Inverter Technicians & Certified Electricians',
    subtitle: 'Abuja • Lagos • Port Harcourt • Nationwide',
    trustHighlight: 'CAC & ID Audited • Emergency Power Callout',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    href: '/services/search?category=electrician',
    ctaText: 'Find Electricians'
  },
  {
    id: 'emergency-health',
    category: 'healthcare',
    tag: 'Emergency Healthcare',
    tagColor: 'bg-rose-600 text-white',
    icon: Activity,
    title: '24/7 Nearest Hospitals & Verified Medical Clinics',
    subtitle: 'Turn-by-Turn Road Guidance • Zero Delay',
    trustHighlight: 'State & NHIS Verified Healthcare Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    href: '/health?navigateClosest=true',
    ctaText: 'Route to Closest Hospital'
  },
  {
    id: 'plumbing-water',
    category: 'plumber',
    tag: 'Plumbing & Drainage',
    tagColor: 'bg-sky-600 text-white',
    icon: Wrench,
    title: 'Borehole Specialists, Pipe Repairs & Pumping Units',
    subtitle: 'Rapid Residential & Estate Breakdown Response',
    trustHighlight: '100% Background Checked Artisans',
    imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    href: '/services/search?category=plumber',
    ctaText: 'Find Plumbers'
  },
  {
    id: 'auto-mechanic',
    category: 'mechanic',
    tag: 'Auto Care & Roadside',
    tagColor: 'bg-amber-600 text-white',
    icon: Car,
    title: 'On-Demand Mobile Mechanics & Diagnostics',
    subtitle: 'Interstate Highway & City Breakdown Support',
    trustHighlight: 'Direct Phone Line & Live Road Routing',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    href: '/services/search?category=mechanic',
    ctaText: 'Find Mechanics'
  },
  {
    id: 'tech-hardware',
    category: 'phone-laptop',
    tag: 'Tech Hardware Repair',
    tagColor: 'bg-indigo-600 text-white',
    icon: Smartphone,
    title: 'Phone, Tablet & Laptop Repair Specialists',
    subtitle: 'Computer Village • Ikeja • Wuse • Fast Return',
    trustHighlight: 'Genuine Replacement Parts Guaranteed',
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    href: '/services/search?category=phone-laptop',
    ctaText: 'Find Tech Repair'
  },
  {
    id: 'education-tutor',
    category: 'tutor',
    tag: 'Home Tutoring & Prep',
    tagColor: 'bg-teal-600 text-white',
    icon: GraduationCap,
    title: 'WAEC, JAMB & Professional Certification Mentors',
    subtitle: 'In-Person & Online Study Support',
    trustHighlight: 'Verified Academic & Teaching Credentials',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    href: '/services/search?category=tutor',
    ctaText: 'Find Tutors'
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance every 5.5 seconds unless paused by mouse hover
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <div 
      className="relative rounded-3xl overflow-hidden shadow-elevated-lg border border-slate-200/80 bg-slate-900 group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Helpora Services Showcase Carousel"
    >
      {/* Slides Container */}
      <div className="relative w-full h-[400px] sm:h-[440px]">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          const Icon = slide.icon;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              {/* Background Photography */}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
                  isActive ? 'scale-100' : 'scale-105'
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />

              {/* Multi-stage High-Contrast Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />

              {/* Slide Content Overlay */}
              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between text-white">
                {/* Top Row: Category Tag & Icon */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm ${slide.tagColor}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span>{slide.tag}</span>
                    </span>
                    <span className="hidden sm:inline-block text-xs text-slate-300 font-medium bg-slate-900/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* Slide Indicator Badge */}
                  <span className="text-[11px] font-bold text-slate-300 bg-slate-950/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                    {index + 1} / {HERO_SLIDES.length}
                  </span>
                </div>

                {/* Bottom Row: Editorial Title, Trust Badging & Direct CTA */}
                <div className="space-y-3 pt-4">
                  <div className="sm:hidden text-xs text-slate-300 font-medium">
                    {slide.subtitle}
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug tracking-tight line-clamp-2">
                    {slide.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">{slide.trustHighlight}</span>
                  </div>

                  <div className="pt-1 flex items-center justify-between gap-3">
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-950 text-xs sm:text-sm font-bold shadow-md hover:bg-emerald-50 hover:text-emerald-900 transition active:scale-95 group/btn"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-emerald-700 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>

                    <div className="text-[11px] text-slate-300 hidden sm:flex items-center gap-1.5 font-medium">
                      <span>Verified Helpora Network</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Navigation Arrows (Soft frosted glass, visible on hover or mobile tap) */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-950/50 hover:bg-slate-950/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 shadow-md"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-950/50 hover:bg-slate-950/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 shadow-md"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Segmented Progress Dots */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}: ${slide.tag}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'w-6 bg-emerald-400' 
                  : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
