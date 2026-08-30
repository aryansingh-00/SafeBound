import React from 'react';
import { Sparkles, Calendar, Bookmark, Wallet, ShieldCheck, ArrowRight } from 'lucide-react';
import { DASHBOARD_METRICS } from '../../data/dashboardData';

interface DashboardGreetingProps {
  userName: string;
  upcomingDaysLeft?: number;
  upcomingDestination?: string;
}

export const DashboardGreeting: React.FC<DashboardGreetingProps> = ({
  userName = 'Aryan',
  upcomingDaysLeft = 15,
  upcomingDestination = 'Mussoorie',
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-brand-500/30 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        
        {/* User Greeting & Status */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>🟢 SafeBound AI Active</span>
            </span>
            <span className="text-xs text-brand-200 font-medium hidden sm:inline">
              Continuous Sentinel Monitoring
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Good morning, {userName} 👋
          </h1>

          <p className="text-xs sm:text-sm text-brand-200 font-medium flex items-center gap-2">
            <span>Your {upcomingDestination} trip is in <strong>{upcomingDaysLeft} days</strong>.</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-bold">Everything looks good.</span>
          </p>
        </div>

        {/* Compact Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-800/80 p-3 sm:p-4 rounded-2xl border border-slate-700/80 text-xs">
          <div className="text-center sm:text-left px-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Trips</span>
            <span className="text-lg font-extrabold text-white">{DASHBOARD_METRICS.tripsCount}</span>
          </div>
          <div className="text-center sm:text-left px-2 border-l border-slate-700">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Saved</span>
            <span className="text-lg font-extrabold text-white">{DASHBOARD_METRICS.savedPlansCount}</span>
          </div>
          <div className="text-center sm:text-left px-2 border-l border-slate-700">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Saved ₹</span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">₹{DASHBOARD_METRICS.moneySaved.toLocaleString('en-IN')}</span>
          </div>
          <div className="text-center sm:text-left px-2 border-l border-slate-700">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Alerts</span>
            <span className="text-lg font-extrabold text-amber-400">{DASHBOARD_METRICS.activeAlertsCount}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
