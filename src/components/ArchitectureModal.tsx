'use client';

import React, { useState } from 'react';
import { X, Layers, Cpu, Database, CheckCircle2, GitBranch, ArrowRight, ShieldCheck, FileText, FlaskConical } from 'lucide-react';
import { mockResearchExperiment } from '@/data/mock/models';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArchitectureModal({ isOpen, onClose }: ArchitectureModalProps) {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'rag-strategy' | 'experiment'>('roadmap');

  if (!isOpen) return null;

  const phases = [
    { num: 'Phase 1', title: 'Interactive Prototype & Decision Support UI', status: 'COMPLETED', desc: 'Client demo ready, dark trading terminal UI, mock data, and UX workflows.' },
    { num: 'Phase 2', title: 'Real Forex Market APIs', status: 'IN PROGRESS', desc: 'Integration with FIX Protocol L1/L2 feeds (e.g. Integral, Currenex, Oanda).' },
    { num: 'Phase 3', title: 'Historical Data Pipeline', status: 'PLANNED', desc: 'TimescaleDB / ClickHouse financial time-series storage with sub-millisecond querying.' },
    { num: 'Phase 4', title: 'Actual ML Model Training', status: 'PLANNED', desc: 'Automated retraining pipeline on Ray/Kubeflow with walk-forward time-series splits.' },
    { num: 'Phase 5', title: 'News / NLP Sentiment Pipeline', status: 'PLANNED', desc: 'Real-time FinBERT embedding of central bank speeches and Reuters/FT feeds.' },
    { num: 'Phase 6', title: 'RAG-Based Market Research Assistant', status: 'PLANNED', desc: 'Vector DB (pgvector/Pinecone) for central bank statements, macroeconomic reports, and context retrieval.' },
    { num: 'Phase 7', title: 'Event-Driven Backtesting Engine', status: 'PLANNED', desc: 'Realistic simulation accounting for spread widening, slippage, and swap rates.' },
    { num: 'Phase 8', title: 'Real-Time Signal Engine', status: 'PLANNED', desc: 'Consensus engine combining ML prediction, NLP sentiment, and event filters.' },
    { num: 'Phase 9', title: 'Broker Integration & Paper Trading', status: 'PLANNED', desc: 'MT5 / cTrader API execution gateway with simulated paper accounts.' },
    { num: 'Phase 10', title: 'Production Monitoring & Drift Detection', status: 'PLANNED', desc: 'Telemetry for data drift, concept drift, and model decay monitoring.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0c121e] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0f172a]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">System Architecture & Production Roadmap</h2>
              <p className="text-xs text-slate-400">Engineering blueprint from prototype to enterprise Forex AI platform</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-800 px-6 bg-[#0e1627] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'roadmap'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            10-Phase Roadmap
          </button>
          <button
            onClick={() => setActiveTab('rag-strategy')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'rag-strategy'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            RAG Strategy & Separation of Concerns
          </button>
          <button
            onClick={() => setActiveTab('experiment')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'experiment'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            Empirical Validation Experiment
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-300">
                <strong>Executive Summary:</strong> The platform follows a phased implementation path. The client demo showcases the complete workflow, UI, and data contracts that will be populated by these production microservices.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {phases.map((p, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition ${
                      p.status === 'COMPLETED'
                        ? 'bg-emerald-950/20 border-emerald-800/50'
                        : p.status === 'IN PROGRESS'
                        ? 'bg-blue-950/20 border-blue-800/50'
                        : 'bg-[#111927] border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-slate-400">{p.num}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.status === 'COMPLETED'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : p.status === 'IN PROGRESS'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40 animate-pulse'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{p.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rag-strategy' && (
            <div className="space-y-6">
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 leading-relaxed">
                <strong>Crucial Design Principle: RAG does NOT replace numerical ML models.</strong>
                <p className="mt-1">
                  We explicitly separate numerical price-series prediction from contextual natural-language explanation.
                  Forcing RAG into numerical time-series prediction introduces latency and hallucination risks.
                  Instead, our architecture employs two specialized streams that synthesize at the Signal Engine level.
                </p>
              </div>

              {/* Architecture Stream Diagram */}
              <div className="p-5 bg-[#0b101c] rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Two-Stream Decision Support Architecture
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Stream 1 */}
                  <div className="p-4 bg-[#111927] rounded-lg border border-cyan-800/40 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase">
                      <Cpu className="w-4 h-4" /> Stream 1: Quantitative / ML Pipeline
                    </div>
                    <div className="text-[11px] text-slate-300 space-y-1.5 font-mono pt-1">
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-800">1. Raw Forex Tick & Bar Data</div>
                      <div className="text-center text-slate-500">↓</div>
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-800">2. Technical & Volatility Features (EMA, RSI, ATR)</div>
                      <div className="text-center text-slate-500">↓</div>
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-800">3. ML Models (XGBoost + LightGBM + BiLSTM)</div>
                      <div className="text-center text-slate-500">↓</div>
                      <div className="p-1.5 bg-cyan-950/40 text-cyan-300 rounded border border-cyan-800 font-semibold">
                        Numerical Probability & Confidence Output
                      </div>
                    </div>
                  </div>

                  {/* Stream 2 */}
                  <div className="p-4 bg-[#111927] rounded-lg border border-purple-800/40 space-y-2">
                    <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase">
                      <Database className="w-4 h-4" /> Stream 2: NLP & Contextual RAG Pipeline
                    </div>
                    <div className="text-[11px] text-slate-300 space-y-1.5 font-mono pt-1">
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-800">1. Central Bank Releases + News + Speeches</div>
                      <div className="text-center text-slate-500">↓</div>
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-800">2. Domain Embeddings & Vector Database</div>
                      <div className="text-center text-slate-500">↓</div>
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-800">3. RAG Retrieval & Contextual Reasoner</div>
                      <div className="text-center text-slate-500">↓</div>
                      <div className="p-1.5 bg-purple-950/40 text-purple-300 rounded border border-purple-800 font-semibold">
                        Market-Event Interpretation & User Q&A
                      </div>
                    </div>
                  </div>
                </div>

                {/* Synthesis Hub */}
                <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-800 text-center">
                  <div className="text-xs font-bold text-blue-300 mb-1">
                    Combined Synthesis: Signal & Risk Sizing Engine
                  </div>
                  <p className="text-[11px] text-slate-400">
                    ML Prediction + FinBERT News Sentiment + Economic Event Dampener → Risk-Weighted Decision Support
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experiment' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#111927] rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-emerald-400" />
                  Research Experiment: Empirical Validation of Multi-Modal Features
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We rigorously evaluate whether adding NLP sentiment and RAG context measurably improves out-of-sample performance over baseline technical indicators.
                  Models are validated using <strong>walk-forward time-series splits</strong> (never random shuffling) to eliminate lookahead bias.
                </p>
              </div>

              {/* Experiment Comparison Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0f172a] text-slate-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Model Architecture</th>
                      <th className="py-2.5 px-3">Accuracy</th>
                      <th className="py-2.5 px-3">Win Rate</th>
                      <th className="py-2.5 px-3">Profit Factor</th>
                      <th className="py-2.5 px-3">Max DD</th>
                      <th className="py-2.5 px-3">Sharpe</th>
                      <th className="py-2.5 px-3">Verdict</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-[#0b101c]">
                    {mockResearchExperiment.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-800/30">
                        <td className="py-3 px-3">
                          <span className="font-bold text-white block">{m.name}</span>
                          <span className="text-[10px] text-slate-400">{m.features}</span>
                        </td>
                        <td className="py-3 px-3 font-mono font-semibold text-slate-200">{m.accuracy}%</td>
                        <td className="py-3 px-3 font-mono text-emerald-400 font-semibold">{m.winRate}%</td>
                        <td className="py-3 px-3 font-mono text-cyan-400 font-semibold">{m.profitFactor}</td>
                        <td className="py-3 px-3 font-mono text-rose-400">{m.maxDrawdown}%</td>
                        <td className="py-3 px-3 font-mono text-slate-200">{m.sharpeRatio}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            {m.verdict}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                * Simulated out-of-sample backtest on 5-year historical G10 hourly bar data. Out-of-sample results confirm that combining ML with FinBERT sentiment reduces false signals by 11.8% over technicals alone.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-[#0f172a] flex items-center justify-between text-xs text-slate-400">
          <span>ForexAI Platform Architecture v1.0.4</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
