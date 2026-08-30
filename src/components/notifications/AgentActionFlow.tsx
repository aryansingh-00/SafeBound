import React from 'react';
import { Zap, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

interface AgentActionFlowProps {
  eventText: string;
  impactText?: string;
  actionText: string;
  resolutionText: string;
  isActionRequired?: boolean;
}

export const AgentActionFlow: React.FC<AgentActionFlowProps> = ({
  eventText,
  impactText,
  actionText,
  resolutionText,
  isActionRequired = false,
}) => {
  return (
    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Autonomous Agent Action Pipeline</span>
        </span>

        <span
          className={`text-[10px] font-bold px-2 py-0.2 rounded-md ${
            isActionRequired
              ? 'bg-rose-100 text-rose-800'
              : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          {resolutionText}
        </span>
      </div>

      {/* 4-Step Visual Sequence */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
        
        {/* Step 1: Event Detected */}
        <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-0.5">
          <span className="text-[9px] font-bold uppercase text-slate-400 block">1. Live Signal</span>
          <span className="font-bold text-slate-900 block truncate">{eventText}</span>
        </div>

        {/* Step 2: Agent Action */}
        <div className="p-2.5 rounded-xl bg-brand-50/70 border border-brand-200 space-y-0.5">
          <span className="text-[9px] font-bold uppercase text-brand-600 block">2. SafeBound AI Action</span>
          <span className="font-bold text-brand-900 block truncate">{actionText}</span>
        </div>

        {/* Step 3: Result */}
        <div
          className={`p-2.5 rounded-xl border space-y-0.5 ${
            isActionRequired
              ? 'bg-rose-50 border-rose-200 text-rose-900'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}
        >
          <span className="text-[9px] font-bold uppercase block opacity-80">3. Resolution</span>
          <span className="font-bold block truncate">
            {isActionRequired ? 'Awaiting Your 1-Click Approval' : 'Zero Friction • Auto Handled'}
          </span>
        </div>

      </div>

    </div>
  );
};
