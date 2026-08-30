import React from 'react';
import { Wallet, CheckCircle2 } from 'lucide-react';

export const SpendingSummaryCard: React.FC = () => {
  const totalBudget = 40000;
  const packageTotal = 31300;
  const remaining = totalBudget - packageTotal;
  const percentage = Math.min(Math.round((packageTotal / totalBudget) * 100), 100);

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-brand-600" />
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
            💰 Trip Spending Summary
          </h4>
        </div>

        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Paid in Full
        </span>
      </div>

      {/* Figures */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Target Budget</span>
          <span className="font-extrabold text-slate-900">₹{totalBudget.toLocaleString('en-IN')}</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-brand-50 border border-brand-200">
          <span className="text-[10px] text-brand-700 font-bold uppercase block">Package Paid</span>
          <span className="font-extrabold text-brand-700">₹{packageTotal.toLocaleString('en-IN')}</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200">
          <span className="text-[10px] text-emerald-800 font-bold uppercase block">Buffer Saved</span>
          <span className="font-extrabold text-emerald-700">₹{remaining.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-semibold text-slate-500">
          <span>Spent: {percentage}% of Target</span>
          <span className="text-emerald-700 font-bold">₹{remaining.toLocaleString('en-IN')} Buffer</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-indigo-600 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Itemized Categories */}
      <div className="space-y-1 text-xs text-slate-600 pt-1">
        <div className="flex justify-between">
          <span>🚆 Transport (Return Coach)</span>
          <span className="font-bold text-slate-900">₹7,800</span>
        </div>
        <div className="flex justify-between">
          <span>🏨 4★ Cedar View Resort (4 Nights)</span>
          <span className="font-bold text-slate-900">₹16,500</span>
        </div>
        <div className="flex justify-between">
          <span>🚕 Dedicated Chauffeur Sedan</span>
          <span className="font-bold text-slate-900">₹2,500</span>
        </div>
        <div className="flex justify-between">
          <span>🎟️ Experiences & Passes</span>
          <span className="font-bold text-slate-900">₹4,500</span>
        </div>
        <div className="flex justify-between pt-1 border-t border-slate-100 text-emerald-700 font-bold">
          <span>🛡️ SafeBound Escrow Protection</span>
          <span>FREE</span>
        </div>
      </div>

    </div>
  );
};
