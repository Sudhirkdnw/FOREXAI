'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Shield,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  XCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { mockPortfolio } from '@/data/mock/portfolio';
import { Position } from '@/types';

interface PortfolioViewProps {
  onSelectPair: (symbol: string) => void;
  onSelectTab: (tab: string) => void;
}

export function PortfolioView({ onSelectPair, onSelectTab }: PortfolioViewProps) {
  const [positions, setPositions] = useState<Position[]>(mockPortfolio.openPositions);

  const handleClosePosition = (id: string) => {
    setPositions(positions.filter((p) => p.id !== id));
  };

  const history = mockPortfolio.equityHistory;
  const maxEq = Math.max(...history.map((h) => h.equity)) * 1.02;
  const minEq = Math.min(...history.map((h) => h.balance)) * 0.98;
  const range = maxEq - minEq || 1;

  const svgWidth = 680;
  const svgHeight = 220;

  const getEqY = (val: number) => {
    return svgHeight - ((val - minEq) / range) * (svgHeight - 40) - 20;
  };

  const getEqX = (idx: number) => {
    return 40 + idx * ((svgWidth - 70) / (history.length - 1));
  };

  const equityPoints = history.map((h, i) => `${getEqX(i)},${getEqY(h.equity)}`).join(' ');
  const balancePoints = history.map((h, i) => `${getEqX(i)},${getEqY(h.balance)}`).join(' ');
  const areaPoints = `${getEqX(0)},${svgHeight} ` + equityPoints + ` ${getEqX(history.length - 1)},${svgHeight}`;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1b33] to-[#0a1220] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
              <Briefcase className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Portfolio & Position Monitoring</h1>
          </div>
          <p className="text-xs text-slate-400">
            Live equity tracking, risk exposure distribution, and AI-suggested open trade execution telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('risk')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1.5 shadow-sm"
          >
            <span>Open New Position</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top 5 Portfolio KPI Cards (Section 21) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total Balance */}
        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Total Balance</span>
          <span className="text-xl font-black text-white font-mono">
            ${mockPortfolio.balance.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">Cash in account</span>
        </div>

        {/* Equity */}
        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Account Equity</span>
          <span className="text-xl font-black text-cyan-400 font-mono">
            ${mockPortfolio.equity.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">Floating P&L included</span>
        </div>

        {/* Today's P&L */}
        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Today&apos;s P&L</span>
          <span className="text-xl font-black text-emerald-400 font-mono">
            +${mockPortfolio.todayPnl}
          </span>
          <span className="text-[10px] text-emerald-500 font-semibold mt-1 block">+{mockPortfolio.todayPnlPercent}% daily</span>
        </div>

        {/* Total P&L */}
        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Total P&L</span>
          <span className="text-xl font-black text-emerald-400 font-mono">
            +${mockPortfolio.totalPnl.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-500 font-semibold mt-1 block">+{mockPortfolio.totalPnlPercent}% overall</span>
        </div>

        {/* Drawdown */}
        <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800 col-span-2 sm:col-span-1">
          <span className="text-xs text-slate-400 block mb-1">Max Drawdown</span>
          <span className="text-xl font-black text-amber-400 font-mono">
            {mockPortfolio.drawdown}%
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">Safe buffer &lt; 5.0%</span>
        </div>
      </div>

      {/* Equity Curve Chart (Section 21) */}
      <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Cumulative Equity Curve vs Account Balance
            </h3>
            <p className="text-xs text-slate-400">Steady capital appreciation with controlled drawdown</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-1 bg-cyan-400 rounded-full inline-block"></span>
              Equity (${mockPortfolio.equity.toLocaleString()})
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-1 bg-slate-500 rounded-full inline-block"></span>
              Cash Balance (${mockPortfolio.balance.toLocaleString()})
            </span>
          </div>
        </div>

        {/* SVG Equity Curve */}
        <div className="w-full overflow-x-auto pt-2">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full min-w-[550px] h-48 select-none">
            <defs>
              <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0.25, 0.5, 0.75].map((r) => {
              const y = svgHeight * r;
              const val = Math.round(maxEq - r * range);
              return (
                <g key={r}>
                  <line x1="30" y1={y} x2={svgWidth - 20} y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                  <text x="25" y={y + 3} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                    ${val.toLocaleString()}
                  </text>
                </g>
              );
            })}

            {/* Area and Lines */}
            <polygon points={areaPoints} fill="url(#eqGrad)" />
            <polyline points={balancePoints} fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
            <polyline points={equityPoints} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />

            {/* Date Points */}
            {history.map((h, i) => (
              <g key={i}>
                <circle cx={getEqX(i)} cy={getEqY(h.equity)} r="3" fill="#06b6d4" />
                <text x={getEqX(i)} y={svgHeight - 4} fill="#64748b" fontSize="8" textAnchor="middle">
                  {h.date}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Open Positions Table (Section 21) */}
      <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">Active Open Positions ({positions.length})</h3>
            <p className="text-xs text-slate-400">All active trades governed by stop-loss triggers</p>
          </div>
          <span className="text-[11px] text-slate-500">Margin Used: ${mockPortfolio.marginUsed}</span>
        </div>

        {positions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0f172a] text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Position</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3 text-right">Lots</th>
                  <th className="py-2.5 px-3 text-right">Open Price</th>
                  <th className="py-2.5 px-3 text-right">Current Price</th>
                  <th className="py-2.5 px-3 text-right">SL / TP</th>
                  <th className="py-2.5 px-3 text-right">P&L ($)</th>
                  <th className="py-2.5 px-3 text-right">P&L (%)</th>
                  <th className="py-2.5 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-[#090e18]">
                {positions.map((pos) => {
                  const isProfit = pos.pnl >= 0;
                  return (
                    <tr key={pos.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-3">
                        <div
                          onClick={() => onSelectPair(pos.symbol)}
                          className="font-bold text-white hover:text-blue-400 cursor-pointer flex items-center gap-1.5"
                        >
                          {pos.symbol}
                          {pos.aiSuggested && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                              AI SIGNAL
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500">{pos.openTime}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            pos.type === 'BUY'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {pos.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-semibold text-slate-200">
                        {pos.lots}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-400">
                        {pos.openPrice}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-white">
                        {pos.currentPrice}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-[11px]">
                        <span className="text-rose-400">{pos.stopLoss}</span> / <span className="text-emerald-400">{pos.takeProfit}</span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold">
                        <span className={isProfit ? 'text-emerald-400' : 'text-rose-400'}>
                          {isProfit ? `+$${pos.pnl}` : `-$${Math.abs(pos.pnl)}`}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold">
                        <span className={isProfit ? 'text-emerald-400' : 'text-rose-400'}>
                          {isProfit ? `+${pos.pnlPercentage}%` : `${pos.pnlPercentage}%`}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleClosePosition(pos.id)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-rose-600/80 text-slate-300 hover:text-white text-[10px] font-semibold transition"
                          title="Close Position"
                        >
                          Close
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs bg-[#090e18] rounded-xl border border-slate-800">
            No active open positions. Browse <button onClick={() => onSelectTab('signals')} className="text-blue-400 underline">Trading Signals</button> to find new opportunities.
          </div>
        )}
      </div>
    </div>
  );
}
