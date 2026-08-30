import React, { useState } from 'react';
import { Wallet, Sparkles, ArrowRight, ShieldCheck, Sun } from 'lucide-react';
import { DestinationItem } from '../../data/destinationsData';

interface BudgetExplorerProps {
  destinations: DestinationItem[];
  onSelectDestination: (dest: DestinationItem) => void;
  onPlanTrip: (dest: DestinationItem) => void;
}

export const BudgetExplorer: React.FC<BudgetExplorerProps> = ({
  destinations,
  onSelectDestination,
  onPlanTrip,
}) => {
  const [targetBudget, setTargetBudget] = useState(30000);

  const matchedDestinations = destinations.filter(
    (d) => d.typicalBudget.min <= targetBudget
  );

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
      
      {/* Header & Slider Control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-extrabold uppercase tracking-wider mb-1">
            <Wallet className="w-3.5 h-3.5 text-brand-600" />
            <span>Budget Matching Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find destinations within your budget
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Slide to adjust your budget — SafeBound filters verified destinations under your limit.
          </p>
        </div>

        {/* Interactive Slider */}
        <div className="w-full md:w-80 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Max Budget</span>
            <span className="text-xl font-extrabold text-brand-700">₹{targetBudget.toLocaleString('en-IN')}</span>
          </div>

          <input
            type="range"
            min={10000}
            max={60000}
            step={5000}
            value={targetBudget}
            onChange={(e) => setTargetBudget(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
          />

          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span>₹10,000</span>
            <span>₹30,000</span>
            <span>₹60,000+</span>
          </div>
        </div>
      </div>

      {/* Filtered Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {matchedDestinations.slice(0, 4).map((dest) => (
          <div
            key={dest.id}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-brand-300 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="h-32 rounded-xl overflow-hidden mb-3 relative">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                  {dest.state}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900">{dest.name}</h4>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">{dest.tagline}</p>

              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 my-2">
                <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-amber-500" /> {dest.weather.temp}</span>
                <span className="flex items-center gap-1 text-emerald-700"><ShieldCheck className="w-3 h-3 text-emerald-600" /> {dest.safetyScore}/10</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">From</span>
                <span className="text-xs font-extrabold text-brand-700">₹{dest.typicalBudget.min.toLocaleString('en-IN')}</span>
              </div>

              <button
                type="button"
                onClick={() => onPlanTrip(dest)}
                className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-[11px] rounded-xl shadow-xs transition"
              >
                Plan Trip
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
