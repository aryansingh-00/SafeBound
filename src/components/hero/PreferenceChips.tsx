import React from 'react';

interface PreferenceChipsProps {
  selectedInterests: string[];
  onToggleInterest: (interest: string) => void;
  className?: string;
}

export const PREFERENCE_CHIPS = [
  { id: 'Mountains', label: 'Mountains', emoji: '🏔️' },
  { id: 'Beach', label: 'Beach', emoji: '🏖️' },
  { id: 'Nature', label: 'Nature', emoji: '🌿' },
  { id: 'Culture', label: 'Culture', emoji: '🏛️' },
  { id: 'Adventure', label: 'Adventure', emoji: '🎉' },
  { id: 'Family', label: 'Family', emoji: '👨‍👩‍👧' },
];

export const PreferenceChips: React.FC<PreferenceChipsProps> = ({
  selectedInterests,
  onToggleInterest,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {PREFERENCE_CHIPS.map((chip) => {
        const isSelected = selectedInterests.includes(chip.id);
        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onToggleInterest(chip.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              isSelected
                ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/30 scale-105'
                : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 hover:border-brand-300'
            }`}
          >
            <span className="text-sm">{chip.emoji}</span>
            <span>{chip.label}</span>
          </button>
        );
      })}
    </div>
  );
};
