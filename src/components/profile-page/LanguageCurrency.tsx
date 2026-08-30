import React, { useState } from 'react';
import { Globe, Check, Save } from 'lucide-react';

export const LanguageCurrency: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [saved, setSaved] = useState(false);

  const languages = [
    { id: 'en', name: 'English (India)', native: 'English' },
    { id: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { id: 'bn', name: 'Bengali', native: 'বাংলা' },
    { id: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { id: 'mr', name: 'Marathi', native: 'मराठी' },
  ];

  const currencies = [
    { id: 'INR', symbol: '₹', name: 'Indian Rupee (INR)' },
    { id: 'USD', symbol: '$', name: 'US Dollar (USD)' },
    { id: 'EUR', symbol: '€', name: 'Euro (EUR)' },
    { id: 'GBP', symbol: '£', name: 'British Pound (GBP)' },
    { id: 'AED', symbol: 'د.إ', name: 'UAE Dirham (AED)' },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6 animate-fadeIn">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Globe className="w-5 h-5 text-brand-600" />
            <span>Language & Regional Currency</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Choose your preferred language for natural language AI chat and payment display currency.
          </p>
        </div>

        {saved && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1.5 animate-fadeIn">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Saved!</span>
          </span>
        )}
      </div>

      {/* Language Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
          Display & AI Conversation Language
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {languages.map((lang) => {
            const isSelected = selectedLang === lang.id;

            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => setSelectedLang(lang.id)}
                className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-900 ring-2 ring-brand-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold">{lang.name}</h4>
                  <span className="text-[11px] text-slate-400 font-medium">{lang.native}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-brand-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Currency Selector */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
          Billing & Quote Currency
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currencies.map((curr) => {
            const isSelected = selectedCurrency === curr.id;

            return (
              <button
                key={curr.id}
                type="button"
                onClick={() => setSelectedCurrency(curr.id)}
                className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-900 ring-2 ring-brand-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold">{curr.name}</h4>
                  <span className="text-[11px] font-mono text-slate-400">{curr.symbol}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-brand-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Save Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md shadow-brand-600/30 transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>

    </div>
  );
};
