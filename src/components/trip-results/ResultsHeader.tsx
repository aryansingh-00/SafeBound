import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Edit3, MapPin, Calendar, Users, Wallet, ShieldCheck, Mountain, Leaf, Radio } from 'lucide-react';

export const ResultsHeader: React.FC = () => {
  const navigate = useNavigate();

  const requirements = [
    { label: 'Delhi (DEL)', icon: MapPin },
    { label: 'September 2026', icon: Calendar },
    { label: '4 Days / 3 Nights', icon: Calendar },
    { label: '2 Travellers', icon: Users },
    { label: '₹40,000 Max Budget', icon: Wallet },
    { label: 'Mountains & Valleys', icon: Mountain },
    { label: 'High Safety Priority', icon: ShieldCheck },
    { label: 'Peaceful & Relaxing', icon: Leaf },
  ];

  return (
    <div className="space-y-4">
      
      {/* Top Banner & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>🟢 Live data checked</span>
            </span>
            <span className="text-xs font-bold text-slate-500">
              4 trips match your constraints
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            We found the best trips for you
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            SafeBound compared live train schedules, 4★ hotel suites, dedicated chauffeurs and weather radars.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/plan-trip')}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-brand-600 font-bold text-xs rounded-xl border border-slate-200 shadow-2xs transition flex items-center gap-1.5 w-fit"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Trip Parameters</span>
        </button>
      </div>

      {/* User Requirements Summary Bar */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mr-1">
          Applied Constraints:
        </span>
        {requirements.map((req, idx) => {
          const Icon = req.icon;
          return (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold"
            >
              <Icon className="w-3 h-3 text-brand-600" />
              <span>{req.label}</span>
            </span>
          );
        })}
      </div>

    </div>
  );
};
