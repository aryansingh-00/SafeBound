import React from 'react';
import { 
  Compass, 
  Train, 
  Building, 
  Car, 
  Ticket, 
  CloudSun, 
  ShieldCheck, 
  Zap, 
  RotateCw, 
  Bell, 
  Bot, 
  Activity, 
  Clock 
} from 'lucide-react';
import { ADMIN_AGENT_SWARM, AgentMetricItem } from '../../data/adminOperationsData';

export const AgentSwarmGrid: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return Compass;
      case 'Train': return Train;
      case 'Building': return Building;
      case 'Car': return Car;
      case 'Ticket': return Ticket;
      case 'CloudSun': return CloudSun;
      case 'ShieldCheck': return ShieldCheck;
      case 'Zap': return Zap;
      case 'RotateCw': return RotateCw;
      default: return Bell;
    }
  };

  return (
    <div className="space-y-4">
      
      <div className="flex items-center justify-between pb-1">
        <div>
          <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
            <Bot className="w-5 h-5 text-brand-400" />
            <span>🤖 10 Autonomous AI Micro-Agents Swarm</span>
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Distributed asynchronous micro-agents managing specialized travel domains.
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30">
          Swarm Load: 18% CPU
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {ADMIN_AGENT_SWARM.map((agent) => {
          const Icon = getIcon(agent.iconName);

          return (
            <div
              key={agent.id}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition space-y-3 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-bold">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    🟢 {agent.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold text-white leading-tight">{agent.name}</h4>
                  <span className="text-[10px] text-slate-400 font-medium block truncate">{agent.role}</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-1.5 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[10px] font-mono">
                <div>
                  <span className="text-slate-500 block">Tasks:</span>
                  <span className="font-bold text-slate-200">{agent.activeTasks} active</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Today:</span>
                  <span className="font-bold text-slate-200">{agent.completedToday}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Success:</span>
                  <span className="font-bold text-emerald-400">{agent.successRate}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Latency:</span>
                  <span className="font-bold text-brand-300">{agent.avgResponseTime}</span>
                </div>
              </div>

              {/* Current Real-time Action */}
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                <strong className="text-slate-300 font-bold block">Current Action:</strong>
                {agent.currentTaskDescription}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
