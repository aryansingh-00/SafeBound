import React from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export const ProblemStatement: React.FC = () => {
  const before = [
    { icon: '🚆', label: 'Train Ticket', sub: 'IRCTC' },
    { icon: '🏨', label: 'Hotel Voucher', sub: 'OTA' },
    { icon: '🚕', label: 'Cab Confirmation', sub: 'Cab App' },
    { icon: '🎟️', label: 'Activity Tickets', sub: 'Provider' },
    { icon: '💳', label: 'Payment Receipt', sub: 'Bank' },
  ];

  const after = [
    { icon: '🚆', label: 'Train delayed', color: 'text-amber-400' },
    { icon: '↓', label: '', color: 'text-slate-600' },
    { icon: '🚕', label: 'Cab conflict', color: 'text-amber-400' },
    { icon: '↓', label: '', color: 'text-slate-600' },
    { icon: '🎟️', label: 'Activity timing affected', color: 'text-rose-400' },
    { icon: '↓', label: '', color: 'text-slate-600' },
    { icon: '😰', label: 'User solves it manually', color: 'text-rose-400' },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-card text-white space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-extrabold text-white">The Real Problem</h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          <span className="font-bold text-white">Travel bookings are interconnected</span>, but today's platforms
          treat them as <span className="font-bold text-amber-300">independent transactions</span>.
          Train, hotel, cab, and activities are all sold separately — but in the real world, they depend on each other.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Today */}
        <div className="space-y-3">
          <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">Today's Reality</p>
          <div className="space-y-2">
            {before.map(({ icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-lg">{icon}</span>
                <div>
                  <p className="font-bold text-white">{label}</p>
                  <p className="text-slate-500 text-[10px]">{sub}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 text-center font-mono">5 separate apps. 5 separate problems to solve.</p>
        </div>

        {/* When something changes */}
        <div className="space-y-3">
          <p className="text-[11px] font-mono font-bold text-rose-400 uppercase tracking-widest">When Reality Changes</p>
          <div className="space-y-1.5">
            {after.map(({ icon, label, color }, i) => (
              <div key={i} className={`text-sm font-bold ${color} ${icon === '↓' ? 'text-center text-lg' : 'flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800'}`}>
                {icon !== '↓' && <span className="text-lg">{icon}</span>}
                {icon === '↓' ? icon : <span className="text-xs">{label}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solution tagline */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-brand-400 shrink-0" />
          <p className="text-sm font-bold text-white">
            SafeBound understands these dependencies and continuously manages the trip when reality changes.
          </p>
        </div>
      </div>
    </div>
  );
};
