import React from 'react';
import { 
  LucideIcon, 
  CheckCircle2, 
  Activity, 
  Cpu, 
  KeyRound, 
  Lock 
} from 'lucide-react';

interface ProviderAgentCardProps {
  title: string;
  roleDescription: string;
  domain: string;
  icon: LucideIcon;
  primaryProvider: string;
  latencyMs: number;
  toolsRoster: string[];
  securityConstraint: string;
}

export const ProviderAgentCard: React.FC<ProviderAgentCardProps> = ({
  title,
  roleDescription,
  domain,
  icon: Icon,
  primaryProvider,
  latencyMs,
  toolsRoster,
  securityConstraint,
}) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4 text-white shadow-card flex flex-col justify-between hover:border-brand-500/40 transition">
      
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-brand-400">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">{title}</h3>
              <span className="text-[10px] font-mono text-slate-400 uppercase">{domain} DOMAIN</span>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-extrabold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{latencyMs}ms</span>
          </span>
        </div>

        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          {roleDescription}
        </p>

        {/* Primary Supplier */}
        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] font-mono flex items-center justify-between">
          <span className="text-slate-400">Adapter:</span>
          <span className="text-slate-200 font-bold truncate max-w-[170px]">{primaryProvider}</span>
        </div>

        {/* Tools Roster */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
            Authorized Agent Tools:
          </span>
          <div className="flex flex-wrap gap-1">
            {toolsRoster.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[10px]"
              >
                {t}()
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Security Guardrail Strip */}
      <div className="pt-3 border-t border-slate-800 flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
        <Lock className="w-3 h-3 text-brand-400 shrink-0" />
        <span className="truncate">{securityConstraint}</span>
      </div>

    </div>
  );
};
