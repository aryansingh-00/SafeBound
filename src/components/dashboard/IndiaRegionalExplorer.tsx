import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowRight, MapPin } from 'lucide-react';

export const IndiaRegionalExplorer: React.FC = () => {
  const navigate = useNavigate();

  const regions = [
    { name: 'North India', desc: 'Himalayan ridges, pine valleys & Kashmir', query: 'North', color: 'from-indigo-600 to-brand-700' },
    { name: 'South India', desc: 'Kerala backwaters, tea hills & Nilgiris', query: 'South', color: 'from-emerald-600 to-teal-700' },
    { name: 'West India', desc: 'Goa shores, Konkan coast & Western Ghats', query: 'West', color: 'from-amber-500 to-orange-600' },
    { name: 'North-East', desc: 'Meghalaya living root bridges & Sikkim', query: 'North-East', color: 'from-purple-600 to-pink-700' },
  ];

  return (
    <div className="space-y-4">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-600" />
            <span>🗺️ Explore India by Region</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Discover curated clusters matched to seasonal weather and connectivity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/destinations')}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
        >
          <span>Open Map</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {regions.map((reg, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => navigate(`/destinations?region=${encodeURIComponent(reg.query)}`)}
            className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:border-brand-300 hover:shadow-md transition text-left flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-1">
              <span className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${reg.color} text-white flex items-center justify-center font-bold text-xs shadow-xs mb-2 group-hover:scale-105 transition`}>
                <MapPin className="w-4 h-4" />
              </span>
              <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-brand-700 transition">
                {reg.name}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {reg.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-600">
              <span>View Places</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </button>
        ))}
      </div>

    </div>
  );
};
