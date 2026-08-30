import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { TRIP_RESULTS_PACKAGES, TripResultPackage } from '../../data/tripResultsData';

interface SimilarPackagesSectionProps {
  currentPkgId: string;
}

export const SimilarPackagesSection: React.FC<SimilarPackagesSectionProps> = ({ currentPkgId }) => {
  const navigate = useNavigate();
  const alternates = TRIP_RESULTS_PACKAGES.filter((p) => p.id !== currentPkgId).slice(0, 3);

  return (
    <div className="space-y-4 pt-4 border-t border-slate-200/80">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Similar Alternative Packages
        </h3>
        <button
          type="button"
          onClick={() => navigate('/trip-results')}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
        >
          <span>View All 4 Packages</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {alternates.map((alt) => (
          <div
            key={alt.id}
            className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:border-brand-300 transition flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="relative h-28 rounded-2xl overflow-hidden">
                <img
                  src={alt.imageUrl}
                  alt={alt.destination}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-600 text-white">
                  {alt.matchScore}% Match
                </span>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-900">{alt.destination}</h4>
                <p className="text-xs text-slate-500">{alt.duration}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-extrabold text-slate-900">
                ₹{alt.totalPrice.toLocaleString('en-IN')}
              </span>
              <button
                type="button"
                onClick={() => navigate(`/package/${alt.id}`)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Inspect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
