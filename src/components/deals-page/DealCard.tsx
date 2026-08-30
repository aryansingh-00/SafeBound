import React from 'react';
import { Sparkles, Zap, ShieldCheck, Check, Plane, Building, Car, Compass, ArrowRight, Clock } from 'lucide-react';
import { DealItem } from '../../data/dealsData';

interface DealCardProps {
  deal: DealItem;
  onViewDeal: (deal: DealItem) => void;
  onOptimize: (deal: DealItem) => void;
}

export const DealCard: React.FC<DealCardProps> = ({
  deal,
  onViewDeal,
  onOptimize,
}) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between">
      
      <div>
        {/* Destination Image with Badges */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
          <img
            src={deal.imageUrl}
            alt={deal.destination}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

          {/* Discount Pill */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-rose-600 text-white text-xs font-extrabold shadow-sm flex items-center gap-1">
            <span>{deal.discountPercentage}% OFF</span>
          </div>

          {/* Match Score */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-brand-600/95 backdrop-blur-md text-white text-xs font-bold shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{deal.matchScore}% Match</span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-bold tracking-tight">{deal.destination}</h3>
              <span className="text-xs font-semibold text-slate-200">{deal.duration.split('/')[0]}</span>
            </div>
            <p className="text-[11px] text-slate-200 font-medium truncate">
              {deal.startingCity} ➔ {deal.destination.split(',')[0]}
            </p>
          </div>
        </div>

        {/* Inclusions Checklist */}
        <div className="p-4 space-y-3">
          
          <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-1.5 truncate">
              <Plane className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span className="truncate">{deal.inclusions.transport}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Building className="w-3.5 h-3.5 text-purple-500 shrink-0" />
              <span className="truncate">{deal.inclusions.hotel}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Compass className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{deal.inclusions.activitiesCount} Activities & Sightseeing</span>
            </div>
          </div>

          {/* Live Update Ticker & Safety */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 px-1">
            <span className="flex items-center gap-1 text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{deal.liveTimestamp}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Safety {deal.safetyScore}/10</span>
            </span>
          </div>

        </div>
      </div>

      {/* Pricing & CTAs */}
      <div className="p-4 pt-0 space-y-2">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">All-Inclusive</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-slate-900">
                ₹{deal.currentPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{deal.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onViewDeal(deal)}
            className="px-3.5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition flex items-center gap-1"
          >
            <span>View Deal</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* 1-Click AI Optimize Button */}
        <button
          type="button"
          onClick={() => onOptimize(deal)}
          className="w-full py-2 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl transition flex items-center justify-center gap-1"
        >
          <Zap className="w-3.5 h-3.5 text-amber-600" />
          <span>⚡ Optimize with AI (Save ₹1,450–₹2,350)</span>
        </button>
      </div>

    </div>
  );
};
