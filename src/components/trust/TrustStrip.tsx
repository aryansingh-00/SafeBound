import React from 'react';
import { ShieldCheck, RefreshCw, Bot, Users } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: ShieldCheck,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      title: '100% Safe Bookings',
      subtitle: 'Secure payments via Razorpay',
    },
    {
      icon: RefreshCw,
      iconColor: 'text-brand-600',
      bgColor: 'bg-brand-50',
      title: 'Live Re-optimization',
      subtitle: 'Best options, always',
    },
    {
      icon: Bot,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      title: '24/7 AI Support',
      subtitle: "We're always here",
    },
    {
      icon: Users,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      title: '10K+ Happy Travellers',
      subtitle: 'Trips planned with love',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-sm hover:shadow-md hover:bg-white transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl ${item.bgColor} ${item.iconColor} flex items-center justify-center shrink-0 shadow-sm`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 font-medium truncate">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
