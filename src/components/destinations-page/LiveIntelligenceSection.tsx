import React from 'react';
import { Radio, CloudSun, ShieldCheck, Hotel, Users, Train, ArrowRight } from 'lucide-react';
import { DestinationItem } from '../../data/destinationsData';

interface LiveIntelligenceSectionProps {
  destinations: DestinationItem[];
  onExplore: (dest: DestinationItem) => void;
}

export const LiveIntelligenceSection: React.FC<LiveIntelligenceSectionProps> = ({
  destinations,
  onExplore,
}) => {
  return (
    <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Live Destination Radar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            What's good to visit right now?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
            Real-time assessment combining satellite weather, highway road clearances, and live hotel occupancy.
          </p>
        </div>

        <span className="text-[11px] font-mono text-emerald-400 bg-slate-800 px-3 py-1 rounded-xl border border-slate-700">
          Telemetry Synced: 2m ago
        </span>
      </div>

      {/* Grid of Live Intelligence Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {destinations.slice(0, 3).map((dest) => (
          <div
            key={dest.id}
            className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md space-y-4 hover:border-brand-500/60 transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{dest.name}</h3>
                <span className="text-xs text-slate-400 font-medium">{dest.state}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {dest.liveSignals.verdict}
              </span>
            </div>

            {/* 5 Live Signal Metrics */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <CloudSun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Weather</span>
                </span>
                <span className="font-bold text-slate-200">{dest.weather.temp} ({dest.weather.condition})</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Hotel className="w-3.5 h-3.5 text-purple-400" />
                  <span>Hotel Availability</span>
                </span>
                <span className="font-bold text-slate-200">{dest.liveSignals.hotelAvailability}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-400" />
                  <span>Tourist Demand</span>
                </span>
                <span className="font-bold text-slate-200">{dest.liveSignals.touristDemand}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Safety Index</span>
                </span>
                <span className="font-bold text-emerald-400">{dest.safetyScore}/10</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onExplore(dest)}
              className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <span>Explore Live Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </section>
  );
};
