import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface TravelStyleSelectorProps {
  selectedStyles: string[];
  onToggleStyle: (style: string) => void;
}

export const TRAVEL_STYLES = [
  { id: 'Adventure', label: 'Adventure', emoji: '🏔️', desc: 'Hikes, rafting & snow sports' },
  { id: 'Nature', label: 'Nature', emoji: '🌿', desc: 'Pine forests & waterfalls' },
  { id: 'Beach', label: 'Beach', emoji: '🏖️', desc: 'Coastal breeze & sunsets' },
  { id: 'Culture', label: 'Culture', emoji: '🏛️', desc: 'Palaces, forts & heritage' },
  { id: 'Romantic', label: 'Romantic', emoji: '💑', desc: 'Cozy chalets & dinners' },
  { id: 'Family', label: 'Family', emoji: '👨‍👩‍👧', desc: 'Comfort & kid-friendly stays' },
  { id: 'Entertainment', label: 'Entertainment', emoji: '🎉', desc: 'Cafes, markets & music' },
  { id: 'Relaxing', label: 'Relaxing', emoji: '🧘', desc: 'Ayurveda, spas & calm' },
];

export const TravelStyleSelector: React.FC<TravelStyleSelectorProps> = ({
  selectedStyles,
  onToggleStyle,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
      
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-brand-600" />
          <span>Travel Style & Vibe</span>
        </label>
        <span className="text-[11px] text-slate-400 font-semibold">Select all that apply</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {TRAVEL_STYLES.map((style) => {
          const isSelected = selectedStyles.includes(style.id);

          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onToggleStyle(style.id)}
              className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-brand-50 border-brand-500 shadow-sm ring-1 ring-brand-500/50'
                  : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xl">{style.emoji}</span>
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  className="rounded text-brand-600 focus:ring-brand-500 h-3.5 w-3.5 pointer-events-none"
                />
              </div>

              <div>
                <span className={`text-xs font-bold block ${isSelected ? 'text-brand-900' : 'text-slate-800'}`}>
                  {style.label}
                </span>
                <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                  {style.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
