import React from 'react';
import { DisruptionSeverity } from '../../backend/monitoring/monitoringTypes';
import { Activity, AlertTriangle, ShieldCheck, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface DisruptionImpactRadarProps {
  severity: DisruptionSeverity;
  headline: string;
  explanation: string;
}

export const DisruptionImpactRadar: React.FC<DisruptionImpactRadarProps> = ({
  severity,
  headline,
  explanation,
}) => {
  const levels: DisruptionSeverity[] = ['NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  const getSeverityColor = (sev: DisruptionSeverity) => {
    switch (sev) {
      case 'CRITICAL': return 'bg-rose-500 text-white shadow-rose-500/50';
      case 'HIGH': return 'bg-rose-600/80 text-white';
      case 'MEDIUM': return 'bg-amber-500 text-slate-950 font-extrabold shadow-amber-500/40';
      case 'LOW': return 'bg-sky-500 text-white';
      default: return 'bg-emerald-500 text-white';
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5 text-white shadow-card">
      
      {/* Header & Gauge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-400" />
          <h3 className="text-sm font-extrabold text-white">
            Impact Analysis Engine (Cascading Collision Gauge)
          </h3>
        </div>

        {/* 5-Level Severity Meter */}
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          {levels.map((lvl) => {
            const isActive = severity === lvl;
            return (
              <span
                key={lvl}
                className={`px-2.5 py-0.5 rounded-full border transition font-bold ${
                  isActive
                    ? `${getSeverityColor(lvl)} border-transparent shadow-md`
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                {lvl}
              </span>
            );
          })}
        </div>
      </div>

      {/* Disruption Headline Banner */}
      <div
        className={`p-4 rounded-2xl border text-xs space-y-1 ${
          severity === 'MEDIUM' || severity === 'HIGH' || severity === 'CRITICAL'
            ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
            : 'bg-slate-950 border-slate-800 text-slate-300'
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-sm text-white">
          {severity === 'NONE' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          )}
          <span>{headline}</span>
        </div>
        <p className="text-[11px] text-slate-300 font-sans">{explanation}</p>
      </div>

      {/* Cascading Collision Flow */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
          Downstream Component Cascade Analysis:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block">01. In-Transit:</span>
            <span className="font-extrabold text-white block truncate">Vande Bharat Express</span>
            <span className={`text-[10px] font-bold ${severity !== 'NONE' ? 'text-amber-400' : 'text-emerald-400'}`}>
              {severity !== 'NONE' ? '● +80m Delay (1:05 PM)' : '✓ On Time (11:45 AM)'}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block">02. Ground Transit:</span>
            <span className="font-extrabold text-white block truncate">Dehradun Chauffeur</span>
            <span className={`text-[10px] font-bold ${severity !== 'NONE' ? 'text-rose-400' : 'text-emerald-400'}`}>
              {severity !== 'NONE' ? '⚠️ Conflict (Pickup 12:15 PM)' : '✓ Synchronized'}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block">03. Destination Check-in:</span>
            <span className="font-extrabold text-white block truncate">The Cedar View Resort</span>
            <span className="text-[10px] font-bold text-emerald-400">
              ✓ Buffer Verified (02:00 PM)
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
