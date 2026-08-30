import React from 'react';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onPlanTrip: () => void;
  onOpenChat: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onPlanTrip, onOpenChat }) => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      
      {/* Background with glowing light gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFE] via-brand-50/40 to-brand-100/30"></div>
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-300/25 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-200 shadow-sm text-brand-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
          <span>One trip. One payment. Zero hassle.</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
          Your next trip doesn't need another dozen tabs.
        </h2>

        {/* Supporting text */}
        <p className="text-base sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-10">
          Tell SafeBound what you want. We'll figure out the rest — from booking to live on-trip coordination.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onPlanTrip}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-xl shadow-brand-600/30 hover:shadow-2xl hover:shadow-brand-600/40 transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Plan My Trip</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </button>

          <button
            type="button"
            onClick={onOpenChat}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-base rounded-2xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-brand-600" />
            <span>Chat with SafeBound AI</span>
          </button>
        </div>

      </div>
    </section>
  );
};
