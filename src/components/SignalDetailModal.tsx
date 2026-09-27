'use client';

import React from 'react';
import { Signal } from '@/types';
import { X, CheckCircle2, AlertTriangle, ArrowRight, ShieldAlert, Cpu, Newspaper, Activity, Calculator } from 'lucide-react';

interface SignalDetailModalProps {
  signal: Signal | null;
  onClose: () => void;
  onOpenRiskCalculator: (signal: Signal) => void;
  onViewPair: (symbol: string) => void;
}

export function SignalDetailModal({
  signal,
  onClose,
  onOpenRiskCalculator,
  onViewPair,
}: SignalDetailModalProps) {
  if (!signal) return null;

  const isBuy = signal.type === 'BUY';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0c121e] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0f172a]">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                isBuy
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}
            >
              {signal.type}
            </span>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {signal.symbol}
                <span className="text-xs font-normal text-slate-400">({signal.time})</span>
              </h2>
              <p className="text-xs text-slate-400">Regime: <span className="text-cyan-400 font-medium">{signal.regime}</span></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#131c2e] p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Entry Price</span>
              <span className="text-base font-bold text-white font-mono">{signal.entry}</span>
            </div>
            <div className="bg-[#131c2e] p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Stop Loss</span>
              <span className="text-base font-bold text-rose-400 font-mono">{signal.stopLoss}</span>
            </div>
            <div className="bg-[#131c2e] p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Take Profit</span>
              <span className="text-base font-bold text-emerald-400 font-mono">{signal.takeProfit}</span>
            </div>
            <div className="bg-[#131c2e] p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Risk / Reward</span>
              <span className="text-base font-bold text-cyan-400 font-mono">{signal.riskReward}</span>
            </div>
          </div>

          {/* Scores & Confidence Bar */}
          <div className="bg-[#111927] p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold text-slate-200">AI Confidence Score</span>
              <span className="font-bold text-cyan-400 text-sm">{signal.confidence}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${signal.confidence}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-slate-400 block">Technical</span>
                  <span className="font-semibold text-slate-200">{signal.technicalScore}/100</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="text-slate-400 block">News Sentiment</span>
                  <span className="font-semibold text-slate-200">+{signal.newsScore / 100}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <div>
                  <span className="text-slate-400 block">Risk Level</span>
                  <span className="font-semibold text-amber-400">{signal.riskLevel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Why this signal? */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              Why this signal?
            </h3>
            <div className="bg-[#0b101c] p-4 rounded-xl border border-slate-800 space-y-2.5">
              {signal.checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  {item.status === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  ) : item.status === 'bearish' ? (
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  <span className={item.status === 'warning' ? 'text-amber-200' : 'text-slate-300'}>
                    {item.item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Explanation Card */}
          <div className="bg-[#0d1627] p-4 rounded-xl border border-blue-900/40 relative">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-1.5 uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              AI Decision Explanation
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {signal.explanation}
            </p>
          </div>

          {/* Disclaimer alert */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300/90 leading-tight">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Decision Support Notice:</strong> Signal generated via multi-model ensemble consensus.
              Forex trading involves significant risk of loss. Past backtest accuracy does not guarantee future results.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#0f172a] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onViewPair(signal.symbol);
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            View Full Pair Chart
          </button>
          <button
            onClick={() => {
              onOpenRiskCalculator(signal);
              onClose();
            }}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition flex items-center gap-2 shadow-lg shadow-blue-900/30"
          >
            <Calculator className="w-4 h-4" />
            Calculate Lot Size & Risk
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
