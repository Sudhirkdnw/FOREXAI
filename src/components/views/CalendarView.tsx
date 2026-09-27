'use client';

import React, { useState } from 'react';
import {
  Calendar,
  AlertCircle,
  Clock,
  Filter,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { mockEconomicEvents } from '@/data/mock/economicEvents';

interface CalendarViewProps {
  onSelectPair: (symbol: string) => void;
}

export function CalendarView({ onSelectPair }: CalendarViewProps) {
  const [impactFilter, setImpactFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM'>('ALL');

  const filteredEvents = mockEconomicEvents.filter((ev) => {
    if (impactFilter === 'ALL') return true;
    return ev.impact === impactFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1b33] to-[#0a1220] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
              <Calendar className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Economic Calendar</h1>
          </div>
          <p className="text-xs text-slate-400">
            High-impact macroeconomic releases synchronized with ForexAI risk management filters to guard against slippage.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-[#0e1626] p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setImpactFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              impactFilter === 'ALL'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Releases
          </button>
          <button
            onClick={() => setImpactFilter('HIGH')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              impactFilter === 'HIGH'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            HIGH Impact Only
          </button>
        </div>
      </div>

      {/* Calendar Table (Section 16) */}
      <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">Scheduled Macroeconomic Catalysts</h3>
            <p className="text-xs text-slate-400">Automated signal suspension window: ±15 minutes around HIGH impact events</p>
          </div>
          <span className="text-[11px] text-slate-400">Times in UTC</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f172a] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-3">Time</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Cur</th>
                <th className="py-3 px-3">Event</th>
                <th className="py-3 px-3 text-center">Impact</th>
                <th className="py-3 px-3 text-right">Previous</th>
                <th className="py-3 px-3 text-right">Forecast</th>
                <th className="py-3 px-3 text-right">Actual</th>
                <th className="py-3 px-3">Market Reaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-[#090e18]">
              {filteredEvents.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-200">
                    {ev.time}
                  </td>
                  <td className="py-3.5 px-3 text-slate-400 text-[11px]">
                    {ev.date}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-200">
                      {ev.currency}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-white">
                    {ev.event}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ev.impact === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : ev.impact === 'MEDIUM'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {ev.impact}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-slate-400">
                    {ev.previous}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-slate-400">
                    {ev.forecast}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold">
                    <span
                      className={
                        ev.actual === '--'
                          ? 'text-slate-500'
                          : ev.reactionBias === 'bullish'
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }
                    >
                      {ev.actual}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-300">
                    <div className="flex items-center gap-1.5 text-xs">
                      {ev.reactionBias === 'bullish' ? (
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : ev.reactionBias === 'bearish' ? (
                        <TrendingDown className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      )}
                      <span>{ev.marketReaction}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
