import React from 'react';
import { ItineraryNodeSnapshot } from '../../backend/monitoring/itineraryUpdater';
import { Train, Car, Building, Ticket, CheckCircle2, Clock } from 'lucide-react';

interface UpdatedItineraryTimelineProps {
  nodes: ItineraryNodeSnapshot[];
}

export const UpdatedItineraryTimeline: React.FC<UpdatedItineraryTimelineProps> = ({ nodes }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'TRANSIT': return Train;
      case 'TRANSFER': return Car;
      case 'HOTEL': return Building;
      default: return Ticket;
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4 text-white shadow-card">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <h3 className="text-sm font-extrabold text-white">
          Live Synchronized Itinerary Graph (Confirmed Trip)
        </h3>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          ✓ Real-Time Supplier Sync
        </span>
      </div>

      <div className="space-y-2.5">
        {nodes.map((node) => {
          const Icon = getIcon(node.type);

          return (
            <div
              key={node.id}
              className={`p-3.5 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                node.isAdjusted
                  ? 'bg-brand-950/40 border-brand-500/50 shadow-sm'
                  : 'bg-slate-950 border-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    node.isAdjusted
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white">{node.title}</h4>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{node.type}</span>
                </div>
              </div>

              <div className="text-right font-mono self-end sm:self-auto shrink-0">
                <span
                  className={`text-xs font-extrabold block ${
                    node.isAdjusted ? 'text-brand-300' : 'text-slate-200'
                  }`}
                >
                  {node.updatedTime}
                </span>
                {node.isAdjusted && (
                  <span className="text-[9px] text-emerald-400 font-bold block">
                    ✓ Chauffeur & Vouchers Rescheduled
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
