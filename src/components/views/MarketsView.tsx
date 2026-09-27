'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Sliders,
  Activity,
  Shield,
  Layers,
  Sparkles,
  Zap,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Info
} from 'lucide-react';
import { mockPairs } from '@/data/mock/markets';
import { TradingChart } from '@/components/TradingChart';
import { ForexPair, Signal } from '@/types';
import { mockSignals } from '@/data/mock/signals';

interface MarketsViewProps {
  selectedSymbol: string;
  onSelectPair: (symbol: string) => void;
  onOpenRiskCalculator: (signal: Signal) => void;
  onOpenSignalDetail: (signal: Signal) => void;
  onSelectTab: (tab: string) => void;
}

export function MarketsView({
  selectedSymbol,
  onSelectPair,
  onOpenRiskCalculator,
  onOpenSignalDetail,
  onSelectTab,
}: MarketsViewProps) {
  const [currentTimeframe, setCurrentTimeframe] = useState<string>('1H');

  const currentPair = mockPairs.find((p) => p.symbol === selectedSymbol) || mockPairs[0];
  const candles = currentPair.timeframeData[currentTimeframe] || currentPair.timeframeData['1H'];

  // Look for any active signal on this pair
  const matchingSignal = mockSignals.find((s) => s.symbol === currentPair.symbol) || {
    id: `GEN-${currentPair.symbol}`,
    symbol: currentPair.symbol,
    type: currentPair.trend.includes('Bullish') ? 'BUY' : 'SELL',
    status: 'ACTIVE',
    entry: currentPair.price,
    stopLoss: Number((currentPair.price * (currentPair.trend.includes('Bullish') ? 0.995 : 1.005)).toFixed(currentPair.price > 50 ? 2 : 4)),
    takeProfit: Number((currentPair.price * (currentPair.trend.includes('Bullish') ? 1.009 : 0.991)).toFixed(currentPair.price > 50 ? 2 : 4)),
    riskReward: '1 : 1.80',
    riskRewardRatio: 1.80,
    confidence: currentPair.aiConfidence,
    technicalScore: currentPair.technical.technicalScore,
    newsScore: Math.round(currentPair.aiSummary.newsSentiment * 100),
    riskLevel: 'Medium',
    time: 'Live calculation',
    regime: currentPair.aiSummary.marketRegime,
    checklist: [
      { item: `${currentPair.technical.emaCrossover}`, passed: true, status: 'bullish' },
      { item: `RSI ${currentPair.technical.rsi} (${currentPair.technical.rsiStatus})`, passed: true, status: 'bullish' },
      { item: `MACD ${currentPair.technical.macdStatus}`, passed: true, status: 'bullish' },
      { item: `Market structure: ${currentPair.technical.candlestickPattern}`, passed: true, status: 'bullish' },
    ],
    explanation: currentPair.aiSummary.text,
  } as Signal;

  return (
    <div className="space-y-6">
      {/* Pair Quick Selector Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
          Forex Pairs:
        </span>
        {mockPairs.map((pair) => (
          <button
            key={pair.symbol}
            onClick={() => onSelectPair(pair.symbol)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition flex items-center gap-2 ${
              pair.symbol === currentPair.symbol
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-[#0f172a] text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>{pair.symbol}</span>
            <span
              className={`text-[10px] font-mono ${
                pair.change >= 0 ? 'text-emerald-400' : 'text-rose-400'
              } ${pair.symbol === currentPair.symbol ? 'text-blue-100' : ''}`}
            >
              {pair.change >= 0 ? `+${pair.change}%` : `${pair.change}%`}
            </span>
          </button>
        ))}
      </div>

      {/* Main Pair Header (Section 10) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0c121f] border border-slate-800">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-black text-white">{currentPair.symbol}</h1>
              <span className="text-xs text-slate-400">({currentPair.name})</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  currentPair.trend.includes('Bullish')
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {currentPair.trend}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400">
              <span>Spread: <strong className="text-slate-200 font-mono">{currentPair.spread} pips</strong></span>
              <span>24h High: <strong className="text-emerald-400 font-mono">{currentPair.high24h}</strong></span>
              <span>24h Low: <strong className="text-rose-400 font-mono">{currentPair.low24h}</strong></span>
            </div>
          </div>

          <div className="h-10 w-px bg-slate-800 hidden md:block"></div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Current Price</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">{currentPair.price}</span>
              <span
                className={`text-xs font-bold font-mono flex items-center ${
                  currentPair.change >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {currentPair.change >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {currentPair.change >= 0 ? `+${currentPair.change}%` : `${currentPair.change}%`}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSelectTab('ai-analysis')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/60 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            AI Intelligence
          </button>
          <button
            onClick={() => onOpenRiskCalculator(matchingSignal)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition flex items-center gap-1.5"
          >
            <Calculator className="w-4 h-4" />
            Calculate Lot Size
          </button>
        </div>
      </div>

      {/* Chart Component (Section 10) */}
      <TradingChart
        symbol={currentPair.symbol}
        candles={candles}
        timeframe={currentTimeframe}
        onTimeframeChange={setCurrentTimeframe}
        supportPrice={currentPair.technical.support}
        resistancePrice={currentPair.technical.resistance}
        currentPrice={currentPair.price}
      />

      {/* Lower Technical & Price Action Panels (Sections 11 & 12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Section 11: TECHNICAL ANALYSIS PANEL */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              Technical Analysis Panel
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Score: {currentPair.technical.technicalScore}/100
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* RSI */}
            <div className="p-3 rounded-xl bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[11px]">RSI (14)</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-base font-bold text-white font-mono">{currentPair.technical.rsi}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  {currentPair.technical.rsiStatus}
                </span>
              </div>
            </div>

            {/* MACD */}
            <div className="p-3 rounded-xl bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[11px]">MACD (12, 26, 9)</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xs font-bold text-cyan-400 font-mono truncate">{currentPair.technical.macd}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  {currentPair.technical.macdStatus}
                </span>
              </div>
            </div>

            {/* EMA 20/50 */}
            <div className="p-3 rounded-xl bg-[#101726] border border-slate-800 col-span-2">
              <span className="text-slate-400 block text-[11px]">Moving Average Crossover</span>
              <div className="mt-1 text-xs font-semibold text-slate-200 flex items-center justify-between">
                <span>{currentPair.technical.emaCrossover}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                  Bullish Trend
                </span>
              </div>
            </div>

            {/* ADX */}
            <div className="p-3 rounded-xl bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[11px]">ADX (Trend Strength)</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-base font-bold text-white font-mono">{currentPair.technical.adx}</span>
                <span className="text-[10px] font-bold text-blue-400">
                  {currentPair.technical.trendStrength} Trend
                </span>
              </div>
            </div>

            {/* ATR */}
            <div className="p-3 rounded-xl bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[11px]">ATR (Volatility)</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-base font-bold text-white font-mono">{currentPair.technical.atr}</span>
                <span className="text-[10px] font-bold text-amber-400">
                  {currentPair.technical.volatility}
                </span>
              </div>
            </div>

            {/* Bollinger Bands */}
            <div className="p-3 rounded-xl bg-[#101726] border border-slate-800 col-span-2">
              <span className="text-slate-400 block text-[11px]">Bollinger Bands (20, 2)</span>
              <div className="mt-1 text-xs text-slate-300 font-medium flex items-center justify-between">
                <span>{currentPair.technical.bollingerBands}</span>
                <span className="text-[10px] text-slate-500">20-SMA Midpoint</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 12: PRICE ACTION */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Price Action & Structural Analysis
            </h3>
            <span className="text-xs text-slate-400">Order Flow Zones</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* Support */}
            <div className="p-3.5 rounded-xl bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Key Support</span>
              <span className="text-lg font-bold text-emerald-400 font-mono mt-1 block">
                {currentPair.technical.support}
              </span>
              <span className="text-[10px] text-slate-500">Liquidity floor buffer</span>
            </div>

            {/* Resistance */}
            <div className="p-3.5 rounded-xl bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Key Resistance</span>
              <span className="text-lg font-bold text-rose-400 font-mono mt-1 block">
                {currentPair.technical.resistance}
              </span>
              <span className="text-[10px] text-slate-500">Take-profit ceiling zone</span>
            </div>

            {/* Trend & Pattern */}
            <div className="p-3.5 rounded-xl bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Market Trend</span>
              <span className="text-sm font-bold text-white mt-1 block">
                {currentPair.technical.trend}
              </span>
              <span className="text-[10px] text-slate-400">Higher highs on H4</span>
            </div>

            {/* Candlestick Pattern */}
            <div className="p-3.5 rounded-xl bg-[#101726] border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Candlestick Pattern</span>
              <span className="text-xs font-bold text-cyan-300 mt-1 block truncate">
                {currentPair.technical.candlestickPattern}
              </span>
              <span className="text-[10px] text-slate-500">Volume supported confirmation</span>
            </div>

            {/* Liquidity */}
            <div className="p-3.5 rounded-xl bg-[#101726] border border-slate-800 col-span-2 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[11px] block">Order Book Liquidity</span>
                <span className="text-xs font-semibold text-slate-200">
                  {currentPair.technical.liquidity} — Tight Bid/Ask Spreads
                </span>
              </div>
              <button
                onClick={() => onOpenSignalDetail(matchingSignal)}
                className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 rounded-lg font-bold text-xs flex items-center gap-1"
              >
                Inspect Signal <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
