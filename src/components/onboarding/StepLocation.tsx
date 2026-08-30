import React, { useState } from 'react';
import { MapPin, Navigation, ArrowRight, Search, Check } from 'lucide-react';
import { POPULAR_CITIES } from '../../data/onboardingData';

interface StepLocationProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onNext: () => void;
}

export const StepLocation: React.FC<StepLocationProps> = ({
  selectedCity,
  onSelectCity,
  onNext,
}) => {
  const [customCity, setCustomCity] = useState('');

  const handleUseCurrentLocation = () => {
    onSelectCity('Delhi (NCR)');
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customCity.trim()) {
      onSelectCity(customCity.trim());
      onNext();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="space-y-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600">
          Step 1 of 5 • Origin & Transit Base
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Where do you usually travel from? 📍
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          We use this to calculate direct Vande Bharat routes, non-stop flights and drive times.
        </p>
      </div>

      {/* GPS Current Location Button */}
      <button
        type="button"
        onClick={handleUseCurrentLocation}
        className="w-full p-3.5 rounded-2xl bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-800 text-xs font-bold transition flex items-center justify-center gap-2 shadow-2xs"
      >
        <Navigation className="w-4 h-4 text-brand-600" />
        <span>Auto-Detect Current Location ({selectedCity || 'Delhi'})</span>
      </button>

      {/* Search Input */}
      <form onSubmit={handleCustomSubmit} className="relative flex items-center">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
        <input
          type="text"
          value={customCity}
          onChange={(e) => setCustomCity(e.target.value)}
          placeholder="Or type another starting city..."
          className="w-full pl-10 pr-24 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition"
        />
        {customCity && (
          <button
            type="submit"
            className="absolute right-2 px-3 py-1.5 bg-brand-600 text-white font-extrabold text-[11px] rounded-xl"
          >
            Select
          </button>
        )}
      </form>

      {/* Popular City Grid */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Popular Starting Cities
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {POPULAR_CITIES.map((city) => {
            const isSelected = selectedCity.toLowerCase().includes(city.toLowerCase().split(' ')[0]);

            return (
              <button
                key={city}
                type="button"
                onClick={() => onSelectCity(city)}
                className={`p-3 rounded-2xl text-xs font-bold transition text-left flex items-center justify-between border ${
                  isSelected
                    ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/20 ring-2 ring-brand-500/20'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{city}</span>
                </div>

                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue */}
      <div className="pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2"
        >
          <span>Continue with {selectedCity}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
