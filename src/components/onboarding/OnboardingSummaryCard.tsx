import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Edit3, CheckCircle2, ShieldCheck, MapPin, Wallet, Calendar, Train, Building, CloudSun } from 'lucide-react';
import { TravelOnboardingPreferences } from '../../data/onboardingData';

interface OnboardingSummaryCardProps {
  preferences: TravelOnboardingPreferences;
  onEditStep: (stepNumber: number) => void;
}

export const OnboardingSummaryCard: React.FC<OnboardingSummaryCardProps> = ({
  preferences,
  onEditStep,
}) => {
  const navigate = useNavigate();

  const handleFinish = () => {
    // Store in localStorage
    try {
      localStorage.setItem('safebound_onboarding_complete', 'true');
      localStorage.setItem('safebound_user_preferences', JSON.stringify(preferences));
    } catch (e) {
      console.log(e);
    }
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-xs">
          <Sparkles className="w-7 h-7 animate-pulse" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Your SafeBound Profile is Ready! ✨
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
          SafeBound has learned how you like to travel. These weights are now active in the autonomous discovery engine.
        </p>
      </div>

      {/* Synthesis Summary Grid */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Learned Preference Weights
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
            100% Profile Completed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
          
          {/* 1. Origin */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-0.5">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] uppercase font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-brand-600" />
                <span>Starting Base</span>
              </span>
              <button type="button" onClick={() => onEditStep(1)} className="text-[10px] text-brand-600 font-bold hover:underline">Edit</button>
            </div>
            <p className="font-extrabold text-slate-900">{preferences.homeCity}</p>
          </div>

          {/* 2. Styles */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-0.5">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] uppercase font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Travel Styles</span>
              </span>
              <button type="button" onClick={() => onEditStep(2)} className="text-[10px] text-brand-600 font-bold hover:underline">Edit</button>
            </div>
            <p className="font-extrabold text-slate-900 truncate">
              {preferences.travelStyles.map((s) => s.split(' ')[1] || s).join(' • ')}
            </p>
          </div>

          {/* 3. Budget */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-0.5">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] uppercase font-bold flex items-center gap-1">
                <Wallet className="w-3 h-3 text-emerald-600" />
                <span>Typical Budget</span>
              </span>
              <button type="button" onClick={() => onEditStep(3)} className="text-[10px] text-brand-600 font-bold hover:underline">Edit</button>
            </div>
            <p className="font-extrabold text-slate-900">{preferences.budgetTier}</p>
          </div>

          {/* 4. Duration */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-0.5">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] uppercase font-bold flex items-center gap-1">
                <Calendar className="w-3 h-3 text-purple-600" />
                <span>Trip Duration</span>
              </span>
              <button type="button" onClick={() => onEditStep(3)} className="text-[10px] text-brand-600 font-bold hover:underline">Edit</button>
            </div>
            <p className="font-extrabold text-slate-900">{preferences.duration}</p>
          </div>

          {/* 5. Transport */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-0.5">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] uppercase font-bold flex items-center gap-1">
                <Train className="w-3 h-3 text-sky-600" />
                <span>Transport Modes</span>
              </span>
              <button type="button" onClick={() => onEditStep(4)} className="text-[10px] text-brand-600 font-bold hover:underline">Edit</button>
            </div>
            <p className="font-extrabold text-slate-900 truncate">
              {preferences.transportModes.map((t) => t.split(' ')[1] || t).join(', ')}
            </p>
          </div>

          {/* 6. Stay Tier */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-0.5">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] uppercase font-bold flex items-center gap-1">
                <Building className="w-3 h-3 text-brand-600" />
                <span>Stay Tier</span>
              </span>
              <button type="button" onClick={() => onEditStep(4)} className="text-[10px] text-brand-600 font-bold hover:underline">Edit</button>
            </div>
            <p className="font-extrabold text-slate-900">{preferences.stayTier}</p>
          </div>

        </div>

      </div>

      {/* Primary CTA */}
      <button
        type="button"
        onClick={handleFinish}
        className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-brand-600/30 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
      >
        <span>Enter SafeBound Command Center →</span>
        <ArrowRight className="w-4 h-4" />
      </button>

    </div>
  );
};
