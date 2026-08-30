import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, Circle, Loader2, Sparkles } from 'lucide-react';

interface AIPlanningStatusProps {
  onComplete: () => void;
}

const AGENT_STAGES = [
  { id: 1, label: 'Understanding your requirements', agent: 'Requirement Parser' },
  { id: 2, label: 'Identifying suitable destinations', agent: 'Destination Agent' },
  { id: 3, label: 'Checking live transport & flight seats', agent: 'Travel Agent' },
  { id: 4, label: 'Checking hotel availability & reviews', agent: 'Hotel Agent' },
  { id: 5, label: 'Checking live weather & rain radar', agent: 'Weather Agent' },
  { id: 6, label: 'Checking verified activities & local passes', agent: 'Activity Agent' },
  { id: 7, label: 'Applying safety & terrain heuristics', agent: 'Safety Agent' },
  { id: 8, label: 'Optimizing your budget & multi-item bundle', agent: 'Optimization Engine' },
];

export const AIPlanningStatus: React.FC<AIPlanningStatusProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < AGENT_STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-200 shadow-xl space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center mx-auto mb-3 shadow-inner">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900">
          SafeBound is building your trip…
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Coordinating 7 autonomous AI agents across live transport, stay, and activity APIs.
        </p>
      </div>

      {/* 8-Stage Progress List */}
      <div className="max-w-lg mx-auto bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
        {AGENT_STAGES.map((stage, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          const isPending = idx > currentStep;

          return (
            <div
              key={stage.id}
              className={`flex items-center justify-between transition-all duration-200 ${
                isPending ? 'opacity-35' : 'opacity-100'
              }`}
            >
              <div className="flex items-center gap-3">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-brand-600 animate-spin shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                )}

                <span className={`text-xs font-semibold ${isCurrent ? 'text-brand-700 font-bold' : isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                  {stage.label}
                </span>
              </div>

              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline-block">
                [{stage.agent}]
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
};
