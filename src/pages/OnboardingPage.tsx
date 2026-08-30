import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingProgressBar } from '../components/onboarding/OnboardingProgressBar';
import { StepLocation } from '../components/onboarding/StepLocation';
import { StepTravelStyle } from '../components/onboarding/StepTravelStyle';
import { StepBudgetDuration } from '../components/onboarding/StepBudgetDuration';
import { StepTransportStay } from '../components/onboarding/StepTransportStay';
import { StepSafetyWeather } from '../components/onboarding/StepSafetyWeather';
import { OnboardingSummaryCard } from '../components/onboarding/OnboardingSummaryCard';
import { DEFAULT_ONBOARDING_PREFERENCES, TravelOnboardingPreferences } from '../data/onboardingData';
import { Send } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<TravelOnboardingPreferences>(DEFAULT_ONBOARDING_PREFERENCES);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  // Preference Mutators
  const handleSelectCity = (city: string) => {
    setPreferences((prev) => ({ ...prev, homeCity: city }));
  };

  const handleToggleStyle = (styleLabel: string) => {
    setPreferences((prev) => {
      const exists = prev.travelStyles.includes(styleLabel);
      if (exists) {
        return { ...prev, travelStyles: prev.travelStyles.filter((s) => s !== styleLabel) };
      } else {
        return { ...prev, travelStyles: [...prev.travelStyles, styleLabel] };
      }
    });
  };

  const handleSelectBudget = (b: string) => {
    setPreferences((prev) => ({ ...prev, budgetTier: b }));
  };

  const handleSelectDuration = (d: string) => {
    setPreferences((prev) => ({ ...prev, duration: d }));
  };

  const handleToggleTransport = (tr: string) => {
    setPreferences((prev) => {
      const exists = prev.transportModes.includes(tr);
      if (exists) {
        return { ...prev, transportModes: prev.transportModes.filter((t) => t !== tr) };
      } else {
        return { ...prev, transportModes: [...prev.transportModes, tr] };
      }
    });
  };

  const handleSelectStay = (st: string) => {
    setPreferences((prev) => ({ ...prev, stayTier: st }));
  };

  const handleSelectSafety = (s: 'normal' | 'high' | 'very_high') => {
    setPreferences((prev) => ({ ...prev, safetyPriority: s }));
  };

  const handleToggleWeather = (w: string) => {
    setPreferences((prev) => {
      const exists = prev.weatherPreference.includes(w);
      if (exists) {
        return { ...prev, weatherPreference: prev.weatherPreference.filter((item) => item !== w) };
      } else {
        return { ...prev, weatherPreference: [...prev.weatherPreference, w] };
      }
    });
  };

  const handleToggleAvoidRain = (val: boolean) => {
    setPreferences((prev) => ({ ...prev, avoidHeavyRain: val }));
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] py-8 sm:py-12 px-4 sm:px-6">
      
      {/* Brand Header */}
      <div className="max-w-2xl mx-auto flex items-center justify-between pb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25">
            <Send className="w-4 h-4 transform -rotate-45 translate-x-0.5 -translate-y-0.5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">
            Safe<span className="text-brand-600">Bound</span>
          </span>
        </div>

        <span className="text-xs font-bold text-slate-400">
          Personalizing Your AI Travel Agent
        </span>
      </div>

      {/* Main Form Box */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-card space-y-6">
        
        {/* Step Progress Bar (Only during steps 1–5) */}
        {step <= 5 && (
          <OnboardingProgressBar
            currentStep={step}
            totalSteps={5}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        )}

        {/* Step 1: Location */}
        {step === 1 && (
          <StepLocation
            selectedCity={preferences.homeCity}
            onSelectCity={handleSelectCity}
            onNext={handleNext}
          />
        )}

        {/* Step 2: Travel Style */}
        {step === 2 && (
          <StepTravelStyle
            selectedStyles={preferences.travelStyles}
            onToggleStyle={handleToggleStyle}
            onNext={handleNext}
          />
        )}

        {/* Step 3: Budget & Duration */}
        {step === 3 && (
          <StepBudgetDuration
            selectedBudget={preferences.budgetTier}
            selectedDuration={preferences.duration}
            onSelectBudget={handleSelectBudget}
            onSelectDuration={handleSelectDuration}
            onNext={handleNext}
          />
        )}

        {/* Step 4: Transport & Stay */}
        {step === 4 && (
          <StepTransportStay
            selectedTransport={preferences.transportModes}
            selectedStay={preferences.stayTier}
            onToggleTransport={handleToggleTransport}
            onSelectStay={handleSelectStay}
            onNext={handleNext}
          />
        )}

        {/* Step 5: Safety & Weather */}
        {step === 5 && (
          <StepSafetyWeather
            safetyPriority={preferences.safetyPriority}
            weatherPreference={preferences.weatherPreference}
            avoidHeavyRain={preferences.avoidHeavyRain}
            onSelectSafety={handleSelectSafety}
            onToggleWeather={handleToggleWeather}
            onToggleAvoidRain={handleToggleAvoidRain}
            onNext={handleNext}
          />
        )}

        {/* Step 6: Summary & Synthesis */}
        {step === 6 && (
          <OnboardingSummaryCard
            preferences={preferences}
            onEditStep={(stepNum) => setStep(stepNum)}
          />
        )}

      </div>

    </div>
  );
};
