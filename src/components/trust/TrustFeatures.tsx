import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  CloudSun, 
  Lock, 
  BadgeIndianRupee, 
  Bot, 
  FileCheck2 
} from 'lucide-react';

export const TrustFeatures: React.FC = () => {
  const features = [
    { icon: Lock, label: 'Secure Payments via Razorpay' },
    { icon: Zap, label: 'Real-Time Dynamic Pricing' },
    { icon: CloudSun, label: 'Weather-Aware Planning' },
    { icon: ShieldCheck, label: 'Safety-Certified Routes' },
    { icon: BadgeIndianRupee, label: 'Strict Budget Control' },
    { icon: Bot, label: 'Autonomous AI Orchestration' },
    { icon: FileCheck2, label: 'Single Unified Itinerary' },
  ];

  return (
    <section className="py-10 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">
                <div className="w-7 h-7 rounded-lg bg-white shadow-xs border border-slate-200 flex items-center justify-center text-brand-600">
                  <Icon className="w-4 h-4" />
                </div>
                <span>{f.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
