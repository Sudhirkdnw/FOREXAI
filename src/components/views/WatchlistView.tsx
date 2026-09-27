'use client';

import React from 'react';
import { Star, ArrowUpRight, ArrowDownRight, ArrowRight, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { mockPairs } from '@/data/mock/markets';

interface WatchlistViewProps {
  onSelectPair: (symbol: string) => void;
}

export function WatchlistView({ onSelectPair }: WatchlistViewProps) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1b33] to-[#0a1220] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
              <Star className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Forex Market Watchlist</h1>
          </div>
          <p className="text-xs text-slate-400">
            High-liquidity G10 currency crosses tracked continuously by the ForexAI automated multi-model pipeline.
          </p>
        </div>

        <div className="text-xs text-slate-400">
          Showing <strong className="text-white">9 Major & Cross Pairs</strong>
        </div>
      </div>

      {/* Watchlist Table (Section 22) */}
      <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f172a] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-3">Pair</th>
                <th className="py-3 px-3 text-right">Price</th>
                <th className="py-3 px-3 text-right">24h Change</th>
                <th className="py-3 px-3 text-center">Trend</th>
                <th className="py-3 px-3 text-center">AI Confidence</th>
                <th className="py-3 px-3 text-center">Volatility</th>
                <th className="py-3 px-3 text-right">Spread</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-[#090e18]">
              {mockPairs.map((pair) => {
                const isBullish = pair.trend.includes('Bullish');
                return (
                  <tr
                    key={pair.symbol}
                    onClick={() => onSelectPair(pair.symbol)}
                    className="hover:bg-slate-800/40 cursor-pointer transition group"
                  >
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                        <div>
                          <span className="font-bold text-white group-hover:text-blue-400 transition text-sm">
                            {pair.symbol}
                          </span>
                          <span className="text-[10px] text-slate-500 block">{pair.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-200">
                      {pair.price}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono">
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
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isBullish
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : pair.trend === 'Neutral'
                            ? 'bg-slate-700 text-slate-300'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {pair.trend}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className="bg-blue-500 h-full rounded-full"
                            style={{ width: `${pair.aiConfidence}%` }}
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-cyan-400">{pair.aiConfidence}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          pair.volatility === 'High'
                            ? 'bg-rose-500/15 text-rose-300'
                            : pair.volatility === 'Moderate'
                            ? 'bg-amber-500/15 text-amber-300'
                            : 'bg-emerald-500/15 text-emerald-300'
                        }`}
                      >
                        {pair.volatility}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-400">
                      {pair.spread} pips
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPair(pair.symbol);
                        }}
                        className="px-3 py-1 rounded-lg bg-slate-800 group-hover:bg-blue-600 text-slate-300 group-hover:text-white text-xs font-semibold transition flex items-center gap-1 ml-auto"
                      >
                        Analyze <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
