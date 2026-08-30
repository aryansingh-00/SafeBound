import React from 'react';
import { Flame, Sparkles, Zap, ShieldCheck, Check, ArrowRight, Plane, Building, Car, Compass, Clock } from 'lucide-react';
import { DealItem } from '../../data/dealsData';

interface DealOfTheDayProps {
  deal: DealItem;
  onViewDeal: (deal: DealItem) => void;
  onOptimize: (deal: DealItem) => void;
}

export const DealOfTheDay: React.FC<DealOfTheDayProps> = ({
  deal,
  onViewDeal,
  onOptimize,
}) => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 border-2 border-amber-400/80 shadow-2xl text-white p-6 sm:p-8 space-y-6">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Banner Ticker */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
            <Flame className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>🔥 DEAL OF THE DAY</span>
          </span>

          <span className="text-xs font-bold text-amber-300 flex items-center gap-1 bg-amber-950/60 px-2.5 py-1 rounded-xl border border-amber-500/30">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>33% Flash Price Drop</span>
          </span>
        </div>

        <span className="text-[11px] font-mono text-slate-300 flex items-center gap-1 bg-slate-800/80 px-3 py-1 rounded-xl border border-slate-700">
          <Clock className="w-3 h-3 text-emerald-400" />
          <span>{deal.liveTimestamp}</span>
        </span>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Left Info (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-brand-300">{deal.startingCity} ➔ {deal.destination}</span>
              <span className="text-xs text-slate-400">• {deal.duration}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {deal.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              All-inclusive beachside getaway with verified 4-star resort and private airport transfers.
            </p>
          </div>

          {/* Inclusions Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/70 border border-slate-700/60">
              <Plane className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="truncate">{deal.inclusions.transport}</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/70 border border-slate-700/60">
              <Building className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="truncate">{deal.inclusions.hotel}</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/70 border border-slate-700/60">
              <Car className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">{deal.inclusions.transfers}</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/70 border border-slate-700/60">
              <Compass className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">{deal.inclusions.activitiesCount} Verified Activities</span>
            </div>
          </div>
        </div>

        {/* Right Pricing & Action Box (5 cols) */}
        <div className="lg:col-span-5 bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Special Flash Price</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">
                  ₹{deal.currentPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  ₹{deal.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/40">
              {deal.discountPercentage}% OFF
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-slate-700">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Safety {deal.safetyScore}/10</span>
            </span>
            <span className="font-bold text-brand-300">
              SafeBound Match: {deal.matchScore}%
            </span>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => onViewDeal(deal)}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Grab Deal & Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onOptimize(deal)}
              className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>⚡ Optimize with AI (Find Even Cheaper)</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
