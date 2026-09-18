'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  BrainCircuit, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Plus, 
  ArrowLeft, 
  HelpCircle, 
  BookOpen, 
  Bot, 
  User, 
  Loader2,
  Copy,
  Check
} from 'lucide-react';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

function TutorChatContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello! I'm your CivicTrust AI Study Partner. Need step-by-step guidance on algebra, physics formulas, electrical circuits, or technical trade calculations?\n\nTell me what you're working on, or pick one of the suggested drills below!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState(initialQuery);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string, mode?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: mode ? `[${mode.toUpperCase()}]: ${text}` : text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/study/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          mode
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setMessages(prev => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: json.data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: 'ai',
            text: "I couldn't process that question just now. Let's try rephrasing or picking a specific topic!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (e) {
      console.error('Tutor chat error:', e);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'ai',
          text: "Network glitch connecting to study engine. Let's try again in a moment.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewConversation = () => {
    setMessages([
      {
        id: `m-${Date.now()}`,
        sender: 'ai',
        text: "New study session started! What subject or problem would you like to explore together?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-16 lg:pb-0">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-16 z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold shadow-xs">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900 leading-tight">CivicTrust AI Tutor</h1>
                <p className="text-[10px] text-emerald-600 font-semibold">● Patient Mentoring Active</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNewConversation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Session</span>
            </button>

            <Link
              href="/study/practice"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold transition shadow-xs hover:bg-slate-800"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Practice Quizzes</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Messages Log */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white rounded-tr-sm'
                  : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-sm space-y-2'
              }`}
            >
              <div className="whitespace-pre-line prose prose-slate max-w-none prose-sm">
                {msg.text}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100/40 text-[10px] text-slate-400">
                <span>{msg.timestamp}</span>
                {msg.sender === 'ai' && (
                  <button
                    type="button"
                    onClick={() => handleCopy(msg.text, msg.id)}
                    className="hover:text-slate-700 flex items-center gap-1 p-0.5"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 text-xs text-slate-500 flex items-center gap-2 shadow-xs">
              <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
              <span>Thinking through explanation step-by-step...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </main>

      {/* Suggested Fast-Prompt Chips */}
      <div className="max-w-4xl w-full mx-auto px-4 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0">Focus:</span>
          {[
            { label: 'Explain this simply', mode: 'simply' },
            { label: 'Show me step by step', mode: 'step_by_step' },
            { label: 'Give me another example', mode: 'example' },
            { label: 'Quiz me on this', mode: 'quiz' },
            { label: 'Summarize key points', mode: 'summary' }
          ].map((action) => (
            <button
              key={action.mode}
              type="button"
              onClick={() => {
                const lastMsg = messages[messages.length - 1]?.text || 'the current topic';
                handleSend(lastMsg.slice(0, 100), action.mode);
              }}
              className="px-2.5 py-1 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 whitespace-nowrap font-medium transition shadow-2xs"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Dock */}
      <footer className="bg-white border-t border-slate-200 p-4 sticky bottom-0 z-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="max-w-4xl mx-auto flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything: 'Explain quadratic formula', 'How to calculate inverter battery runtime', 'Ohm\'s law'..."
            className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50/70"
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shadow-sm shrink-0"
          >
            <span>Ask Tutor</span>
            <Send className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default function StudyTutorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-amber-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">Connecting to study tutor...</p>
          </div>
        </div>
      }
    >
      <TutorChatContent />
    </Suspense>
  );
}
