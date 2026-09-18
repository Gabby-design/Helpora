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
    <div className="min-h-screen bg-slate-50 pb-20 space-y-12">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200/90 py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Helpora AI Learning Support</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Learn at your own <span className="text-emerald-700">pace</span>.
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
            Step-by-step AI tutoring, syllabus study materials, and instant-feedback practice exams designed to build deep conceptual mastery for Nigerian students and tradespeople.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/study/tutor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Launch AI Tutor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/study/practice"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 transition shadow-xs"
            >
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>Take a Practice Quiz</span>
            </Link>

            <Link
              href="/study/dashboard"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition"
            >
              <span>Student Dashboard</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Curriculum & Technical Trades
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
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
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-subtle transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{sub.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{sub.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/study/tutor?q=${encodeURIComponent(sub.name)}`}
                    className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span>Ask Tutor</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <Link
                    href={`/study/materials?subject=${sub.id}`}
                    className="text-xs font-medium text-slate-500 hover:text-slate-800"
                  >
                    Materials →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Quizzes & Cheatsheets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Quick Practice Quizzes */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                Interactive Drills
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">
                Practice Quizzes
              </h2>
            </div>

            <Link
              href="/study/practice"
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              View All Quizzes →
            </Link>
          </div>

          <div className="space-y-3">
            {quizzes.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-100 transition"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{q.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{q.description}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                    <span>{q.questions?.length || 5} questions</span>
                    <span>•</span>
                    <span className="capitalize">{q.difficulty} difficulty</span>
                  </div>
                </div>

                <Link
                  href={`/study/practice?quizId=${q.id}`}
                  className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition shadow-xs text-center shrink-0"
                >
                  Take Quiz
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Study Materials Cheatsheets */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                Reference Guides
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">
                Formulas & Cheat Sheets
              </h2>
            </div>

            <Link
              href="/study/materials"
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              All Guides →
            </Link>
          </div>

          <div className="space-y-3">
            {materials.map((m) => (
              <Link
                key={m.id}
                href={`/study/materials?id=${m.id}`}
                className="block p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-slate-50 transition"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded capitalize">
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
