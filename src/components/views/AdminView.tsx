'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Server,
  Cpu,
  Database,
  Activity,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  HardDrive,
  Globe,
  Radio
} from 'lucide-react';
import { mockAdminUsers, mockSystemServices, mockAdminStats } from '@/data/mock/admin';
import { mockRegisteredModels } from '@/data/mock/models';

export function AdminView() {
  const [userList, setUserList] = useState(mockAdminUsers);
  const [selectedSubTab, setSelectedSubTab] = useState<'overview' | 'users' | 'models' | 'sources'>('overview');

  const handleToggleUserStatus = (id: string) => {
    setUserList(
      userList.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            status: u.status === 'Active' ? 'Suspended' : 'Active',
          };
        }
        return u;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0f1b33] to-[#0a1220] border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">System Administration Console</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              CLUSTER HEALTH: OPTIMAL
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time infrastructure telemetry, model registry versioning, FIX protocol connections, and user management.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Inference Latency: <strong className="text-cyan-400 font-mono">{mockAdminStats.avgInferenceLatency}</strong></span>
          <span className="text-slate-600">|</span>
          <span>API Calls Today: <strong className="text-slate-200 font-mono">{mockAdminStats.apiCallsToday}</strong></span>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setSelectedSubTab('overview')}
          className={`py-2.5 px-4 border-b-2 transition flex items-center gap-2 ${
            selectedSubTab === 'overview'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          System Health & Services
        </button>
        <button
          onClick={() => setSelectedSubTab('users')}
          className={`py-2.5 px-4 border-b-2 transition flex items-center gap-2 ${
            selectedSubTab === 'users'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          User Management ({userList.length})
        </button>
        <button
          onClick={() => setSelectedSubTab('models')}
          className={`py-2.5 px-4 border-b-2 transition flex items-center gap-2 ${
            selectedSubTab === 'models'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4" />
          Model Registry & Versions
        </button>
        <button
          onClick={() => setSelectedSubTab('sources')}
          className={`py-2.5 px-4 border-b-2 transition flex items-center gap-2 ${
            selectedSubTab === 'sources'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className="w-4 h-4" />
          Data Sources & Feed Latency
        </button>
      </div>

      {selectedSubTab === 'overview' && (
        <div className="space-y-6">
          {/* User Management KPIs (Section 25) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Total Users</span>
              <span className="text-2xl font-black text-white font-mono">
                {mockAdminStats.totalUsers.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">Registered trading seats</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Active Users</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {mockAdminStats.activeUsers.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-500 font-semibold mt-1 block">78.6% engagement</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">New Users Today</span>
              <span className="text-2xl font-black text-cyan-400 font-mono">
                +{mockAdminStats.newUsersToday}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">Onboarding complete</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0c121e] border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Suspended Users</span>
              <span className="text-2xl font-black text-rose-400 font-mono">
                {mockAdminStats.suspendedUsers}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">Risk policy violations</span>
            </div>
          </div>

          {/* Infrastructure Health Services (Section 25) */}
          <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-400" />
                  System Health & Microservice Topology
                </h3>
                <p className="text-xs text-slate-400">Distributed infrastructure status and round-trip latencies</p>
              </div>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All 7 Services Operational
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockSystemServices.map((service, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#101726] border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{service.name}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{service.type}</span>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-emerald-400 font-bold block">{service.status}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {service.latency} • {service.uptime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedSubTab === 'users' && (
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Registered Platform Users</h3>
            <span className="text-xs text-slate-400">{userList.length} Active Accounts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0f172a] text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">User Name</th>
                  <th className="py-2.5 px-3">Email Address</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Last Active</th>
                  <th className="py-2.5 px-3 text-right">Signals Received</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-[#090e18]">
                {userList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 font-bold text-white">{u.name}</td>
                    <td className="py-3 px-3 font-mono text-slate-400">{u.email}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          u.status === 'Active'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400">{u.lastActive}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-200">{u.signalsReceived}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleToggleUserStatus(u.id)}
                        className={`px-2 py-1 rounded text-[10px] font-semibold transition ${
                          u.status === 'Active'
                            ? 'bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 border border-rose-800'
                            : 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60 border border-emerald-800'
                        }`}
                      >
                        {u.status === 'Active' ? 'Suspend' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedSubTab === 'models' && (
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                Registered AI / ML Models (Section 25)
              </h3>
              <p className="text-xs text-slate-400">Deployed weights, validation scores, and training datasets</p>
            </div>
            <button className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition">
              Retrain Staging
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0f172a] text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Model Name</th>
                  <th className="py-2.5 px-3">Version</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Last Retraining</th>
                  <th className="py-2.5 px-3 text-right">Validation Score</th>
                  <th className="py-2.5 px-3">Dataset Window</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-[#090e18]">
                {mockRegisteredModels.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 font-bold text-white">{m.name}</td>
                    <td className="py-3 px-3 font-mono text-cyan-400">{m.version}</td>
                    <td className="py-3 px-3 text-slate-400">{m.type}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{m.lastTraining}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                      {(m.validationScore * 100).toFixed(1)}%
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-mono">{m.datasetSize}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedSubTab === 'sources' && (
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                External Financial Feeds & Gateways
              </h3>
              <p className="text-xs text-slate-400">Institutional market data, news feeds, and calendar sync status</p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold">All Feeds Connected</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#101726] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Forex Market API</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Connected
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Institutional FIX 4.4 L1/L2 pricing feed with sub-20ms tick updates.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between">
                <span>Latency: 14ms</span>
                <span>Ticks/sec: 1,840</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#101726] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Global News Wire API</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Connected
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Real-time ingestion of Reuters, Bloomberg, and central bank RSS publications.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between">
                <span>Latency: 42ms</span>
                <span>Articles/hr: 120</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#101726] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Economic Calendar API</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Connected
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Synchronized macroeconomic indicators across G10 and major emerging currencies.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between">
                <span>Latency: 28ms</span>
                <span>Events synced: 140</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
