import React from 'react';
import { Link } from 'react-router-dom';
import { Send, ShieldCheck, Search, Bell, Sparkles, Terminal, Activity, ArrowRight } from 'lucide-react';

interface AdminHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  demoModeActive: boolean;
  onToggleDemoMode: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  searchQuery,
  onSearchChange,
  demoModeActive,
  onToggleDemoMode,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white px-4 sm:px-6 py-3.5 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand & System Health Pill */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base tracking-tight">
              Safe<span className="text-brand-400">Bound</span> <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-brand-300 ml-1 border border-slate-700">OPS CONSOLE</span>
            </span>
          </Link>

          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>🟢 10 Swarm Nodes Operational</span>
          </span>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search trip ID, agent, booking ref or event (e.g. TRIP-8421)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:bg-slate-800 transition"
          />
        </div>

        {/* Right Actions: Demo Mode Toggle & Back to App */}
        <div className="flex items-center gap-2.5 self-end md:self-auto">
          
          {/* Hackathon Judge Demo Mode Switch */}
          <button
            type="button"
            onClick={onToggleDemoMode}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 border shadow-xs ${
              demoModeActive
                ? 'bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{demoModeActive ? '⚡ LIVE DEMO CONTROLS (ACTIVE)' : 'Open Demo Simulator'}</span>
          </button>

          <Link
            to="/dashboard"
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition"
          >
            User Dashboard
          </Link>
        </div>

      </div>
    </header>
  );
};
