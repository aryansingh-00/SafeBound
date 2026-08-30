import React from 'react';
import { TrendingDown, Zap, ArrowRight } from 'lucide-react';
import { DealItem } from '../../data/dealsData';

interface PriceDropAlertsProps {
  deals: DealItem[];
  onSelectDeal: (deal: DealItem) => void;
}

export const PriceDropAlerts: React.FC<PriceDropAlertsProps> = ({
  deals,
  onSelectDeal,
}) => {
  const priceDroppedDeals = deals.filter((d) => (d.priceDropAmount || 0) > 0).slice(0, 4);

  return (
    <section className="space-y-3">
      
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <TrendingDown className="w-4 h-4 text-emerald-600" />
          <span>Recent Live Price Drops</span>
        </h3>
        <span className="text-[11px] font-mono text-emerald-600 font-bold">
          ⚡ Scanner Live
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {priceDroppedDeals.map((deal) => (
          <div
            key={deal.id}
            onClick={() => onSelectDeal(deal)}
            className="p-3.5 rounded-2xl bg-white hover:bg-emerald-50/50 border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-md transition cursor-pointer flex items-center justify-between group"
          >
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                  {deal.destination.split(',')[0]}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{deal.duration.split('/')[0]}</span>
              </div>

              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xs text-slate-400 line-through">
                  ₹{deal.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  ₹{deal.currentPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-[11px]">
                <TrendingDown className="w-3 h-3" />
                <span>₹{(deal.priceDropAmount || 2500).toLocaleString('en-IN')}</span>
              </span>
              <span className="block text-[10px] font-bold text-brand-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                View Deal →
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
