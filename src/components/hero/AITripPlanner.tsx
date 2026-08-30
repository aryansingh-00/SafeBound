import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  User, 
  Wallet, 
  Heart, 
  Sparkles, 
  ChevronDown, 
  MessageSquare, 
  SlidersHorizontal,
  ArrowRight,
  Check
} from 'lucide-react';
import { PreferenceChips } from './PreferenceChips';
import { TripPlanRequest } from '../../types';

interface AITripPlannerProps {
  onStartPlanning: (request: TripPlanRequest) => void;
  onOpenChat: () => void;
}

export const AITripPlanner: React.FC<AITripPlannerProps> = ({
  onStartPlanning,
  onOpenChat
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'prompt'>('quick');
  
  // State for quick parameters
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('Flexible dates');
  const [travellers, setTravellers] = useState(2);
  const [budget, setBudget] = useState(40000);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Mountains', 'Adventure']);
  
  // Natural language prompt state
  const [promptText, setPromptText] = useState(
    'I have ₹40,000 for 4 days from Delhi. I want a safe mountain trip with good weather and comfortable stays.'
  );

  // Dropdown visibility toggles
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartPlanning({
      destination: destination || 'Anywhere (AI Picked)',
      dates,
      travellers,
      budget,
      interests: selectedInterests,
      prompt: `Trip to ${destination || 'best destination'} for ${travellers} travellers with budget ₹${budget.toLocaleString('en-IN')}, interested in ${selectedInterests.join(', ')}.`
    });
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartPlanning({
      prompt: promptText,
      budget: 40000,
      travellers: 2,
      interests: ['Mountains', 'Adventure']
    });
  };

  const samplePrompts = [
    "🏔️ ₹40,000 mein Delhi se 4 din ki safe mountain trip chahiye",
    "🏖️ Goa 4-day beach vacation with water sports under ₹25k",
    "🌿 Kerala tranquil backwaters with luxury houseboat for 2",
    "🏛️ Jaipur 3-day royal heritage & food exploration"
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between mb-3 px-2 sm:px-4">
        <div className="inline-flex p-1 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab('quick')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quick'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Smart Trip Builder</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prompt')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'prompt'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Natural Language AI</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-brand-100 text-brand-800 rounded-md font-semibold">
              NEW
            </span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Live AI Agent Ready</span>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-hero-search p-3 sm:p-5 lg:p-6 transition-all duration-300">
        
        {activeTab === 'quick' ? (
          /* TAB 1: Structured Floating Search Bar (Exactly like reference image) */
          <form onSubmit={handleQuickSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-2 items-center">
              
              {/* Field 1: Where to? */}
              <div className="lg:col-span-3 relative p-3 rounded-2xl hover:bg-slate-50/90 transition border border-transparent hover:border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                    <MapPin className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Where to?
                    </label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g. Goa, Manali, Kerala"
                      className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-transparent border-none p-0 focus:outline-none focus:ring-0 truncate"
                    />
                  </div>
                </div>
              </div>

              {/* Divider for desktop */}
              <div className="hidden lg:block w-px h-10 bg-slate-200/80"></div>

              {/* Field 2: Dates */}
              <div className="lg:col-span-2 relative p-3 rounded-2xl hover:bg-slate-50/90 transition border border-transparent hover:border-slate-200">
                <div 
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setOpenDropdown(openDropdown === 'dates' ? null : 'dates')}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                    <Calendar className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Dates
                    </span>
                    <span className="block text-sm font-medium text-slate-700 truncate">
                      {dates}
                    </span>
                  </div>
                </div>

                {/* Dropdown menu for Dates */}
                {openDropdown === 'dates' && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30">
                    {['Flexible dates', 'Next Weekend (Fri-Sun)', 'Next 2 Weeks', 'Next Month', 'Diwali / Holiday Season'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setDates(d);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-xl flex items-center justify-between"
                      >
                        <span>{d}</span>
                        {dates === d && <Check className="w-3.5 h-3.5 text-brand-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider for desktop */}
              <div className="hidden lg:block w-px h-10 bg-slate-200/80"></div>

              {/* Field 3: Travellers */}
              <div className="lg:col-span-2 relative p-3 rounded-2xl hover:bg-slate-50/90 transition border border-transparent hover:border-slate-200">
                <div 
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setOpenDropdown(openDropdown === 'travellers' ? null : 'travellers')}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                    <User className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Travellers
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700 truncate">
                        {travellers} Traveller{travellers > 1 ? 's' : ''}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Dropdown menu for Travellers */}
                {openDropdown === 'travellers' && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30">
                    {[1, 2, 3, 4, 6, 8].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setTravellers(num);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-xl flex items-center justify-between"
                      >
                        <span>{num} {num === 1 ? 'Solo Traveller' : num === 2 ? '2 Travellers (Couple/Duo)' : `${num} Travellers (Group)`}</span>
                        {travellers === num && <Check className="w-3.5 h-3.5 text-brand-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider for desktop */}
              <div className="hidden lg:block w-px h-10 bg-slate-200/80"></div>

              {/* Field 4: Budget */}
              <div className="lg:col-span-2 relative p-3 rounded-2xl hover:bg-slate-50/90 transition border border-transparent hover:border-slate-200">
                <div 
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setOpenDropdown(openDropdown === 'budget' ? null : 'budget')}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                    <Wallet className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Budget
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700 truncate">
                        ₹{budget.toLocaleString('en-IN')}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Dropdown menu for Budget */}
                {openDropdown === 'budget' && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30">
                    {[15000, 25000, 40000, 60000, 80000, 120000].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          setBudget(b);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-xl flex items-center justify-between"
                      >
                        <span>₹{b.toLocaleString('en-IN')}</span>
                        {budget === b && <Check className="w-3.5 h-3.5 text-brand-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider for desktop */}
              <div className="hidden lg:block w-px h-10 bg-slate-200/80"></div>

              {/* Field 5: Interests */}
              <div className="lg:col-span-2 relative p-3 rounded-2xl hover:bg-slate-50/90 transition border border-transparent hover:border-slate-200">
                <div 
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setOpenDropdown(openDropdown === 'interests' ? null : 'interests')}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                    <Heart className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Interests
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700 truncate">
                        {selectedInterests.length > 0 ? selectedInterests.join(', ') : 'Select...'}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Dropdown menu for Interests */}
                {openDropdown === 'interests' && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-30">
                    <span className="block text-xs font-bold text-slate-400 uppercase mb-2">Select Interests</span>
                    <div className="space-y-1">
                      {['Mountains', 'Beach', 'Nature', 'Culture', 'Adventure', 'Family', 'Nightlife', 'Wellness'].map((interest) => {
                        const isChecked = selectedInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className="w-full text-left px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-brand-50 rounded-lg flex items-center justify-between"
                          >
                            <span>{interest}</span>
                            <input 
                              type="checkbox" 
                              checked={isChecked} 
                              readOnly 
                              className="rounded text-brand-600 focus:ring-brand-500 h-3.5 w-3.5 pointer-events-none"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div className="lg:col-span-12 xl:col-span-1 flex items-center justify-end mt-2 lg:mt-0">
                <button
                  type="submit"
                  className="w-full lg:w-auto px-7 py-3.5 bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-brand-600/30 hover:shadow-xl hover:shadow-brand-600/40 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Plan my trip</span>
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                </button>
              </div>

            </div>

            {/* Quick Preference Chips Below Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Quick Tags:</span>
                <PreferenceChips 
                  selectedInterests={selectedInterests} 
                  onToggleInterest={toggleInterest} 
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>✨ Live prices</span>
                <span>•</span>
                <span>Weather-aware</span>
                <span>•</span>
                <span>🛡️ Safety score 8.8+</span>
              </div>
            </div>
          </form>
        ) : (
          /* TAB 2: Natural Language Prompt Input */
          <form onSubmit={handlePromptSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-brand-600" />
                  <span>Tell SafeBound what you want in plain English or Hinglish</span>
                </label>
                <span className="text-xs text-brand-600 font-semibold">AI Agent is listening</span>
              </div>

              <div className="relative">
                <textarea
                  rows={3}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="e.g. ₹40,000 mein Delhi se 4 din ki safe mountain trip chahiye with river view hotel..."
                  className="w-full text-sm sm:text-base font-medium text-slate-800 bg-slate-50/70 hover:bg-slate-50 focus:bg-white rounded-2xl p-4 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition resize-none outline-none"
                />
              </div>
            </div>

            {/* Quick sample prompt chips */}
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Try asking:
              </span>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPromptText(p.replace(/^[^\w]+/, ''))}
                    className="text-xs text-slate-600 hover:text-brand-700 bg-slate-100/80 hover:bg-brand-50 border border-slate-200/60 hover:border-brand-200 rounded-full px-3 py-1 font-medium transition text-left"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <PreferenceChips 
                  selectedInterests={selectedInterests} 
                  onToggleInterest={toggleInterest} 
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl transition"
                >
                  Chat with SafeBound AI
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-600/30 flex items-center justify-center gap-2"
                >
                  <span>Build My Complete Trip</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
