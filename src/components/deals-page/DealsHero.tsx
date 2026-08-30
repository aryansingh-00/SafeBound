import React from 'react';
import { Tag, Search, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DealsHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
}

export const DealsHero: React.FC<DealsHeroProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  const navigate = useNavigate();
  const popularSearches = [
    '🌴 4-day Goa under ₹20,000',
    '🏔️ Manali snow package for 2',
    '🌊 Kerala backwater houseboat deal',
    '🛕 Weekend Rishikesh rafting ₹9,999',
  ];

  return (
    <section className="relative pt-6 pb-8 sm:pt-10 sm:pb-10 overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-200/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 shadow-xs text-amber-900 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
          <Zap className="w-4 h-4 text-amber-600 animate-bounce" />
          <span>Live AI Travel Marketplace • Dynamic Re-Pricing</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Find a better trip for less.
        </h1>

        {/* Supporting copy */}
        <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          SafeBound continuously scans flights, luxury stays and activity combos to surface verified deals worth booking.
        </p>

        {/* AI Search Box */}
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
                  placeholder="“4-day Goa trip under ₹25,000 from Delhi…”"
                  className="w-full pl-12 pr-4 py-3.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-slate-50/80 hover:bg-slate-50 focus:bg-white rounded-2xl border border-slate-200/80 focus:border-brand-500 focus:outline-none transition shadow-inner"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onSearchSubmit}
                  className="flex-1 sm:flex-none px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 whitespace-nowrap transition"
                >
                  <Tag className="w-4 h-4" />
                  <span>Find Deals</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/ai-chat')}
                  className="flex-1 sm:flex-none px-4 py-3.5 bg-purple-50 hover:bg-purple-100 text-brand-700 font-bold text-xs sm:text-sm rounded-2xl border border-brand-200 transition flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>

            {/* Quick search pills */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-left">
              <span className="text-[11px] font-bold text-slate-400 shrink-0 uppercase">Trending:</span>
              {popularSearches.map((s, i) => (
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
