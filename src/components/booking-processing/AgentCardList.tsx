import React from 'react';
import { Train, Building, Car, Compass, CheckCircle2, Loader2, Circle, ShieldCheck } from 'lucide-react';
import { AgentStatusNode } from './AgentNetworkVisualizer';

interface AgentCardListProps {
  agents: AgentStatusNode[];
}

export const AgentCardList: React.FC<AgentCardListProps> = ({ agents }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          Agent Coordination Stream
        </h4>
        <span className="text-[10px] font-mono text-slate-400">Real-time GDS & API Telemetry</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const isConfirmed = agent.status === 'CONFIRMED';
          const isProcessing = agent.status === 'PROCESSING';

          return (
            <div
              key={agent.id}
              className={`p-4 rounded-2xl border transition-all ${
                isConfirmed
                  ? 'bg-slate-900 border-emerald-500/40 shadow-sm'
                  : isProcessing
                  ? 'bg-slate-900 border-brand-500 ring-2 ring-brand-500/20'
                  : 'bg-slate-950/80 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isConfirmed
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isProcessing
                        ? 'bg-brand-500/20 text-brand-400'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div>
                    <h5 className="text-xs font-extrabold text-white">{agent.name}</h5>
                    <span className="text-[10px] text-slate-400 font-mono block">{agent.role}</span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isConfirmed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : isProcessing
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 animate-pulse'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {agent.status}
                </span>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1 text-xs">
                <p className="text-slate-300 font-medium">{agent.detail}</p>
                {agent.badge && (
                  <span className="text-[10px] font-mono text-emerald-400 block font-bold">
                    {agent.badge}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
