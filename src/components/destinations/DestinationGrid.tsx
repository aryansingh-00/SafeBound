import React, { useState } from 'react';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { Destination } from '../../types';
import { POPULAR_DESTINATIONS } from '../../data/destinations';
import { DestinationCard } from './DestinationCard';
import { DestinationModal } from './DestinationModal';

interface DestinationGridProps {
  onPlanTripForDestination: (destination: Destination) => void;
}

export const DestinationGrid: React.FC<DestinationGridProps> = ({
  onPlanTripForDestination
}) => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [filterTag, setFilterTag] = useState<string>('All');

  const filterCategories = ['All', 'Mountains', 'Beach', 'Nature', 'Adventure', 'Culture'];

  const filteredDestinations = filterTag === 'All'
    ? POPULAR_DESTINATIONS
    : POPULAR_DESTINATIONS.filter(d => d.tags.includes(filterTag));

  return (
    <section id="destinations" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/60 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-brand-600" />
            <span>AI Destination Discovery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore popular destinations
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 font-medium">
            Live prices • Safety certified by SafeBound AI • Tailored itineraries
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterTag(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                filterTag === cat
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/25'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Destination Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredDestinations.map((dest) => (
          <DestinationCard
            key={dest.id}
            destination={dest}
            onSelect={(d) => setSelectedDestination(d)}
            onPlanTripForDestination={onPlanTripForDestination}
          />
        ))}
      </div>

      {/* Destination Detail Modal */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onPlanTrip={onPlanTripForDestination}
      />

    </section>
  );
};
