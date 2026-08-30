import React from 'react';
import { Layers, CheckCircle2, ArrowRight, X, Sparkles, Star } from 'lucide-react';
import { TripResultPackage } from '../../data/tripResultsData';

interface ComparisonMatrixProps {
  comparingPackages: TripResultPackage[];
  onRemoveFromCompare: (id: string) => void;
  onChoosePackage: (pkg: TripResultPackage) => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  comparingPackages,
  onRemoveFromCompare,
  onChoosePackage,
}) => {
  if (comparingPackages.length === 0) return null;

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-brand-200 shadow-card space-y-6 animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-600" />
            <span>Smart Package Comparison ({comparingPackages.length} Selected)</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Side-by-side evaluation across real-time pricing, stay categories, transit convenience and weather.
          </p>
        </div>

        <span className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-xl border border-brand-200">
          Max 3 Packages
        </span>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <table className="w-full text-xs text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-3 px-4 font-bold text-slate-400 uppercase tracking-wider w-1/4">Feature</th>
              {comparingPackages.map((pkg) => (
                <th key={pkg.id} className="py-3 px-4 font-bold text-slate-900 w-1/4 relative">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-sm text-slate-900 truncate">{pkg.destination}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveFromCompare(pkg.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            
            {/* Match Score */}
            <tr className="bg-brand-50/40 font-bold">
              <td className="py-3 px-4 text-slate-600">SafeBound Match</td>
              {comparingPackages.map((pkg) => (
                <td key={pkg.id} className="py-3 px-4 text-brand-700 font-extrabold">
                  ⚡ {pkg.matchScore}% Match
                </td>
              ))}
            </tr>

            {/* Total Price */}
            <tr>
              <td className="py-3 px-4 text-slate-600 font-semibold">Total Price</td>
              {comparingPackages.map((pkg) => (
                <td key={pkg.id} className="py-3 px-4 font-extrabold text-slate-900 text-sm">
                  ₹{pkg.totalPrice.toLocaleString('en-IN')}
                </td>
              ))}
            </tr>

            {/* Duration */}
            <tr>
              <td className="py-3 px-4 text-slate-600 font-semibold">Duration</td>
              {comparingPackages.map((pkg) => (
                <td key={pkg.id} className="py-3 px-4 font-medium text-slate-800">
                  {pkg.duration}
                </td>
              ))}
            </tr>

            {/* Transport Mode */}
            <tr>
              <td className="py-3 px-4 text-slate-600 font-semibold">Transport Transit</td>
              {comparingPackages.map((pkg) => (
                <td key={pkg.id} className="py-3 px-4 text-slate-800 font-medium">
                  {pkg.transport.mode} ({pkg.transport.travelTime})
                </td>
              ))}
            </tr>

            {/* Hotel Tier */}
            <tr>
              <td className="py-3 px-4 text-slate-600 font-semibold">Hotel Accommodation</td>
              {comparingPackages.map((pkg) => (
                <td key={pkg.id} className="py-3 px-4 text-slate-800 font-medium">
                  {pkg.hotel.stars} {pkg.hotel.name}
                </td>
              ))}
            </tr>

            {/* Safety Rating */}
            <tr>
              <td className="py-3 px-4 text-slate-600 font-semibold">Safety Score</td>
              {comparingPackages.map((pkg) => (
                <td key={pkg.id} className="py-3 px-4 text-emerald-700 font-bold">
                  ✓ {pkg.safety.score}/10 ({pkg.safety.status})
                </td>
              ))}
            </tr>

            {/* Weather Fit */}
            <tr>
              <td className="py-3 px-4 text-slate-600 font-semibold">Weather Forecast</td>
              {comparingPackages.map((pkg) => (
                <td key={pkg.id} className="py-3 px-4 text-slate-800 font-medium">
                  {pkg.weather.temp} ({pkg.weather.condition})
                </td>
              ))}
            </tr>

            {/* Activities */}
            <tr>
              <td className="py-3 px-4 text-slate-600 font-semibold">Activities Included</td>
              {comparingPackages.map((pkg) => (
                <td key={pkg.id} className="py-3 px-4 text-slate-800 font-medium">
                  {pkg.activities.count} Curated Passes
                </td>
              ))}
            </tr>

            {/* Choose Action */}
            <tr className="bg-slate-50">
              <td className="py-4 px-4 font-bold text-slate-700">Select & Proceed</td>
              {comparingPackages.map((pkg) => (
                <td key={pkg.id} className="py-4 px-4">
                  <button
                    type="button"
                    onClick={() => onChoosePackage(pkg)}
                    className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <span>Choose {pkg.destination}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

    </section>
  );
};
