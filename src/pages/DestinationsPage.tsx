import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DestinationHero } from '../components/destinations-page/DestinationHero';
import { FilterBar } from '../components/destinations-page/FilterBar';
import { RecommendedDestinations } from '../components/destinations-page/RecommendedDestinations';
import { DestinationCard } from '../components/destinations-page/DestinationCard';
import { DestinationCategories } from '../components/destinations-page/DestinationCategories';
import { LiveIntelligenceSection } from '../components/destinations-page/LiveIntelligenceSection';
import { BudgetExplorer } from '../components/destinations-page/BudgetExplorer';
import { AIDestinationFinder } from '../components/destinations-page/AIDestinationFinder';
import { MapExplorer } from '../components/destinations-page/MapExplorer';
import { DestinationDetailModal } from '../components/destinations-page/DestinationDetailModal';
import { ALL_DESTINATIONS, DestinationItem } from '../data/destinationsData';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { Destination } from '../types';

interface DestinationsPageProps {
  onPlanTripForDestination?: (dest: Destination) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  onPlanTripForDestination,
}) => {
  const navigate = useNavigate();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('All');

  // Active modal state
  const [selectedDestinationForModal, setSelectedDestinationForModal] = useState<DestinationItem | null>(null);

  // Dynamic Filtering Logic
  const filteredDestinations = useMemo(() => {
    return ALL_DESTINATIONS.filter((dest) => {
      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesState = dest.state.toLowerCase().includes(q);
        const matchesCategory = dest.categories.some((c) => c.toLowerCase().includes(q));
        const matchesTagline = dest.tagline.toLowerCase().includes(q);
        if (!matchesName && !matchesState && !matchesCategory && !matchesTagline) {
          return false;
        }
      }

      // Trip Type Filter
      if (selectedType !== 'All') {
        const matchesType = dest.categories.includes(selectedType);
        if (!matchesType) return false;
      }

      // Budget Filter
      if (selectedBudget !== 'All') {
        if (selectedBudget === 'Under ₹15K' && dest.typicalBudget.min > 15000) return false;
        if (selectedBudget === '₹15K–₹30K' && (dest.typicalBudget.min > 30000 || dest.typicalBudget.max < 15000)) return false;
        if (selectedBudget === '₹30K–₹50K' && (dest.typicalBudget.min > 50000 || dest.typicalBudget.max < 30000)) return false;
        if (selectedBudget === '₹50K+' && dest.typicalBudget.max < 40000) return false;
      }

      // Duration Filter
      if (selectedDuration !== 'All') {
        if (dest.durationCategory !== selectedDuration) return false;
      }

      // Season Filter
      if (selectedSeason !== 'All') {
        if (!dest.seasonsList.includes(selectedSeason as any)) return false;
      }

      return true;
    });
  }, [searchQuery, selectedType, selectedBudget, selectedDuration, selectedSeason]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedBudget('All');
    setSelectedDuration('All');
    setSelectedSeason('All');
  };

  const handlePlanTrip = (dest: DestinationItem) => {
    if (onPlanTripForDestination) {
      onPlanTripForDestination({
        id: dest.id,
        name: dest.name,
        state: dest.state,
        tagline: dest.tagline,
        tags: dest.categories,
        startingPrice: dest.typicalBudget.min,
        bestSeason: dest.bestSeason,
        safetyScore: dest.safetyScore,
        imageUrl: dest.imageUrl,
        description: dest.description,
        highlights: dest.highlights,
        weather: {
          temp: dest.weather.temp,
          condition: dest.weather.condition,
        },
      });
    } else {
      navigate('/plan-trip');
    }
  };

  return (
    <div className="bg-[#FBFBFE] min-h-screen pb-16">
      
      {/* 1. Hero with Natural Language Destination Search */}
      <DestinationHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => {}}
      />

      {/* 2. Sticky Multi-Select Discovery Filter Bar */}
      <FilterBar
        selectedType={selectedType}
        selectedBudget={selectedBudget}
        selectedDuration={selectedDuration}
        selectedSeason={selectedSeason}
        resultCount={filteredDestinations.length}
        onTypeChange={setSelectedType}
        onBudgetChange={setSelectedBudget}
        onDurationChange={setSelectedDuration}
        onSeasonChange={setSelectedSeason}
        onClearFilters={handleClearFilters}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-10">
        
        {/* 3. ✨ Recommended for You Section */}
        <RecommendedDestinations
          destinations={ALL_DESTINATIONS}
          onExplore={(d) => setSelectedDestinationForModal(d)}
          onPlanTrip={handlePlanTrip}
        />

        {/* 4. Explore by Experience Cluster Cards */}
        <DestinationCategories
          onSelectCategory={(cat) => {
            setSelectedType(cat);
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }}
        />

        {/* 5. Live Destination Intelligence (What's good to visit right now?) */}
        <LiveIntelligenceSection
          destinations={ALL_DESTINATIONS}
          onExplore={(d) => setSelectedDestinationForModal(d)}
        />

        {/* 6. Dynamic Budget Explorer */}
        <BudgetExplorer
          destinations={ALL_DESTINATIONS}
          onSelectDestination={(d) => setSelectedDestinationForModal(d)}
          onPlanTrip={handlePlanTrip}
        />

        {/* 7. Comprehensive Catalog / Filtered Destination Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                All Destinations ({filteredDestinations.length})
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Live curated destination intelligence with SafeBound Match scores.
              </p>
            </div>
          </div>

          {filteredDestinations.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto">
              <h3 className="text-base font-bold text-slate-900">No destinations match this filter</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Try clearing filters or changing your budget/season constraints.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-5 py-2 bg-brand-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  onExplore={(d) => setSelectedDestinationForModal(d)}
                  onPlanTrip={handlePlanTrip}
                />
              ))}
            </div>
          )}
        </section>

        {/* 8. Interactive Geographic Map Explorer */}
        <MapExplorer
          destinations={ALL_DESTINATIONS}
          onSelectDestination={(d) => setSelectedDestinationForModal(d)}
        />

        {/* 9. AI Destination Finder Card (Can't decide where to go?) */}
        <AIDestinationFinder />

        {/* 10. Final Call to Action */}
        <section className="text-center py-10 space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Still not sure where to go?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            Tell SafeBound your budget, dates and travel style. Let our autonomous AI agent find and package the ideal trip for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/plan-trip')}
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>✨ Plan My Trip</span>
            </button>

            <button
              onClick={() => navigate('/ai-chat')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl border border-slate-200 shadow-xs flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-brand-600" />
              <span>🤖 Chat with SafeBound AI</span>
            </button>
          </div>
        </section>

      </div>

      {/* SafeBound Destination Intelligence Score Breakdown Modal */}
      <DestinationDetailModal
        destination={selectedDestinationForModal}
        onClose={() => setSelectedDestinationForModal(null)}
        onPlanTrip={handlePlanTrip}
      />

    </div>
  );
};
