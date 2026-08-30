import React from 'react';
import { Wallet, Lock, Unlock, BadgePercent, Sparkles } from 'lucide-react';

interface BudgetSelectorProps {
  budget: number;
  isHardLimit: boolean;
  onBudgetChange: (amount: number) => void;
  onToggleHardLimit: (hardLimit: boolean) => void;
}

export const BudgetSelector: React.FC<BudgetSelectorProps> = ({
  budget,
  isHardLimit,
  onBudgetChange,
  onToggleHardLimit,
}) => {
  const quickBudgets = [20000, 30000, 40000, 60000, 80000, 120000];

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
      
      {/* Header & Current Amount */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-brand-600" />
            <span>What's your total trip budget?</span>
          </label>
          <p className="text-[11px] text-slate-500 font-medium">
            All-inclusive for transport, stay, cabs, and activities
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-bold">INR</span>
          <div className="text-xl sm:text-2xl font-extrabold text-brand-600 bg-brand-50 px-3.5 py-1 rounded-xl border border-brand-200/60">
            ₹{budget.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-1.5 pt-1">
        <input
          type="range"
          min={10000}
          max={150000}
          step={2500}
          value={budget}
          onChange={(e) => onBudgetChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
        />

        <div className="flex justify-between text-[11px] font-semibold text-slate-400">
          <span>₹10k</span>
          <span>₹40k</span>
          <span>₹80k</span>
          <span>₹1.5 Lakh+</span>
        </div>
      </div>

      {/* Quick budget chips */}
      <div className="flex flex-wrap gap-1.5">
        {quickBudgets.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => onBudgetChange(b)}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition ${
              budget === b
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ₹{b.toLocaleString('en-IN')}
          </button>
        ))}
      </div>

      {/* Hard Limit vs Flexible Budget Toggle */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onToggleHardLimit(!isHardLimit)}
            className={`w-9 h-5 rounded-full transition-colors relative flex items-center ${
              isHardLimit ? 'bg-brand-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                isHardLimit ? 'translate-x-4' : 'translate-x-0.5'
              } shadow-sm`}
            />
          </button>

          <div>
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
              {isHardLimit ? <Lock className="w-3.5 h-3.5 text-brand-600" /> : <Unlock className="w-3.5 h-3.5 text-slate-400" />}
              {isHardLimit ? 'Hard budget limit enabled' : 'Flexible budget (±10%)'}
            </span>
            <p className="text-[11px] text-slate-500 font-medium">
              {isHardLimit
                ? 'SafeBound will never recommend a package exceeding ₹' + budget.toLocaleString('en-IN')
                : 'Allows SafeBound to suggest high-value upgrades slightly above budget'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
