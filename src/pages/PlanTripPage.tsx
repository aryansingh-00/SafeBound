import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Bot, ShieldCheck, Zap, RotateCcw } from 'lucide-react';
import { TripRequestBox } from '../components/plan-trip/TripRequestBox';
import { LocationSelector } from '../components/plan-trip/LocationSelector';
import { DateSelector } from '../components/plan-trip/DateSelector';
import { TravellerSelector } from '../components/plan-trip/TravellerSelector';
import { BudgetSelector } from '../components/plan-trip/BudgetSelector';
import { TravelStyleSelector } from '../components/plan-trip/TravelStyleSelector';
import { SafetySelector } from '../components/plan-trip/SafetySelector';
import { WeatherSelector } from '../components/plan-trip/WeatherSelector';
import { TransportSelector } from '../components/plan-trip/TransportSelector';
import { AccommodationSelector } from '../components/plan-trip/AccommodationSelector';
import { AdvancedPreferences } from '../components/plan-trip/AdvancedPreferences';
import { RequirementSummary } from '../components/plan-trip/RequirementSummary';
import { LiveDataStatus } from '../components/plan-trip/LiveDataStatus';
import { DestinationCandidates, CandidateDestination, CANDIDATE_DESTINATIONS } from '../components/plan-trip/DestinationCandidates';
import { AIPlanningStatus } from '../components/plan-trip/AIPlanningStatus';
import { PackageResultView } from '../components/plan-trip/PackageResultView';
import { GeneratedTripPlan, TripPlanRequest } from '../types';

interface PlanTripPageProps {
  onStartPlanning: (req: TripPlanRequest) => void;
  onOpenChat: () => void;
  onProceedToCheckout?: (plan: GeneratedTripPlan) => void;
}

export const PlanTripPage: React.FC<PlanTripPageProps> = ({
  onStartPlanning,
  onOpenChat,
  onProceedToCheckout,
}) => {
  // Page UI mode: 'input' | 'planning' | 'result'
  const [pageState, setPageState] = useState<'input' | 'planning' | 'result'>('input');

  // Form State
  const [prompt, setPrompt] = useState(
    'I want a 4-day mountain trip from Delhi in September for 2 people. My budget is ₹40,000 and I prefer safe places with pleasant weather.'
  );
  const [origin, setOrigin] = useState('Delhi (DEL)');
  const [destination, setDestination] = useState('Mussoorie');
  const [isAnywhere, setIsAnywhere] = useState(false);
  const [departureDate, setDepartureDate] = useState('15 Sep 2026');
  const [returnDate, setReturnDate] = useState('19 Sep 2026');
  const [durationDays, setDurationDays] = useState(4);
  const [isFlexibleDates, setIsFlexibleDates] = useState(true);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infants, setInfants] = useState(0);
  const [budget, setBudget] = useState(40000);
  const [isHardLimit, setIsHardLimit] = useState(true);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Adventure', 'Nature']);
  const [safetyPriority, setSafetyPriority] = useState<'Normal' | 'High' | 'Very High'>('High');
  const [selectedWeather, setSelectedWeather] = useState<string[]>(['Pleasant']);
  const [preferredMode, setPreferredMode] = useState('Any');
  const [maxTravelTimeHours, setMaxTravelTimeHours] = useState(8);
  const [stayCategory, setStayCategory] = useState('4★ Premium');
  const [stayAmenities, setStayAmenities] = useState<string[]>(['Complimentary Breakfast', 'Free Cancellation']);
  
  // Advanced preferences
  const [foodPreference, setFoodPreference] = useState('Any Food');
  const [roomPreference, setRoomPreference] = useState('1 King Bed');
  const [activityIntensity, setActivityIntensity] = useState('Moderate (Balanced)');
  const [nightTravel, setNightTravel] = useState('Daylight Travel Only');

  // Selected shortlisted candidate destination
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateDestination>(CANDIDATE_DESTINATIONS[0]);

  // Intelligent Natural Language Parser
  const parsePrompt = (text: string) => {
    const lower = text.toLowerCase();

    // Parse Budget
    const budgetMatch = lower.match(/(?:₹|rs\.?|inr)?\s*(\d{1,3}(?:,\d{3})+|\d+)\s*(?:k|thousand|lakh|rupees|mein)?/i);
    if (budgetMatch) {
      let numStr = budgetMatch[1].replace(/,/g, '');
      let num = parseInt(numStr, 10);
      if (lower.includes('40k') || lower.includes('40,000') || (num === 40 && lower.includes('40k'))) num = 40000;
      if (lower.includes('30k') || lower.includes('30,000') || (num === 30 && lower.includes('30k'))) num = 30000;
      if (lower.includes('50k') || lower.includes('50,000')) num = 50000;
      if (num >= 5000 && num <= 300000) {
        setBudget(num);
      }
    }

    // Parse Origin
    if (lower.includes('delhi')) setOrigin('Delhi (DEL)');
    else if (lower.includes('mumbai') || lower.includes('bombay')) setOrigin('Mumbai (BOM)');
    else if (lower.includes('bengaluru') || lower.includes('bangalore')) setOrigin('Bengaluru (BLR)');
    else if (lower.includes('hyderabad')) setOrigin('Hyderabad (HYD)');
    else if (lower.includes('pune')) setOrigin('Pune (PNQ)');

    // Parse Destination
    if (lower.includes('mussoorie')) {
      setDestination('Mussoorie');
      setIsAnywhere(false);
      setSelectedCandidate(CANDIDATE_DESTINATIONS[0]);
    } else if (lower.includes('dharamshala') || lower.includes('mcleodganj')) {
      setDestination('Dharamshala');
      setIsAnywhere(false);
      setSelectedCandidate(CANDIDATE_DESTINATIONS[1]);
    } else if (lower.includes('nainital')) {
      setDestination('Nainital');
      setIsAnywhere(false);
      setSelectedCandidate(CANDIDATE_DESTINATIONS[2]);
    } else if (lower.includes('manali')) {
      setDestination('Manali');
      setIsAnywhere(false);
      setSelectedCandidate(CANDIDATE_DESTINATIONS[3]);
    } else if (lower.includes('anywhere')) {
      setIsAnywhere(true);
    }

    // Parse Duration
    const daysMatch = lower.match(/(\d+)\s*(?:day|days|din)/);
    if (daysMatch) {
      const days = parseInt(daysMatch[1], 10);
      if (days >= 2 && days <= 14) {
        setDurationDays(days);
      }
    }

    // Parse Travellers
    if (lower.includes('solo') || lower.includes('1 person') || lower.includes('alone')) {
      setAdults(1);
    } else if (lower.includes('2 people') || lower.includes('couple') || lower.includes('2 adults') || lower.includes('two')) {
      setAdults(2);
    } else if (lower.includes('family') || lower.includes('4 people')) {
      setAdults(2);
      setChildrenCount(2);
    }

    // Parse Style / Vibe
    const newStyles: string[] = [];
    if (lower.includes('mountain') || lower.includes('hills') || lower.includes('snow') || lower.includes('adventure')) {
      newStyles.push('Adventure', 'Nature');
    }
    if (lower.includes('beach') || lower.includes('sea') || lower.includes('coastal')) {
      newStyles.push('Beach');
    }
    if (lower.includes('culture') || lower.includes('heritage') || lower.includes('royal')) {
      newStyles.push('Culture');
    }
    if (lower.includes('romantic') || lower.includes('honeymoon')) {
      newStyles.push('Romantic');
    }
    if (newStyles.length > 0) {
      setSelectedStyles(Array.from(new Set(newStyles)));
    }

    // Parse Safety
    if (lower.includes('very safe') || lower.includes('maximum safety')) {
      setSafetyPriority('Very High');
    } else if (lower.includes('safe') || lower.includes('high safety')) {
      setSafetyPriority('High');
    }
  };

  const handlePromptChange = (val: string) => {
    setPrompt(val);
    parsePrompt(val);
  };

  const handleSelectSamplePrompt = (sampleText: string) => {
    const cleanText = sampleText.replace(/^[^\w]+/, '');
    setPrompt(cleanText);
    parsePrompt(cleanText);
  };

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const toggleWeather = (w: string) => {
    if (selectedWeather.includes(w)) {
      setSelectedWeather(selectedWeather.filter((x) => x !== w));
    } else {
      setSelectedWeather([...selectedWeather, w]);
    }
  };

  const toggleAmenity = (a: string) => {
    if (stayAmenities.includes(a)) {
      setStayAmenities(stayAmenities.filter((x) => x !== a));
    } else {
      setStayAmenities([...stayAmenities, a]);
    }
  };

  const handleStartPlanningSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPageState('planning');
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FBFBFE] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/90 border border-brand-200/80 shadow-sm text-brand-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
            <span>Powered by SafeBound AI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Plan your perfect trip with AI
          </h1>

          <p className="mt-2 text-base sm:text-lg text-slate-600 font-medium">
            Tell SafeBound what matters to you. We'll find, filter and optimize the best options using live travel data.
          </p>

          <p className="mt-2 text-xs text-slate-500 font-semibold flex items-center gap-2 flex-wrap">
            <span>✨ Live prices</span>
            <span>•</span>
            <span>Weather-aware</span>
            <span>•</span>
            <span>Safety-aware</span>
            <span>•</span>
            <span>Budget-controlled</span>
          </p>
        </div>

        {/* Dynamic Views: Planning State vs Result vs Input Workspace */}
        {pageState === 'planning' ? (
          <AIPlanningStatus onComplete={() => setPageState('result')} />
        ) : pageState === 'result' ? (
          <PackageResultView
            destination={selectedCandidate}
            userBudget={budget}
            durationDays={durationDays}
            travellers={adults + childrenCount}
            onProceedToCheckout={(plan) => {
              if (onProceedToCheckout) {
                onProceedToCheckout(plan);
              } else {
                onStartPlanning({
                  destination: selectedCandidate.name,
                  budget,
                  travellers: adults + childrenCount,
                });
              }
            }}
            onReset={() => setPageState('input')}
          />
        ) : (
          /* Main Two-Column AI Workspace Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Trip Requirements & Constraints (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <form onSubmit={handleStartPlanningSubmit} className="space-y-6">
                
                {/* 1. Natural Language Trip Request Box */}
                <TripRequestBox
                  prompt={prompt}
                  onPromptChange={handlePromptChange}
                  onSelectSamplePrompt={handleSelectSamplePrompt}
                />

                {/* 2. Starting From & Destination */}
                <LocationSelector
                  origin={origin}
                  destination={destination}
                  isAnywhere={isAnywhere}
                  onOriginChange={setOrigin}
                  onDestinationChange={(d) => {
                    setDestination(d);
                    const matched = CANDIDATE_DESTINATIONS.find(c => c.name.toLowerCase().includes(d.toLowerCase()));
                    if (matched) setSelectedCandidate(matched);
                  }}
                  onToggleAnywhere={setIsAnywhere}
                />

                {/* 3. Dates & Duration */}
                <DateSelector
                  departureDate={departureDate}
                  returnDate={returnDate}
                  durationDays={durationDays}
                  isFlexible={isFlexibleDates}
                  onDepartureChange={setDepartureDate}
                  onReturnChange={setReturnDate}
                  onDurationChange={setDurationDays}
                  onToggleFlexible={setIsFlexibleDates}
                />

                {/* 4. Travellers Counter */}
                <TravellerSelector
                  adults={adults}
                  childrenCount={childrenCount}
                  infants={infants}
                  onAdultsChange={setAdults}
                  onChildrenChange={setChildrenCount}
                  onInfantsChange={setInfants}
                />

                {/* 5. Budget & Hard Limit Toggle */}
                <BudgetSelector
                  budget={budget}
                  isHardLimit={isHardLimit}
                  onBudgetChange={setBudget}
                  onToggleHardLimit={setIsHardLimit}
                />

                {/* 6. Travel Style Chips */}
                <TravelStyleSelector
                  selectedStyles={selectedStyles}
                  onToggleStyle={toggleStyle}
                />

                {/* 7. Safety Priority */}
                <SafetySelector
                  safetyPriority={safetyPriority}
                  onSafetyChange={setSafetyPriority}
                />

                {/* 8. Weather Preference */}
                <WeatherSelector
                  selectedWeather={selectedWeather}
                  onToggleWeather={toggleWeather}
                />

                {/* 9. Transport Preference */}
                <TransportSelector
                  preferredMode={preferredMode}
                  maxTravelTimeHours={maxTravelTimeHours}
                  onModeChange={setPreferredMode}
                  onMaxTravelTimeChange={setMaxTravelTimeHours}
                />

                {/* 10. Accommodation Preference */}
                <AccommodationSelector
                  stayCategory={stayCategory}
                  stayAmenities={stayAmenities}
                  onStayCategoryChange={setStayCategory}
                  onToggleAmenity={toggleAmenity}
                />

                {/* 11. Expandable Advanced Preferences */}
                <AdvancedPreferences
                  foodPreference={foodPreference}
                  roomPreference={roomPreference}
                  activityIntensity={activityIntensity}
                  nightTravel={nightTravel}
                  onFoodChange={setFoodPreference}
                  onRoomChange={setRoomPreference}
                  onIntensityChange={setActivityIntensity}
                  onNightTravelChange={setNightTravel}
                />

                {/* Primary CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-xl shadow-brand-600/30 hover:shadow-2xl hover:shadow-brand-600/40 transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                    <span>✨ Find My Perfect Trip</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-center text-xs text-slate-500 font-medium mt-2">
                    SafeBound will compare live options and build the best package within your ₹{budget.toLocaleString('en-IN')} budget.
                  </p>
                </div>

              </form>

            </div>

            {/* RIGHT COLUMN: AI Assistant / Live Trip Summary Workspace (5 cols) */}
            <div className="lg:col-span-5 space-y-6 sticky top-28">
              
              {/* 1. SafeBound Understood Live Context Card */}
              <RequirementSummary
                origin={origin}
                destination={destination}
                isAnywhere={isAnywhere}
                departureDate={departureDate}
                durationDays={durationDays}
                adults={adults}
                childrenCount={childrenCount}
                budget={budget}
                isHardLimit={isHardLimit}
                selectedStyles={selectedStyles}
                safetyPriority={safetyPriority}
                selectedWeather={selectedWeather}
                preferredMode={preferredMode}
                stayCategory={stayCategory}
              />

              {/* 2. AI Shortlisted Destination Candidates */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card">
                <DestinationCandidates
                  selectedCandidateId={selectedCandidate.id}
                  onSelectCandidate={(c) => {
                    setSelectedCandidate(c);
                    setDestination(c.name);
                    setIsAnywhere(false);
                  }}
                />
              </div>

              {/* 3. Live Commercial Travel Data Telemetry Feeds */}
              <LiveDataStatus />

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
