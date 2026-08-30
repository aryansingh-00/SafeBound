import React from 'react';
import { CreditCard, ShieldCheck, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export const RazorpayEscrowMonitor: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4 shadow-card text-white">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-purple-400" />
          <h3 className="text-base font-extrabold text-white">
            💳 Razorpay Smart Escrow Operations
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/10 px-3 py-1 rounded-xl border border-purple-500/30">
          256-Bit Escrow Secured
        </span>
      </div>

      <p className="text-xs text-slate-400 font-medium">
        Single-escrow checkout holds funds until suppliers confirm, releasing payments strictly against programmatic journey milestones.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase block">Settled Today</span>
          <span className="text-lg font-extrabold text-emerald-400">328</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase block">In Escrow</span>
          <span className="text-lg font-extrabold text-purple-400">₹18.4L</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase block">Dispute Holds</span>
          <span className="text-lg font-extrabold text-slate-200">0</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase block">Auto-Refunded</span>
          <span className="text-lg font-extrabold text-amber-400">6 (₹14.2K)</span>
        </div>
      </div>

    </div>
  );
};
