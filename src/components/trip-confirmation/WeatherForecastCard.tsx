import React from 'react';
import { CloudSun, Sun, CloudRain, Cloud, AlertCircle, Sparkles } from 'lucide-react';

export const WeatherForecastCard: React.FC = () => {
  const forecast = [
    { date: 'Sep 15 (Day 1)', temp: '24°C', condition: 'Pleasant & Mild', icon: CloudSun, alert: false },
    { date: 'Sep 16 (Day 2)', temp: '23°C', condition: 'Sunny intervals', icon: Sun, alert: false },
    { date: 'Sep 17 (Day 3)', temp: '21°C', condition: 'Light afternoon rain', icon: CloudRain, alert: true },
    { date: 'Sep 18 (Day 4)', temp: '22°C', condition: 'Partly cloudy', icon: Cloud, alert: false },
    { date: 'Sep 19 (Day 5)', temp: '24°C', condition: 'Clear sunshine', icon: Sun, alert: false },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <CloudSun className="w-5 h-5 text-amber-500" />
          <h4 className="text-sm font-extrabold text-slate-900">
            🌦️ 5-Day Trip Weather Radar
          </h4>
        </div>

        <span className="text-[10px] font-mono font-bold text-slate-400">
          Live Satellite Telemetry
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs text-center">
        {forecast.map((f, i) => {
          const Icon = f.icon;

          return (
            <div
              key={i}
              className={`p-3 rounded-2xl border transition ${
                f.alert
                  ? 'bg-amber-50/80 border-amber-300'
                  : 'bg-slate-50 border-slate-100'
              }`}
            >
              <span className="text-[10px] text-slate-400 font-bold block">{f.date}</span>
              <Icon className={`w-5 h-5 mx-auto my-1.5 ${f.alert ? 'text-amber-600' : 'text-amber-500'}`} />
              <span className="text-sm font-extrabold text-slate-900 block">{f.temp}</span>
              <p className="text-[10px] text-slate-500 font-medium truncate">{f.condition}</p>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Weather Advisory for Sep 17 (Day 3):</strong> Light afternoon shower predicted during cable car hours. SafeBound will automatically shift pass timing if needed.
        </p>
      </div>

    </div>
  );
};
