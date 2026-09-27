'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Send,
  Sparkles,
  Bot,
  User,
  Database,
  FileText,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Layers,
  Cpu
} from 'lucide-react';
import { mockRagKnowledgeBase } from '@/data/mock/models';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: string[];
}

export function ResearchRagView() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'Why is EUR/USD showing a bullish signal?',
    },
    {
      id: 'msg-2',
      sender: 'assistant',
      text: 'EUR/USD is showing a bullish signal because the current technical structure is positive, the model ensemble is leaning bullish (78% consensus), and recent EUR-related sentiment (+0.51) is stronger than USD sentiment (-0.42). No immediate high-impact event is currently reducing confidence.',
      sources: [
        'Federal Reserve FOMC Policy Statement Excerpt (Sep 2026)',
        'ECB Monetary Policy Decisions & Press Conference',
        'Technical Structure & Order Flow Note: EUR/USD Key Liquidity Bands',
      ],
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    'Why is EUR/USD showing a bullish signal?',
    'What does the model ensemble indicate for USD/JPY?',
    'Explain the impact of the upcoming US CPI release',
    'How does the ECB hawkish tone impact EUR crosses?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let sources: string[] = [];

      if (query.toLowerCase().includes('usd/jpy')) {
        reply = 'USD/JPY is showing a bearish posture (74% confidence short bias) as Bank of Japan policy normalization rhetoric contrasts with cooling US Treasury yields. The pair broke below 148.80 with EMA 20 crossing beneath EMA 50 on the H1 timeframe.';
        sources = ['Bank of Japan Monetary Policy Summary', 'US 10Y Yield Curve Analysis'];
      } else if (query.toLowerCase().includes('cpi')) {
        reply = 'The upcoming US Consumer Price Index release at 10:00 UTC printed at 2.9% YoY (versus 3.0% forecast). Cooling core inflation reduces the likelihood of further terminal rate increases, creating downward yield pressure on the US Dollar.';
        sources = ['US Bureau of Labor Statistics CPI Release', 'FinBERT Macro Sentiment Index'];
      } else if (query.toLowerCase().includes('ecb') || query.toLowerCase().includes('lagarde')) {
        reply = 'ECB President Lagarde reiterated that monetary policy will remain sufficiently restrictive for as long as needed to secure the 2.0% target. This provided sovereign bond spread stability and supported the Euro across G10 crosses.';
        sources = ['ECB Governing Council Official Transcript', 'Eurostat Disinflation Tracker'];
      } else {
        reply = `Regarding "${query}": The simulated RAG knowledge layer retrieves relevant central-bank minutes, real-time macroeconomic reports, and institutional order book liquidity levels to ground decision support reasoning. Current multi-model consensus remains risk-aligned.`;
        sources = ['ForexAI Macro Research Digest (Sep 2026)', 'G10 Quantitative Order Flow Model'];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          sources,
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1b33] to-[#0a1220] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg border border-purple-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">AI Context & Research</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              RAG Knowledge Layer
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            The AI assistant can retrieve relevant market news, economic announcements, central-bank statements and research documents to explain current market conditions.
          </p>
        </div>

        {/* Section 17: Prominent Prototype simulated label */}
        <div className="p-3 bg-purple-950/40 border border-purple-700/60 rounded-xl text-xs text-purple-200">
          <div className="font-bold flex items-center gap-1.5 text-purple-300">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Prototype AI Explanation
          </div>
          <span className="text-[11px] text-purple-300/80">Retrieval layer simulated for client demo</span>
        </div>
      </div>

      {/* Main Grid: Chat Assistant & Retrieved Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Chat Interface (Section 17) */}
        <div className="lg:col-span-7 flex flex-col h-[600px] p-5 rounded-2xl bg-[#0c121e] border border-slate-800 justify-between">
          {/* Chat Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-xs font-bold text-white">Market Intelligence Assistant</h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online • Grounded in Central Bank Documents
                </span>
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">v1.2-RAG-Sim</span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 text-xs ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-[#101726] border border-slate-800 text-slate-200 rounded-bl-none space-y-2'
                  }`}
                >
                  <p>{m.text}</p>

                  {m.sources && m.sources.length > 0 && (
                    <div className="pt-2 mt-2 border-t border-slate-800/80 text-[10px] space-y-1 text-slate-400">
                      <span className="font-bold text-cyan-400 uppercase tracking-wider block">
                        Retrieved Context Sources:
                      </span>
                      {m.sources.map((src, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-slate-300">
                          <FileText className="w-3 h-3 text-slate-500" />
                          <span>{src}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 pl-10">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                <span>Searching simulated vector database...</span>
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="py-2 overflow-x-auto flex gap-2 border-t border-slate-800/60 mb-2">
            {samplePrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-lg bg-[#111927] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] whitespace-nowrap transition"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask why a signal was generated, or inquire about central bank statements..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 h-10 px-4 rounded-xl bg-[#0f172a] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right Column: Simulated Retrieved Knowledge Base (Section 17 & Section 32) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                Indexed Knowledge Base
              </h3>
              <span className="text-[10px] font-mono text-cyan-400">pgvector Embeddings</span>
            </div>

            <div className="space-y-3">
              {mockRagKnowledgeBase.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-xl bg-[#101726] border border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white truncate max-w-[240px]">
                      {doc.title}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300">
                      {doc.relevance} match
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">{doc.source}</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed italic bg-slate-900/50 p-2 rounded border border-slate-800/80">
                    &ldquo;{doc.snippet}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 32 Strategy Callout */}
          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-800/40 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-300">
              <Layers className="w-4 h-4 text-blue-400" />
              Strategic Role of RAG in Production
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              In production, RAG is exclusively used for contextual explanation, document search, and qualitative market risk interpretation.
              It does <strong>not</strong> produce numerical entry/exit price forecasts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
