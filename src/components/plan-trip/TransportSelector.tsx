import React from 'react';
import { Plane, Train, Bus, Car, Sparkles, Clock } from 'lucide-react';

interface TransportSelectorProps {
  preferredMode: string;
  maxTravelTimeHours: number;
  onModeChange: (mode: string) => void;
  onMaxTravelTimeChange: (hours: number) => void;
}

export const TransportSelector: React.FC<TransportSelectorProps> = ({
  preferredMode,
  maxTravelTimeHours,
  onModeChange,
  onMaxTravelTimeChange,
}) => {
  const modes = [
    { id: 'Any', label: 'Any (Best Fit)', icon: Sparkles },
    { id: 'Flight', label: 'Flight', icon: Plane },
    { id: 'Train', label: 'Train', icon: Train },
    { id: 'Bus', label: 'AC Bus', icon: Bus },
    { id: 'Car', label: 'Private Car', icon: Car },
  ];

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3.5">
      
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Plane className="w-3.5 h-3.5 text-brand-600" />
          <span>Preferred Travel Mode</span>
        </label>
        
        <span className="text-[11px] font-bold text-brand-600">
          Max: {maxTravelTimeHours} Hours
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {modes.map((m) => {
          const Icon = m.icon;
          const isSelected = preferredMode === m.id;

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onModeChange(m.id)}
              className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-1.5 ${
                isSelected
                  ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Max Travel Time */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
        <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Maximum travel time filter:</span>
        </span>

        <div className="flex items-center gap-1.5">
          {[4, 6, 8, 12, 24].map((hrs) => (
            <button
              key={hrs}
              type="button"
              onClick={() => onMaxTravelTimeChange(hrs)}
              className={`px-2 py-0.5 text-xs font-semibold rounded-lg border ${
                maxTravelTimeHours === hrs
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {hrs}h
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
