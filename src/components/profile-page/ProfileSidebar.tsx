import React from 'react';
import { 
  User, 
  Users, 
  SlidersHorizontal, 
  Bookmark, 
  FileText, 
  Bell, 
  Globe, 
  ShieldCheck, 
  CreditCard 
} from 'lucide-react';

export type ProfileTabId = 
  | 'personal-info' 
  | 'travellers' 
  | 'travel-preferences' 
  | 'saved-places' 
  | 'saved-plans' 
  | 'notifications' 
  | 'language-currency' 
  | 'privacy-security';

interface ProfileSidebarProps {
  activeTab: ProfileTabId;
  onSelectTab: (tab: ProfileTabId) => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const sections = [
    {
      heading: 'Account & Identity',
      items: [
        { id: 'personal-info', label: 'Personal Information', icon: User },
        { id: 'travellers', label: 'Traveller Profiles', icon: Users, badge: '3 Saved' },
      ],
    },
    {
      heading: 'AI & Travel Styles',
      items: [
        { id: 'travel-preferences', label: 'Travel Preferences', icon: SlidersHorizontal },
        { id: 'saved-places', label: 'Saved Destinations', icon: Bookmark, badge: '4 Places' },
        { id: 'saved-plans', label: 'Saved AI Trip Plans', icon: FileText, badge: '2 Plans' },
      ],
    },
    {
      heading: 'App Settings',
      items: [
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'language-currency', label: 'Language & Currency', icon: Globe },
      ],
    },
    {
      heading: 'Security & Data',
      items: [
        { id: 'privacy-security', label: 'Privacy & Security', icon: ShieldCheck },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-card space-y-6">
      
      {/* Mobile Tab Scroller */}
      <div className="flex sm:hidden overflow-x-auto gap-1.5 pb-2 scrollbar-none">
        {sections.flatMap((s) => s.items).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id as ProfileTabId)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition shrink-0 ${
                isActive
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop Categorized Menu */}
      <div className="hidden sm:block space-y-5">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block">
              {section.heading}
            </span>

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectTab(item.id as ProfileTabId)}
                    className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 font-extrabold border border-brand-200/80 shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.2 rounded-full ${
                          isActive
                            ? 'bg-brand-200/80 text-brand-900'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
