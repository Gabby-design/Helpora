'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  HelpCircle, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Timer,
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Quiz, QuizAttempt } from '@/lib/types';

export default function StudyPracticePage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [attemptResult, setAttemptResult] = useState<QuizAttempt | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [evaluating, setEvaluating] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/study/quizzes')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setQuizzes(data);
          if (data.length > 0) {
            setSelectedQuiz(data[0]);
          }
        }
      })
      .catch(err => console.error('Failed to load quizzes:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!selectedQuiz) return;
    setEvaluating(true);

    try {
      const res = await fetch(`/api/study/quizzes/${selectedQuiz.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: selectedAnswers })
      });
      const data = await res.json();
      if (data.success) {
        setAttemptResult(data.attempt);
        setSubmitted(true);
      }
    } catch (e) {
      console.error('Failed to submit quiz attempt', e);
    } finally {
      setEvaluating(false);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setAttemptResult(null);
    setCurrentQuestionIndex(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-neutral-600 text-sm">Loading practice tests & quizzes...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = selectedQuiz?.questions[currentQuestionIndex];
  const allAnswered = selectedQuiz && selectedQuiz.questions.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/study"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-emerald-700 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Study Hub
            </Link>
            <div className="h-4 w-px bg-neutral-300"></div>
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              WAEC &bull; JAMB &bull; NECO Prep
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              href="/study/tutor"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
            >
              <Sparkles className="w-4 h-4" />
              Ask AI Tutor
            </Link>
            <Link 
              href="/study/materials"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 px-3 py-1.5 rounded-lg"
            >
              <BookOpen className="w-4 h-4" />
              Formula Sheets
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column: Quiz Selector */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-700" />
                Select Practice Exam
              </h2>

              <div className="space-y-2">
                {quizzes.map((quiz) => {
                  const isSelected = selectedQuiz?.id === quiz.id;
                  return (
                    <button
                      key={quiz.id}
                      onClick={() => {
                        setSelectedQuiz(quiz);
                        handleResetQuiz();
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition flex flex-col gap-1 ${
                        isSelected 
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-sm'
                          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                          {(quiz.subjectId || quiz.subject_id || '').toUpperCase()}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-medium flex items-center gap-1">
                          <Timer className="w-3 h-3" />
                          {quiz.durationMinutes || 15} mins
                        </span>
                      </div>
                      <p className="text-sm font-semibold leading-tight line-clamp-1">
                        {quiz.title}
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        {quiz.questions.length} multiple-choice questions
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100">
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 leading-relaxed">
                  <p className="font-semibold text-neutral-800 mb-1">Standard Nigerian Curriculum</p>
                  Questions conform to Senior Secondary School standards (SSCE/UTME) with step-by-step explanations.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Active Quiz Panel */}
          <div className="lg:col-span-3">
            {selectedQuiz && (
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                {/* Quiz Banner */}
                <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 p-6 text-white">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-100">
                          {(selectedQuiz.subjectId || selectedQuiz.subject_id || '').toUpperCase()}
                        </span>
                        <span className="text-xs text-emerald-200 flex items-center gap-1">
                          <Timer className="w-3.5 h-3.5" />
                          {selectedQuiz.durationMinutes || 15} Minutes Allotted
                        </span>
                      </div>
                      <h1 className="text-xl md:text-2xl font-bold">
                        {selectedQuiz.title}
                      </h1>
                      <p className="text-xs text-emerald-100/90 mt-1 max-w-xl">
                        {selectedQuiz.description}
                      </p>
                    </div>

                    {submitted && attemptResult && (
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center min-w-[140px]">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-200 block">Your Score</span>
                        <div className="text-3xl font-extrabold text-white">
                          {attemptResult.percentage}%
                        </div>
                        <span className="text-xs text-emerald-200">
                          {attemptResult.score} / {attemptResult.totalQuestions} Correct
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Question Navigator */}
                <div className="bg-neutral-50 border-b border-neutral-200 px-6 py-3 flex items-center justify-between gap-4 overflow-x-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-600">Questions:</span>
                    <div className="flex gap-1.5">
                      {selectedQuiz.questions.map((q, idx) => {
                        const isAnswered = selectedAnswers[q.id] !== undefined;
                        const isCurrent = currentQuestionIndex === idx;
                        let btnClass = "w-7 h-7 text-xs font-bold rounded-lg transition flex items-center justify-center ";
                        
                        if (submitted) {
                          const isCorrect = selectedAnswers[q.id] === q.correctOptionIndex;
                          btnClass += isCorrect 
                            ? 'bg-emerald-600 text-white ' 
                            : 'bg-rose-500 text-white ';
                        } else if (isCurrent) {
                          btnClass += 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-600/30 ';
                        } else if (isAnswered) {
                          btnClass += 'bg-emerald-100 text-emerald-900 border border-emerald-300 ';
                        } else {
                          btnClass += 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100 ';
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentQuestionIndex(idx)}
                            className={btnClass}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-xs text-neutral-500 font-medium">
                    Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                  </div>
                </div>

                {/* Active Question Body */}
                {currentQuestion && (
                  <div className="p-6 md:p-8">
                    <div className="mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block mb-3">
                        Question #{currentQuestionIndex + 1}
                      </span>
                      <h2 className="text-lg md:text-xl font-bold text-neutral-900 leading-snug">
                        {currentQuestion.text}
                      </h2>
                    </div>

                    {/* Options List */}
                    <div className="space-y-3 mb-8">
                      {currentQuestion.options.map((optionText, optIdx) => {
                        const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
                        const isCorrectOption = optIdx === currentQuestion.correctOptionIndex;
                        
                        let optionStyle = 'border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800';
                        let badgeStyle = 'bg-neutral-100 text-neutral-700 border-neutral-300';

                        if (submitted) {
                          if (isCorrectOption) {
                            optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                            badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                          } else if (isSelected && !isCorrectOption) {
                            optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400';
                            badgeStyle = 'bg-rose-500 text-white border-rose-500';
                          } else {
                            optionStyle = 'border-neutral-200 bg-neutral-50/50 text-neutral-400 opacity-60';
                          }
                        } else if (isSelected) {
                          optionStyle = 'border-emerald-600 bg-emerald-50/60 text-emerald-950 font-semibold ring-2 ring-emerald-600/30';
                          badgeStyle = 'bg-emerald-700 text-white border-emerald-700';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={submitted}
                            onClick={() => handleSelectAnswer(currentQuestion.id, optIdx)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${optionStyle}`}
                          >
                            <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 border ${badgeStyle}`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="text-sm md:text-base leading-relaxed pt-0.5">
                              {optionText}
                            </span>

                            {submitted && isCorrectOption && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 ml-auto shrink-0" />
                            )}
                            {submitted && isSelected && !isCorrectOption && (
                              <XCircle className="w-5 h-5 text-rose-500 ml-auto shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation Box (Revealed after submission) */}
                    {submitted && currentQuestion.explanation && (
                      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-5 mb-8">
                        <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-2">
                          <HelpCircle className="w-4 h-4 text-emerald-700" />
                          Detailed Explanation:
                        </div>
                        <p className="text-xs md:text-sm text-emerald-950/90 leading-relaxed">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-200">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                          disabled={currentQuestionIndex === 0}
                          className="px-4 py-2 text-xs font-bold rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => setCurrentQuestionIndex(prev => Math.min(selectedQuiz.questions.length - 1, prev + 1))}
                          disabled={currentQuestionIndex === selectedQuiz.questions.length - 1}
                          className="px-4 py-2 text-xs font-bold rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        {submitted ? (
                          <button
                            onClick={handleResetQuiz}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold shadow-sm transition"
                          >
                            <RotateCcw className="w-4 h-4" />
                            Retake Quiz
                          </button>
                        ) : (
                          <button
                            onClick={handleSubmitQuiz}
                            disabled={evaluating || !allAnswered}
                            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-sm ${
                              allAnswered 
                                ? 'bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer' 
                                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                            }`}
                          >
                            {evaluating ? (
                              <>
                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Grading Attempt...
                              </>
                            ) : (
                              <>
                                Submit Exam
                                <ChevronRight className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
