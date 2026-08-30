import React, { useState } from 'react';
import { 
  Bot, 
  MapPin, 
  Plane, 
  Building, 
  Car, 
  Compass, 
  ShieldCheck, 
  FileText, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AgentShowcase: React.FC = () => {
  const [activeAgent, setActiveAgent] = useState<number>(0);

  const agents = [
    {
      id: 'destination',
      name: 'Destination Agent',
      icon: MapPin,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      role: 'Evaluates seasonal weather, safety metrics, local tourist density, and terrain accessibility.',
      status: 'Analyzing safety score 8.8+ & mountain road clearances',
    },
    {
      id: 'travel',
      name: 'Travel Agent',
      icon: Plane,
      color: 'from-sky-500 to-blue-600',
      bgColor: 'bg-sky-50',
      textColor: 'text-sky-600',
      role: 'Scans live airline GDS, dynamic train quotas, and AC Volvo sleeper bus schedules for punctuality.',
      status: 'Synced with IndiGo & Volvo luxury fleet schedule',
    },
    {
      id: 'hotel',
      name: 'Hotel Agent',
      icon: Building,
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-600',
      role: 'Matches high-rated boutique stays, verified guest reviews, hygiene standards, and balcony views.',
      status: 'Negotiated direct complimentary mountain breakfast',
    },
    {
      id: 'transfer',
      name: 'Transfer Agent',
      icon: Car,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      role: 'Dispatches certified local chauffeurs with GPS monitoring for intercity transfers and valley tours.',
      status: 'Assigned 4.9★ vetted chauffeur with 4x4 mountain SUV',
    },
    {
      id: 'activity',
      name: 'Activity Agent',
      icon: Compass,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      role: 'Secures licensed adventure passes, tandem instructors, priority entry, and scenic hikes.',
      status: 'Verified instructor tandem paragliding & spa slot locked',
    },
    {
      id: 'verification',
      name: 'Verification Agent',
      icon: ShieldCheck,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      role: 'Performs fraud prevention, Razorpay token validation, and SLA adherence across all vendors.',
      status: 'Razorpay single-vault payment escrow & insurance verified',
    },
    {
      id: 'itinerary',
      name: 'Itinerary Agent',
      icon: FileText,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      role: 'Stitches all bookings, boarding passes, hotel vouchers, and driver coordinates into one interactive dashboard.',
      status: 'Synthesized 1-Tap Offline Passbook & Live WhatsApp updates',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-50/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Bot className="w-3.5 h-3.5 text-brand-600" />
            <span>Autonomous Multi-Agent Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your trip, coordinated by AI
          </h2>
          <p className="mt-3 text-base text-slate-600 font-medium">
            Multiple specialized AI agents work together behind the scenes in milliseconds to build and book your seamless travel package.
          </p>
        </div>

        {/* Agent Cards Grid / Interactive Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 mb-10">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            const isSelected = activeAgent === index;

            return (
              <button
                key={agent.id}
                type="button"
                onClick={() => setActiveAgent(index)}
                className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-102 ring-2 ring-brand-500/50'
                    : 'bg-slate-50/80 hover:bg-white text-slate-800 border-slate-200/80 hover:border-brand-200'
                }`}
              >
                <div>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected ? 'bg-brand-600 text-white' : `${agent.bgColor} ${agent.textColor}`
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold leading-tight font-sans">
                    {agent.name}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/40">
                  <span className={`text-[10px] font-semibold flex items-center gap-1 ${
                    isSelected ? 'text-emerald-400' : 'text-slate-400'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Active
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Agent Spotlight */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-brand-950 text-white shadow-xl border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center shrink-0 shadow-glow">
              {React.createElement(agents[activeAgent].icon, { className: 'w-7 h-7 text-white' })}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{agents[activeAgent].name}</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Autonomous
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-1 max-w-xl font-medium">
                {agents[activeAgent].role}
              </p>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl w-full lg:w-auto shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Live Agent Telemetry
            </span>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{agents[activeAgent].status}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
