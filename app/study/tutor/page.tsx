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
    <div className="min-h-screen bg-slate-50 flex flex-col pb-16 lg:pb-0 relative overflow-hidden">
      {/* Decorative ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-16 z-20">
        <div className="w-full max-w-[96%] 2xl:max-w-[1760px] mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Toggle sessions sidebar"
            >
              {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>

            <Link
              href="/study"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Study Hub</span>
            </Link>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-xs shadow-glow-brand">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-950 leading-tight flex items-center gap-1.5">
                  <span>Helpora Patient AI Tutor</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </p>
                <p className="text-[10px] text-emerald-700 font-semibold">Curriculum & Technical Trades</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleNewConversation}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Topic</span>
            </button>

            <Link
              href="/study/practice"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold transition shadow-xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Practice Quizzes</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout: Conversation Sidebar + Chat Canvas */}
      <div className="w-full max-w-[96%] 2xl:max-w-[1760px] mx-auto w-full px-3 sm:px-4 lg:px-6 py-5 flex-1 flex gap-6 items-stretch">
        
        {/* Left Sidebar (Conversations History) */}
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 p-5 space-y-4 transform transition-transform duration-200 lg:relative lg:translate-x-0 lg:z-0 lg:rounded-3xl lg:border lg:shadow-elevated lg:h-[calc(100vh-150px)] flex flex-col justify-between ${
          sidebarOpen ? 'translate-x-0 top-16' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="space-y-4">
            <button
              onClick={() => { handleNewConversation(); setSidebarOpen(false); }}
              className="w-full py-2.5 px-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-glow-brand"
            >
              <Plus className="w-4 h-4" />
              <span>New Conversation</span>
            </button>

            <div className="pt-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">
                Recent Topics
              </p>
              <div className="space-y-1.5">
                {conversations.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setActiveConvId(c.id); setSidebarOpen(false); }}
                    className={`w-full text-left p-3 rounded-2xl text-xs transition flex items-center gap-2.5 ${
                      activeConvId === c.id
                        ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-300 shadow-xs'
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

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1 text-slate-600">
            <p className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Patient Guidance Guarantee</span>
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              We never give you bare answers without showing the underlying method and practical intuition.
            </p>
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-elevated overflow-hidden h-[calc(100vh-150px)]">
          
          {/* Scrollable Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {messages.map((m) => {
              const isAi = m.sender === 'ai';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-3.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-subtle mt-0.5">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}

                  <div
                    className={`group relative max-w-2xl rounded-3xl p-5 text-xs sm:text-sm leading-relaxed ${
                      isAi
                        ? 'bg-slate-50/90 border border-slate-200/90 text-slate-800 shadow-subtle'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-glow-brand'
                    }`}
                  >
                    {/* Attached Image preview if sent by user */}
                    {m.image && (
                      <div className="mb-3 max-w-xs rounded-2xl overflow-hidden border border-white/20 shadow-xs">
                        <img src={m.image} alt="User attachment" className="w-full h-auto" />
                      </div>
                    )}

                    <div className="whitespace-pre-wrap font-sans">
                      {m.text}
                    </div>

                    <div className={`flex items-center justify-between gap-4 mt-3 pt-2 border-t ${
                      isAi ? 'border-slate-200/60 text-slate-400' : 'border-white/20 text-emerald-100'
                    } text-[10px]`}>
                      <span>{m.timestamp}</span>
                      {isAi && (
                        <button
                          onClick={() => handleCopy(m.text, m.id)}
                          className="hover:opacity-100 flex items-center gap-1 transition"
                          title="Copy explanation"
                        >
                          {copiedId === m.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {!isAi && (
                    <div className="w-9 h-9 rounded-2xl bg-slate-950 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <User className="w-5 h-5 text-slate-200" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-subtle">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-slate-50 border border-slate-200/90 rounded-3xl px-5 py-3.5 text-xs text-slate-500 flex items-center gap-2.5 shadow-subtle">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                  <span className="font-medium">Thinking through the solution step by step...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Prompt Action Chips */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/70 overflow-x-auto flex items-center gap-2 no-scrollbar">
            <span className="text-[11px] font-bold text-slate-500 shrink-0 pl-1">Ask Tutor:</span>
            {quickPrompts.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handleSend(undefined, p.action)}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-800 text-slate-700 text-[11px] font-bold whitespace-nowrap transition shadow-xs"
              >
                &ldquo;{p.label}&rdquo;
              </button>
            ))}
          </div>

          {/* Attached Image Thumbnail Bar */}
          {attachedImage && (
            <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <img src={attachedImage} alt="Attachment thumbnail" className="w-8 h-8 object-cover rounded-lg" />
                <span className="text-slate-600 font-medium">Image attached (diagram or math equation)</span>
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
            className="p-3 sm:p-4 border-t border-slate-200/90 bg-white flex items-center gap-2.5"
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
              className="p-3 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              title="Attach diagram or formula photo"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a technical or academic question (e.g. Inverter battery formula, quadratic equation, Ohm's law)..."
              className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium placeholder:text-slate-400"
            />

            <button
              type="submit"
              disabled={isTyping || (!input.trim() && !attachedImage)}
              className="p-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:opacity-95 disabled:opacity-40 text-white rounded-2xl transition shadow-glow-brand shrink-0"
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
