import React, { useState } from 'react';
import { Sparkles, Search, Compass, ShieldCheck, Sun, Wallet } from 'lucide-react';

interface DestinationHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
}

export const DestinationHero: React.FC<DestinationHeroProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  const sampleSearches = [
    '🏔️ Safe mountain destination under ₹30,000 in September',
    '🏖️ Goa or Andaman for couple beach getaway',
    '🌿 Kerala backwaters with luxury houseboat',
    '🐅 Weekend wildlife tiger safari near Delhi',
  ];

  return (
    <section className="relative pt-6 pb-10 sm:pt-10 sm:pb-14 overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-200/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 shadow-xs text-brand-700 text-xs sm:text-sm font-bold uppercase tracking-wider">
          <Compass className="w-4 h-4 text-brand-600 animate-spin-slow" />
          <span>Smart Destination Discovery Engine</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Discover where you should go next.
        </h1>

        {/* Supporting copy */}
        <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Explore destinations based on live weather, safety telemetry, typical budget, season and what you actually want from your journey.
        </p>

        {/* Large Natural Language AI Search Box */}
        <div className="max-w-3xl mx-auto pt-2">
          <div className="bg-white p-3 sm:p-4 rounded-3xl border-2 border-brand-200 shadow-hero-search space-y-3">
            
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                  placeholder="“Safe mountain destination under ₹30,000 in September…”"
                  className="w-full pl-12 pr-4 py-3.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-slate-50/80 hover:bg-slate-50 focus:bg-white rounded-2xl border border-slate-200/80 focus:border-brand-500 focus:outline-none transition shadow-inner"
                />
              </div>

              <button
                type="button"
                onClick={onSearchSubmit}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 whitespace-nowrap transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Find Destinations</span>
              </button>
            </div>

            {/* Micro search pills */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-left">
              <span className="text-[11px] font-bold text-slate-400 shrink-0 uppercase">Try:</span>
              {sampleSearches.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSearchChange(s.replace(/^[^\w]+/, ''))}
                  className="text-xs font-semibold text-slate-600 hover:text-brand-700 bg-slate-100 hover:bg-brand-50 border border-slate-200/60 rounded-full px-3 py-1 transition whitespace-nowrap"
                >
                  {s}
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
