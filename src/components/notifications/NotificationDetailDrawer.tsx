import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Sparkles, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight,
  Zap,
  Check
} from 'lucide-react';
import { NotificationItem } from '../../data/notificationsData';

interface NotificationDetailDrawerProps {
  item: NotificationItem | null;
  isOpen: boolean;
  onClose: () => void;
  onApproveAction: (id: string) => void;
}

export const NotificationDetailDrawer: React.FC<NotificationDetailDrawerProps> = ({
  item,
  isOpen,
  onClose,
  onApproveAction,
}) => {
  const navigate = useNavigate();

  if (!isOpen || !item) return null;

  const isActionRequired = item.state === 'action_required';

  const handlePrimaryClick = () => {
    if (item.actions.primaryAction.startsWith('/')) {
      navigate(item.actions.primaryAction);
    } else if (item.actions.primaryAction === 'approve_hotel') {
      onApproveAction(item.id);
    } else if (item.actions.primaryAction === 'swap_itinerary') {
      alert('✓ Itinerary re-sequenced! Gun Hill ropeway moved to Day 2 morning.');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/70">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                SafeBound Sentinel Alert
              </span>
              <span className="text-[10px] font-mono text-slate-400">• {item.timeAgo}</span>
            </div>

            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              {item.title}
            </h2>

            {item.tripName && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700">
                <MapPin className="w-3 h-3 text-brand-600" />
                <span>{item.tripName}</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 flex-1">
          
          {/* 1. What Happened? */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              1. What Happened?
            </h4>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 leading-relaxed font-medium">
              {item.whatHappened}
            </div>
          </div>

          {/* 2. What Changed? (Diff Box) */}
          {item.whatChanged && (
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                2. Impact & Schedule Adjustment
              </h4>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Original Plan:</span>
                  <p className="text-slate-500 line-through">{item.whatChanged.original}</p>
                </div>
                <div className="space-y-0.5 pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase block">Updated By SafeBound:</span>
                  <p className="text-emerald-900 font-extrabold">{item.whatChanged.updated}</p>
                </div>
              </div>
            </div>
          )}

          {/* 3. What SafeBound Did (Agent Action) */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              3. Autonomous Action Taken
            </h4>
            <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200/80 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-brand-900 font-extrabold">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>{item.agentAction.title}</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {item.agentAction.description}
              </p>
            </div>
          </div>

          {/* 4. Current Status */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              4. Current Operational Status
            </h4>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Trip Health Status:</span>
              <span
                className={`font-extrabold px-2.5 py-1 rounded-lg ${
                  isActionRequired
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {item.agentAction.resolutionState}
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 bg-white sticky bottom-0 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
          >
            Dismiss
          </button>

          <button
            type="button"
            onClick={handlePrimaryClick}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-md transition flex items-center gap-1.5 ${
              isActionRequired
                ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/30'
                : 'bg-brand-600 hover:bg-brand-700 shadow-brand-600/30'
            }`}
          >
            <span>{item.actions.primaryLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
