import React from 'react';
import { Sparkles, MessageSquareText, Wand2 } from 'lucide-react';

interface TripRequestBoxProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSelectSamplePrompt: (prompt: string) => void;
}

export const TripRequestBox: React.FC<TripRequestBoxProps> = ({
  prompt,
  onPromptChange,
  onSelectSamplePrompt,
}) => {
  const samplePrompts = [
    "🏔️ 4-day mountain trip from Delhi in September for 2 people, budget ₹40,000, high safety.",
    "🏖️ Goa coastal getaway for 3 days with beachfront stay and water sports under ₹30,000.",
    "🌿 Peaceful Kerala backwaters and Munnar tea hills for family with relaxed pace.",
    "🏛️ Jaipur & Udaipur royal heritage tour with 4-star palatial stays under ₹35,000.",
  ];

  return (
    <div className="bg-gradient-to-br from-brand-50/80 via-white to-purple-50/50 rounded-3xl p-5 sm:p-6 border border-brand-200/90 shadow-sm relative overflow-hidden">
      
      {/* Background soft glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-300/15 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 space-y-3.5">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-sm">
              <MessageSquareText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Tell us about your trip
              </h3>
              <p className="text-xs text-brand-700 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-600 animate-pulse" />
                AI understands natural language — describe your trip naturally
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex px-2.5 py-1 text-[11px] font-bold bg-white text-slate-600 border border-slate-200 rounded-full shadow-xs">
            ✨ Auto-extracts constraints
          </span>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="“I want a 4-day mountain trip from Delhi in September for 2 people. My budget is ₹40,000 and I prefer safe places with pleasant weather…”"
            className="w-full text-sm sm:text-base font-medium text-slate-800 bg-white/90 focus:bg-white rounded-2xl p-4 sm:p-5 border-2 border-brand-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-500/15 transition-all shadow-inner resize-none outline-none leading-relaxed"
          />
        </div>

        {/* Helper microcopy */}
        <p className="text-xs text-slate-500 font-medium">
          You don't need to fill everything manually. SafeBound extracts budget, destinations, duration, and safety preferences automatically.
        </p>

        {/* Sample Prompt Pills */}
        <div className="pt-2 border-t border-slate-200/60">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
            <Wand2 className="w-3 h-3 text-brand-500" />
            Try these sample requests:
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSamplePrompt(p)}
                className="text-xs text-slate-600 hover:text-brand-700 bg-white hover:bg-brand-50 border border-slate-200/90 hover:border-brand-300 rounded-full px-3 py-1.5 font-medium transition text-left shadow-2xs"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
