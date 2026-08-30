import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, SlidersHorizontal, AlertCircle } from 'lucide-react';

interface NotificationHeaderProps {
  totalCount: number;
  unreadCount: number;
  actionRequiredCount: number;
  onMarkAllAsRead: () => void;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  totalCount,
  unreadCount,
  actionRequiredCount,
  onMarkAllAsRead,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Title & Description */}
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold shadow-xs">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Notifications & Action Alerts
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                SafeBound doesn't just notify you. It tells you what changed and what it did about it.
              </p>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
            className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 shadow-2xs transition flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Mark all as read</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="px-4 py-2.5 bg-white hover:bg-brand-50 text-brand-700 hover:text-brand-800 font-bold text-xs rounded-xl border border-brand-200 transition flex items-center gap-1.5"
            title="Notification preferences"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>

      </div>

      {/* Quick Statistics Strip */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs">
        <span className="font-bold text-slate-700 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200">
          <strong>{totalCount}</strong> Total Alerts
        </span>

        {unreadCount > 0 && (
          <span className="font-bold text-brand-800 bg-brand-50 px-3 py-1 rounded-xl border border-brand-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-ping"></span>
            <strong>{unreadCount}</strong> Unread Updates
          </span>
        )}

        {actionRequiredCount > 0 && (
          <span className="font-bold text-rose-800 bg-rose-50 px-3 py-1 rounded-xl border border-rose-200 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <strong>{actionRequiredCount}</strong> Requires Your Approval
          </span>
        )}
      </div>

    </div>
  );
};
