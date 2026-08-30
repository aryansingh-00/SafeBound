import React from 'react';
import { Zap, Clock, Plane, Building, Compass, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Deal } from '../../types';

interface DealCardProps {
  deal: Deal;
  onViewDeal: (deal: Deal) => void;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, onViewDeal }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between">
      
      <div>
        {/* Card Image Header */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
          <img
            src={deal.imageUrl}
            alt={deal.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

          {/* Deal Badge */}
          {deal.badge && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-600/95 backdrop-blur-md text-white text-xs font-bold shadow-sm">
              {deal.badge}
            </div>
          )}

          {/* Discount Pill */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-rose-500 text-white text-xs font-extrabold shadow-sm">
            {deal.discountPercentage}% OFF
          </div>

          {/* Bottom Overlay Info */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="text-lg font-bold leading-tight">{deal.destination}</h3>
            <p className="text-xs text-slate-200 font-medium">{deal.duration}</p>
          </div>
        </div>

        {/* Live Update Ticker */}
        <div className="px-4 py-2 bg-amber-50/80 border-b border-amber-100 flex items-center justify-between text-[11px] font-semibold text-amber-800">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Price updated {deal.updatedAgo}</span>
          </div>
          <span className="text-amber-700 bg-amber-200/60 px-1.5 py-0.5 rounded text-[10px]">
            AI Live Optimized
          </span>
        </div>

        {/* Package Inclusions Breakdown */}
        <div className="p-5 space-y-3.5">
          <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
            {deal.title}
          </h4>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Plane className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span className="truncate">{deal.transport}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-purple-500 shrink-0" />
              <span className="truncate">{deal.hotel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">{deal.activitiesCount} Curated Experiences included</span>
            </div>
          </div>

          {/* Quick list pill highlights */}
          <div className="pt-1 flex flex-wrap gap-1">
            {deal.activitiesList.slice(0, 2).map((act, i) => (
              <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md truncate max-w-full">
                ✓ {act}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-5 pt-0">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 line-through font-medium">
                ₹{deal.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900">
                ₹{deal.currentPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium block">
              All-inclusive per person
            </span>
          </div>

          <button
            type="button"
            onClick={() => onViewDeal(deal)}
            className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm shadow-brand-600/20 hover:shadow-md transition flex items-center gap-1"
          >
            <span>View Deal</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

    </div>
  );
};
