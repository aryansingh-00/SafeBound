import React, { useState } from 'react';
import { History, ChevronDown, ChevronUp, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ActivityLogTimelineProps {
  logs: { time: string; event: string }[];
}

export const ActivityLogTimeline: React.FC<ActivityLogTimelineProps> = ({ logs }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3">
      
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-brand-600" />
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
            SafeBound Background Monitoring Log
          </h4>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>{logs.length} Live checks</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {expanded && (
        <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2 text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 mr-1.5">{log.time}:</span>
                <span className="text-slate-600">{log.event}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
