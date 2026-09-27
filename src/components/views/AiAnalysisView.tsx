'use client';

import React from 'react';
import {
  BrainCircuit,
  Cpu,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  ArrowDown,
  Layers,
  Sparkles,
  BarChart3,
  CheckCircle2,
  HelpCircle,
  Activity,
  Newspaper,
  Calendar,
  Lock
} from 'lucide-react';
import { mockModelPredictions, mockPipelineSteps, mockFeatureImportances } from '@/data/mock/models';

interface AiAnalysisViewProps {
  onSelectPair: (symbol: string) => void;
  onSelectTab: (tab: string) => void;
}

export function AiAnalysisView({ onSelectPair, onSelectTab }: AiAnalysisViewProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'Newspaper':
        return <Newspaper className="w-5 h-5 text-cyan-400" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-amber-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-purple-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1629] via-[#0f1d38] to-[#0a1222] border border-blue-900/50 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">AI Market Intelligence</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
              EUR/USD Focus
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            ForexAI applies a multi-layered decision engine combining statistical technical indicators, 4-model ensemble machine learning, natural language sentiment extraction, and macroeconomic calendar risk filters.
          </p>
        </div>

        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300/90 max-w-sm">
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Decision Support Disclaimer
          </div>
          <p className="text-[11px] leading-tight">
            Confidence represents the model&apos;s current confidence score and should not be interpreted as guaranteed prediction accuracy.
          </p>
        </div>
      </div>

      {/* Model Output Summary & Ensemble (Sections 13 & 14) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Model Output Card (Section 13) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Primary Model Output
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Inference Active
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#101728] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Market Prediction</span>
                <span className="text-lg font-black text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <TrendingUp className="w-5 h-5" />
                  Bullish
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Expected Direction</span>
                <span className="text-base font-bold text-white font-mono mt-0.5 block">
                  Upward (Target: 1.1830)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#101728] border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Ensemble Confidence</span>
                <span className="text-xl font-black text-cyan-400 font-mono mt-0.5 block">
                  78%
                </span>
                <span className="text-[10px] text-slate-500">Threshold: &gt; 65% for BUY</span>
              </div>

              <div className="p-3 rounded-xl bg-[#101728] border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Signal Strength</span>
                <span className="text-xl font-black text-emerald-400 mt-0.5 block">
                  Strong
                </span>
                <span className="text-[10px] text-slate-500">Unanimous ensemble vote</span>
              </div>

              <div className="p-3 rounded-xl bg-[#101728] border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Market Regime</span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  Trending
                </span>
                <span className="text-[10px] text-slate-500">HMM State: Bullish Drift</span>
              </div>

              <div className="p-3 rounded-xl bg-[#101728] border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Volatility Regime</span>
                <span className="text-sm font-bold text-amber-400 mt-0.5 block">
                  Moderate
                </span>
                <span className="text-[10px] text-slate-500">ATR buffer adequate</span>
              </div>
            </div>

            <div className="p-3 bg-[#0a0f1a] rounded-xl border border-slate-800/80 text-[11px] text-slate-400 italic">
              Confidence represents the model&apos;s current confidence score and should not be interpreted as guaranteed prediction accuracy.
            </div>
          </div>
        </div>

        {/* Section 14: MODEL ENSEMBLE */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Model Ensemble Breakdown
              </h3>
              <p className="text-xs text-slate-400">Multi-algorithm consensus to avoid single-model overfitting</p>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              Prototype / Simulated Model Output
            </span>
          </div>

          <div className="space-y-3">
            {mockModelPredictions.map((m, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#101728] border border-slate-800 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="font-bold text-slate-200">{m.modelName}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">{m.prediction}</span>
                    <span className="text-slate-500">—</span>
                    <span className="font-mono font-bold text-cyan-400">{m.confidence}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: `${m.confidence}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="truncate max-w-[320px]">{m.architecture}</span>
                  <span>Weight: {(m.weights * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}

            {/* Final Ensemble Synthesis Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-blue-950/40 border border-blue-700/60 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-blue-300 block">Final Ensemble Synthesis</span>
                <span className="text-[11px] text-slate-400">Risk-weighted voting combination</span>
              </div>
              <div className="text-right">
                <span className="text-base sm:text-lg font-black text-emerald-400">
                  Bullish — 78%
                </span>
                <span className="text-[10px] text-cyan-400 block font-semibold">Consensus Confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Pipeline Stepper (Section 13) */}
      <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              AI Decision Synthesis Pipeline
            </h3>
            <p className="text-xs text-slate-400">Sequential multi-stage verification before signal release</p>
          </div>
          <span className="text-xs text-slate-500">All 6 Stages Validated</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {mockPipelineSteps.map((step, idx) => (
            <div
              key={step.id}
              className="p-3.5 rounded-xl bg-[#101728] border border-slate-800 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold flex items-center justify-center border border-blue-500/30">
                    {step.id}
                  </span>
                  {getIcon(step.icon)}
                </div>
                <h4 className="text-xs font-bold text-white mb-0.5">{step.name}</h4>
                <p className="text-[10px] text-slate-400 leading-tight mb-3">{step.subtitle}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[11px] font-bold text-emerald-400">{step.output}</div>
                <div className="text-[10px] text-slate-400 truncate">{step.confidenceOrValue}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Importance Explainability Bar Chart */}
      <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Model Feature Importance (SHAP Global Attribution)
            </h3>
            <p className="text-xs text-slate-400">Relative weight of multi-modal features in today&apos;s EUR/USD inference</p>
          </div>
          <span className="text-xs text-slate-500">Normalized Weight</span>
        </div>

        <div className="space-y-2.5">
          {mockFeatureImportances.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-200 font-medium">{item.feature}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    {item.category}
                  </span>
                </div>
                <span className="font-mono text-cyan-400 font-bold">{item.importance}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full rounded-full"
                  style={{ width: `${item.importance * 4.5}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
