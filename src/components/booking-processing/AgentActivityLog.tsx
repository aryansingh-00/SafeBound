import React, { useState } from 'react';
import { History, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

interface AgentActivityLogProps {
  logs: { time: string; agent: string; message: string }[];
}

export const AgentActivityLog: React.FC<AgentActivityLogProps> = ({ logs }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-3 text-white">
      
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-brand-400" />
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
            Live Agent Activity Log
          </h4>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-400">
          <span>{logs.length} Events</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono max-h-48 overflow-y-auto">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2 text-slate-400">
              <span className="text-[10px] text-slate-500 shrink-0">{log.time}</span>
              <span className="text-[10px] text-brand-400 font-bold shrink-0">[{log.agent}]</span>
              <span className="text-slate-300 font-sans">{log.message}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
