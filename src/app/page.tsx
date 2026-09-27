'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { SignalDetailModal } from '@/components/SignalDetailModal';
import { ArchitectureModal } from '@/components/ArchitectureModal';

import { DashboardView } from '@/components/views/DashboardView';
import { MarketsView } from '@/components/views/MarketsView';
import { AiAnalysisView } from '@/components/views/AiAnalysisView';
import { SignalsView } from '@/components/views/SignalsView';
import { NewsView } from '@/components/views/NewsView';
import { CalendarView } from '@/components/views/CalendarView';
import { ResearchRagView } from '@/components/views/ResearchRagView';
import { RiskCalculatorView } from '@/components/views/RiskCalculatorView';
import { PortfolioView } from '@/components/views/PortfolioView';
import { WatchlistView } from '@/components/views/WatchlistView';
import { AlertsView } from '@/components/views/AlertsView';
import { ReportsView } from '@/components/views/ReportsView';
import { AdminView } from '@/components/views/AdminView';
import { SettingsView } from '@/components/views/SettingsView';
import { LoginView } from '@/components/views/LoginView';

import { mockSignals } from '@/data/mock/signals';
import { mockAlerts } from '@/data/mock/alerts';
import { Signal } from '@/types';
import { LayoutDashboard, CandlestickChart, Zap, BookOpen, Calculator, Briefcase, Bell } from 'lucide-react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState<'Trader' | 'Admin'>('Trader');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('EUR/USD');
  const [modalSignal, setModalSignal] = useState<Signal | null>(null);
  const [riskSignal, setRiskSignal] = useState<Signal | null>(null);
  const [architectureOpen, setArchitectureOpen] = useState(false);

  // If user is not logged in, render the login view
  if (!isLoggedIn) {
    return (
      <LoginView
        onLoginSuccess={(role) => {
          setUserRole(role as any);
          setIsLoggedIn(true);
          setCurrentTab('dashboard');
        }}
      />
    );
  }

  // Handlers for cross-module flows (Section 29: Navigation Flow)
  const handleSelectPair = (symbol: string) => {
    setSelectedSymbol(symbol);
    setCurrentTab('markets');
  };

  const handleOpenSignalDetail = (signal: Signal) => {
    setModalSignal(signal);
  };

  const handleOpenRiskCalculator = (signal: Signal) => {
    setRiskSignal(signal);
    setCurrentTab('risk');
  };

  const unreadAlertsCount = mockAlerts.filter((a) => !a.read).length;
  const activeSignalsCount = mockSignals.length;

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onSelectPair={handleSelectPair}
        onOpenArchitecture={() => setArchitectureOpen(true)}
        unreadAlertsCount={unreadAlertsCount}
        userRole={userRole}
        onSwitchRole={(role) => {
          setUserRole(role as any);
          if (role === 'Admin') setCurrentTab('admin');
          else if (currentTab === 'admin') setCurrentTab('dashboard');
        }}
        onLogout={() => setIsLoggedIn(false)}
      />

      <div className="flex-1 flex w-full">
        {/* Sidebar Navigation */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          activeSignalsCount={activeSignalsCount}
          unreadAlertsCount={unreadAlertsCount}
          userRole={userRole}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-20 md:pb-8">
          {currentTab === 'dashboard' && (
            <DashboardView
              onSelectPair={handleSelectPair}
              onSelectTab={setCurrentTab}
              onOpenSignalDetail={handleOpenSignalDetail}
            />
          )}

          {currentTab === 'markets' && (
            <MarketsView
              selectedSymbol={selectedSymbol}
              onSelectPair={setSelectedSymbol}
              onOpenRiskCalculator={handleOpenRiskCalculator}
              onOpenSignalDetail={handleOpenSignalDetail}
              onSelectTab={setCurrentTab}
            />
          )}

          {currentTab === 'ai-analysis' && (
            <AiAnalysisView
              onSelectPair={handleSelectPair}
              onSelectTab={setCurrentTab}
            />
          )}

          {currentTab === 'signals' && (
            <SignalsView
              onOpenSignalDetail={handleOpenSignalDetail}
              onOpenRiskCalculator={handleOpenRiskCalculator}
              onSelectPair={handleSelectPair}
            />
          )}

          {currentTab === 'calendar' && (
            <CalendarView onSelectPair={handleSelectPair} />
          )}

          {currentTab === 'news' && (
            <NewsView onSelectPair={handleSelectPair} />
          )}

          {currentTab === 'research' && (
            <ResearchRagView />
          )}

          {currentTab === 'risk' && (
            <RiskCalculatorView
              initialSignal={riskSignal}
              onSelectTab={setCurrentTab}
            />
          )}

          {currentTab === 'portfolio' && (
            <PortfolioView
              onSelectPair={handleSelectPair}
              onSelectTab={setCurrentTab}
            />
          )}

          {currentTab === 'watchlist' && (
            <WatchlistView onSelectPair={handleSelectPair} />
          )}

          {currentTab === 'alerts' && (
            <AlertsView
              onSelectPair={handleSelectPair}
              onSelectTab={setCurrentTab}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsView />
          )}

          {currentTab === 'settings' && (
            <SettingsView />
          )}

          {currentTab === 'admin' && (
            <AdminView />
          )}
        </main>
      </div>

      {/* Mobile Bottom Quick Navigation Bar (Section 28) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080d17]/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 flex items-center justify-around text-[10px]">
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 ${
            currentTab === 'dashboard' ? 'text-blue-400' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => setCurrentTab('markets')}
          className={`flex flex-col items-center gap-0.5 ${
            currentTab === 'markets' ? 'text-blue-400' : 'text-slate-400'
          }`}
        >
          <CandlestickChart className="w-4 h-4" />
          <span>Markets</span>
        </button>
        <button
          onClick={() => setCurrentTab('signals')}
          className={`flex flex-col items-center gap-0.5 ${
            currentTab === 'signals' ? 'text-blue-400' : 'text-slate-400'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Signals</span>
        </button>
        <button
          onClick={() => setCurrentTab('research')}
          className={`flex flex-col items-center gap-0.5 ${
            currentTab === 'research' ? 'text-blue-400' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>RAG</span>
        </button>
        <button
          onClick={() => setCurrentTab('portfolio')}
          className={`flex flex-col items-center gap-0.5 ${
            currentTab === 'portfolio' ? 'text-blue-400' : 'text-slate-400'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Portfolio</span>
        </button>
      </div>

      {/* Signal Detail Modal */}
      <SignalDetailModal
        signal={modalSignal}
        onClose={() => setModalSignal(null)}
        onOpenRiskCalculator={handleOpenRiskCalculator}
        onViewPair={handleSelectPair}
      />

      {/* Architecture & 10-Phase Roadmap Modal */}
      <ArchitectureModal
        isOpen={architectureOpen}
        onClose={() => setArchitectureOpen(false)}
      />
    </div>
  );
}
