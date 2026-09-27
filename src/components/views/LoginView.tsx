'use client';

import React, { useState } from 'react';
import { Sparkles, Shield, ArrowRight, Lock, Mail, CheckCircle2, TrendingUp } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (role: string) => void;
}

export function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [email, setEmail] = useState('trader.demo@forexai.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess('Trader');
  };

  return (
    <div className="min-h-screen w-full bg-[#070b13] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#0c121e] border border-slate-800 rounded-2xl shadow-2xl p-8 relative z-10 space-y-6">
        {/* Brand Header (Section 6) */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 shadow-lg shadow-blue-500/25 mb-2">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">ForexAI</h1>
          <p className="text-xs font-medium text-slate-400">
            AI-Powered Forex Market Intelligence
          </p>
          <div className="inline-block mt-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
              CLIENT DEMO PROTOTYPE
            </span>
          </div>
        </div>

        {/* Form Fields (Section 6) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="trader@forexai.com"
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#101726] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#101726] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Action Buttons (Section 6) */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              className="w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Continue as Demo (Section 6: takes user directly to dashboard) */}
            <button
              type="button"
              onClick={() => onLoginSuccess('Trader')}
              className="w-full h-10 rounded-xl bg-[#131d32] hover:bg-[#182540] text-cyan-300 hover:text-white border border-cyan-800/50 font-bold text-xs transition flex items-center justify-center gap-2"
            >
              <span>Continue as Demo</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </form>

        {/* Demo Quick Tour Badge */}
        <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Client Demo Ready
          </div>
          <p className="text-slate-500 text-[10px]">
            Explore the multi-model ensemble, technical indicators, and RAG contextual research.
          </p>
        </div>
      </div>
    </div>
  );
}
