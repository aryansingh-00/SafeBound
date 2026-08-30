import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, CheckCircle2, Bell, ArrowRight, ExternalLink } from 'lucide-react';
import { GeneratedTripPlan } from '../../types';

interface PaymentAndPackageSidebarProps {
  plan: GeneratedTripPlan | null;
  transactionId: string;
}

export const PaymentAndPackageSidebar: React.FC<PaymentAndPackageSidebarProps> = ({
  plan,
  transactionId,
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 text-white">
      
      {/* 1. Payment Confirmation Card */}
      <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Escrow Payment Secured</span>
          </span>
          <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Success
          </span>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Amount Paid:</span>
            <span className="font-extrabold text-white text-sm">₹{(plan?.estimatedCost || 31300).toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Transaction ID:</span>
            <span className="font-mono text-emerald-400">{transactionId}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Gateway:</span>
            <span className="font-semibold text-slate-200">Razorpay Unified Escrow</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert(`Receipt downloaded for transaction: ${transactionId}`)}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1"
        >
          <span>View Payment Receipt</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* 2. Package Summary Card */}
      <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300 block">
          Coordinated Package
        </span>

        <div>
          <h4 className="text-sm font-bold text-white">
            🏔️ {plan?.title || 'Mussoorie — 4 Days Package'}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {plan?.startingCity || 'Delhi'} ➔ {plan?.destination || 'Mussoorie'} • {plan?.duration || '4 Days'}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>{plan?.travellers || 2} Travellers</span>
          <span className="font-bold text-brand-400">All-Inclusive Bundle</span>
        </div>
      </div>

      {/* 3. Background Safe Notification Card */}
      <div className="bg-brand-950/80 border border-brand-500/40 rounded-3xl p-5 space-y-2.5">
        <div className="flex items-center gap-2 text-brand-300 font-bold text-xs">
          <Bell className="w-4 h-4 text-brand-400" />
          <span>You can leave this page safely</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          SafeBound autonomous agents continue coordinating your bookings in the background. We will notify you when all vouchers are generated.
        </p>

        <button
          type="button"
          onClick={() => navigate('/trips')}
          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
        >
          <span>Go to My Trips Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
