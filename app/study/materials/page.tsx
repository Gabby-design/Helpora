'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  ArrowLeft, 
  Search, 
  Download, 
  ExternalLink, 
  FileText, 
  GraduationCap, 
  Sparkles,
  ChevronRight,
  Eye,
  X
} from 'lucide-react';
import { StudyMaterial, StudySubject } from '@/lib/types';

export default function StudyMaterialsPage() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [subjects, setSubjects] = useState<StudySubject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMaterial, setActiveMaterial] = useState<StudyMaterial | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/study/materials').then(res => res.json()),
      fetch('/api/study/subjects').then(res => res.json())
    ])
      .then(([matData, subData]) => {
        if (Array.isArray(matData)) setMaterials(matData);
        if (Array.isArray(subData)) setSubjects(subData);
      })
      .catch(err => console.error('Failed to load materials or subjects:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredMaterials = materials.filter(item => {
    const subId = item.subjectId || item.subject_id || '';
    const matchesSubject = selectedSubject === 'all' || subId === selectedSubject;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const tags = item.tags || [];
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Top Bar */}
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
              Curated Revision Library
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              href="/study/practice"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 px-3 py-1.5 rounded-lg"
            >
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              Practice Quizzes
            </Link>
            <Link 
              href="/study/tutor"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
            >
              <Sparkles className="w-4 h-4" />
              Ask AI Tutor
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-white to-emerald-50/40 border-b border-neutral-200 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">
              Study Materials & Revision Sheets
            </h1>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
              Formulas, summary guides, and past-question collections tailored for SSCE, WAEC, NECO, and UTME examinations across Nigerian secondary curricula.
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulas, concepts, or keywords (e.g., calculus, stoichiometry, ohm)..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-white border border-neutral-300 rounded-xl text-xs font-semibold px-3 py-2.5 text-neutral-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="all">All Subjects</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-white border border-neutral-300 rounded-xl text-xs font-semibold px-3 py-2.5 text-neutral-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="all">All Formats</option>
                <option value="formula_sheet">Formula Sheets</option>
                <option value="summary_notes">Summary Notes</option>
                <option value="practice_guide">Practice Guides</option>
                <option value="past_questions">Past Questions</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-neutral-500 text-sm">Loading revision library...</p>
          </div>
        ) : filteredMaterials.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-lg mx-auto shadow-sm">
            <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-800 mb-1">No Materials Found</h3>
            <p className="text-xs text-neutral-500 mb-4">
              Try adjusting your search terms or subject filters to find study guides.
            </p>
            <button
              onClick={() => {
                setSelectedSubject('all');
                setSelectedType('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-xl hover:bg-black transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((mat) => (
              <div 
                key={mat.id}
                className="bg-white rounded-2xl border border-neutral-200 hover:border-emerald-500/60 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {(mat.subjectId || mat.subject_id || '').toUpperCase()}
                    </span>
                    <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded capitalize">
                      {mat.type.replace('_', ' ')}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-neutral-900 group-hover:text-emerald-800 transition line-clamp-2 mb-2">
                    {mat.title}
                  </h2>

                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-4">
                    {mat.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {(mat.tags || []).map((tag: string, i: number) => (
                      <span key={i} className="text-[10px] bg-neutral-50 text-neutral-600 px-2 py-0.5 rounded border border-neutral-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 font-medium">
                    Verified Free Resource
                  </span>

                  <button
                    onClick={() => setActiveMaterial(mat)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition border border-emerald-200"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Read Guide
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reader Modal */}
      {activeMaterial && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-neutral-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 mr-2">
                  {(activeMaterial.subjectId || activeMaterial.subject_id || '').toUpperCase()}
                </span>
                <span className="text-xs text-neutral-300">
                  {activeMaterial.type.replace('_', ' ')}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {activeMaterial.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveMaterial(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-neutral-800 text-sm leading-relaxed">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600">
                {activeMaterial.description}
              </div>

              <div className="bg-neutral-900 text-neutral-100 p-5 rounded-xl font-mono text-xs whitespace-pre-wrap leading-relaxed shadow-inner">
                {activeMaterial.content}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {(activeMaterial.tags || []).map((t: string, idx: number) => (
                  <span key={idx} className="text-[11px] bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md border border-neutral-200">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3">
              <Link 
                href="/study/tutor"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask AI Tutor to Explain this
              </Link>

              <button
                onClick={() => setActiveMaterial(null)}
                className="px-5 py-2 bg-neutral-900 text-white text-xs font-bold rounded-xl hover:bg-black transition"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
