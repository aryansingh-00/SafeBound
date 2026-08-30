import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { DealItem } from '../../data/dealsData';

interface DealComparisonMatrixProps {
  deals: DealItem[];
  onSelectDeal: (deal: DealItem) => void;
}

export const DealComparisonMatrix: React.FC<DealComparisonMatrixProps> = ({
  deals,
  onSelectDeal,
}) => {
  const compareDeals = deals.slice(0, 3);

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-5">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Compare Top Trending Deals</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Transparent side-by-side breakdown of inclusions, cancellation policies and total package costs.
          </p>
        </div>

        <span className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-xl">
          Side-by-Side Analysis
        </span>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
              <th className="py-3 pr-4">Feature</th>
              {compareDeals.map((d) => (
                <th key={d.id} className="py-3 px-3 text-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm">{d.destination.split(',')[0]}</span>
                    {d.isDealOfTheDay && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-amber-500 text-slate-950">
                        TOP DEAL
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-2.5 pr-4 font-semibold text-slate-500">SafeBound Match</td>
              {compareDeals.map((d) => (
                <td key={d.id} className="py-2.5 px-3 font-extrabold text-brand-700">{d.matchScore}% Match</td>
              ))}
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-semibold text-slate-500">Duration</td>
              {compareDeals.map((d) => (
                <td key={d.id} className="py-2.5 px-3 text-slate-800 font-semibold">{d.duration.split('/')[0]}</td>
              ))}
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-semibold text-slate-500">All-Inclusive Price</td>
              {compareDeals.map((d) => (
                <td key={d.id} className="py-2.5 px-3 font-extrabold text-slate-900 text-sm">
                  ₹{d.currentPrice.toLocaleString('en-IN')}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-semibold text-slate-500">Transport Included</td>
              {compareDeals.map((d) => (
                <td key={d.id} className="py-2.5 px-3 text-slate-700">{d.inclusions.transport.split('(')[0]}</td>
              ))}
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-semibold text-slate-500">Hotel Category</td>
              {compareDeals.map((d) => (
                <td key={d.id} className="py-2.5 px-3 text-slate-700 font-semibold">{d.inclusions.hotel.substring(0, 25)}...</td>
              ))}
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-semibold text-slate-500">Curated Activities</td>
              {compareDeals.map((d) => (
                <td key={d.id} className="py-2.5 px-3 text-slate-700">{d.inclusions.activitiesCount} Activities Included</td>
              ))}
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-semibold text-slate-500">Cancellation</td>
              {compareDeals.map((d) => (
                <td key={d.id} className="py-2.5 px-3 text-emerald-700 font-semibold">{d.cancellationPolicy}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Row */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {compareDeals.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => onSelectDeal(d)}
            className="w-full py-2.5 px-3 rounded-xl text-xs font-extrabold bg-brand-600 hover:bg-brand-700 text-white shadow-xs transition flex items-center justify-center gap-1.5"
          >
            <span>Choose {d.destination.split(',')[0]}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        ))}
      </div>

    </section>
  );
};
