'use client';

import React, { useState } from 'react';
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  Clock,
  Filter,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { mockNewsArticles, mockSentimentOverview } from '@/data/mock/news';

interface NewsViewProps {
  onSelectPair: (symbol: string) => void;
}

export function NewsView({ onSelectPair }: NewsViewProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('ALL');

  const filteredNews = mockNewsArticles.filter((item) => {
    if (selectedCurrency === 'ALL') return true;
    return item.currency === selectedCurrency;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1b33] to-[#0a1220] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30">
              <Newspaper className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">News & Market Sentiment</h1>
          </div>
          <p className="text-xs text-slate-400">
            Natural language processing (FinBERT) parses institutional news wires and central bank publications into directional bias scores.
          </p>
        </div>

        {/* Currency Filter */}
        <div className="flex items-center bg-[#0e1626] p-1 rounded-xl border border-slate-800 text-xs">
          {['ALL', 'USD', 'EUR', 'GBP', 'JPY'].map((cur) => (
            <button
              key={cur}
              onClick={() => setSelectedCurrency(cur)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                selectedCurrency === cur
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* Section 15: OVERALL SENTIMENT PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* USD Sentiment */}
        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>USD Aggregate Sentiment</span>
            <span className="text-[10px] font-bold text-rose-400">Dovish Shift</span>
          </div>
          <div className="text-xl font-bold font-mono text-rose-400">
            {mockSentimentOverview.usdSentiment}
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-rose-500 h-full w-[42%]"></div>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Cooling wage inflation pressure</span>
        </div>

        {/* EUR Sentiment */}
        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>EUR Aggregate Sentiment</span>
            <span className="text-[10px] font-bold text-emerald-400">Constructive</span>
          </div>
          <div className="text-xl font-bold font-mono text-emerald-400">
            +{mockSentimentOverview.eurSentiment}
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-emerald-500 h-full w-[51%]"></div>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">ECB hawkish floor intact</span>
        </div>

        {/* EUR/USD Combined Sentiment (Section 15 spec) */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-cyan-950/40 to-blue-950/40 border border-blue-700/60 md:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              EUR/USD Combined Sentiment Score
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              {mockSentimentOverview.eurUsdCombined.verdict}
            </span>
          </div>

          <div className="my-2">
            <div className="text-2xl font-black text-emerald-400 font-mono">
              +{mockSentimentOverview.eurUsdCombined.score} {mockSentimentOverview.eurUsdCombined.verdict}
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {mockSentimentOverview.eurUsdCombined.breakdown}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Model Weight: 25% of final signal</span>
            <button
              onClick={() => onSelectPair('EUR/USD')}
              className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
            >
              Analyze EUR/USD <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* News Articles List (Section 15) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Latest Financial News & Sentiment Attribution
        </h3>

        <div className="space-y-3">
          {filteredNews.map((article) => {
            const isBullish = article.score > 0;
            return (
              <div
                key={article.id}
                className="p-4 rounded-xl bg-[#0c121e] border border-slate-800 hover:border-slate-700 transition space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-300">{article.source}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {article.timeAgo}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                      {article.currency}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        article.impact === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {article.impact} IMPACT
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isBullish
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {article.score > 0 ? `+${article.score}` : article.score}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white hover:text-blue-400 cursor-pointer transition">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 text-[11px]">Sentiment Impact:</span>
                    <span
                      className={`font-semibold text-xs ${
                        isBullish ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {article.sentiment}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">Related Pairs:</span>
                    {article.relatedPairs.map((p) => (
                      <button
                        key={p}
                        onClick={() => onSelectPair(p)}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono transition"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
