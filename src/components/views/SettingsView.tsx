'use client';

import React, { useState } from 'react';
import { Settings, Sliders, Bell, BrainCircuit, Check, Save } from 'lucide-react';

export function SettingsView() {
  const [defaultRisk, setDefaultRisk] = useState('1.0');
  const [maxDailyLoss, setMaxDailyLoss] = useState('2.0');
  const [defaultTimeframe, setDefaultTimeframe] = useState('1H');

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [signalAlerts, setSignalAlerts] = useState(true);
  const [eventAlerts, setEventAlerts] = useState(true);

  const [confidenceThreshold, setConfidenceThreshold] = useState('70');
  const [technicalWeight, setTechnicalWeight] = useState('50');
  const [newsWeight, setNewsWeight] = useState('25');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1b33] to-[#0a1220] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
              <Settings className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Platform Settings</h1>
          </div>
          <p className="text-xs text-slate-400">
            Configure risk parameters, notification channels, and AI model consensus thresholds.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4" /> Preferences Saved
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Trading Settings (Section 26) */}
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-sm font-bold text-white">
            <Sliders className="w-4 h-4 text-blue-400" />
            Trading & Risk Settings
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Default Risk Per Trade (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={defaultRisk}
                onChange={(e) => setDefaultRisk(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-[#101726] border border-slate-800 text-xs text-white font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Recommended: 1.0%</span>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Maximum Daily Loss (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={maxDailyLoss}
                onChange={(e) => setMaxDailyLoss(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-[#101726] border border-slate-800 text-xs text-white font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Circuit-breaker trigger</span>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Default Analysis Timeframe
              </label>
              <select
                value={defaultTimeframe}
                onChange={(e) => setDefaultTimeframe(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-[#101726] border border-slate-800 text-xs text-white"
              >
                <option value="15m">15 Minutes (Scalp)</option>
                <option value="1H">1 Hour (Intraday)</option>
                <option value="4H">4 Hours (Swing)</option>
                <option value="1D">1 Day (Position)</option>
              </select>
              <span className="text-[10px] text-slate-500 mt-1 block">Initial chart load</span>
            </div>
          </div>
        </div>

        {/* AI & Model Settings (Section 26) */}
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-sm font-bold text-white">
            <BrainCircuit className="w-4 h-4 text-purple-400" />
            AI & Model Ensemble Settings
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Confidence Threshold (%)
              </label>
              <input
                type="number"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-[#101726] border border-slate-800 text-xs text-white font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Min score required to emit signal</span>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Technical Features Weight (%)
              </label>
              <input
                type="number"
                value={technicalWeight}
                onChange={(e) => setTechnicalWeight(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-[#101726] border border-slate-800 text-xs text-white font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Price action & indicators</span>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                News Sentiment Weight (%)
              </label>
              <input
                type="number"
                value={newsWeight}
                onChange={(e) => setNewsWeight(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-[#101726] border border-slate-800 text-xs text-white font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">FinBERT sentiment score</span>
            </div>
          </div>
        </div>

        {/* Notification Settings (Section 26) */}
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-sm font-bold text-white">
            <Bell className="w-4 h-4 text-cyan-400" />
            Notification Channels
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="p-3 rounded-xl bg-[#101726] border border-slate-800 flex items-center justify-between cursor-pointer">
              <span className="font-semibold text-slate-300">Push Notifications</span>
              <input
                type="checkbox"
                checked={pushAlerts}
                onChange={(e) => setPushAlerts(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </label>

            <label className="p-3 rounded-xl bg-[#101726] border border-slate-800 flex items-center justify-between cursor-pointer">
              <span className="font-semibold text-slate-300">Email Digest Notifications</span>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </label>

            <label className="p-3 rounded-xl bg-[#101726] border border-slate-800 flex items-center justify-between cursor-pointer">
              <span className="font-semibold text-slate-300">Instant AI Signal Alerts</span>
              <input
                type="checkbox"
                checked={signalAlerts}
                onChange={(e) => setSignalAlerts(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </label>

            <label className="p-3 rounded-xl bg-[#101726] border border-slate-800 flex items-center justify-between cursor-pointer">
              <span className="font-semibold text-slate-300">High-Impact Event Warnings</span>
              <input
                type="checkbox"
                checked={eventAlerts}
                onChange={(e) => setEventAlerts(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-blue-600/30"
          >
            <Save className="w-4 h-4" /> Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
