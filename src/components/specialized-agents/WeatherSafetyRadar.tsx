import React from 'react';
import { CloudSun, ShieldCheck, Activity, MapPin } from 'lucide-react';

export const WeatherSafetyRadar: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
      
      {/* Weather Agent Card */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4 shadow-card">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-sky-400" />
            <h3 className="text-sm font-extrabold text-white">Weather Intelligence Sentinel</h3>
          </div>
          <span className="text-[10px] font-mono text-sky-300 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/30">
            IMD Doppler Live (150ms)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block">Temperature:</span>
            <span className="text-base font-extrabold text-white">22°C</span>
            <span className="text-[10px] text-slate-400 block">Clear Mountain Skies</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block">Precipitation Probability:</span>
            <span className="text-base font-extrabold text-emerald-400">12% (Low Risk)</span>
            <span className="text-[10px] text-emerald-400 block">✓ Ideal for outdoor treks</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-300">
          <strong className="text-sky-300 font-bold block mb-0.5">Activity Impact Assessment:</strong>
          All 2 scheduled activities (Gun Hill Cable Car & Landour Trail) have 100% weather suitability index.
        </div>
      </div>

      {/* Safety Agent Card */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4 shadow-card">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-extrabold text-white">Safety Corridor Sentinel</h3>
          </div>
          <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/30">
            Highway Patrol Sync (140ms)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block">Corridor Safety Score:</span>
            <span className="text-base font-extrabold text-emerald-400">94 / 100</span>
            <span className="text-[10px] text-slate-400 block">Dehradun ➔ Mussoorie</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block">Hill Chauffeur Verification:</span>
            <span className="text-base font-extrabold text-brand-300">100% Certified</span>
            <span className="text-[10px] text-slate-400 block">Mountain Safety Badge</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-300">
          <strong className="text-purple-300 font-bold block mb-0.5">Evidence-Based Disclosure:</strong>
          Corridor clear. Zero active road hazard advisories detected across NH-707A at time of checking.
        </div>
      </div>

    </div>
  );
};
