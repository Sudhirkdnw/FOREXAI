'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  Sliders,
  Layers,
  Globe,
  User,
  ChevronDown,
  LogOut,
  Shield,
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { mockPairs } from '@/data/mock/markets';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onSelectPair: (symbol: string) => void;
  onOpenArchitecture: () => void;
  unreadAlertsCount: number;
  userRole: string;
  onSwitchRole: (role: string) => void;
  onLogout: () => void;
}

export function Navbar({
  currentTab,
  onSelectTab,
  onSelectPair,
  onOpenArchitecture,
  unreadAlertsCount,
  userRole,
  onSwitchRole,
  onLogout,
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState('2026-09-24 15:30:14 UTC');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(
          now.getUTCDate()
        ).padStart(2, '0')} ${String(now.getUTCHours()).padStart(2, '0')}:${String(
          now.getUTCMinutes()
        ).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')} UTC`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredPairs = mockPairs.filter((p) =>
    p.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-[#090e18]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Brand & Market Status */}
      <div className="flex items-center gap-4 shrink-0">
        <div
          onClick={() => onSelectTab('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white group-hover:text-blue-400 transition">
                ForexAI
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                PROTOTYPE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">AI-Powered Forex Market Intelligence</p>
          </div>
        </div>

        {/* Market Status Badge */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0e1627] border border-slate-800 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-semibold text-emerald-400">Market: OPEN</span>
          <span className="text-slate-600">|</span>
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            {currentTime}
          </span>
        </div>
      </div>

      {/* Center Search Input */}
      <div className="relative flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search currency pair (e.g. EUR/USD, GBP/USD)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-[#0e1626] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/50 transition"
          />
        </div>

        {/* Dropdown for search matches */}
        {showSearchResults && searchQuery && (
          <div className="absolute top-11 left-0 w-full bg-[#0c1322] border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto">
            {filteredPairs.length > 0 ? (
              filteredPairs.map((pair) => (
                <div
                  key={pair.symbol}
                  onClick={() => {
                    onSelectPair(pair.symbol);
                    setSearchQuery('');
                    setShowSearchResults(false);
                  }}
                  className="px-3.5 py-2.5 hover:bg-slate-800/80 cursor-pointer flex items-center justify-between border-b border-slate-800/40 text-xs transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{pair.symbol}</span>
                    <span className="text-slate-400 text-[11px]">{pair.name}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-200">{pair.price}</span>
                    <span className={pair.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {pair.change >= 0 ? `+${pair.change}%` : `${pair.change}%`}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-xs text-slate-500 text-center">No pairs found matching query</div>
            )}
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Architecture & Roadmap Button */}
        <button
          onClick={onOpenArchitecture}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/60 transition shadow-sm"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Architecture & RAG Strategy</span>
        </button>

        {/* Alerts Bell */}
        <button
          onClick={() => onSelectTab('alerts')}
          className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="Notifications and Signals"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertsCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-sm">
              {unreadAlertsCount}
            </span>
          )}
        </button>

        {/* User Role Badge & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#0e1627] hover:bg-slate-800 border border-slate-800 text-xs transition"
          >
            <div className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-[11px]">
              {userRole === 'Admin' ? 'A' : 'T'}
            </div>
            <div className="text-left hidden sm:block">
              <span className="font-semibold text-slate-200 block text-[11px] leading-tight">
                {userRole === 'Admin' ? 'Admin Portal' : 'Trader (Demo)'}
              </span>
              <span className="text-[10px] text-slate-400">
                {userRole === 'Admin' ? 'System Superuser' : 'Demo Account'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-11 w-48 bg-[#0d1424] border border-slate-700 rounded-xl shadow-2xl py-1 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-800 text-slate-400">
                Signed in as <strong className="text-white">{userRole === 'Admin' ? 'Administrator' : 'Trader Demo'}</strong>
              </div>
              <button
                onClick={() => {
                  onSwitchRole(userRole === 'Admin' ? 'Trader' : 'Admin');
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                Switch to {userRole === 'Admin' ? 'Trader View' : 'Admin View'}
              </button>
              <button
                onClick={() => {
                  onSelectTab('settings');
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                Settings
              </button>
              <div className="my-1 border-t border-slate-800"></div>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onLogout();
                }}
                className="w-full text-left px-3 py-2 text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
