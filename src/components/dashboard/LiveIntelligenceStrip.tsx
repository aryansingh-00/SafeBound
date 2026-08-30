import React from 'react';
import { CloudSun, Tag, ShieldCheck, Train, Radio } from 'lucide-react';

export const LiveIntelligenceStrip: React.FC = () => {
  const intelItems = [
    {
      icon: CloudSun,
      label: 'Weather Radar',
      value: 'Optimal In Goa & Mussoorie',
      detail: '22°C–28°C sunny clear conditions',
      color: 'text-amber-500 bg-amber-50 border-amber-200',
    },
    {
      icon: Tag,
      label: 'Price Shifts',
      value: 'Kashmir Packages Down 12%',
      detail: 'September advance booking rates live',
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      icon: ShieldCheck,
      label: 'Safety Radar',
      value: 'Zero Major Advisories',
      detail: 'NH-707 and Kangra highways clear',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      icon: Train,
      label: 'Transit Capacity',
      value: 'High Vande Bharat Availability',
      detail: 'Delhi ➔ Dehradun coach seats open',
      color: 'text-sky-600 bg-sky-50 border-sky-200',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
            Live Travel Intelligence Feeds
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold text-slate-400">
          Updated 2 mins ago
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {intelItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${item.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {item.label}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900">{item.value}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
