import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Star, ShieldCheck, CloudSun, Train, Building, Car, Compass, Layers } from 'lucide-react';
import { TripResultPackage } from '../../data/tripResultsData';

interface TopPickSpotlightProps {
  topPick: TripResultPackage;
  onViewPackage: (pkg: TripResultPackage) => void;
  onToggleCompare: (pkg: TripResultPackage) => void;
  isComparing: boolean;
}

export const TopPickSpotlight: React.FC<TopPickSpotlightProps> = ({
  topPick,
  onViewPackage,
  onToggleCompare,
  isComparing,
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-brand-500/40 shadow-2xl text-white space-y-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Banner: Badge & Match Score */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>✨ SafeBound's Top Pick</span>
          </span>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700">
            {topPick.matchScore}% Match
          </span>
        </div>

        <span className="text-xs font-semibold text-brand-200">
          Ranked #1 of 4 verified packages
        </span>
      </div>

      {/* Headline & Reasoning Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Left: Image & Info (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              🏔️ {topPick.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-brand-100 font-medium leading-relaxed">
            Mussoorie currently offers the strongest combination of budget fit (₹8,700 savings buffer), scenic 23°C September weather, convenient 5.5h Vande Bharat transit, and verified 4★ luxury mountain stay.
          </p>

          {/* 5-Point Radar Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] text-slate-400 block font-bold">Budget Fit</span>
              <span className="text-emerald-400 font-extrabold">✓ Excellent (₹31.3K)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] text-slate-400 block font-bold">Weather Suitability</span>
              <span className="text-emerald-400 font-extrabold">✓ 23°C Pleasant</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] text-slate-400 block font-bold">Safety Score</span>
              <span className="text-emerald-400 font-extrabold">✓ 9.3/10 Strong</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] text-slate-400 block font-bold">Transit Convenience</span>
              <span className="text-emerald-400 font-extrabold">✓ 5.5h Train + Cab</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 col-span-2 sm:col-span-2">
              <span className="text-[10px] text-slate-400 block font-bold">Experience Match</span>
              <span className="text-brand-300 font-extrabold">✓ Cable Car VIP Pass & Kempty Trail</span>
            </div>
          </div>
        </div>

        {/* Right: Price & Quick Action Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-800/90 p-5 sm:p-6 rounded-2xl border border-slate-700/80 space-y-4 text-center sm:text-left">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
              Complete All-Inclusive Package
            </span>
            <div className="flex items-baseline justify-center sm:justify-start gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                ₹{topPick.totalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{topPick.originalPrice?.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-400 block mt-0.5">
              ₹{topPick.remainingBuffer.toLocaleString('en-IN')} remaining of ₹40,000 budget
            </span>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-700">
            <button
              type="button"
              onClick={() => onViewPackage(topPick)}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>View Full Package & Itinerary</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onToggleCompare(topPick)}
              className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                isComparing
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isComparing ? '✓ Added to Comparison' : '+ Compare with other trips'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
