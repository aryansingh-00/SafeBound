import React from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  SlidersHorizontal, 
  CreditCard, 
  Luggage,
  ArrowRight
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '1',
      title: '1. Tell us your plan',
      description: 'Share your preferences in simple words.',
      icon: MessageSquare,
      bgColor: 'bg-[#F4E8FF]',
      borderColor: 'border-purple-200/70',
      iconColor: 'text-purple-600',
      tagColor: 'text-purple-700 bg-purple-100',
    },
    {
      number: '2',
      title: '2. AI builds your trip',
      description: 'Our AI finds the best travel, stay & activities.',
      icon: Sparkles,
      bgColor: 'bg-[#E0F2FE]',
      borderColor: 'border-sky-200/70',
      iconColor: 'text-sky-600',
      tagColor: 'text-sky-700 bg-sky-100',
    },
    {
      number: '3',
      title: '3. You review & filter',
      description: 'Live options. You choose what fits you best.',
      icon: SlidersHorizontal,
      bgColor: 'bg-[#ECFDF5]',
      borderColor: 'border-emerald-200/70',
      iconColor: 'text-emerald-600',
      tagColor: 'text-emerald-700 bg-emerald-100',
    },
    {
      number: '4',
      title: '4. Pay securely',
      description: 'One payment via Razorpay. We handle the rest.',
      icon: CreditCard,
      bgColor: 'bg-[#FEF3C7]',
      borderColor: 'border-amber-200/70',
      iconColor: 'text-amber-600',
      tagColor: 'text-amber-700 bg-amber-100',
    },
    {
      number: '5',
      title: '5. Trip confirmed',
      description: 'Get all details on email and in your dashboard.',
      icon: Luggage,
      bgColor: 'bg-[#FCE7F3]',
      borderColor: 'border-pink-200/70',
      iconColor: 'text-pink-600',
      tagColor: 'text-pink-700 bg-pink-100',
    },
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-20 bg-white border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            How SafeBound works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 font-medium max-w-xl mx-auto">
            From “I want a trip” to “Your trip is ready” — SafeBound handles the complexity so you travel effortlessly.
          </p>
        </div>

        {/* 5 Connected Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3 items-stretch relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.number} className="relative flex flex-col">
                
                {/* Step Card */}
                <div
                  className={`flex-1 rounded-2xl p-5 border ${step.bgColor} ${step.borderColor} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
                >
                  <div>
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center mb-4 shadow-xs">
                      <Icon className={`w-5 h-5 ${step.iconColor}`} />
                    </div>

                    {/* Step Title */}
                    <h3 className="text-sm font-bold text-slate-900 mb-1.5 font-sans">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Arrow for Desktop */}
                {!isLast && (
                  <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                      <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
