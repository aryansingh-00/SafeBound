import React from 'react';
import { Wallet, PieChart, CheckCircle2 } from 'lucide-react';

interface BudgetSummaryCardProps {
  totalBudget: number;
  totalCost: number;
  remainingBuffer: number;
}

export const BudgetSummaryCard: React.FC<BudgetSummaryCardProps> = ({
  totalBudget,
  totalCost,
  remainingBuffer,
}) => {
  const percentageUsed = Math.min(Math.round((totalCost / totalBudget) * 100), 100);

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <Wallet className="w-4 h-4 text-brand-600" />
          <span>Trip Budget Tracking</span>
        </h4>

        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Under Budget
        </span>
      </div>

      {/* Figures */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Max Budget</span>
          <span className="font-extrabold text-slate-900">₹{totalBudget.toLocaleString('en-IN')}</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-brand-50 border border-brand-200">
          <span className="text-[10px] text-brand-700 font-bold uppercase block">Total Spent</span>
          <span className="font-extrabold text-brand-700">₹{totalCost.toLocaleString('en-IN')}</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200">
          <span className="text-[10px] text-emerald-800 font-bold uppercase block">Buffer Saved</span>
          <span className="font-extrabold text-emerald-700">₹{remainingBuffer.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-semibold text-slate-500">
          <span>Budget Allocated: {percentageUsed}%</span>
          <span className="text-emerald-700 font-bold">₹{remainingBuffer.toLocaleString('en-IN')} remaining</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-indigo-600 rounded-full"
            style={{ width: `${percentageUsed}%` }}
          ></div>
        </div>
      </div>

      {/* Itemized Categories */}
      <div className="space-y-1 pt-1 text-xs text-slate-600">
        <div className="flex justify-between">
          <span>🚆 Transport</span>
          <span className="font-bold text-slate-800">₹7,800</span>
        </div>
        <div className="flex justify-between">
          <span>🏨 Hotel Stay (4★)</span>
          <span className="font-bold text-slate-800">₹16,500</span>
        </div>
        <div className="flex justify-between">
          <span>🚕 Chauffeur & Transfers</span>
          <span className="font-bold text-slate-800">₹2,500</span>
        </div>
        <div className="flex justify-between">
          <span>🎟️ Activities & Passes</span>
          <span className="font-bold text-slate-800">₹4,500</span>
        </div>
      </div>

    </div>
  );
};
