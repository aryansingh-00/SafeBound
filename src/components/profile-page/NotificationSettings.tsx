import React, { useState } from 'react';
import { Bell, ShieldCheck, Check } from 'lucide-react';

export const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    tripUpdates: true,
    priceChanges: true,
    weatherAlerts: true,
    bookingUpdates: true,
    promotionalDeals: false,
  });

  const toggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6 animate-fadeIn">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-600" />
            <span>Notification Channels</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Configure how and when SafeBound alerts you about trip disruptions, price drops, and vouchers.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        
        {/* Critical Trip Group */}
        <div className="space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
            Critical Trip & Booking Alerts (Recommended)
          </span>

          <div className="space-y-2.5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Trip Disruption & Delay Updates</h4>
                <p className="text-xs text-slate-500">Immediate push alerts when train delays or road closures trigger adaptive transfer adjustments.</p>
              </div>
              <button
                type="button"
                onClick={() => toggle('tripUpdates')}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications.tripUpdates ? 'bg-brand-600' : 'bg-slate-300'}`}
              >
                <span className={`w-5 h-5 rounded-full bg-white block absolute top-0.5 transition-transform ${notifications.tripUpdates ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Live Weather & Mountain Alerts</h4>
                <p className="text-xs text-slate-500">Real-time forecast alerts if an outdoor activity on your itinerary may be impacted by rain.</p>
              </div>
              <button
                type="button"
                onClick={() => toggle('weatherAlerts')}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications.weatherAlerts ? 'bg-brand-600' : 'bg-slate-300'}`}
              >
                <span className={`w-5 h-5 rounded-full bg-white block absolute top-0.5 transition-transform ${notifications.weatherAlerts ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Booking Confirmations & Digital Vouchers</h4>
                <p className="text-xs text-slate-500">Email and SMS notifications with downloadable IRCTC tickets and hotel vouchers.</p>
              </div>
              <button
                type="button"
                onClick={() => toggle('bookingUpdates')}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications.bookingUpdates ? 'bg-brand-600' : 'bg-slate-300'}`}
              >
                <span className={`w-5 h-5 rounded-full bg-white block absolute top-0.5 transition-transform ${notifications.bookingUpdates ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Discovery & Marketing Group */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
            Discovery & Price Drops
          </span>

          <div className="space-y-2.5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Price Drop Alerts on Saved Getaways</h4>
                <p className="text-xs text-slate-500">Notify me when flights or 4★ packages to my saved destinations drop by 15% or more.</p>
              </div>
              <button
                type="button"
                onClick={() => toggle('priceChanges')}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications.priceChanges ? 'bg-brand-600' : 'bg-slate-300'}`}
              >
                <span className={`w-5 h-5 rounded-full bg-white block absolute top-0.5 transition-transform ${notifications.priceChanges ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Seasonal Travel Inspiration & Deals</h4>
                <p className="text-xs text-slate-500">Curated weekly highlights for long weekend escapes and trending Himalayan routes.</p>
              </div>
              <button
                type="button"
                onClick={() => toggle('promotionalDeals')}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications.promotionalDeals ? 'bg-brand-600' : 'bg-slate-300'}`}
              >
                <span className={`w-5 h-5 rounded-full bg-white block absolute top-0.5 transition-transform ${notifications.promotionalDeals ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
