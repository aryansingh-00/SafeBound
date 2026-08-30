import React from 'react';
import { Sparkles, ShieldCheck, Zap, Bot, Star } from 'lucide-react';
import { AITripPlanner } from './AITripPlanner';
import { TripPlanRequest } from '../../types';

interface HeroSectionProps {
  onStartPlanning: (request: TripPlanRequest) => void;
  onOpenChat: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartPlanning,
  onOpenChat
}) => {
  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      
      {/* Background Alpine Panorama with Smooth Gradient Mask */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Crisp Alpine Mountains & Emerald Lake Imagery matching reference */}
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2400&auto=format&fit=crop"
          alt="SafeBound Alpine Scenic Travel"
          className="w-full h-[650px] lg:h-[750px] object-cover object-center opacity-30 lg:opacity-40 filter contrast-105"
        />
        
        {/* Soft Lavender & Light Background Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFE]/60 via-[#FBFBFE]/70 to-[#FBFBFE]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-indigo-200/25 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Top Content */}
        <div className="max-w-3xl mb-8 lg:mb-12">
          
          {/* Badge: AI TRAVEL COMMERCE AGENT */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/90 border border-brand-200/80 shadow-sm text-brand-700 text-xs sm:text-sm font-bold tracking-wide uppercase mb-6 animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>AI Travel Commerce Agent</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 font-sans">
            One trip. <br />
            One payment. <br />
            <span className="text-brand-600 bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">
              Zero hassle.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
            SafeBound's AI agent finds, builds and books your complete trip — hotels, travel, cabs and activities. All within your budget and preferences.
          </p>

        </div>

        {/* Floating AI Trip Planner Card */}
        <div className="relative z-20">
          <AITripPlanner 
            onStartPlanning={onStartPlanning} 
            onOpenChat={onOpenChat} 
          />
        </div>

      </div>

    </section>
  );
};
