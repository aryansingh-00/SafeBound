import React from 'react';
import { Sparkles, MessageSquare, Bot, ArrowRight, Wand2, Compass } from 'lucide-react';

interface WelcomeStateProps {
  onSelectPrompt: (promptText: string) => void;
}

export const WelcomeState: React.FC<WelcomeStateProps> = ({ onSelectPrompt }) => {
  const samplePrompts = [
    {
      title: '🏔️ Peaceful Mountain Escape',
      text: 'I have ₹40,000. I want a 4-day trip from Delhi in September. Somewhere safe and peaceful, preferably mountains.',
      badge: 'Most Popular',
    },
    {
      title: '🏖️ Quick Weekend Getaway',
      text: 'Plan a ₹30,000 weekend trip from Delhi for 2 people with beach or lake views.',
      badge: 'Weekend',
    },
    {
      title: '🎲 Surprise AI Recommendation',
      text: 'I have 5 days and ₹50,000 budget. Surprise me with the highest-rated safe destination.',
      badge: 'Explore',
    },
    {
      title: '☀️ Coastal Good-Weather Trip',
      text: 'Find the cheapest good-weather trip from Mumbai for 3 days with verified 4-star stay.',
      badge: 'Budget Top',
    },
  ];

  return (
    <div className="py-8 sm:py-12 px-4 max-w-2xl mx-auto text-center space-y-6 animate-fadeIn">
      
      {/* Bot Icon with glowing aura */}
      <div className="relative inline-block">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-brand-500/30">
          <Bot className="w-9 h-9 sm:w-10 sm:h-10 animate-pulse-subtle" />
        </div>
        <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
      </div>

      {/* Main Heading */}
      <div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Where should we take you?
        </h2>
        <p className="text-xs sm:text-base text-slate-500 font-medium max-w-md mx-auto mt-2">
          Tell me what you want from your trip in natural words. I'll handle the research, comparisons, live re-optimization, and packaging.
        </p>
      </div>

      {/* Suggested Prompts Grid */}
      <div className="pt-2 text-left space-y-2.5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1 flex items-center gap-1">
          <Wand2 className="w-3.5 h-3.5 text-brand-500" />
          <span>Try saying one of these:</span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectPrompt(p.text)}
              className="p-4 rounded-2xl bg-white hover:bg-brand-50/70 border border-slate-200/90 hover:border-brand-300 shadow-xs hover:shadow-md transition-all duration-200 text-left flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-brand-700">
                    {p.title}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 group-hover:bg-brand-100 text-slate-600 group-hover:text-brand-800">
                    {p.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  "{p.text}"
                </p>
              </div>

              <div className="pt-3 flex items-center justify-end text-brand-600 font-bold text-[11px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Start this plan</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
