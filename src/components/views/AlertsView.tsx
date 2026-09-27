'use client';

import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Calendar,
  Activity,
  DollarSign,
  ArrowRight,
  Trash2
} from 'lucide-react';
import { mockAlerts } from '@/data/mock/alerts';
import { AlertItem } from '@/types';

interface AlertsViewProps {
  onSelectPair: (symbol: string) => void;
  onSelectTab: (tab: string) => void;
}

export function AlertsView({ onSelectPair, onSelectTab }: AlertsViewProps) {
  const [alerts, setAlerts] = useState<AlertItem[]>(mockAlerts);
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const handleMarkAsRead = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const handleClearAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const filteredAlerts = alerts.filter((a) => {
    if (typeFilter === 'ALL') return true;
    return a.type === typeFilter;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'AI_SIGNAL':
        return <Zap className="w-4 h-4 text-emerald-400" />;
      case 'ECONOMIC_EVENT':
        return <Calendar className="w-4 h-4 text-amber-400" />;
      case 'VOLATILITY':
        return <Activity className="w-4 h-4 text-rose-400" />;
      case 'PRICE':
        return <DollarSign className="w-4 h-4 text-cyan-400" />;
      default:
        return <Bell className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1b33] to-[#0a1220] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/30">
              <Bell className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">System Alerts & Notifications</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
              {alerts.filter((a) => !a.read).length} Unread
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time triggers for model state transitions, macroeconomic releases, and volatility breakouts.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center bg-[#0e1626] p-1 rounded-xl border border-slate-800 text-xs gap-1">
          {['ALL', 'AI_SIGNAL', 'ECONOMIC_EVENT', 'VOLATILITY', 'PRICE'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-2.5 py-1.5 rounded-lg font-semibold transition ${
                typeFilter === t
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List (Section 23) */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                alert.read
                  ? 'bg-[#0c121e] border-slate-800/80 opacity-80'
                  : 'bg-[#101729] border-blue-900/60 shadow-lg'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{alert.title}</h4>
                    {!alert.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {alert.message}
                  </p>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Triggered: {alert.timeAgo}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {alert.pair && (
                  <button
                    onClick={() => {
                      if (alert.pair && alert.pair.includes('/')) {
                        onSelectPair(alert.pair);
                      } else {
                        onSelectTab('signals');
                      }
                    }}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-blue-400 font-semibold transition flex items-center gap-1"
                  >
                    View <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                {!alert.read && (
                  <button
                    onClick={() => handleMarkAsRead(alert.id)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition"
                  >
                    Mark read
                  </button>
                )}
                <button
                  onClick={() => handleClearAlert(alert.id)}
                  className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                  title="Dismiss alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs bg-[#090e18] rounded-xl border border-slate-800">
            No alerts matching current filter.
          </div>
        )}
      </div>
    </div>
  );
}
