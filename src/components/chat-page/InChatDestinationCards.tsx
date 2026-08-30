import React, { useState } from 'react';
import { Sparkles, Check, ChevronDown, ChevronUp, ArrowRight, ShieldCheck, Sun, Wallet, Clock } from 'lucide-react';

interface DestinationItem {
  id: string;
  name: string;
  matchScore: number;
  price: number;
  vibe: string;
  highlights: string[];
}

interface InChatDestinationCardsProps {
  onSelectDestination: (name: string) => void;
  onCompare: () => void;
}

export const InChatDestinationCards: React.FC<InChatDestinationCardsProps> = ({
  onSelectDestination,
  onCompare,
}) => {
  const [showExplanation, setShowExplanation] = useState(true);

  const destinations: DestinationItem[] = [
    {
      id: 'mussoorie',
      name: 'Mussoorie',
      matchScore: 92,
      price: 31300,
      vibe: 'Misty pine trails & colonial calm',
      highlights: ['Budget: ✓', 'Weather: ✓', 'Safety: ✓ (9.3/10)', 'Travel: 5.5h (✓)'],
    },
    {
      id: 'dharamshala',
      name: 'Dharamshala',
      matchScore: 89,
      price: 34500,
      vibe: 'Monasteries, Triund & cedar mist',
      highlights: ['Budget: ✓', 'Weather: ✓', 'Safety: ✓ (9.1/10)', 'Travel: 8h'],
    },
    {
      id: 'nainital',
      name: 'Nainital',
      matchScore: 86,
      price: 28900,
      vibe: 'Lake yachting & hill viewpoints',
      highlights: ['Budget: ✓ (Best Value)', 'Weather: ✓', 'Safety: ✓ (9.0/10)', 'Travel: 6h'],
    },
    {
      id: 'manali',
      name: 'Manali',
      matchScore: 81,
      price: 36490,
      vibe: 'High snow peaks & Solang adventure',
      highlights: ['Budget: ✓', 'Weather: 14°C', 'Safety: ✓ (8.8/10)', 'Travel: 10h'],
    },
  ];

  return (
    <div className="w-full max-w-xl space-y-3.5 my-2">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>I found 4 strong destination matches</span>
        </h4>

        <button
          type="button"
          onClick={onCompare}
          className="text-xs font-bold text-brand-600 hover:underline"
        >
          Compare side-by-side →
        </button>
      </div>

      {/* Horizontal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className={`p-3.5 rounded-2xl border transition-all ${
              dest.id === 'mussoorie'
                ? 'bg-brand-50/80 border-brand-500 shadow-sm ring-1 ring-brand-500/40'
                : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900">{dest.name}</span>
                  {dest.id === 'mussoorie' && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-brand-600 text-white">
                      TOP MATCH
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{dest.vibe}</p>
              </div>

              <span className="text-xs font-extrabold text-brand-700 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                {dest.matchScore}%
              </span>
            </div>

            {/* Fit Badges */}
            <div className="grid grid-cols-2 gap-1 text-[10px] font-semibold text-slate-600 my-2.5 bg-white/80 p-2 rounded-xl">
              {dest.highlights.map((h, i) => (
                <span key={i} className="truncate">
                  {h}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-900">
                ₹{dest.price.toLocaleString('en-IN')}
                <span className="text-[10px] text-slate-400 font-normal"> / package</span>
              </span>

              <button
                type="button"
                onClick={() => onSelectDestination(dest.name)}
                className="px-3 py-1 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1 transition"
              >
                <span>Select</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Explanation Banner */}
      <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-xs space-y-1.5">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowExplanation(!showExplanation)}
        >
          <span className="font-bold text-brand-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Why Mussoorie looks like the strongest match?</span>
          </span>
          {showExplanation ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
        </div>

        {showExplanation && (
          <p className="text-slate-600 leading-relaxed pt-1">
            Mussoorie fits your ₹40,000 budget with ₹8,700 buffer, has optimal 18°C September suitability, smooth 5.5-hour connectivity from Delhi, high 9.3/10 safety score, and matches your preference for a peaceful mountain getaway.
          </p>
        )}
      </div>

    </div>
  );
};
