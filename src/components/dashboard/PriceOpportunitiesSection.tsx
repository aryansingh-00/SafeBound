import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, ArrowRight, Sparkles, TrendingDown } from 'lucide-react';
import { DASHBOARD_PRICE_OPPORTUNITIES } from '../../data/dashboardData';

export const PriceOpportunitiesSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-emerald-600" />
            <span>💰 Opportunities SafeBound Found</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Active price drops and newly discounted packages for your watchlist.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/deals')}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
        >
          <span>All Deals</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DASHBOARD_PRICE_OPPORTUNITIES.map((opp) => (
          <div
            key={opp.id}
            className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:border-brand-300 transition flex flex-col sm:flex-row items-center gap-4 group"
          >
            <div className="w-full sm:w-28 h-28 rounded-2xl overflow-hidden shrink-0 relative">
              <img
                src={opp.imageUrl}
                alt={opp.destination}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
              <span className="absolute top-1.5 left-1.5 px-2 py-0.2 rounded-md bg-emerald-600 text-white font-extrabold text-[9px]">
                -₹{opp.savings.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="space-y-2 flex-1 w-full">
              <div>
                <span className="text-[10px] font-bold text-brand-700 uppercase tracking-wider block">
                  {opp.duration}
                </span>
                <h4 className="text-sm font-extrabold text-slate-900">{opp.destination}</h4>
                <p className="text-xs text-slate-500 line-clamp-1">{opp.tagline}</p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-extrabold text-slate-900">
                    ₹{opp.currentPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    ₹{opp.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/deals')}
                  className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                >
                  View Deal
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
