import React from 'react';
import { Award, Info, Sparkles, ArrowRight } from 'lucide-react';
import { DealItem } from '../../data/dealsData';
import { DealCard } from './DealCard';

interface BestValueSectionProps {
  deals: DealItem[];
  onViewDeal: (deal: DealItem) => void;
  onOptimize: (deal: DealItem) => void;
}

export const BestValueSection: React.FC<BestValueSectionProps> = ({
  deals,
  onViewDeal,
  onOptimize,
}) => {
  const bestValueDeals = deals.filter((d) => d.isBestValue).slice(0, 3);

  return (
    <section className="space-y-4">
      
      {/* Header with Explanatory Tooltip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-600" />
              <span>Best value trips</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
              Quality-Adjusted
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Best value balances 4★ comfort, safety index, and weather suitability — not just cheapest price.</span>
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {bestValueDeals.map((deal) => (
          <DealCard
            key={deal.id}
            deal={deal}
            onViewDeal={onViewDeal}
            onOptimize={onOptimize}
          />
        ))}
      </div>

    </section>
  );
};
