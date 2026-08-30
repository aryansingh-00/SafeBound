import React, { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp, Bell, Sparkles } from 'lucide-react';
import { NotificationItem } from '../../data/notificationsData';
import { NotificationCardItem } from './NotificationCardItem';

interface NotificationGroupViewProps {
  tripName: string;
  items: NotificationItem[];
  onSelect: (item: NotificationItem) => void;
  onPrimaryAction: (item: NotificationItem) => void;
}

export const NotificationGroupView: React.FC<NotificationGroupViewProps> = ({
  tripName,
  items,
  onSelect,
  onPrimaryAction,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const unreadCount = items.filter((i) => i.state === 'unread' || i.state === 'action_required').length;

  return (
    <div className="space-y-3">
      
      {/* Group Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-brand-300 transition flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">{tripName}</h4>
            <span className="text-[11px] text-slate-400 font-medium">{items.length} Synchronized Updates</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-100 text-brand-800">
              {unreadCount} New
            </span>
          )}
          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {/* Expanded Items */}
      {isExpanded && (
        <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-slate-200 animate-fadeIn">
          {items.map((item) => (
            <NotificationCardItem
              key={item.id}
              item={item}
              onSelect={onSelect}
              onPrimaryAction={onPrimaryAction}
            />
          ))}
        </div>
      )}

    </div>
  );
};
