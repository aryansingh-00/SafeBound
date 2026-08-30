import React from 'react';
import { 
  Bell, 
  Clock, 
  MapPin, 
  Train, 
  Building, 
  Car, 
  Compass, 
  CloudSun, 
  ShieldCheck, 
  Tag, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { NotificationItem } from '../../data/notificationsData';
import { AgentActionFlow } from './AgentActionFlow';

interface NotificationCardItemProps {
  item: NotificationItem;
  onSelect: (item: NotificationItem) => void;
  onPrimaryAction: (item: NotificationItem) => void;
}

export const NotificationCardItem: React.FC<NotificationCardItemProps> = ({
  item,
  onSelect,
  onPrimaryAction,
}) => {
  const isUnread = item.state === 'unread' || item.state === 'action_required';
  const isActionRequired = item.state === 'action_required';

  // Priority color tags
  const priorityConfig = {
    critical: {
      badge: 'Action Required',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
      dotClass: 'bg-rose-500',
      borderClass: 'border-l-4 border-l-rose-500',
    },
    important: {
      badge: 'Important Update',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
      dotClass: 'bg-amber-500',
      borderClass: 'border-l-4 border-l-amber-500',
    },
    informational: {
      badge: 'Informational',
      badgeClass: 'bg-sky-100 text-sky-800 border-sky-200',
      dotClass: 'bg-sky-500',
      borderClass: 'border-l-4 border-l-sky-500',
    },
    promotional: {
      badge: 'Price Drop / Deal',
      badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
      dotClass: 'bg-purple-500',
      borderClass: 'border-l-4 border-l-purple-500',
    },
  }[item.priority];

  // Category Icon
  const getCategoryIcon = () => {
    switch (item.category) {
      case 'trips': return Train;
      case 'bookings': return Building;
      case 'weather': return CloudSun;
      case 'safety': return ShieldCheck;
      case 'price': return Tag;
      case 'promotions': return Sparkles;
      default: return Bell;
    }
  };

  const CategoryIcon = getCategoryIcon();

  return (
    <div
      onClick={() => onSelect(item)}
      className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-200 shadow-card hover:shadow-lg cursor-pointer space-y-4 relative ${
        isUnread ? 'bg-gradient-to-r from-brand-50/30 to-white border-brand-200/90' : 'border-slate-200/80 hover:border-brand-300'
      } ${priorityConfig.borderClass}`}
    >
      
      {/* Top Header: Unread Dot, Trip Badge, Priority, Timestamp */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isUnread && (
            <span className="w-2.5 h-2.5 rounded-full bg-brand-600 animate-pulse shrink-0"></span>
          )}

          {item.tripName && (
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-extrabold bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-brand-600" />
              <span>{item.tripName}</span>
            </span>
          )}

          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${priorityConfig.badgeClass}`}>
            {priorityConfig.badge}
          </span>
        </div>

        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>{item.timeAgo}</span>
        </span>
      </div>

      {/* Main Title & Summary */}
      <div className="space-y-1">
        <h3 className={`text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-start gap-2 ${isUnread ? 'text-slate-950' : 'text-slate-800'}`}>
          <span>{item.title}</span>
        </h3>
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          {item.summary}
        </p>
      </div>

      {/* Agent Action Flow (If performed or suggested) */}
      <AgentActionFlow
        eventText={item.whatHappened}
        actionText={item.agentAction.title}
        resolutionText={item.agentAction.resolutionState}
        isActionRequired={isActionRequired}
      />

      {/* Footer Action Buttons */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[11px] text-brand-700 font-bold hover:underline flex items-center gap-1">
          <span>Inspect Full Event Log & Comparison</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </span>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => onPrimaryAction(item)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold shadow-xs transition flex items-center gap-1.5 ${
              isActionRequired
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30 ring-2 ring-rose-500/20'
                : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-600/20'
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
