import React from 'react';
import { 
  Bot, 
  BrainCircuit, 
  Filter, 
  Layers, 
  BarChart3, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  Activity 
} from 'lucide-react';

interface DecisionPipelineVisualizerProps {
  currentStage: number;
}

export const DecisionPipelineVisualizer: React.FC<DecisionPipelineVisualizerProps> = ({ currentStage }) => {
  const stages = [
    { num: 1, label: 'Intent Parser', desc: 'Natural Language to Intent', icon: BrainCircuit },
    { num: 2, label: 'Constraint Split', desc: 'Hard (Budget) vs Soft (Style)', icon: Filter },
    { num: 3, label: 'Candidate Corridors', desc: 'Knowledge Base & Transit', icon: Layers },
    { num: 4, label: 'Hard Filter', desc: 'Remove >₹40K & Weather Risk', icon: CheckCircle2 },
    { num: 5, label: 'Evidence Scoring', desc: 'Multi-Factor Weights', icon: Sliders },
    { num: 6, label: 'Package Synthesis', desc: 'Coordinated Vouchers', icon: Sparkles },
    { num: 7, label: 'Explain & Rank', desc: 'Why Destination Rationale', icon: BarChart3 },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4 text-white shadow-card">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-brand-400" />
          <h3 className="text-sm font-extrabold text-white">
            Decision Agent 7-Stage Constrained Pipeline
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          ● Autonomous Multi-Agent Reasoning Active
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
        {stages.map((st) => {
          const Icon = st.icon;
          const isPassed = currentStage >= st.num;
          const isCurrent = currentStage === st.num;

          return (
            <div
              key={st.num}
              className={`p-3 rounded-2xl border space-y-1 transition text-left flex flex-col justify-between ${
                isCurrent
                  ? 'bg-brand-600/30 border-brand-500 text-white shadow-md ring-2 ring-brand-500/20'
                  : isPassed
                  ? 'bg-slate-950 border-slate-800 text-slate-300'
                  : 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-brand-400">
                  0{st.num}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-brand-400 animate-pulse' : 'text-slate-400'}`} />
              </div>

              <div>
                <h4 className="text-xs font-extrabold leading-tight text-white">{st.label}</h4>
                <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{st.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
