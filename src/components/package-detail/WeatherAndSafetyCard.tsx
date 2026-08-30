import React from 'react';
import { CloudSun, ShieldCheck, AlertCircle, CheckCircle2, Sun, CloudRain } from 'lucide-react';
import { TripResultPackage } from '../../data/tripResultsData';

interface WeatherAndSafetyCardProps {
  pkg: TripResultPackage;
}

export const WeatherAndSafetyCard: React.FC<WeatherAndSafetyCardProps> = ({ pkg }) => {
  const forecast = [
    { day: 'Day 1 (Sep 15)', temp: '24°C', weather: 'Pleasant & Mild', icon: CloudSun, color: 'text-amber-500' },
    { day: 'Day 2 (Sep 16)', temp: '23°C', weather: 'Partly Cloudy', icon: CloudSun, color: 'text-sky-500' },
    { day: 'Day 3 (Sep 17)', temp: '21°C', weather: 'Light Mountain Mist', icon: CloudRain, color: 'text-indigo-400' },
    { day: 'Day 4 (Sep 18)', temp: '24°C', weather: 'Clear & Sunny', icon: Sun, color: 'text-amber-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* 1. Live Weather Forecast Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-amber-500" />
            <span>🌦️ 4-Day Weather Outlook</span>
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
            Optimal Travel Window
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {forecast.map((fc, idx) => {
            const Icon = fc.icon;
            return (
              <div key={idx} className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 block">{fc.day}</span>
                <div className="flex items-center gap-1.5">
                  <Icon className={`w-4 h-4 ${fc.color}`} />
                  <span className="font-extrabold text-slate-900">{fc.temp}</span>
                </div>
                <span className="text-[11px] text-slate-500 block truncate">{fc.weather}</span>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 italic">
          Activity conditions may adapt slightly based on live sensor updates during your stay.
        </p>
      </div>

      {/* 2. Safety & Mountain Conditions */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>🛡️ Safety & Road Radar</span>
          </h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            Current: Normal
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <span className="text-slate-700 font-semibold">Weather Disruption Index</span>
            <span className="font-bold text-emerald-700">✓ Low Risk (0%)</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <span className="text-slate-700 font-semibold">Dehradun-Mussoorie Highway (NH-707)</span>
            <span className="font-bold text-emerald-700">✓ Open & Clear</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <span className="text-slate-700 font-semibold">Local Landslide Advisories</span>
            <span className="font-bold text-emerald-700">✓ None Active</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400">
          Evaluated via IMD weather radar & regional highway feeds. Should not be treated as a guarantee of absolute safety.
        </p>
      </div>

    </div>
  );
};
