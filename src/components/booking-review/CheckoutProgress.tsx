import React from 'react';
import { Check, User, FileText, Lock, Package } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: number; // 1 | 2 | 3 | 4
}

export const CheckoutProgress: React.FC<CheckoutProgressProps> = ({ currentStep = 2 }) => {
  const steps = [
    { number: 1, label: 'Package Selected', icon: Package },
    { number: 2, label: 'Traveller Details', icon: User },
    { number: 3, label: 'Review & Verify', icon: FileText },
    { number: 4, label: 'Secure Payment', icon: Lock },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 sm:py-6">
      <div className="flex items-center justify-between relative">
        
        {/* Connecting Line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-1"></div>

        {steps.map((step) => {
          const isDone = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.number} className="flex flex-col items-center gap-1.5 bg-[#FBFBFE] px-2 z-10">
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-extrabold transition-all duration-200 shadow-xs ${
                  isDone
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-500/20'
                    : isCurrent
                    ? 'bg-brand-600 text-white ring-4 ring-brand-500/20 scale-110 shadow-md shadow-brand-600/30'
                    : 'bg-white text-slate-400 border border-slate-200'
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>

              <span
                className={`text-[11px] font-bold whitespace-nowrap ${
                  isCurrent ? 'text-brand-700 font-extrabold' : isDone ? 'text-emerald-800' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
};
