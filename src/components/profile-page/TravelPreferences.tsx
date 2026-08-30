import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Sparkles, 
  Building, 
  Train, 
  ShieldCheck, 
  CloudSun, 
  Wallet, 
  Check, 
  Save 
} from 'lucide-react';
import { UserPreferences } from '../../data/profileData';

interface TravelPreferencesProps {
  preferences: UserPreferences;
  onSavePreferences: (updated: UserPreferences) => void;
}

export const TravelPreferences: React.FC<TravelPreferencesProps> = ({
  preferences,
  onSavePreferences,
}) => {
  const [prefs, setPrefs] = useState<UserPreferences>(preferences);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const travelStyles = [
    { label: '🏔️ Adventure', id: 'Adventure' },
    { label: '🌿 Nature', id: 'Nature' },
    { label: '🏖️ Beach', id: 'Beach' },
    { label: '🏛️ Culture', id: 'Culture' },
    { label: '🧘 Relaxing', id: 'Relaxing' },
    { label: '🎉 Entertainment', id: 'Entertainment' },
    { label: '👨‍👩‍👧 Family', id: 'Family' },
    { label: '💑 Romantic', id: 'Romantic' },
  ];

  const hotelCategories = ['Budget Stay', '3★ Hotel', '4★ Hotel', '5★ Hotel', 'Luxury Resort'];
  const hotelFeatures = [
    'Breakfast included',
    'Free cancellation',
    'High rating (4.5+)',
    'Valley/Mountain View',
    'Quiet location',
    'Central Mall Road',
  ];

  const transportOptions = ['Train (Vande Bharat)', 'Flights (Non-stop)', 'Dedicated Chauffeur Cab', 'AC Volvo Bus'];
  const weatherOptions = ['Pleasant', 'Cold / Mountain Air', 'Warm & Sunny', 'Dry', 'Avoid heavy rain'];
  const budgetOptions = ['Under ₹10K', '₹10K–₹20K', '₹20K–₹40K', '₹40K–₹75K', '₹75K+'];

  const toggleArrayItem = (list: string[], item: string) => {
    return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
  };

  const handleSave = () => {
    onSavePreferences(prefs);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-8 animate-fadeIn">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-brand-600" />
            <span>AI Travel Preferences</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            These constraints steer SafeBound's live discovery engine and natural language package builder.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1.5 animate-fadeIn">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Preferences Saved!</span>
          </span>
        )}
      </div>

      {/* 1. Travel Styles Multi-Select */}
      <div className="space-y-3">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
          Preferred Travel Styles
        </label>
        <div className="flex flex-wrap gap-2">
          {travelStyles.map((s) => {
            const isSelected = prefs.travelStyles.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setPrefs({ ...prefs, travelStyles: toggleArrayItem(prefs.travelStyles, s.id) })}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-xs ring-2 ring-brand-500/20'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{s.label}</span>
                {isSelected && <Check className="w-3 h-3" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Hotel Categories & Features */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Building className="w-4 h-4 text-brand-600" />
          <span>Accommodation Tier & Must-Haves</span>
        </label>
        
        <div className="flex flex-wrap gap-2">
          {hotelCategories.map((c) => {
            const isSelected = prefs.hotelCategories.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => setPrefs({ ...prefs, hotelCategories: toggleArrayItem(prefs.hotelCategories, c) })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {hotelFeatures.map((f) => {
            const isSelected = prefs.hotelFeatures.includes(f);
            return (
              <button
                key={f}
                type="button"
                onClick={() => setPrefs({ ...prefs, hotelFeatures: toggleArrayItem(prefs.hotelFeatures, f) })}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                ✓ {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Transport Preferences */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Train className="w-4 h-4 text-brand-600" />
          <span>Transport Modes & Travel Cap</span>
        </label>

        <div className="flex flex-wrap gap-2">
          {transportOptions.map((t) => {
            const isSelected = prefs.preferredTransport.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => setPrefs({ ...prefs, preferredTransport: toggleArrayItem(prefs.preferredTransport, t) })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 text-xs pt-1">
          <span className="text-slate-600 font-bold">Max Preferred Transit Time:</span>
          <span className="font-extrabold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-lg border border-brand-200">
            {prefs.maxTravelTimeHours} Hours
          </span>
        </div>
      </div>

      {/* 4. Safety Priority */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Safety Sensitivity Radar</span>
          </label>
          <span className="text-[10px] text-slate-400">Evaluates landslides, road & weather</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          {(['Normal', 'High', 'Very High'] as const).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setPrefs({ ...prefs, safetyPriority: lvl })}
              className={`p-3 rounded-2xl border text-center font-extrabold transition ${
                prefs.safetyPriority === lvl
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {lvl} Priority
            </button>
          ))}
        </div>
      </div>

      {/* 5. Typical Budget */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Wallet className="w-4 h-4 text-brand-600" />
          <span>Typical Per-Trip Budget Baseline</span>
        </label>

        <div className="flex flex-wrap gap-2 text-xs">
          {budgetOptions.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setPrefs({ ...prefs, typicalBudget: b })}
              className={`px-3.5 py-2 rounded-xl font-bold transition ${
                prefs.typicalBudget === b
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          This is only a default recommendation baseline. You can configure any budget dynamically during trip planning.
        </p>
      </div>

      {/* Save Button */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md shadow-brand-600/30 transition flex items-center gap-2 transform hover:-translate-y-0.5"
        >
          <Save className="w-4 h-4" />
          <span>Save All Preferences</span>
        </button>
      </div>

    </div>
  );
};
