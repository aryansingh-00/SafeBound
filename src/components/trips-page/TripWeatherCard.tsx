import React from 'react';
import { CloudSun, Sun, CloudRain } from 'lucide-react';

interface TripWeatherCardProps {
  weather: {
    today: { temp: string; condition: string };
    tomorrow: { temp: string; condition: string };
    status: string;
  };
}

export const TripWeatherCard: React.FC<TripWeatherCardProps> = ({ weather }) => {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3.5">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <CloudSun className="w-4 h-4 text-amber-500" />
          <span>Trip Weather Forecast</span>
        </h4>

        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Optimal
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center gap-1">
            <CloudRain className="w-3 h-3 text-sky-500" />
            <span>Today</span>
          </span>
          <span className="text-base font-extrabold text-slate-900">{weather.today.temp}</span>
          <p className="text-[10px] text-slate-500 font-medium leading-tight">{weather.today.condition}</p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center gap-1">
            <Sun className="w-3 h-3 text-amber-500" />
            <span>Tomorrow</span>
          </span>
          <span className="text-base font-extrabold text-slate-900">{weather.tomorrow.temp}</span>
          <p className="text-[10px] text-slate-500 font-medium leading-tight">{weather.tomorrow.condition}</p>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 font-medium pt-1">
        Status: <strong className="text-slate-800">{weather.status}</strong>
      </p>

    </div>
  );
};
