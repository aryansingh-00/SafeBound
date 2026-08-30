import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  GitBranch, 
  CreditCard, 
  MapPin, 
  Activity, 
  RotateCw, 
  Terminal, 
  ShieldCheck, 
  Layers
} from 'lucide-react';

export type AdminTab = 'overview' | 'agents' | 'orchestration' | 'bookings' | 'trips' | 'providers' | 'recovery' | 'events';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (t: AdminTab) => void;
  recoveriesCount?: number;
  activeTripsCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  recoveriesCount = 4,
  activeTripsCount = 128,
}) => {
  const tabs = [
    { id: 'overview', label: 'Operations Overview', icon: LayoutDashboard },
    { id: 'agents', label: '10 AI Micro-Agents', icon: Bot, count: 10 },
    { id: 'orchestration', label: 'Orchestration DAG', icon: GitBranch },
    { id: 'bookings', label: 'Live Bookings', icon: CreditCard, count: 3 },
    { id: 'trips', label: 'Active Trips Sentinel', icon: MapPin, count: activeTripsCount },
    { id: 'providers', label: 'Provider APIs & Razorpay', icon: Activity },
    { id: 'recovery', label: 'Autonomous Recovery', icon: RotateCw, count: recoveriesCount, alert: true },
    { id: 'events', label: 'Live Event Stream', icon: Terminal },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-2 shrink-0">
      <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
        Command Center Navigation
      </div>

      <nav className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id as AdminTab)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                isActive
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </div>

              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono font-bold ${
                    tab.alert
                      ? 'bg-amber-500 text-slate-950'
                      : isActive
                      ? 'bg-brand-800 text-brand-100'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
