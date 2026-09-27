'use client';

import React, { useState } from 'react';
import {
  Zap,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  Calculator,
  ArrowRight,
  Activity,
  Newspaper,
  CheckCircle2
} from 'lucide-react';
import { mockSignals } from '@/data/mock/signals';
import { Signal } from '@/types';

interface SignalsViewProps {
  onOpenSignalDetail: (signal: Signal) => void;
  onOpenRiskCalculator: (signal: Signal) => void;
  onSelectPair: (symbol: string) => void;
}

export function SignalsView({
  onOpenSignalDetail,
  onOpenRiskCalculator,
  onSelectPair,
}: SignalsViewProps) {
  const [filterType, setFilterType] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');

  const filteredSignals = mockSignals.filter((s) => {
    if (filterType === 'ALL') return true;
    return s.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1b33] to-[#0a1220] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Trading Signals</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
              {mockSignals.length} Active Today
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time multi-factor signal synthesis with strict risk/reward parameters and stop-loss enforcement.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-[#0e1626] p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filterType === 'ALL'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Signals ({mockSignals.length})
          </button>
          <button
            onClick={() => setFilterType('BUY')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filterType === 'BUY'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            BUY Only
          </button>
          <button
            onClick={() => setFilterType('SELL')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filterType === 'SELL'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SELL Only
          </button>
        </div>
      </div>

      {/* Signals Table Card (Section 18) */}
      <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">Active Signal Opportunities</h3>
            <p className="text-xs text-slate-400">Click any row to open the complete analysis breakdown and risk sizing</p>
          </div>
          <span className="text-[11px] text-slate-400">Minimum R:R Target: 1:1.5</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f172a] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-3">Pair</th>
                <th className="py-3 px-3">Signal</th>
                <th className="py-3 px-3 text-right">Entry</th>
                <th className="py-3 px-3 text-right">Stop Loss</th>
                <th className="py-3 px-3 text-right">Take Profit</th>
                <th className="py-3 px-3 text-center">R : R</th>
                <th className="py-3 px-3 text-center">Confidence</th>
                <th className="py-3 px-3 text-center">Scores (Tech/News)</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-[#090e18]">
              {filteredSignals.map((signal) => {
                const isBuy = signal.type === 'BUY';
                return (
                  <tr
                    key={signal.id}
                    onClick={() => onOpenSignalDetail(signal)}
                    className="hover:bg-slate-800/40 cursor-pointer transition group"
                  >
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-white group-hover:text-blue-400 transition text-sm">
                        {signal.symbol}
                      </div>
                      <div className="text-[10px] text-slate-500">{signal.time}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-1 rounded text-xs font-black tracking-wide ${
                          isBuy
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {signal.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-200">
                      {signal.entry}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-rose-400 font-semibold">
                      {signal.stopLoss}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-emerald-400 font-semibold">
                      {signal.takeProfit}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-cyan-400">
                      {signal.riskReward}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-200">
                          {signal.confidence}%
                        </span>
                        <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className="bg-blue-500 h-full rounded-full"
                            style={{ width: `${signal.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-2 text-[11px] font-mono">
                        <span className="text-emerald-400" title="Technical Score">T: {signal.technicalScore}</span>
                        <span className="text-slate-600">/</span>
                        <span className="text-cyan-400" title="News Sentiment Score">N: +{signal.newsScore / 100}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenRiskCalculator(signal);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition"
                          title="Calculate Lot Size & Risk"
                        >
                          <Calculator className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenSignalDetail(signal);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 font-semibold text-xs transition"
                        >
                          Details →
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Signals Safety Notice Banner */}
        <div className="p-3.5 bg-[#090e18] rounded-xl border border-slate-800/80 flex items-start gap-3 text-xs text-slate-400">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">Signal Execution Protocol:</strong> Every signal includes a non-negotiable stop loss calculated from dynamic ATR buffers.
            Signals are invalidated if high-impact central bank announcements occur within 30 minutes of entry.
          </div>
        </div>
      </div>
    </div>
  );
}
