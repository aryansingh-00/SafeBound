import React from 'react';
import { Mic, Trophy } from 'lucide-react';

const USPS = [
  {
    number: '01',
    headline: 'Dependency-aware trip management',
    body: 'SafeBound understands the dependencies between travel bookings and continuously manages the trip when reality changes.',
    color: 'border-brand-500/40 bg-brand-500/5',
    badge: 'text-brand-300',
  },
  {
    number: '02',
    headline: 'Impact-first recovery',
    body: 'It doesn\'t just detect a problem — it understands the problem\'s impact on the rest of the itinerary and helps recover the trip.',
    color: 'border-emerald-500/40 bg-emerald-500/5',
    badge: 'text-emerald-300',
  },
  {
    number: '03',
    headline: 'Bounded AI agency',
    body: 'The AI has bounded agency: it can reason and coordinate, but consequential actions are controlled by backend rules, authorization and user approval.',
    color: 'border-amber-500/40 bg-amber-500/5',
    badge: 'text-amber-300',
  },
];

export const PitchScript: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* One-liner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-brand-500/40 shadow-card text-white text-center space-y-3">
        <p className="text-[11px] font-mono text-brand-300 uppercase tracking-widest">Product One-Liner</p>
        <p className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
          SafeBound is an AI Travel Commerce Agent that plans, optimizes, books and continuously manages a trip — adapting when real-world conditions change.
        </p>
        <p className="text-base font-bold text-brand-300 tracking-wide">Plan. Pay. Book. Adapt.</p>
      </div>

      {/* USPs */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-card text-white space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-extrabold text-white">3 Core USPs</h3>
        </div>
        <div className="space-y-3">
          {USPS.map((usp) => (
            <div key={usp.number} className={`p-4 rounded-2xl border ${usp.color}`}>
              <div className="flex items-start gap-3">
                <span className={`font-mono text-2xl font-extrabold ${usp.badge} shrink-0`}>{usp.number}</span>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-white text-sm">{usp.headline}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{usp.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30-second pitch */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-card text-white space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Mic className="w-5 h-5 text-brand-400" />
          <h3 className="text-base font-extrabold text-white">30-Second Pitch Script</h3>
          <span className="ml-auto text-[10px] font-mono text-slate-500">Read aloud — ~30 seconds</span>
        </div>

        <div className="space-y-3 text-sm text-slate-200 leading-relaxed">
          <p>
            <span className="font-bold text-white">"Today, travel is fragmented.</span> We book a train separately, a hotel separately, a cab separately, and activities separately. But these bookings are actually connected. If the train is delayed, the cab and activities can be affected — and the traveller has to manually solve the problem.
          </p>
          <p>
            <span className="font-bold text-white">SafeBound is an AI Travel Commerce Agent</span> that understands these dependencies. It plans the trip based on budget, preferences, weather and safety signals, builds and optimizes the package, processes payment through Razorpay, coordinates the bookings, and then continues monitoring the trip.
          </p>
          <p>
            If something changes, SafeBound doesn't just notify the user — <span className="font-bold text-white">it understands the impact, finds a recovery option and updates the journey.</span>
          </p>
          <p className="text-base font-extrabold text-brand-300">
            "Existing platforms help you book a trip. SafeBound helps you manage the trip when reality changes."
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card text-white space-y-4">
        <h3 className="text-sm font-extrabold text-white pb-3 border-b border-slate-800">SafeBound vs. Traditional Travel Apps</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="py-2 pr-4 text-slate-400 font-semibold w-1/2">Traditional Travel App</th>
                <th className="py-2 text-brand-300 font-bold">SafeBound</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {[
                ['Search results → you decide', 'AI decides what\'s worth considering'],
                ['Book each service separately', 'One coordinated booking transaction'],
                ['Payment = done', 'Payment = start of SafeBound\'s responsibility'],
                ['Static PDF itinerary', 'Living versioned itinerary (v1 → v2 → vN)'],
                ['You manage disruptions', 'SafeBound detects, recovers and notifies'],
                ['No dependency awareness', 'Understands train → cab → activity links'],
              ].map(([before, after]) => (
                <tr key={before}>
                  <td className="py-2 pr-4 text-slate-400">{before}</td>
                  <td className="py-2 text-emerald-300 font-medium">{after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
