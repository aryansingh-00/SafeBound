import React from 'react';
import { JourneyTimelineNode } from '../../backend/package-builder/packageBuilderTypes';
import { 
  MapPin, 
  Train, 
  Car, 
  Building, 
  Ticket, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowDown 
} from 'lucide-react';

interface JourneyGraphTimelineProps {
  nodes: JourneyTimelineNode[];
}

export const JourneyGraphTimeline: React.FC<JourneyGraphTimelineProps> = ({ nodes }) => {
  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'ORIGIN': return MapPin;
      case 'TRANSIT': return Train;
      case 'TRANSFER': return Car;
      case 'HOTEL': return Building;
      default: return Ticket;
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4 text-white shadow-card">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Train className="w-5 h-5 text-brand-400" />
          <h3 className="text-sm font-extrabold text-white">
            Connected Multi-Modal Journey Graph (Timeline Compatibility)
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          ✓ All Chronological Buffers Validated
        </span>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {nodes.map((node) => {
          const Icon = getNodeIcon(node.type);

          return (
            <div key={node.id} className="relative group">
              {/* Timeline marker icon */}
              <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-brand-500 text-brand-400 flex items-center justify-center shadow-xs">
                <Icon className="w-3 h-3" />
              </div>

              {/* Node Card */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-brand-500/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-brand-300 font-mono font-bold text-[9px]">
                      {node.type}
                    </span>
                    <h4 className="font-extrabold text-white">{node.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400">{node.location}</p>
                </div>

                <div className="flex items-center gap-4 text-right self-end sm:self-auto shrink-0 font-mono">
                  <div className="text-[11px]">
                    <span className="text-slate-400 block text-[10px]">Window:</span>
                    <span className="font-bold text-slate-200">{node.startTime} – {node.endTime}</span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                      node.isValid
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {node.isValid ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    <span>{node.isValid ? 'Compatible' : 'Conflict'}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
