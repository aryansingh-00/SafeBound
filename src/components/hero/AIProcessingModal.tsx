import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Loader2, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  ArrowRight,
  X,
  CreditCard,
  Building,
  Car,
  Compass,
  Plane
} from 'lucide-react';
import { GeneratedTripPlan, TripPlanRequest } from '../../types';
import { SAMPLE_GENERATED_TRIPS } from '../../data/sampleTrips';

interface AIProcessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: TripPlanRequest | null;
  onProceedToBooking: (plan: GeneratedTripPlan) => void;
}

const STAGES = [
  { id: 1, label: 'Understanding your requirements & preferences', detail: 'Parsing budget ₹40,000, 4 days, mountain trip from Delhi...' },
  { id: 2, label: 'Evaluating safe mountain destinations', detail: 'Checking Manali, Kasol & Jibhi for safety score 8.8+...' },
  { id: 3, label: 'Checking live Volvo buses & flights availability', detail: 'Locking roundtrip transit with guaranteed departure...' },
  { id: 4, label: 'Filtering certified 4-star boutique stays', detail: 'Selected The Himalayan Cedar Woods Chalet with mountain view...' },
  { id: 5, label: 'Verifying real-time weather & road conditions', detail: 'Optimal 14°C sunny conditions detected, zero landslide risk...' },
  { id: 6, label: 'Optimizing complete budget & package orchestration', detail: 'Final package optimized at ₹36,490 (Saving ₹3,510 under budget)...' },
];

export const AIProcessingModal: React.FC<AIProcessingModalProps> = ({
  isOpen,
  onClose,
  request,
  onProceedToBooking
}) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedTripPlan>(SAMPLE_GENERATED_TRIPS['manali-4d']);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStage(0);
      setIsComplete(false);
      return;
    }

    // Prepare generated plan customized with user request
    const dest = request?.destination && request.destination !== 'Anywhere (AI Picked)'
      ? request.destination
      : 'Manali, Himachal Pradesh';

    const userBudget = request?.budget || 40000;
    const estCost = Math.round(userBudget * 0.91);

    setGeneratedPlan({
      ...SAMPLE_GENERATED_TRIPS['manali-4d'],
      destination: dest.includes('Manali') ? 'Manali, Himachal Pradesh' : `${dest}, India`,
      title: `4-Day ${dest.split(',')[0]} Handcrafted AI Trip`,
      totalBudget: userBudget,
      estimatedCost: estCost,
      travellers: request?.travellers || 2,
    });

    // Step progression animation
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isOpen, request]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 w-full max-w-3xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-brand-50 to-indigo-50/50 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-sans">
                {isComplete ? '✨ Your Tailored AI Trip Package is Ready!' : 'SafeBound is analyzing your trip...'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {isComplete ? 'All components unified into one single checkout' : 'Orchestrating flights, stays, cabs & experiences'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {!isComplete ? (
            /* AI Processing Progress Stages */
            <div className="py-6 space-y-5">
              <div className="text-center max-w-md mx-auto mb-8">
                <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center mx-auto mb-4 relative shadow-inner">
                  <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-600"></span>
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Synthesizing Live Travel Data
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Querying live airline GDS, hotel APIs, and SafeBound safety heuristics...
                </p>
              </div>

              {/* Step Sequence */}
              <div className="space-y-3 max-w-lg mx-auto bg-slate-50/80 p-5 rounded-2xl border border-slate-200/70">
                {STAGES.map((stage, idx) => {
                  const isDone = idx < currentStage;
                  const isCurrent = idx === currentStage;
                  const isPending = idx > currentStage;

                  return (
                    <div
                      key={stage.id}
                      className={`flex items-start gap-3 transition-all duration-300 ${
                        isPending ? 'opacity-40' : 'opacity-100'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : isCurrent ? (
                          <Loader2 className="w-4 h-4 text-brand-600 animate-spin" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-300" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-semibold ${isCurrent ? 'text-brand-700 font-bold' : isDone ? 'text-slate-800' : 'text-slate-500'}`}>
                          {stage.label}
                        </p>
                        {isCurrent && (
                          <p className="text-[11px] text-slate-500 mt-0.5 animate-fadeIn">
                            {stage.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Completed Result Preview */
            <div className="space-y-6 animate-fadeIn">
              
              {/* Trip Summary Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-50 via-purple-50 to-indigo-50/40 border border-brand-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-600 text-white uppercase tracking-wider">
                      Recommended Plan
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Safety Score 8.9/10
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900">
                    {generatedPlan.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {generatedPlan.duration} • {generatedPlan.travellers} Travellers • {generatedPlan.weatherForecast}
                  </p>
                </div>

                <div className="text-right sm:text-right bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-sm shrink-0">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase">Total Trip Cost</span>
                  <div className="text-2xl font-extrabold text-brand-600">
                    ₹{generatedPlan.estimatedCost.toLocaleString('en-IN')}
                  </div>
                  <span className="block text-[10px] text-emerald-600 font-bold">
                    ✓ Within your ₹{generatedPlan.totalBudget.toLocaleString('en-IN')} budget
                  </span>
                </div>
              </div>

              {/* Unified Component Breakdown */}
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  One Unified Package Includes
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Transport */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-brand-300 transition shadow-xs flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <Plane className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Transport & Transit</span>
                        <span className="text-xs font-bold text-slate-700">₹{generatedPlan.breakdown.flights.cost.toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 truncate">{generatedPlan.breakdown.flights.title}</p>
                      <p className="text-[11px] text-slate-400">{generatedPlan.breakdown.flights.details}</p>
                    </div>
                  </div>

                  {/* Hotel */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-brand-300 transition shadow-xs flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                      <Building className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Stay & Hospitality</span>
                        <span className="text-xs font-bold text-slate-700">₹{generatedPlan.breakdown.hotel.cost.toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 truncate">{generatedPlan.breakdown.hotel.title}</p>
                      <p className="text-[11px] text-slate-400">{generatedPlan.breakdown.hotel.details}</p>
                    </div>
                  </div>

                  {/* Transfers */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-brand-300 transition shadow-xs flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Car className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Local Transfers</span>
                        <span className="text-xs font-bold text-slate-700">₹{generatedPlan.breakdown.transfers.cost.toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 truncate">{generatedPlan.breakdown.transfers.title}</p>
                      <p className="text-[11px] text-slate-400">{generatedPlan.breakdown.transfers.details}</p>
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-brand-300 transition shadow-xs flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Curated Experiences</span>
                        <span className="text-xs font-bold text-slate-700">₹{generatedPlan.breakdown.activities.cost.toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 truncate">{generatedPlan.breakdown.activities.title}</p>
                      <p className="text-[11px] text-slate-400">{generatedPlan.breakdown.activities.details}</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Day-wise Itinerary Snippet */}
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  AI Day-by-Day Itinerary Highlights
                </h5>
                <div className="space-y-2">
                  {generatedPlan.days.map((day) => (
                    <div key={day.day} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="font-bold text-brand-700 mr-2">Day {day.day}:</span>
                      <span className="font-bold text-slate-800">{day.title}</span>
                      <p className="text-slate-600 mt-1">{day.highlights.join(' • ')}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        {isComplete && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SafeBound 100% Price Lock & Free Cancellation Protection</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200/60 rounded-xl transition"
              >
                Modify Request
              </button>

              <button
                type="button"
                onClick={() => onProceedToBooking(generatedPlan)}
                className="w-full sm:w-auto px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-600/30 flex items-center justify-center gap-2"
              >
                <span>Book with Razorpay (₹{generatedPlan.estimatedCost.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
