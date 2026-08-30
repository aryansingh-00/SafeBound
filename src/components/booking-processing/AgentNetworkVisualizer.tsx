import React from 'react';
import { 
  Bot, 
  Train, 
  Building, 
  Car, 
  Compass, 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  Loader2, 
  Circle,
  Zap,
  ArrowDown
} from 'lucide-react';

export interface AgentStatusNode {
  id: string;
  name: string;
  role: string;
  status: 'PENDING' | 'PROCESSING' | 'CONFIRMED' | 'FAILED';
  icon: any;
  detail: string;
  badge?: string;
}

interface AgentNetworkVisualizerProps {
  agents: AgentStatusNode[];
}

export const AgentNetworkVisualizer: React.FC<AgentNetworkVisualizerProps> = ({ agents }) => {
  return (
    <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
      
      {/* Decorative Network Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Visual Title */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-600/30 text-brand-400 border border-brand-500/40 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white">
              SafeBound Autonomous Agent Mesh
            </h3>
            <p className="text-[11px] text-slate-400">
              Parallel execution across 6 specialized booking micro-agents
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-emerald-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Mesh Synchronized</span>
        </span>
      </div>

      {/* Layer 1: Central Planning Orchestrator */}
      <div className="text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg shadow-brand-500/25 border border-brand-400/40">
          <Bot className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>SafeBound Central Orchestrator</span>
          <span className="text-[10px] bg-white/20 px-2 py-0.2 rounded-full font-mono">ACTIVE</span>
        </div>
      </div>

      {/* Animated Connector Arrow Down */}
      <div className="flex justify-center relative z-10 -my-2">
        <div className="h-6 w-0.5 bg-gradient-to-b from-brand-500 to-slate-700"></div>
      </div>

      {/* Layer 2: 3 Core Booking Micro-Agents (Transport, Hotel, Transfer) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
        {agents.slice(0, 3).map((agent) => {
          const Icon = agent.icon;
          const isDone = agent.status === 'CONFIRMED';
          const isProcessing = agent.status === 'PROCESSING';

          return (
            <div
              key={agent.id}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isDone
                  ? 'bg-slate-800/90 border-emerald-500/40 shadow-emerald-500/10'
                  : isProcessing
                  ? 'bg-slate-800/90 border-brand-500 ring-2 ring-brand-500/30 shadow-lg shadow-brand-500/20'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isProcessing
                        ? 'bg-brand-500/20 text-brand-400 animate-pulse'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white">{agent.name}</h4>
                    <span className="text-[10px] text-slate-400 block font-medium">{agent.role}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isProcessing ? (
                    <Loader2 className="w-4 h-4 text-brand-400 animate-spin" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600" />
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/60 text-[11px]">
                <p className={isDone ? 'text-slate-300' : isProcessing ? 'text-brand-300 font-bold' : 'text-slate-500'}>
                  {agent.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Layer 3: Activity & Verification Agents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
        {agents.slice(3, 5).map((agent) => {
          const Icon = agent.icon;
          const isDone = agent.status === 'CONFIRMED';
          const isProcessing = agent.status === 'PROCESSING';

          return (
            <div
              key={agent.id}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isDone
                  ? 'bg-slate-800/90 border-emerald-500/40'
                  : isProcessing
                  ? 'bg-slate-800/90 border-brand-500 ring-2 ring-brand-500/30'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isProcessing
                        ? 'bg-brand-500/20 text-brand-400 animate-pulse'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white">{agent.name}</h4>
                    <span className="text-[10px] text-slate-400 block font-medium">{agent.role}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isProcessing ? (
                    <Loader2 className="w-4 h-4 text-brand-400 animate-spin" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600" />
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/60 text-[11px]">
                <p className={isDone ? 'text-slate-300' : isProcessing ? 'text-brand-300 font-bold' : 'text-slate-500'}>
                  {agent.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
