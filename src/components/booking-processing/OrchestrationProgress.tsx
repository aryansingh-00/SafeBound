import React from 'react';
import { Check, ShieldCheck, Cpu, FileCheck, CheckCircle2 } from 'lucide-react';

interface OrchestrationProgressProps {
  currentStage: number; // 1: Payment, 2: Booking, 3: Verification, 4: Itinerary, 5: Complete
}

export const OrchestrationProgress: React.FC<OrchestrationProgressProps> = ({ currentStage }) => {
  const stages = [
    { number: 1, label: 'Payment', sublabel: 'Escrow Locked', icon: ShieldCheck },
    { number: 2, label: 'Agent Booking', sublabel: 'Multi-Service Swarm', icon: Cpu },
    { number: 3, label: 'Verification', sublabel: 'PNR & Passes Check', icon: FileCheck },
    { number: 4, label: 'Itinerary', sublabel: 'Syncing Timeline', icon: FileCheck },
    { number: 5, label: 'Complete', sublabel: 'Trip Ready', icon: CheckCircle2 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6">
      <div className="flex items-center justify-between relative">
        
        {/* Connecting Line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800 -z-1"></div>

        {stages.map((stage) => {
          const isDone = stage.number < currentStage;
          const isCurrent = stage.number === currentStage;
          const Icon = stage.icon;

          return (
            <div key={stage.number} className="flex flex-col items-center gap-1.5 bg-slate-950 px-2 z-10">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center text-xs font-extrabold transition-all duration-300 shadow-md ${
                  isDone
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-500/30'
                    : isCurrent
                    ? 'bg-gradient-to-tr from-brand-600 to-indigo-600 text-white ring-4 ring-brand-500/40 scale-110 shadow-lg shadow-brand-500/30 animate-pulse'
                    : 'bg-slate-900 text-slate-500 border border-slate-800'
                }`}
              >
                {isDone ? <Check className="w-4 h-4 text-white" /> : <Icon className="w-4 h-4" />}
              </div>

              <div className="text-center">
                <span
                  className={`text-[11px] font-extrabold block whitespace-nowrap ${
                    isCurrent ? 'text-brand-400' : isDone ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {stage.label}
                </span>
                <span className="text-[9px] text-slate-400 hidden sm:block">
                  {stage.sublabel}
                </span>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};
