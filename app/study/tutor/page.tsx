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
  Check,
  Image as ImageIcon,
  Paperclip,
  PanelLeftClose,
  PanelLeftOpen,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  image?: string;
}

interface ConversationItem {
  id: string;
  title: string;
  date: string;
}

function TutorChatContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [conversations, setConversations] = useState<ConversationItem[]>([
    { id: 'c-1', title: 'Solar Inverter Battery Sizing', date: 'Today' },
    { id: 'c-2', title: 'WAEC General Math: Quadratic Formula', date: 'Yesterday' },
    { id: 'c-3', title: 'Ohm\'s Law & Cable Ampacity', date: '3 days ago' }
  ]);
  const [activeConvId, setActiveConvId] = useState('c-1');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello! I'm your Helpora AI Study Tutor. I'm here to help you truly understand technical trades, mathematics, sciences, and exam subjects step by step.\n\nWhat are you working on today? Feel free to ask a question or tap any of the prompts below!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState(initialQuery);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string, promptDirective?: string) => {
    let text = textToSend || input;
    if (!text.trim() && !attachedImage) return;

    if (promptDirective) {
      text = `${promptDirective}: "${text || messages[messages.length - 1]?.text || 'this concept'}"`;
    }

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: attachedImage || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAttachedImage(null);
    setIsTyping(true);

    try {
      const res = await fetch('/api/study/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          mode: promptDirective
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
            text: "I couldn't process that question right now. Let's try rephrasing or picking a specific topic!",
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
          text: "Network error connecting to the Helpora study engine. Let's try again in a moment.",
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
    const newId = `c-${Date.now()}`;
    const newConv: ConversationItem = {
      id: newId,
      title: 'New Study Topic',
      date: 'Just now'
    };
    setConversations([newConv, ...conversations]);
    setActiveConvId(newId);
    setMessages([
      {
        id: `m-${Date.now()}`,
        sender: 'ai',
        text: "New study session started! What subject or problem would you like to explore together?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const quickPrompts = [
    { label: 'Explain this simply', action: 'Explain this simply in plain English' },
    { label: 'Give me an example', action: 'Give me a real-world Nigerian practical example' },
    { label: 'Quiz me', action: 'Quiz me on this concept with 2 practice questions' },
    { label: 'Show me step by step', action: 'Break this down step by step' },
    { label: 'Summarize this', action: 'Summarize the key takeaways and formulas' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-16 lg:pb-0">
      
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle sessions sidebar"
            >
              {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>

            <Link
              href="/study"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Study Hub</span>
            </Link>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                AI
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">Helpora Patient Tutor</p>
                <p className="text-[10px] text-emerald-700 font-medium">Step-by-step guidance</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNewConversation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Session</span>
            </button>

            <Link
              href="/study/practice"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold transition"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Quizzes</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout: Conversation Sidebar + Chat Canvas */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex-1 flex gap-6 items-stretch">
        
        {/* Left Sidebar (Conversations History) */}
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 p-4 space-y-4 transform transition-transform duration-200 lg:relative lg:translate-x-0 lg:z-0 lg:rounded-2xl lg:border lg:shadow-subtle lg:h-[calc(100vh-140px)] flex flex-col justify-between ${
          sidebarOpen ? 'translate-x-0 top-16' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="space-y-3">
            <button
              onClick={() => { handleNewConversation(); setSidebarOpen(false); }}
              className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>New Conversation</span>
            </button>

            <div className="pt-2">
              <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Recent Topics
              </p>
              <div className="space-y-1">
                {conversations.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setActiveConvId(c.id); setSidebarOpen(false); }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-center gap-2 ${
                      activeConvId === c.id
                        ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{c.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-600">
            <p className="font-bold text-slate-800">Helpora Study Guarantee</p>
            <p className="text-[11px] text-slate-500 leading-tight">
              We never give you bare answers without showing the underlying method.
            </p>
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden h-[calc(100vh-140px)]">
          
          {/* Scrollable Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((m) => {
              const isAi = m.sender === 'ai';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`group relative max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isAi
                        ? 'bg-slate-50 border border-slate-200 text-slate-800'
                        : 'bg-emerald-600 text-white shadow-xs'
                    }`}
                  >
                    {/* Attached Image preview if sent by user */}
                    {m.image && (
                      <div className="mb-2 max-w-xs rounded-lg overflow-hidden border border-white/20">
                        <img src={m.image} alt="User attachment" className="w-full h-auto" />
                      </div>
                    )}

                    <div className="whitespace-pre-wrap font-sans">
                      {m.text}
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-2 pt-1 border-t border-slate-200/40 text-[10px] opacity-70">
                      <span>{m.timestamp}</span>
                      {isAi && (
                        <button
                          onClick={() => handleCopy(m.text, m.id)}
                          className="hover:opacity-100 flex items-center gap-1 transition"
                          title="Copy explanation"
                        >
                          {copiedId === m.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600 font-semibold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {!isAi && (
                    <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-slate-200" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span>Thinking through the steps...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Prompt Action Chips */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/70 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
            <span className="text-[11px] font-bold text-slate-500 shrink-0">Ask Tutor:</span>
            {quickPrompts.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handleSend(undefined, p.action)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-700 text-slate-700 text-[11px] font-medium whitespace-nowrap transition shadow-xs"
              >
                &ldquo;{p.label}&rdquo;
              </button>
            ))}
          </div>

          {/* Attached Image Thumbnail Bar */}
          {attachedImage && (
            <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <img src={attachedImage} alt="Attachment thumbnail" className="w-8 h-8 object-cover rounded" />
                <span className="text-slate-600">Image attached (formula or diagram)</span>
              </div>
              <button
                type="button"
                onClick={() => setAttachedImage(null)}
                className="text-slate-400 hover:text-rose-600 font-bold px-1"
              >
                Remove
              </button>
            </div>
          )}

          {/* Bottom Chat Input Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center gap-2"
          >
            {/* Hidden File Input for diagram/homework image */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              title="Attach diagram or formula photo"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a technical or academic question (e.g. Sizing a 24V inverter, quadratic formula, Ohm's law)..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium placeholder:text-slate-400"
            />

            <button
              type="submit"
              disabled={isTyping || (!input.trim() && !attachedImage)}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl transition shadow-xs shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </main>
      </div>
    </div>
  );
}

export default function TutorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">Connecting to Helpora AI Tutor...</p>
          </div>
        </div>
      }
    >
      <TutorChatContent />
    </Suspense>
  );
}
