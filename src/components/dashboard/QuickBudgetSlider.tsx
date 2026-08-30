import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Sparkles, ArrowRight } from 'lucide-react';

export const QuickBudgetSlider: React.FC = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(25000);

  const getDestinationCount = (b: number) => {
    if (b < 15000) return 6;
    if (b < 25000) return 14;
    if (b < 35000) return 22;
    return 34;
  };

  const count = getDestinationCount(budget);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Wallet className="w-4 h-4 text-brand-600" />
          <span>💰 Quick Budget Explorer</span>
        </h3>
        <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-lg">
          {count} Destinations Available
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-slate-500 font-medium">Target per-person budget:</span>
          <span className="text-xl font-extrabold text-slate-900 font-mono">
            ₹{budget.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min={10000}
          max={50000}
          step={2500}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
        />

        <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold">
          <span>₹10,000</span>
          <span>₹25,000</span>
          <span>₹50,000+</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate(`/destinations?maxBudget=${budget}`)}
        className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
      >
        <span>Explore {count} Matching Getaways</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

    </div>
  );
};
