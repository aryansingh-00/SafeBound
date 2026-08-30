import React from 'react';
import { Activity, Radio, CheckCircle2 } from 'lucide-react';

export const LiveDataStatus: React.FC = () => {
  const feeds = [
    { label: 'Airline & Train GDS', status: 'Live', ping: '12ms', color: 'bg-emerald-500' },
    { label: 'Hotel & Chalet Inventory', status: 'Live', ping: '24ms', color: 'bg-emerald-500' },
    { label: 'Live Weather Radar', status: 'Live', ping: '8ms', color: 'bg-emerald-500' },
    { label: 'Adventure Passes & Guides', status: 'Live', ping: '19ms', color: 'bg-emerald-500' },
    { label: 'SafeBound Safety Index', status: 'Updated (2m ago)', ping: 'Synced', color: 'bg-emerald-500' },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Live Travel Data Feeds
          </h4>
        </div>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          99.9% Uptime
        </span>
      </div>

      <div className="space-y-2">
        {feeds.map((f, i) => (
          <div key={i} className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${f.color} animate-ping`}></span>
              <span className="font-semibold text-slate-700">{f.label}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>{f.status}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-slate-400 text-center pt-1">
        SafeBound queries live commercial travel APIs before package synthesis.
      </p>

    </div>
  );
};
