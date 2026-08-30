import React from 'react';
import { MapPin, ShieldCheck, CloudSun, Train, Car } from 'lucide-react';

export const ActiveTripsSentinelMap: React.FC = () => {
  const activeClusters = [
    { region: 'Uttarakhand (Mussoorie, Rishikesh, Nainital)', count: 42, status: '1 Delay Synced • Weather Fair', color: 'border-brand-500/40 bg-brand-500/10' },
    { region: 'Himachal (Manali, Dharamshala, Shimla)', count: 34, status: 'Clear Sky • Highway Clear', color: 'border-emerald-500/40 bg-emerald-500/10' },
    { region: 'Goa & Konkan Coast', count: 28, status: '28°C Optimal • 1 Price Drop', color: 'border-sky-500/40 bg-sky-500/10' },
    { region: 'Kashmir (Srinagar, Gulmarg)', count: 16, status: 'Clear Mountain Radar', color: 'border-purple-500/40 bg-purple-500/10' },
    { region: 'Kerala Backwaters & Nilgiris', count: 8, status: 'Light Rain Monitored', color: 'border-amber-500/40 bg-amber-500/10' },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4 shadow-card text-white">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-extrabold text-white">
            🌍 Live Pan-India Trip Telemetry Sentinel
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/30">
          128 Active Journeys
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
        {activeClusters.map((cl, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-2xl border space-y-1.5 ${cl.color}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-white">{cl.region}</span>
              <span className="text-xs font-mono font-extrabold text-brand-300">
                {cl.count} Trips
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">
              {cl.status}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};
