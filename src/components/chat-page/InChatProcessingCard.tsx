import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, Circle, Loader2, Sparkles } from 'lucide-react';

interface InChatProcessingCardProps {
  onDone?: () => void;
}

const STEPS = [
  'Understanding your preferences',
  'Finding suitable destinations',
  'Checking live transport',
  'Checking hotel availability',
  'Checking weather',
  'Checking activities',
  'Applying safety filters',
  'Optimizing total cost',
];

export const InChatProcessingCard: React.FC<InChatProcessingCardProps> = ({ onDone }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          if (onDone) {
            setTimeout(onDone, 300);
          }
          return prev;
        }
      });
    }, 400);

    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div className="w-full max-w-lg bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950 text-white rounded-3xl p-5 border border-slate-800 shadow-lg space-y-3.5 my-2">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-brand-600 flex items-center justify-center text-white">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            SafeBound is working...
          </h4>
        </div>

        <span className="text-[10px] font-mono text-emerald-400">
          Live Agent Swarm
        </span>
      </div>

      {/* Steps checklist */}
      <div className="space-y-2">
        {STEPS.map((step, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;
          const isPending = idx > activeStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 text-xs transition-opacity duration-200 ${
                isPending ? 'opacity-30' : 'opacity-100'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-3.5 h-3.5 text-brand-400 animate-spin shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}

              <span className={isCurrent ? 'text-brand-300 font-bold' : isDone ? 'text-slate-200' : 'text-slate-500'}>
                {step}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
};
