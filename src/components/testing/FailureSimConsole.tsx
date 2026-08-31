import React, { useState } from 'react';
import { FailureSimulator } from '../../backend/testing/failureSimulator';
import { SimulationEvent, SimulationScenario } from '../../backend/testing/testingTypes';
import { Play, Zap, AlertTriangle, RotateCw } from 'lucide-react';

const SCENARIOS: Array<{ scenario: SimulationScenario; label: string; emoji: string; color: string }> = [
  { scenario: 'TRAIN_DELAY',        label: 'Train Delay +80m',     emoji: '🚆', color: 'border-amber-500/40 text-amber-400' },
  { scenario: 'TRAIN_CANCELLATION', label: 'Train Cancellation',   emoji: '❌', color: 'border-rose-500/40 text-rose-400' },
  { scenario: 'HOTEL_SOLD_OUT',     label: 'Hotel Sold Out',       emoji: '🏨', color: 'border-rose-500/40 text-rose-400' },
  { scenario: 'CAB_UNAVAILABLE',    label: 'Cab Unavailable',      emoji: '🚕', color: 'border-amber-500/40 text-amber-400' },
  { scenario: 'ACTIVITY_CANCELLED', label: 'Activity Cancelled',   emoji: '🎟️', color: 'border-purple-500/40 text-purple-400' },
  { scenario: 'WEATHER_ALERT',      label: 'Weather Alert',        emoji: '⛈️', color: 'border-sky-500/40 text-sky-400' },
  { scenario: 'PROVIDER_TIMEOUT',   label: 'Provider Timeout',     emoji: '⏱️', color: 'border-slate-500/40 text-slate-400' },
  { scenario: 'PRICE_CHANGE',       label: 'Price Change +₹800',   emoji: '💸', color: 'border-emerald-500/40 text-emerald-400' },
  { scenario: 'PAYMENT_FAILURE',    label: 'Payment Failure',      emoji: '💳', color: 'border-rose-500/40 text-rose-400' },
];

const statusColor = (s: SimulationEvent['status']) => {
  if (s === 'RESOLVED') return 'text-emerald-400';
  if (s === 'AWAITING_APPROVAL') return 'text-amber-400';
  if (s === 'FAILED') return 'text-rose-400';
  if (s === 'DETECTED') return 'text-sky-400';
  return 'text-slate-400';
};

interface FailureSimConsoleProps {
  onSimulate?: (evt: SimulationEvent) => void;
}

export const FailureSimConsole: React.FC<FailureSimConsoleProps> = ({ onSimulate }) => {
  const [log, setLog] = useState<SimulationEvent[]>([]);
  const [demoRunning, setDemoRunning] = useState(false);
  const [demoStep, setDemoStep] = useState(-1);

  const trigger = (scenario: SimulationScenario) => {
    const evt = FailureSimulator.trigger(scenario);
    setLog((prev) => [evt, ...prev]);
    onSimulate?.(evt);
  };

  const runFullDemo = async () => {
    if (demoRunning) return;
    setDemoRunning(true);
    setDemoStep(0);
    await FailureSimulator.runFullDemo((evt, idx) => {
      setLog((prev) => [evt, ...prev]);
      setDemoStep(idx + 1);
      onSimulate?.(evt);
    });
    setDemoRunning(false);
    setDemoStep(-1);
  };

  const demoSteps = ['Train Delay Triggered', 'Cab Conflict Detected', 'Hotel Recovery Started'];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card text-white space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-extrabold text-white">Failure Simulation Console</h3>
        </div>
        <button
          onClick={runFullDemo}
          disabled={demoRunning}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg shadow-amber-600/30 transition"
        >
          {demoRunning
            ? <RotateCw className="w-3.5 h-3.5 animate-spin" />
            : <Zap className="w-3.5 h-3.5 fill-white" />}
          {demoRunning ? `Running... Step ${demoStep}/3` : '⚡ Run Full Demo'}
        </button>
      </div>

      {/* Demo step progress */}
      {demoRunning && (
        <div className="flex gap-1.5">
          {demoSteps.map((step, i) => (
            <div
              key={step}
              className={`flex-1 p-2 rounded-xl border text-[10px] font-mono text-center transition ${
                demoStep > i
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : demoStep === i
                  ? 'bg-amber-950/30 border-amber-500/30 text-amber-400 animate-pulse'
                  : 'bg-slate-950 border-slate-800 text-slate-600'
              }`}
            >
              {demoStep > i ? '✓ ' : ''}{step}
            </div>
          ))}
        </div>
      )}

      {/* Simulation buttons */}
      <div className="grid grid-cols-3 gap-2.5">
        {SCENARIOS.map(({ scenario, label, emoji, color }) => (
          <button
            key={scenario}
            onClick={() => trigger(scenario)}
            className={`p-3 rounded-2xl bg-slate-950 border ${color.split(' ')[0]} hover:brightness-110 text-left space-y-1 transition`}
          >
            <span className="text-lg">{emoji}</span>
            <p className={`text-[10px] font-bold ${color.split(' ')[1]}`}>{label}</p>
          </button>
        ))}
      </div>

      {/* Simulation log */}
      {log.length > 0 && (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <p className="text-[10px] font-mono text-slate-500">SIMULATION LOG</p>
          {log.slice(0, 10).map((evt) => (
            <div key={evt.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{evt.scenario.replace(/_/g, ' ')}</span>
                <span className={`font-mono text-[9px] font-bold ${statusColor(evt.status)}`}>{evt.status}</span>
              </div>
              <p className="text-slate-400 text-[10px]">{evt.description}</p>
              <p className="text-slate-500 text-[10px]">→ {evt.resolution}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
