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
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-brand-950 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-br from-amber-500/10 via-brand-500/15 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Pillar 2 • Interactive AI Education</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Learn at your own <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-brand-300">pace</span>.
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            Step-by-step AI tutoring, syllabus study materials, and instant-feedback practice exams designed to build deep conceptual mastery.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/study/tutor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Launch AI Tutor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/study/practice"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Take a Practice Quiz</span>
            </Link>

            <Link
              href="/study/dashboard"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition"
            >
              <span>Student Dashboard</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Hub */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. Subjects Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                1. Database-Driven Curricula
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                Explore Subjects & Standards
              </h2>
            </div>
            <Link
              href="/study/materials"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>View all materials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjects.map((sub) => {
              const Icon = iconMap[sub.iconName] || BookOpen;
              return (
                <div
                  key={sub.id}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-amber-300 hover:shadow-sm transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6 text-amber-800" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900">{sub.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{sub.description}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">
                      {sub.topicsCount || 8} Syllabus Units
                    </span>
                    <Link
                      href={`/study/practice?subject=${sub.id}`}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                    >
                      <span>Drill Quizzes</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Tutor Sandbox Launcher */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-slate-700">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <BrainCircuit className="w-4 h-4 text-amber-400" />
              <span>Patient AI Study Partner</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Stuck on a tricky concept? Ask your tutor.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Our tutor never simply dumps an answer on you. It guides you with intuitive real-world analogies, checks your understanding, and generates practice questions on demand.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              {[
                'Explain the difference between GFCI and standard breakers simply',
                "Derive the quadratic formula step-by-step",
                "How does an MPPT solar charge controller work?"
              ].map((prompt, i) => (
                <Link
                  key={i}
                  href={`/study/tutor?q=${encodeURIComponent(prompt)}`}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 transition text-left"
                >
                  "{prompt}" →
                </Link>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/study/tutor"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-md"
              >
                <BrainCircuit className="w-4 h-4" />
                <span>Open Fullscreen AI Tutor Interface</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Study Materials & Instant Practice Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Study Materials */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Curated Guides</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">Formulas & Study Guides</h3>
              </div>
              <Link href="/study/materials" className="text-xs font-bold text-brand-600 hover:underline">
                View all ({materials.length}) →
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {materials.map((mat) => (
                <div key={mat.id} className="py-4 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {mat.difficulty}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {mat.type.replace('_', ' ')}
                    </span>
                  </div>
                  <Link
                    href={`/study/materials?read=${mat.id}`}
                    className="font-bold text-sm text-slate-900 hover:text-brand-600 transition block"
                  >
                    {mat.title}
                  </Link>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {mat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Practice Quizzes */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Instant Feedback</span>
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">Diagnostic Practice Quizzes</h3>
            </div>

            <div className="space-y-3">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                      {quiz.difficulty}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {quiz.questions.length} questions
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{quiz.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{quiz.description}</p>
                  <div className="pt-2">
                    <Link
                      href={`/study/practice?id=${quiz.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
                    >
                      <span>Take Quiz</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
