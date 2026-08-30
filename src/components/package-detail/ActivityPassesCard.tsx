import React from 'react';
import { Compass, CloudSun, CheckCircle2, Clock, MapPin, Tag } from 'lucide-react';
import { TripResultPackage } from '../../data/tripResultsData';

interface ActivityPassesCardProps {
  pkg: TripResultPackage;
}

export const ActivityPassesCard: React.FC<ActivityPassesCardProps> = ({ pkg }) => {
  const experiences = [
    {
      title: 'Gun Hill Cable Car Ropeway VIP Fast-Track Pass',
      timing: 'Sep 17 • 10:00 AM',
      duration: '3 Hours',
      location: 'The Mall Road Base Station, Mussoorie',
      description: 'Priority bypass queue access for 2 persons with round-trip aerial cable car climb and telescope viewpoint ticket.',
      weatherSensitive: true,
      cost: '₹2,200 (Included)',
    },
    {
      title: 'Guided Kempty Pine Trail & Upper Cascade Walk',
      timing: 'Sep 16 • 10:00 AM',
      duration: '4 Hours',
      location: 'Kempty Trailhead, Mussoorie',
      description: 'Certified nature naturalist leading private walk through cedar canopy, local flora identification and waterfall vista points.',
      weatherSensitive: true,
      cost: '₹2,300 (Included)',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-600" />
            <span>🎟️ Curated Experiences & VIP Passes</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Confirmed digital vouchers issued instantly upon escrow authorization.
          </p>
        </div>

        <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
          2 Experiences Included
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 transition flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold px-2 py-0.2 rounded bg-brand-100 text-brand-800">
                  {exp.timing}
                </span>
                {exp.weatherSensitive && (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.2 rounded flex items-center gap-1">
                    <CloudSun className="w-3 h-3 text-amber-600" />
                    <span>Weather-Sensitive</span>
                  </span>
                )}
              </div>

              <h4 className="text-sm font-extrabold text-slate-900">{exp.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{exp.description}</p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{exp.duration}</span>
              </span>
              <span className="font-extrabold text-slate-900">{exp.cost}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
