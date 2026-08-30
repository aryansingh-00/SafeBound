import React from 'react';
import { Sparkles, Sun, ShieldCheck, Wallet, Train, ArrowRight } from 'lucide-react';
import { DestinationItem } from '../../data/destinationsData';

interface RecommendedDestinationsProps {
  destinations: DestinationItem[];
  onExplore: (dest: DestinationItem) => void;
  onPlanTrip: (dest: DestinationItem) => void;
}

export const RecommendedDestinations: React.FC<RecommendedDestinationsProps> = ({
  destinations,
  onExplore,
  onPlanTrip,
}) => {
  return (
    <section className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
            <span>AI Powered Discovery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ✨ Recommended for you
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Based on your preferences, travel patterns and current favorable conditions across India.
          </p>
        </div>
      </div>

      {/* Grid of Recommended Cards with 4 Fit Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.slice(0, 3).map((dest) => (
          <div
            key={dest.id}
            className="group bg-white rounded-3xl overflow-hidden border-2 border-brand-200/90 shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image with Tag */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-600 text-white text-xs font-extrabold shadow-sm">
                  {dest.matchScore}% Match
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-bold">{dest.name}</h3>
                  <p className="text-xs text-slate-200">{dest.state} • {dest.tagline}</p>
                </div>
              </div>

              {/* 4 Fit Indicators from Reference Prompt */}
              <div className="p-4 space-y-2.5">
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Weather: <strong className="text-emerald-700">Good ({dest.weather.temp})</strong></span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                    <span>Safety: <strong className="text-brand-700">High ({dest.safetyScore}/10)</strong></span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Wallet className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Budget: <strong>₹{Math.round(dest.typicalBudget.min / 1000)}K–₹{Math.round(dest.typicalBudget.max / 1000)}K</strong></span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Train className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>Transit: <strong className="text-sky-700">Easy</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 pt-0 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onExplore(dest)}
                className="text-xs font-bold text-slate-600 hover:text-brand-600 underline"
              >
                View Intelligence Report
              </button>

              <button
                type="button"
                onClick={() => onPlanTrip(dest)}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
              >
                <span>Plan Trip</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
