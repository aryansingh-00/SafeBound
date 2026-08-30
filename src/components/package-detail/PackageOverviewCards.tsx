import React from 'react';
import { Train, Building, Car, Compass, Coffee, CheckCircle2 } from 'lucide-react';
import { TripResultPackage } from '../../data/tripResultsData';

interface PackageOverviewCardsProps {
  pkg: TripResultPackage;
}

export const PackageOverviewCards: React.FC<PackageOverviewCardsProps> = ({ pkg }) => {
  const inclusions = [
    {
      icon: Train,
      title: 'Transport',
      subtitle: `${pkg.transport.mode}`,
      detail: 'Round-trip reserved seating with meal option',
      cost: `₹${pkg.transport.cost.toLocaleString('en-IN')}`,
      color: 'text-brand-600 bg-brand-50 border-brand-200',
    },
    {
      icon: Building,
      title: 'Hotel',
      subtitle: `${pkg.hotel.stars} ${pkg.hotel.name}`,
      detail: '3 Nights Deluxe Mountain View Suite',
      cost: `₹${pkg.hotel.cost.toLocaleString('en-IN')}`,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      icon: Car,
      title: 'Transfers',
      subtitle: `${pkg.transfer.type}`,
      detail: 'Station pickup, drops & local day excursion',
      cost: `₹${pkg.transfer.cost.toLocaleString('en-IN')}`,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
    },
    {
      icon: Compass,
      title: 'Activities',
      subtitle: `${pkg.activities.count} Experiences Included`,
      detail: pkg.activities.list.join(' • '),
      cost: `₹${pkg.activities.cost.toLocaleString('en-IN')}`,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      icon: Coffee,
      title: 'Meals',
      subtitle: 'Daily Buffet Breakfast',
      detail: 'Fresh local cuisine served at hotel restaurant',
      cost: 'Included in Stay',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          What's Included in this Package
        </h3>
        <span className="text-xs font-bold text-slate-500">
          5 Verified Services
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {inclusions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-brand-300 transition flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      {item.title}
                    </span>
                    <h4 className="text-xs font-extrabold text-slate-900">{item.subtitle}</h4>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-medium">
                {item.detail}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  ✓ Verified Included
                </span>
                <span className="font-extrabold text-slate-900 font-mono">{item.cost}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
