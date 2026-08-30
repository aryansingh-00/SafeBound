import React from 'react';
import { Sparkles, ShieldCheck, Sun, Wallet, Clock, ArrowRight, Check } from 'lucide-react';

export interface CandidateDestination {
  id: string;
  name: string;
  state: string;
  matchScore: number;
  estimatedTotal: number;
  weather: string;
  safetyScore: number;
  travelTime: string;
  vibe: string;
  imageUrl: string;
  budgetFit: 'Excellent' | 'Great' | 'Good';
}

export const CANDIDATE_DESTINATIONS: CandidateDestination[] = [
  {
    id: 'mussoorie',
    name: 'Mussoorie',
    state: 'Uttarakhand',
    matchScore: 92,
    estimatedTotal: 31300,
    weather: '18°C Pleasant & Crisp',
    safetyScore: 9.3,
    travelTime: '5.5 hrs from Delhi',
    vibe: 'Misty Queen of Hills & Waterfalls',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
    budgetFit: 'Excellent',
  },
  {
    id: 'dharamshala',
    name: 'Dharamshala & McLeodganj',
    state: 'Himachal Pradesh',
    matchScore: 89,
    estimatedTotal: 34500,
    weather: '16°C Fresh Pine Air',
    safetyScore: 9.1,
    travelTime: '8 hrs Volvo transit',
    vibe: 'Monasteries, Triund trek & Cafes',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop',
    budgetFit: 'Great',
  },
  {
    id: 'nainital',
    name: 'Nainital',
    state: 'Uttarakhand',
    matchScore: 86,
    estimatedTotal: 28900,
    weather: '17°C Lake Breeze',
    safetyScore: 9.0,
    travelTime: '6 hrs from Delhi',
    vibe: 'Naini Lake Yachting & Viewpoints',
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=600&auto=format&fit=crop',
    budgetFit: 'Excellent',
  },
  {
    id: 'manali',
    name: 'Manali & Solang',
    state: 'Himachal Pradesh',
    matchScore: 81,
    estimatedTotal: 36490,
    weather: '14°C Snowy Peak Vista',
    safetyScore: 8.8,
    travelTime: '10 hrs Luxury Sleeper',
    vibe: 'High Altitude Snow Adventure',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop',
    budgetFit: 'Good',
  },
];

interface DestinationCandidatesProps {
  selectedCandidateId: string;
  onSelectCandidate: (candidate: CandidateDestination) => void;
}

export const DestinationCandidates: React.FC<DestinationCandidatesProps> = ({
  selectedCandidateId,
  onSelectCandidate,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>AI Shortlisted Candidate Destinations</span>
          </h4>
          <p className="text-xs text-slate-500 font-medium">
            Ranked by budget fit, safety telemetry, and weather heuristics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {CANDIDATE_DESTINATIONS.map((c) => {
          const isSelected = selectedCandidateId === c.id;

          return (
            <div
              key={c.id}
              onClick={() => onSelectCandidate(c)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-brand-50/90 border-brand-600 shadow-md ring-2 ring-brand-500/40'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="text-sm font-bold text-slate-900">{c.name}</h5>
                      <span className="text-[10px] text-slate-400 font-medium">{c.state}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">{c.vibe}</p>
                  </div>

                  <div className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-brand-600 text-white shadow-xs">
                    {c.matchScore}% Match
                  </div>
                </div>

                {/* 4 Fit Badges */}
                <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold my-3">
                  <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 flex items-center gap-1">
                    <Wallet className="w-3 h-3 text-emerald-600" />
                    <span>Budget: {c.budgetFit}</span>
                  </span>
                  <span className="p-1.5 rounded-lg bg-sky-50 text-sky-800 flex items-center gap-1 truncate">
                    <Sun className="w-3 h-3 text-sky-600" />
                    <span className="truncate">{c.weather.split(' ')[0]}</span>
                  </span>
                  <span className="p-1.5 rounded-lg bg-purple-50 text-purple-800 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-purple-600" />
                    <span>Safety: {c.safetyScore}/10</span>
                  </span>
                  <span className="p-1.5 rounded-lg bg-amber-50 text-amber-800 flex items-center gap-1 truncate">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span className="truncate">{c.travelTime.split(' ')[0]} {c.travelTime.split(' ')[1]}</span>
                  </span>
                </div>
              </div>

              {/* Price & Select */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Est. Package Total</span>
                  <span className="text-sm font-extrabold text-brand-700">₹{c.estimatedTotal.toLocaleString('en-IN')}</span>
                </div>

                <button
                  type="button"
                  className={`px-3 py-1 text-xs font-bold rounded-xl transition flex items-center gap-1 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Selected</span>
                    </>
                  ) : (
                    <span>Choose</span>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
