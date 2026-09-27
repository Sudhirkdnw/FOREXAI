'use client';

import React from 'react';
import {
  LayoutDashboard,
  CandlestickChart,
  BrainCircuit,
  Zap,
  Calendar,
  Newspaper,
  BookOpen,
  Calculator,
  Briefcase,
  Star,
  Bell,
  FileBarChart2,
  Settings,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  activeSignalsCount: number;
  unreadAlertsCount: number;
  userRole: string;
}

export function Sidebar({
  currentTab,
  onSelectTab,
  activeSignalsCount,
  unreadAlertsCount,
  userRole,
}: SidebarProps) {
  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'markets', label: 'Forex Markets', icon: CandlestickChart },
    { id: 'ai-analysis', label: 'AI Analysis', icon: BrainCircuit, badge: 'Ensemble' },
    { id: 'signals', label: 'Trading Signals', icon: Zap, count: activeSignalsCount },
    { id: 'calendar', label: 'Economic Calendar', icon: Calendar },
    { id: 'news', label: 'News & Sentiment', icon: Newspaper },
    { id: 'research', label: 'AI Context & Research', icon: BookOpen, badge: 'RAG' },
    { id: 'risk', label: 'Risk Calculator', icon: Calculator },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'watchlist', label: 'Watchlist', icon: Star },
    { id: 'alerts', label: 'Alerts', icon: Bell, count: unreadAlertsCount, countColor: 'bg-rose-500' },
  ];

  const managementNav = [
    { id: 'reports', label: 'Reports & Backtests', icon: FileBarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const adminNav = [
    { id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck, badge: 'System' },
  ];

  const renderItem = (item: any) => {
    const Icon = item.icon;
    const isActive = currentTab === item.id;

    return (
      <button
        key={item.id}
        onClick={() => onSelectTab(item.id)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
          isActive
            ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
          <span className="truncate">{item.label}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {item.badge && (
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {item.badge}
            </span>
          )}
          {item.count !== undefined && item.count > 0 && (
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full text-white ${
                item.countColor || 'bg-blue-600'
              }`}
            >
              {item.count}
            </span>
          )}
          {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-400 opacity-80" />}
        </div>
      </button>
    );
  };

  return (
    <aside className="w-64 bg-[#080d17] border-r border-slate-800/80 p-3 shrink-0 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* Main Nav Section */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Main Navigation
          </div>
          <div className="space-y-1">
            {mainNav.map(renderItem)}
          </div>
        </div>

        {/* Management Section */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Management
          </div>
          <div className="space-y-1">
            {managementNav.map(renderItem)}
          </div>
        </div>

        {/* Admin Section */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Administration
          </div>
          <div className="space-y-1">
            {adminNav.map(renderItem)}
          </div>
        </div>
      </div>

      {/* Sidebar Footer Badge */}
      <div className="pt-4 border-t border-slate-800/60">
        <div className="p-3 bg-[#0d1525] rounded-xl border border-slate-800/80 text-[11px] space-y-1">
          <div className="flex items-center justify-between text-slate-300 font-semibold">
            <span>Trading Engine</span>
            <span className="text-emerald-400 flex items-center gap-1 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ACTIVE
            </span>
          </div>
          <p className="text-slate-500 text-[10px] leading-tight">
            Decision support mode. Continuous multi-model consensus inference.
          </p>
        </div>
      </div>
    </aside>
  );
}
