'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  RotateCcw,
  Target
} from 'lucide-react';
import { QuizAttempt } from '@/lib/types';

export default function StudyDashboardPage() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check localStorage for saved attempts
    try {
      const saved = localStorage.getItem('civictrust_quiz_attempts');
      if (saved) {
        setAttempts(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to read attempts from local storage', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const totalAttempts = attempts.length;
  const avgScore = totalAttempts > 0 
    ? Math.round(attempts.reduce((acc, a) => acc + (a.percentage || 0), 0) / totalAttempts) 
    : 0;
  const highestScore = totalAttempts > 0 
    ? Math.max(...attempts.map(a => a.percentage || 0)) 
    : 0;

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block mb-1">
                Student Revision Tracker
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900">
                My Study Performance
              </h1>
              <p className="text-xs md:text-sm text-neutral-500 mt-1">
                Keep track of your practice exam attempts, strengths, and areas needing revision.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/study/practice"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition"
              >
                <GraduationCap className="w-4 h-4" />
                Take Practice Quiz
              </Link>
              <Link
                href="/study/tutor"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs font-bold transition"
              >
                <Sparkles className="w-4 h-4 text-emerald-700" />
                Ask AI Tutor
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Metric Cards (Real Data - zero fake metrics) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Quizzes Completed</span>
              <Award className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="text-3xl font-extrabold text-neutral-900">
              {totalAttempts}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Verified local test attempts
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Average Score</span>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-extrabold text-neutral-900">
              {totalAttempts > 0 ? `${avgScore}%` : '—'}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Across all completed subjects
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Personal Best</span>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-extrabold text-neutral-900">
              {totalAttempts > 0 ? `${highestScore}%` : '—'}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Highest single attempt
            </p>
          </div>
        </div>

        {/* Recent Attempts or Honest Empty State */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900">Exam History & Scores</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Detailed breakdowns of your answers and performance.
              </p>
            </div>
          </div>

          {totalAttempts === 0 ? (
            <div className="p-12 text-center max-w-md mx-auto">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800 mx-auto mb-4 border border-emerald-100">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-neutral-800 mb-1">No Exam Attempts Yet</h3>
              <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
                Take a practice quiz on Mathematics, Physics, Chemistry, or English Language to track your progress and uncover learning gaps.
              </p>
              <Link
                href="/study/practice"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm transition"
              >
                Start Your First Quiz
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-neutral-200">
              {attempts.map((attempt) => (
                <div key={attempt.id} className="p-6 flex flex-wrap items-center justify-between gap-4 hover:bg-neutral-50/60 transition">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-neutral-900">
                        {attempt.quizTitle}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                        {attempt.subjectId}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(attempt.completedAt || attempt.completed_at || Date.now()).toLocaleDateString()}
                      </span>
                      <span>&bull;</span>
                      <span>{attempt.score} of {attempt.totalQuestions || attempt.total || 0} questions correct</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      {(() => {
                        const pct = attempt.percentage ?? Math.round(((attempt.score || 0) / (attempt.total || 1)) * 100);
                        return (
                          <span className={`text-xl font-extrabold ${pct >= 70 ? 'text-emerald-700' : pct >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                            {pct}%
                          </span>
                        );
                      })()}
                    </div>

                    <Link
                      href="/study/practice"
                      className="px-3.5 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition"
                    >
                      Practice Again
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Study Advice Box */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-lg font-bold">Stuck on a tricky problem?</h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Our AI study tutor uses a Socratic method to guide you through WAEC and JAMB past question steps without spoiling the answer.
            </p>
          </div>
          <Link
            href="/study/tutor"
            className="px-5 py-2.5 bg-white text-emerald-950 font-bold text-xs rounded-xl shadow-md hover:bg-neutral-100 transition shrink-0 inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-700" />
            Open AI Study Companion
          </Link>
        </div>
      </div>
    </div>
  );
}
