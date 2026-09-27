'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  AlertCircle,
  Activity,
  ArrowRight,
  Zap,
  DollarSign,
  Layers,
  Sparkles,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { mockPairs } from '@/data/mock/markets';
import { mockSignals } from '@/data/mock/signals';
import { mockEconomicEvents } from '@/data/mock/economicEvents';
import { Signal } from '@/types';

interface DashboardViewProps {
  onSelectPair: (symbol: string) => void;
  onSelectTab: (tab: string) => void;
  onOpenSignalDetail: (signal: Signal) => void;
}

export function DashboardView({
  onSelectPair,
  onSelectTab,
  onOpenSignalDetail,
}: DashboardViewProps) {
  const topPairs = mockPairs.slice(0, 5);
  const featuredPair = mockPairs[0]; // EUR/USD
  const recentEvents = mockEconomicEvents.slice(0, 3);
  const activeSignals = mockSignals.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Top Greeting & Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1b33] to-[#0a1220] border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Good morning, Trader
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Market OPEN
            </span>
          </div>
          <p className="text-xs text-slate-400 flex items-center gap-2">
            <span>Decision Support Mode Active</span>
            <span className="text-slate-600">•</span>
            <span>Last data sync: <strong className="text-slate-300">2s ago</strong></span>
            <span className="text-slate-600">•</span>
            <span>UTC Time: <strong className="text-slate-300">15:30:14</strong></span>
          </p>
        </div>

        {/* Quick Demo Guidance Banner */}
        <div className="flex items-center gap-2 sm:gap-3 bg-[#0a101d] px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-[11px] leading-tight">
            <div className="text-slate-200 font-semibold">AI Decision Support Engine</div>
            <div className="text-slate-400">Multi-Model Ensemble + FinBERT Sentiment</div>
          </div>
        </div>
      </div>

      {/* 5 KPI Cards (Section 7) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Card 1: Market Sentiment */}
        <div className="p-4 rounded-xl bg-[#0e1626] border border-slate-800/80 hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Market Sentiment</span>
            <Compass className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-5 h-5" />
            Bullish
          </div>
          <div className="text-[10px] text-slate-500 mt-1">EUR & G10 risk-on index +0.62</div>
        </div>

        {/* Card 2: AI Signal Accuracy */}
        <div className="p-4 rounded-xl bg-[#0e1626] border border-slate-800/80 hover:border-slate-700 transition relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>AI Signal Accuracy</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-cyan-400 font-mono">
            72.4%
          </div>
          <div className="text-[10px] text-amber-400/90 font-medium mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
            Historical Backtest (Not Guaranteed)
          </div>
        </div>

        {/* Card 3: Active Signals */}
        <div
          onClick={() => onSelectTab('signals')}
          className="p-4 rounded-xl bg-[#0e1626] border border-slate-800/80 hover:border-blue-500/50 cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Active Signals</span>
            <Zap className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono flex items-center justify-between">
            <span>12</span>
            <span className="text-[10px] text-blue-400 font-normal">View all →</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">8 Buy / 4 Sell signals</div>
        </div>

        {/* Card 4: Portfolio P&L */}
        <div
          onClick={() => onSelectTab('portfolio')}
          className="p-4 rounded-xl bg-[#0e1626] border border-slate-800/80 hover:border-emerald-500/50 cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Portfolio P&L</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400 font-mono">
            +$2,840
          </div>
          <div className="text-[10px] text-emerald-500 font-semibold mt-1">+11.69% total return</div>
        </div>

        {/* Card 5: Market Volatility */}
        <div className="p-4 rounded-xl bg-[#0e1626] border border-slate-800/80 hover:border-slate-700 transition col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Market Volatility</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-amber-400">
            Moderate
          </div>
          <div className="text-[10px] text-slate-500 mt-1">G10 ATR index at 42 pips/day</div>
        </div>
      </div>

      {/* Main Grid: AI Market Summary (Section 9) & Market Overview (Section 8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Market Summary Card (Section 9) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="p-5 rounded-2xl bg-[#0d1526] border border-blue-900/50 shadow-xl relative overflow-hidden flex-1 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  AI Market Summary
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  EUR/USD Lead Focus
                </span>
              </div>

              {/* Summary Text (Section 9 exact specification) */}
              <blockquote className="text-xs sm:text-sm text-slate-200 leading-relaxed italic border-l-2 border-blue-500 pl-3 py-1 mb-4 bg-blue-950/20 rounded-r-lg">
                &ldquo;{featuredPair.aiSummary.text}&rdquo;
              </blockquote>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 my-4 text-xs">
                <div className="p-2.5 rounded-lg bg-[#0a101e] border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Technical Score</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    {featuredPair.technical.technicalScore}/100
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0a101e] border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">News Sentiment</span>
                  <span className="text-sm font-bold text-cyan-400 font-mono">
                    +{featuredPair.aiSummary.newsSentiment}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0a101e] border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Market Regime</span>
                  <span className="text-sm font-bold text-white font-medium">
                    {featuredPair.aiSummary.marketRegime}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0a101e] border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">AI Confidence</span>
                  <span className="text-sm font-bold text-blue-400 font-mono">
                    {featuredPair.aiConfidence}%
                  </span>
                </div>
              </div>
            </div>

            {/* View Detailed Analysis Action */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Updated: Sep 24, 15:30 UTC</span>
              <button
                onClick={() => onSelectPair('EUR/USD')}
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 group transition"
              >
                View Detailed Analysis
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Quick Active Signals Strip */}
          <div className="p-4 rounded-xl bg-[#0c121f] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Latest High-Confidence Signals
              </span>
              <button
                onClick={() => onSelectTab('signals')}
                className="text-blue-400 hover:underline text-[11px]"
              >
                See all (12)
              </button>
            </div>

            <div className="space-y-2">
              {activeSignals.map((sig) => (
                <div
                  key={sig.id}
                  onClick={() => onOpenSignalDetail(sig)}
                  className="p-2.5 rounded-lg bg-[#101828] hover:bg-[#142036] cursor-pointer border border-slate-800/80 flex items-center justify-between text-xs transition"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        sig.type === 'BUY'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {sig.type}
                    </span>
                    <span className="font-bold text-white">{sig.symbol}</span>
                    <span className="text-slate-400 text-[11px]">@ {sig.entry}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-mono font-semibold text-[11px]">
                      {sig.confidence}% conf
                    </span>
                    <span className="text-slate-500 text-[10px]">{sig.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Market Overview Table (Section 8) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  Market Overview
                </h2>
                <p className="text-xs text-slate-400">Click any pair to open the dedicated Pair Analysis terminal</p>
              </div>
              <button
                onClick={() => onSelectTab('markets')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                All Markets (9) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table (Section 8) */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0f172a] text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Pair</th>
                    <th className="py-2.5 px-3 text-right">Price</th>
                    <th className="py-2.5 px-3 text-right">Change</th>
                    <th className="py-2.5 px-3 text-center">Trend</th>
                    <th className="py-2.5 px-3 text-right">AI Confidence</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-[#090e18]">
                  {topPairs.map((pair) => {
                    const isBullish = pair.trend === 'Bullish';
                    return (
                      <tr
                        key={pair.symbol}
                        onClick={() => onSelectPair(pair.symbol)}
                        className="hover:bg-slate-800/40 cursor-pointer transition group"
                      >
                        <td className="py-3 px-3">
                          <div className="font-bold text-white group-hover:text-blue-400 transition">
                            {pair.symbol}
                          </div>
                          <div className="text-[10px] text-slate-500">{pair.name}</div>
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-semibold text-slate-200">
                          {pair.price}
                        </td>
                        <td className="py-3 px-3 text-right font-mono">
                          <span
                            className={`inline-flex items-center gap-0.5 font-bold ${
                              pair.change >= 0 ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {pair.change >= 0 ? (
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            ) : (
                              <ArrowDownRight className="w-3.5 h-3.5" />
                            )}
                            {pair.change >= 0 ? `+${pair.change}%` : `${pair.change}%`}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isBullish
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {pair.trend}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden hidden sm:block">
                              <div
                                className="bg-blue-500 h-full rounded-full"
                                style={{ width: `${pair.aiConfidence}%` }}
                              ></div>
                            </div>
                            <span className="font-mono font-bold text-cyan-400 text-xs">
                              {pair.aiConfidence}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectPair(pair.symbol);
                            }}
                            className="px-2.5 py-1 rounded bg-slate-800 group-hover:bg-blue-600 text-slate-300 group-hover:text-white text-[11px] font-semibold transition"
                          >
                            Analyze
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Upcoming Economic Events Mini-Widget */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  Upcoming Macroeconomic Events
                </span>
                <button
                  onClick={() => onSelectTab('calendar')}
                  className="text-xs text-blue-400 hover:underline"
                >
                  Full Calendar →
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {recentEvents.map((ev) => (
                  <div key={ev.id} className="p-2.5 rounded-lg bg-[#0e1627] border border-slate-800">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="font-mono text-slate-400">{ev.time} UTC</span>
                      <span
                        className={`font-bold px-1.5 py-0.2 rounded ${
                          ev.impact === 'HIGH'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {ev.impact}
                      </span>
                    </div>
                    <div className="font-bold text-white truncate text-[11px]">{ev.event}</div>
                    <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                      <span>Cur: {ev.currency}</span>
                      <span>Act: <strong className="text-emerald-400">{ev.actual}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
