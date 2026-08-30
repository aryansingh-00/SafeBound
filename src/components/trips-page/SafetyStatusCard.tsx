import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

interface SafetyStatusCardProps {
  safety: {
    status: 'Normal' | 'Advisory' | 'Alert';
    text: string;
  };
}

export const SafetyStatusCard: React.FC<SafetyStatusCardProps> = ({ safety }) => {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Destination Safety Radar</span>
        </h4>

        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          {safety.status}
        </span>
      </div>

      <p className="text-xs text-slate-600 font-medium leading-relaxed">
        {safety.text}
      </p>

      <div className="space-y-1.5 pt-1 text-xs">
        <div className="flex items-center justify-between text-slate-600">
          <span>Himalayan Route Weather</span>
          <span className="font-bold text-emerald-700">✓ Normal (No Fog)</span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span>Highway Landslide Radar</span>
          <span className="font-bold text-emerald-700">✓ All Clear (NH-707)</span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span>Emergency 24/7 Helpline</span>
          <span className="font-bold text-brand-700">Active (1800-SAFE-BD)</span>
        </div>
      </div>

    </div>
  );
};
