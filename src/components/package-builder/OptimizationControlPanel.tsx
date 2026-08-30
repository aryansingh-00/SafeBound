import React from 'react';
import { OptimizationMode } from '../../backend/package-builder/packageBuilderTypes';
import { OPTIMIZATION_STRATEGIES } from '../../backend/optimizer/optimizationStrategies';
import { Sparkles, Sliders, Zap, ShieldCheck, Wallet, Clock } from 'lucide-react';

interface OptimizationControlPanelProps {
  selectedMode: OptimizationMode;
  onSelectMode: (mode: OptimizationMode) => void;
  onRunOptimization: () => void;
  running: boolean;
}

export const OptimizationControlPanel: React.FC<OptimizationControlPanelProps> = ({
  selectedMode,
  onSelectMode,
  onRunOptimization,
  running,
}) => {
  const modes: OptimizationMode[] = ['BEST_VALUE', 'CHEAPEST', 'FASTEST', 'COMFORT', 'FLEXIBLE'];

  return (
    <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4 text-white shadow-card">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-brand-400" />
          <h3 className="text-sm font-extrabold text-white">
            Optimization Strategy Selector
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          6 Autonomous Optimization Objectives
        </span>
      </div>

      {/* Mode Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {modes.map((m) => {
          const strat = OPTIMIZATION_STRATEGIES[m];
          const isSelected = selectedMode === m;

          return (
            <button
              key={m}
              type="button"
              onClick={() => onSelectMode(m)}
              className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between space-y-1 ${
                isSelected
                  ? 'bg-brand-600 border-brand-500 text-white shadow-md shadow-brand-600/30 ring-2 ring-brand-500/20'
                  : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              <span className="text-xs font-extrabold block truncate">{strat.title.split(' ')[1]} {strat.title.split(' ')[2]}</span>
              <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                {strat.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Trigger CTA */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          disabled={running}
          onClick={onRunOptimization}
          className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-brand-600/30 transition flex items-center gap-2 disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${running ? 'animate-spin' : ''}`} />
          <span>{running ? 'Computing Whole-Journey Trade-offs...' : `Optimize via ${selectedMode.replace('_', ' ')}`}</span>
        </button>
      </div>
    </div>
  );
};
