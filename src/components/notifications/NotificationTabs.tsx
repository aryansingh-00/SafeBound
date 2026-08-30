import React from 'react';
import { Layers, Calendar, CreditCard, Tag, CloudSun, ShieldCheck, Sparkles } from 'lucide-react';
import { NotificationCategory } from '../../data/notificationsData';

export type TabFilter = 'all' | NotificationCategory;

interface NotificationTabsProps {
  activeTab: TabFilter;
  onSelectTab: (tab: TabFilter) => void;
  categoryCounts: Record<string, { total: number; unread: number }>;
}

export const NotificationTabs: React.FC<NotificationTabsProps> = ({
  activeTab,
  onSelectTab,
  categoryCounts,
}) => {
  const tabs = [
    { id: 'all', label: 'All Updates', icon: Layers },
    { id: 'trips', label: 'Trips & Delays', icon: Calendar },
    { id: 'bookings', label: 'Bookings & Stays', icon: CreditCard },
    { id: 'price', label: 'Price Drops', icon: Tag },
    { id: 'weather', label: 'Weather Radar', icon: CloudSun },
    { id: 'safety', label: 'Safety Conditions', icon: ShieldCheck },
    { id: 'promotions', label: 'Curated Deals', icon: Sparkles },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = activeTab === t.id;
        const stats = categoryCounts[t.id] || { total: 0, unread: 0 };

        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelectTab(t.id as TabFilter)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 shrink-0 border ${
              isActive
                ? 'bg-brand-600 text-white border-brand-600 shadow-xs ring-2 ring-brand-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200/90 shadow-2xs'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            <span>{t.label}</span>

            {stats.unread > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                  isActive
                    ? 'bg-brand-800 text-brand-100'
                    : 'bg-brand-100 text-brand-800'
                }`}
              >
                {stats.unread}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
