'use client';

import React, { useState } from 'react';
import {
  FileBarChart2,
  AlertTriangle,
  FlaskConical,
  TrendingUp,
  BarChart3,
  Calendar,
  PieChart,
  CheckCircle2,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { mockResearchExperiment } from '@/data/mock/models';

export function ReportsView() {
  const [activeTab, setActiveTab] = useState<'metrics' | 'experiment'>('metrics');

  const monthlyReturns = [
    { month: 'Jan', returnPct: 3.4, trades: 42, winRate: 66.7 },
    { month: 'Feb', returnPct: 4.1, trades: 38, winRate: 71.0 },
    { month: 'Mar', returnPct: -1.2, trades: 45, winRate: 55.5 },
    { month: 'Apr', returnPct: 2.8, trades: 40, winRate: 67.5 },
    { month: 'May', returnPct: 5.2, trades: 50, winRate: 74.0 },
    { month: 'Jun', returnPct: 3.1, trades: 36, winRate: 69.4 },
    { month: 'Jul', returnPct: 1.9, trades: 44, winRate: 63.6 },
    { month: 'Aug', returnPct: 4.5, trades: 48, winRate: 72.9 },
    { month: 'Sep', returnPct: 3.8, trades: 34, winRate: 70.6 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1b33] to-[#0a1220] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg border border-indigo-500/30">
              <FileBarChart2 className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Historical Performance & Research Reports</h1>
          </div>
          <p className="text-xs text-slate-400">
            Simulated backtesting analytics, out-of-sample stress testing, and multi-model feature ablation experiments.
          </p>
        </div>

        {/* Section 24 Disclaimer Banner */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 max-w-sm">
          <div className="flex items-center gap-1.5 font-bold mb-0.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Historical / Backtest / Simulated Data
          </div>
          <p className="text-[11px] leading-tight text-amber-200/80">
            Metrics reflect walk-forward backtesting on historical data. These do not represent guaranteed real-money returns.
          </p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('metrics')}
          className={`py-2.5 px-4 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'metrics'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Signal Performance Metrics
        </button>
        <button
          onClick={() => setActiveTab('experiment')}
          className={`py-2.5 px-4 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'experiment'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          Multi-Model Research Experiment (Section 33)
        </button>
      </div>

      {activeTab === 'metrics' && (
        <div className="space-y-6">
          {/* 6 Key Backtest Metrics (Section 24) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Historical Accuracy</span>
              <span className="text-xl font-black text-cyan-400 font-mono">74.2%</span>
              <span className="text-[10px] text-slate-500 mt-1 block">Walk-forward H1</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Win Rate</span>
              <span className="text-xl font-black text-emerald-400 font-mono">68.4%</span>
              <span className="text-[10px] text-emerald-500 font-semibold mt-1 block">377 / 551 trades</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">False Signal Rate</span>
              <span className="text-xl font-black text-amber-400 font-mono">25.8%</span>
              <span className="text-[10px] text-slate-500 mt-1 block">Filter dampened</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Profit Factor</span>
              <span className="text-xl font-black text-white font-mono">1.95</span>
              <span className="text-[10px] text-slate-500 mt-1 block">Gross win/loss</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Max Drawdown</span>
              <span className="text-xl font-black text-rose-400 font-mono">6.4%</span>
              <span className="text-[10px] text-slate-500 mt-1 block">Peak-to-trough</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Sharpe Ratio</span>
              <span className="text-xl font-black text-blue-400 font-mono">2.14</span>
              <span className="text-[10px] text-slate-500 mt-1 block">Risk-adjusted return</span>
            </div>
          </div>

          {/* Monthly Performance Breakdown */}
          <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  Monthly Performance Track Record (2026 Simulated)
                </h3>
                <p className="text-xs text-slate-400">Net monthly return (%) and trade frequency</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">Cumulative YTD: +27.6%</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
              {monthlyReturns.map((m) => {
                const isPos = m.returnPct >= 0;
                return (
                  <div
                    key={m.month}
                    className="p-3 rounded-xl bg-[#101726] border border-slate-800 text-center space-y-1"
                  >
                    <span className="text-xs font-bold text-slate-400">{m.month}</span>
                    <div
                      className={`text-sm font-black font-mono ${
                        isPos ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isPos ? `+${m.returnPct}%` : `${m.returnPct}%`}
                    </div>
                    <div className="text-[10px] text-slate-500">{m.trades} trades</div>
                    <div className="text-[9px] text-cyan-400 font-mono">{m.winRate}% win</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Signal Distribution by Currency Pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-cyan-400" />
                Signal Distribution by Pair
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { pair: 'EUR/USD', pct: 32, win: '72%' },
                  { pair: 'GBP/USD', pct: 24, win: '69%' },
                  { pair: 'USD/JPY', pct: 21, win: '67%' },
                  { pair: 'USD/CHF', pct: 12, win: '64%' },
                  { pair: 'AUD/USD', pct: 11, win: '65%' },
                ].map((item) => (
                  <div key={item.pair} className="space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span className="font-semibold">{item.pair}</span>
                      <span className="font-mono text-cyan-400">{item.pct}% of signals ({item.win} win)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${item.pct * 2.5}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Validation Methodology
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed space-y-2">
                  To eliminate lookahead bias and overfitting, all backtests adhere to strictly separated chronological splits:
                </p>
                <ul className="text-xs text-slate-400 space-y-1.5 mt-2 list-disc pl-4">
                  <li><strong>Walk-Forward Rolling Windows:</strong> 6-month train / 1-month test steps</li>
                  <li><strong>Execution Friction:</strong> Realistic 0.8 pip fixed spread + 0.3 pip slippage penalty</li>
                  <li><strong>Macro Lockout:</strong> Trades during NFP/CPI releases are automatically invalidated</li>
                  <li><strong>Dynamic Lot Sizing:</strong> Fixed 1% maximum capital risk per trade</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 italic">
                Simulated data for prototype demo. Production backtesting engine (Phase 7) will execute full Monte-Carlo stress analysis.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'experiment' && (
        <div className="space-y-6">
          {/* Research Experiment Section (Section 33) */}
          <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Hypothesis Testing
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Empirical Out-of-Sample Result
                </span>
              </div>
              <h2 className="text-base font-black text-white">
                Experiment: Does Adding News Sentiment & Contextual Information Improve Short-Term Forex Trend Prediction?
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                We compare four feature configurations across identical 5-year historical G10 hourly bar datasets using walk-forward validation.
                Random train/test splits were strictly avoided to prevent time-series leakage.
              </p>
            </div>

            {/* Experiment Comparison Table (Section 33) */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0f172a] text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-3">Configuration</th>
                    <th className="py-3 px-3 text-right">Accuracy</th>
                    <th className="py-3 px-3 text-right">Precision</th>
                    <th className="py-3 px-3 text-right">Recall</th>
                    <th className="py-3 px-3 text-right">F1 Score</th>
                    <th className="py-3 px-3 text-right">False Signal Rate</th>
                    <th className="py-3 px-3 text-right">Win Rate</th>
                    <th className="py-3 px-3 text-right">Profit Factor</th>
                    <th className="py-3 px-3 text-right">Max Drawdown</th>
                    <th className="py-3 px-3 text-right">Sharpe Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-[#090e18]">
                  {mockResearchExperiment.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-3">
                        <span className="font-bold text-white block">{m.name}</span>
                        <span className="text-[10px] text-slate-400">{m.features}</span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-semibold text-slate-200">{m.accuracy}%</td>
                      <td className="py-3 px-3 text-right font-mono text-slate-300">{m.precision}%</td>
                      <td className="py-3 px-3 text-right font-mono text-slate-300">{m.recall}%</td>
                      <td className="py-3 px-3 text-right font-mono text-slate-300">{m.f1}</td>
                      <td className="py-3 px-3 text-right font-mono text-rose-400 font-semibold">{m.falseSignalRate}%</td>
                      <td className="py-3 px-3 text-right font-mono text-emerald-400 font-bold">{m.winRate}%</td>
                      <td className="py-3 px-3 text-right font-mono text-cyan-400 font-bold">{m.profitFactor}</td>
                      <td className="py-3 px-3 text-right font-mono text-amber-400">{m.maxDrawdown}%</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-blue-400">{m.sharpeRatio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Scientific Conclusions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-[#101726] border border-slate-800 space-y-1">
                <span className="font-bold text-white block">Key Finding 1</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Adding FinBERT news sentiment (Model C) improves accuracy by <strong>+5.1%</strong> and reduces the false signal rate from 30.9% to 25.8% compared to pure technical ML.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#101726] border border-slate-800 space-y-1">
                <span className="font-bold text-white block">Key Finding 2</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Sharpe ratio increases from <strong>1.12 to 2.14</strong> when incorporating NLP news sentiment, largely due to avoiding trades ahead of adverse central-bank surprises.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#101726] border border-slate-800 space-y-1">
                <span className="font-bold text-white block">Key Finding 3 (RAG)</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  RAG features provide negligible numerical gain (+0.4%) but offer <strong>complete transparency and natural-language explainability</strong> to trading desks.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
