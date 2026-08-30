import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, MapPin, Calendar, Wallet } from 'lucide-react';
import { DASHBOARD_RECOMMENDATIONS } from '../../data/dashboardData';

export const AIRecommendationsGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            <span>✨ Recommended For You</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Based on your travel preferences, weather sensors, and typical budget.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/destinations')}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {DASHBOARD_RECOMMENDATIONS.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-3xl border border-slate-200/90 hover:border-brand-300 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src={rec.imageUrl}
                  alt={rec.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-600 text-white shadow-md">
                    {rec.matchScore}% Match
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-3 text-white">
                  <span className="text-[10px] font-bold text-brand-200 uppercase tracking-wider block">
                    {rec.state}
                  </span>
                  <h4 className="text-base font-extrabold">{rec.name}</h4>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                  {rec.tagline}
                </p>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Typical Package</span>
                    <span className="font-extrabold text-slate-900">
                      ₹{rec.typicalBudget.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Best Season</span>
                    <span className="font-bold text-brand-700">{rec.bestSeason}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                type="button"
                onClick={() => navigate(`/plan-trip?dest=${encodeURIComponent(rec.name)}`)}
                className="w-full py-2.5 bg-slate-50 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-bold text-xs rounded-xl border border-slate-200/80 transition flex items-center justify-center gap-1"
              >
                <span>Plan This Trip</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
