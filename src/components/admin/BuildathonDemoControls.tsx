import React, { useState } from 'react';
import { Sparkles, Play, Train, Building, Car, CloudSun, Zap, RotateCw, CheckCircle2 } from 'lucide-react';

interface BuildathonDemoControlsProps {
  onTriggerScenario: (scenario: string) => void;
}

export const BuildathonDemoControls: React.FC<BuildathonDemoControlsProps> = ({ onTriggerScenario }) => {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const handleRun = (id: string, name: string) => {
    setActiveScenario(name);
    onTriggerScenario(id);
    setTimeout(() => setActiveScenario(null), 3500);
  };

  const scenarios = [
    {
      id: 'train_delay',
      title: '🚆 1. Train Delayed (80m)',
      desc: 'Transport Agent detects IRCTC delay ➔ Transfer Agent reschedules chauffeur to 1:45 PM.',
      icon: Train,
      color: 'hover:border-sky-500 hover:bg-sky-950/40 text-sky-300',
    },
    {
      id: 'hotel_overbooked',
      title: '🏨 2. Hotel Overbooking',
      desc: 'Hotel Agent signals unavailable room ➔ Recovery Agent auto-negotiates 4★ Suite (-₹800).',
      icon: Building,
      color: 'hover:border-purple-500 hover:bg-purple-950/40 text-purple-300',
    },
    {
      id: 'cab_outage',
      title: '🚕 3. Cab Provider Outage',
      desc: 'Cab API latency degrades ➔ Transfer Agent fails over to secondary verified local syndicate.',
      icon: Car,
      color: 'hover:border-amber-500 hover:bg-amber-950/40 text-amber-300',
    },
    {
      id: 'weather_rain',
      title: '🌦️ 4. Rain on Day 3 Pass',
      desc: 'Weather Sentinel detects 65% rain ➔ Activity Agent shifts Gun Hill Ropeway to Day 2.',
      icon: CloudSun,
      color: 'hover:border-indigo-500 hover:bg-indigo-950/40 text-indigo-300',
    },
    {
      id: 'full_booking',
      title: '⚡ 5. Full 5-Agent Booking',
      desc: 'Simulate single escrow payment ➔ Orchestrator triggers 5 agents in parallel with zero lag.',
      icon: Zap,
      color: 'hover:border-emerald-500 hover:bg-emerald-950/40 text-emerald-300',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-6 border-2 border-amber-500/50 shadow-2xl space-y-4 text-white">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">
              ⚡ Razorpay Buildathon Live Demonstration Controls
            </h3>
            <p className="text-xs text-amber-200/80 font-medium">
              Click any scenario below to trigger real-time multi-agent reactions and live log audit entries.
            </p>
          </div>
        </div>

        {activeScenario && (
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500 text-slate-950 flex items-center gap-1.5 animate-pulse">
            <RotateCw className="w-3.5 h-3.5 animate-spin" />
            <span>Simulating: {activeScenario}</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => handleRun(sc.id, sc.title)}
              className={`p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 transition text-left space-y-1.5 flex flex-col justify-between group ${sc.color}`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-white">{sc.title}</h4>
                  <Play className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition" />
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  {sc.desc}
                </p>
              </div>

              <span className="text-[10px] font-bold text-amber-400 pt-1 group-hover:underline flex items-center gap-1">
                <span>Trigger Simulation</span>
                <span>➔</span>
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
