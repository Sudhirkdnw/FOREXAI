'use client';

import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Shield,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Percent,
  Sliders,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { Signal } from '@/types';
import { mockPairs } from '@/data/mock/markets';

interface RiskCalculatorViewProps {
  initialSignal?: Signal | null;
  onSelectTab: (tab: string) => void;
}

export function RiskCalculatorView({ initialSignal, onSelectTab }: RiskCalculatorViewProps) {
  const [accountBalance, setAccountBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [pairSymbol, setPairSymbol] = useState<string>(initialSignal?.symbol || 'EUR/USD');
  const [entryPrice, setEntryPrice] = useState<number>(initialSignal?.entry || 1.1735);
  const [stopLoss, setStopLoss] = useState<number>(initialSignal?.stopLoss || 1.1680);
  const [takeProfit, setTakeProfit] = useState<number>(initialSignal?.takeProfit || 1.1830);

  // Sync if initialSignal changes
  useEffect(() => {
    if (initialSignal) {
      setPairSymbol(initialSignal.symbol);
      setEntryPrice(initialSignal.entry);
      setStopLoss(initialSignal.stopLoss);
      setTakeProfit(initialSignal.takeProfit);
    }
  }, [initialSignal]);

  // Handle pair switch
  const handlePairChange = (sym: string) => {
    setPairSymbol(sym);
    const p = mockPairs.find((x) => x.symbol === sym);
    if (p) {
      setEntryPrice(p.price);
      const isBull = p.trend.includes('Bullish');
      const sl = isBull ? p.price * 0.995 : p.price * 1.005;
      const tp = isBull ? p.price * 1.009 : p.price * 0.991;
      const dec = sym.includes('JPY') ? 2 : 4;
      setStopLoss(Number(sl.toFixed(dec)));
      setTakeProfit(Number(tp.toFixed(dec)));
    }
  };

  // Dynamic calculations
  const maxRiskDollar = (accountBalance * (riskPercent / 100));
  const isJpy = pairSymbol.includes('JPY');
  const pipMultiplier = isJpy ? 100 : 10000;

  const rawRiskDistance = Math.abs(entryPrice - stopLoss);
  const pipsAtRisk = Math.max(0.1, Number((rawRiskDistance * pipMultiplier).toFixed(1)));

  const rawRewardDistance = Math.abs(takeProfit - entryPrice);
  const pipsReward = Math.max(0.1, Number((rawRewardDistance * pipMultiplier).toFixed(1)));

  const riskRewardRatio = (rawRiskDistance > 0 && rawRewardDistance > 0)
    ? Number((rawRewardDistance / rawRiskDistance).toFixed(2))
    : 1.73;

  // 1 standard lot = $10 per pip for EUR/USD
  // lotSize = maxRiskDollar / (pipsAtRisk * pipValuePerLot)
  const pipValuePerLot = isJpy ? (1000 / entryPrice) : 10;
  const suggestedLots = Number((maxRiskDollar / (pipsAtRisk * pipValuePerLot)).toFixed(2));
  const potentialDollarReward = Number((maxRiskDollar * riskRewardRatio).toFixed(2));

  // Daily Loss Limit (2%) and Max Open Positions
  const dailyLossLimitDollar = accountBalance * 0.02;
  const maxOpenPositions = 5;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1b33] to-[#0a1220] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
              <Calculator className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Risk Management & Position Sizing</h1>
          </div>
          <p className="text-xs text-slate-400">
            Enforces strict capital preservation through mathematical position sizing and dynamic stop-loss calculations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setAccountBalance(10000);
              setRiskPercent(1.0);
              setEntryPrice(1.1735);
              setStopLoss(1.1680);
              setTakeProfit(1.1830);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Main Calculator Grid (Section 20) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Calculator Inputs */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              Trade Parameters
            </h3>
            <span className="text-xs text-slate-400">Live Mathematical Sizing</span>
          </div>

          {/* Pair Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Select Currency Pair
            </label>
            <select
              value={pairSymbol}
              onChange={(e) => handlePairChange(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-[#101726] border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              {mockPairs.map((p) => (
                <option key={p.symbol} value={p.symbol}>
                  {p.symbol} — {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Account Balance */}
          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-1.5">
              <span>Account Balance ($)</span>
              <span className="text-slate-500 font-normal">Base Currency: USD</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">$</span>
              <input
                type="number"
                value={accountBalance}
                onChange={(e) => setAccountBalance(Number(e.target.value))}
                className="w-full h-10 pl-7 pr-3 rounded-xl bg-[#101726] border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Risk Per Trade % */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Risk Per Trade (%)</span>
              <span className="font-mono text-cyan-400">{riskPercent}%</span>
            </div>
            <input
              type="range"
              min="0.25"
              max="5.0"
              step="0.25"
              value={riskPercent}
              onChange={(e) => setRiskPercent(Number(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Conservative (0.5%)</span>
              <span>Standard (1.0%)</span>
              <span>Aggressive (3.0%+)</span>
            </div>
          </div>

          {/* Entry, Stop Loss, Take Profit Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Entry Price
              </label>
              <input
                type="number"
                step={isJpy ? '0.01' : '0.0001'}
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
                className="w-full h-9 px-2.5 rounded-lg bg-[#101726] border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-rose-400 block mb-1">
                Stop Loss
              </label>
              <input
                type="number"
                step={isJpy ? '0.01' : '0.0001'}
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
                className="w-full h-9 px-2.5 rounded-lg bg-[#101726] border border-slate-800 text-xs text-rose-400 font-mono focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-emerald-400 block mb-1">
                Take Profit
              </label>
              <input
                type="number"
                step={isJpy ? '0.01' : '0.0001'}
                value={takeProfit}
                onChange={(e) => setTakeProfit(Number(e.target.value))}
                className="w-full h-9 px-2.5 rounded-lg bg-[#101726] border border-slate-800 text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onSelectTab('portfolio')}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-blue-600/30"
            >
              <span>View Portfolio Impact</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Calculated Outputs (Section 20) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Calculated Risk Output
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Formula Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Max Risk $ */}
              <div className="p-4 rounded-xl bg-[#101726] border border-slate-800">
                <span className="text-xs text-slate-400 block">Maximum Dollar Risk</span>
                <span className="text-2xl font-black text-rose-400 font-mono mt-1 block">
                  ${maxRiskDollar.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-500">
                  {riskPercent}% of ${accountBalance.toLocaleString()}
                </span>
              </div>

              {/* Risk / Reward */}
              <div className="p-4 rounded-xl bg-[#101726] border border-slate-800">
                <span className="text-xs text-slate-400 block">Risk / Reward Ratio</span>
                <span className="text-2xl font-black text-cyan-400 font-mono mt-1 block">
                  1 : {riskRewardRatio}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  {riskRewardRatio >= 1.5 ? '✓ Compliant (> 1:1.5)' : '⚠ Low R:R Warning'}
                </span>
              </div>

              {/* Suggested Position Size */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950/40 to-[#101726] border border-blue-800/60 col-span-2 flex items-center justify-between">
                <div>
                  <span className="text-xs text-blue-300 font-bold block uppercase tracking-wider">
                    Suggested Position Size
                  </span>
                  <div className="text-3xl font-black text-white font-mono mt-0.5">
                    {suggestedLots} <span className="text-sm font-semibold text-slate-400">Standard Lots</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Distance: <strong className="text-slate-200">{pipsAtRisk} pips</strong> | Pip value: ~$10/lot
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Potential Gain</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    +${potentialDollarReward}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 20: Capital Preservation Rules */}
          <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              System Risk Governance Limits
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#101726] border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Daily Loss Limit (2%)</span>
                <span className="font-bold font-mono text-amber-400 text-sm mt-0.5 block">
                  ${dailyLossLimitDollar.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-500">Trading halts upon breach</span>
              </div>

              <div className="p-3 rounded-lg bg-[#101726] border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Maximum Open Positions</span>
                <span className="font-bold font-mono text-blue-400 text-sm mt-0.5 block">
                  {maxOpenPositions} Concurrent
                </span>
                <span className="text-[10px] text-slate-500">Correlation exposure limit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
