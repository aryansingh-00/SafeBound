import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface OnboardingProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onSkip: () => void;
}

export const OnboardingProgressBar: React.FC<OnboardingProgressBarProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onSkip,
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="space-y-3">
      
      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
        <div className="flex items-center gap-2">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={onBack}
              className="p-1 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <span className="text-slate-400">Step {currentStep} of {totalSteps}</span>
          )}
        </div>

        <button
          type="button"
          onClick={onSkip}
          className="text-slate-400 hover:text-brand-600 font-semibold text-xs transition"
        >
          Skip for now ➔
        </button>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-600 to-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

    </div>
  );
};
