import React from 'react';
import { CloudSun, Sun, Snowflake, CloudRain, Wind, Sparkles } from 'lucide-react';

interface WeatherSelectorProps {
  selectedWeather: string[];
  onToggleWeather: (weather: string) => void;
}

export const WEATHER_OPTIONS = [
  { id: 'Pleasant', label: 'Pleasant', icon: CloudSun, emoji: '🌤️' },
  { id: 'Cold', label: 'Cold / Snow', icon: Snowflake, emoji: '❄️' },
  { id: 'Warm', label: 'Warm & Sunny', icon: Sun, emoji: '☀️' },
  { id: 'Dry', label: 'Dry / Crisp', icon: Wind, emoji: '🍂' },
  { id: 'Avoid Rain', label: 'Avoid heavy rain', icon: CloudRain, emoji: '☔' },
  { id: 'Any', label: 'No preference', icon: Sparkles, emoji: '🌈' },
];

export const WeatherSelector: React.FC<WeatherSelectorProps> = ({
  selectedWeather,
  onToggleWeather,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
      
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <CloudSun className="w-3.5 h-3.5 text-brand-600" />
          <span>Weather Preference</span>
        </label>
        <span className="text-[11px] text-slate-400 font-semibold">Live radar verified</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {WEATHER_OPTIONS.map((w) => {
          const isSelected = selectedWeather.includes(w.id);

          return (
            <button
              key={w.id}
              type="button"
              onClick={() => onToggleWeather(w.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <span>{w.emoji}</span>
              <span>{w.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
