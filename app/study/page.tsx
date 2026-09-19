'use client';

import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  BrainCircuit, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  Code2, 
  Zap,
  Atom,
  HelpCircle,
  Clock,
  Bookmark,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { StudySubject, StudyMaterial, Quiz } from '@/lib/types';

export default function StudyPlatformPage() {
  const [subjects, setSubjects] = useState<StudySubject[]>([]);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/study/subjects').then(r => r.json()),
      fetch('/api/study/materials').then(r => r.json()),
      fetch('/api/study/quizzes').then(r => r.json())
    ])
      .then(([subJson, matJson, quizJson]) => {
        if (subJson.success && Array.isArray(subJson.data)) setSubjects(subJson.data);
        if (matJson.success && Array.isArray(matJson.data)) setMaterials(matJson.data.slice(0, 4));
        if (quizJson.success && Array.isArray(quizJson.data)) setQuizzes(quizJson.data.slice(0, 3));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const iconMap: { [key: string]: any } = {
    Calculator,
    BookOpen,
    Zap,
    Atom,
    Code2,
    Wrench: Zap
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 space-y-12 relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-teal-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative bg-white border-b border-slate-200/80 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-900 border border-teal-200 text-xs font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Helpora AI Learning Companion &bull; Nigeria</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Learn at your own <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">pace</span>.
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
            Step-by-step patient AI tutoring, curriculum study materials, and instant-feedback practice exams designed to build conceptual mastery for Nigerian students, technicians, and exam candidates.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/study/tutor"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-glow-brand transition active:scale-95"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Launch AI Tutor (24/7)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/study/practice"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 transition shadow-subtle"
            >
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>Take a Practice Quiz</span>
            </Link>

            <Link
              href="/study/dashboard"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition"
            >
              <span>Student Dashboard</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="w-full max-w-[96%] 2xl:max-w-[1760px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Curriculum & Technical Trades
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse subjects with verified study guides, formula sheets, and interactive quiz drills
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((sub) => {
            const Icon = (iconMap as any)[sub.iconName] || (iconMap as any)[sub.icon || ''] || BookOpen;
            return (
              <div
                key={sub.id}
                className="group bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-emerald-400 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/study/tutor?q=${encodeURIComponent(sub.name)}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group/btn"
                  >
                    <span>Ask Tutor</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>

                  <Link
                    href={`/study/materials?subject=${sub.id}`}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Materials &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Quizzes & Cheatsheets */}
      <section className="w-full max-w-[96%] 2xl:max-w-[1760px] mx-auto px-3 sm:px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Quick Practice Quizzes */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-elevated space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Interactive Drills
              </span>
              <h2 className="text-xl font-bold text-slate-950 mt-2">
                Practice Quizzes
              </h2>
            </div>

            <Link
              href="/study/practice"
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              All Quizzes &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {quizzes.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-emerald-50/30 hover:border-emerald-200 transition"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{q.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{q.description}</p>
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-600">{q.questions?.length || 5} questions</span>
                    <span>&bull;</span>
                    <span className="capitalize font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{q.difficulty}</span>
                  </div>
                </div>

                <Link
                  href={`/study/practice?quizId=${q.id}`}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-xs text-center shrink-0"
                >
                  Take Quiz
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Study Materials Cheatsheets */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-elevated space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                Reference Guides
              </span>
              <h2 className="text-xl font-bold text-slate-950 mt-2">
                Formulas & Cheat Sheets
              </h2>
            </div>

            <Link
              href="/study/materials"
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              All Guides &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {materials.map((m) => (
              <Link
                key={m.id}
                href={`/study/materials?id=${m.id}`}
                className="block p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-slate-50 transition shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                  <span className="text-[10px] bg-slate-100 font-semibold text-slate-600 px-2 py-0.5 rounded capitalize">
                    {m.type}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 mt-1">{m.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
