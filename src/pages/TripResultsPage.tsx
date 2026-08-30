import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResultsHeader } from '../components/trip-results/ResultsHeader';
import { TopPickSpotlight } from '../components/trip-results/TopPickSpotlight';
import { PackageFilterBar } from '../components/trip-results/PackageFilterBar';
import { PackageCardItem } from '../components/trip-results/PackageCardItem';
import { ComparisonMatrix } from '../components/trip-results/ComparisonMatrix';
import { AIReoptimizerBanner } from '../components/trip-results/AIReoptimizerBanner';
import { HardConstraintsLock } from '../components/trip-results/HardConstraintsLock';
import { PackageDetailDrawer } from '../components/trip-results/PackageDetailDrawer';
import { FloatingAIAssistant } from '../components/trip-results/FloatingAIAssistant';
import { NoResultsFallback } from '../components/trip-results/NoResultsFallback';
import { TRIP_RESULTS_PACKAGES, TripResultPackage } from '../data/tripResultsData';
import { GeneratedTripPlan } from '../types';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

interface TripResultsPageProps {
  onSelectPlanForBooking?: (plan: GeneratedTripPlan) => void;
}

export const TripResultsPage: React.FC<TripResultsPageProps> = ({ onSelectPlanForBooking }) => {
  const navigate = useNavigate();

  const [packages, setPackages] = useState<TripResultPackage[]>(TRIP_RESULTS_PACKAGES);
  const [comparingIds, setComparingIds] = useState<string[]>(['pkg-mussoorie', 'pkg-dharamshala']);
  const [selectedDrawerPackage, setSelectedDrawerPackage] = useState<TripResultPackage | null>(null);
  const [isOptimized, setIsOptimized] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // Filter & Sort State
  const [sortBy, setSortBy] = useState('match');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const topPick = packages.find((p) => p.isTopPick) || packages[0];

  const handleToggleCompare = (pkg: TripResultPackage) => {
    setComparingIds((prev) => {
      if (prev.includes(pkg.id)) {
        return prev.filter((id) => id !== pkg.id);
      } else {
        if (prev.length >= 3) {
          alert('You can compare a maximum of 3 packages at once.');
          return prev;
        }
        return [...prev, pkg.id];
      }
    });
  };

  const handleSavePackage = (pkg: TripResultPackage) => {
    setSavedIds((prev) => {
      const isSaved = prev.includes(pkg.id);
      if (isSaved) {
        return prev.filter((id) => id !== pkg.id);
      } else {
        alert(`✓ Saved "${pkg.title}" to your profile!`);
        return [...prev, pkg.id];
      }
    });
  };

  const handleApplyOptimization = () => {
    setIsOptimized(true);
    setPackages((prev) =>
      prev.map((p) =>
        p.id === 'pkg-mussoorie'
          ? {
              ...p,
              totalPrice: 29850,
              remainingBuffer: 10150,
              hotel: {
                ...p.hotel,
                cost: 15050,
              },
            }
          : p
      )
    );
  };

  const handleProceedToReview = (pkg: TripResultPackage) => {
    const generatedPlan: GeneratedTripPlan = {
      id: pkg.id === 'pkg-mussoorie' ? 'SB-MUSSOORIE-4D' : `SB-${pkg.destination.toUpperCase()}-4D`,
      title: pkg.title,
      destination: `${pkg.destination}, ${pkg.state}`,
      duration: pkg.duration,
      startingCity: 'New Delhi (DEL)',
      travellers: 2,
      totalBudget: 40000,
      estimatedCost: pkg.totalPrice,
      safetyScore: pkg.safety.score,
      weatherForecast: `${pkg.weather.temp} ${pkg.weather.condition}`,
      breakdown: {
        flights: { title: pkg.transport.mode, cost: pkg.transport.cost, details: pkg.transport.operator },
        hotel: { title: `${pkg.hotel.stars} ${pkg.hotel.name}`, cost: pkg.hotel.cost, rating: pkg.hotel.rating, details: pkg.hotel.roomType },
        transfers: { title: pkg.transfer.type, cost: pkg.transfer.cost, details: pkg.transfer.details },
        activities: { title: `${pkg.activities.count} Curated passes`, cost: pkg.activities.cost, details: pkg.activities.list.join(', ') },
        taxes: { title: 'SafeBound escrow protection', cost: 0, details: '100% inclusive' },
      },
      days: [],
      status: 'Selected',
    };

    if (onSelectPlanForBooking) {
      onSelectPlanForBooking(generatedPlan);
    }

    navigate('/booking/review');
  };

  // Filtered & Sorted Packages
  const filteredPackages = packages
    .filter((pkg) => {
      if (selectedFilter === 'train-only') return pkg.transport.mode.includes('Train');
      if (selectedFilter === '4star-only') return pkg.hotel.stars.includes('4★') || pkg.hotel.stars.includes('5★');
      if (selectedFilter === 'under-33k') return pkg.totalPrice <= 33000;
      if (selectedFilter === 'high-safety') return pkg.safety.score >= 9.0;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.totalPrice - b.totalPrice;
      if (sortBy === 'safety') return b.safety.score - a.safety.score;
      if (sortBy === 'travel-time') return a.transport.travelTime.localeCompare(b.transport.travelTime);
      return b.matchScore - a.matchScore;
    });

  const comparingPackages = packages.filter((p) => comparingIds.includes(p.id));

  return (
    <div className="bg-[#FBFBFE] min-h-screen py-8 sm:py-12 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. Header & Applied Requirements */}
        <ResultsHeader />

        {/* 2. Top Pick Spotlight Banner */}
        <TopPickSpotlight
          topPick={topPick}
          onViewPackage={setSelectedDrawerPackage}
          onToggleCompare={handleToggleCompare}
          isComparing={comparingIds.includes(topPick.id)}
        />

        {/* 3. AI Re-Optimizer Banner */}
        <AIReoptimizerBanner
          onApplyOptimization={handleApplyOptimization}
          isOptimized={isOptimized}
        />

        {/* 4. Smart Comparison Matrix (if active) */}
        <ComparisonMatrix
          comparingPackages={comparingPackages}
          onRemoveFromCompare={(id) => setComparingIds(comparingIds.filter((cid) => cid !== id))}
          onChoosePackage={setSelectedDrawerPackage}
        />

        {/* 5. Filter & Sort Bar */}
        <PackageFilterBar
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          onClearFilters={() => {
            setSortBy('match');
            setSelectedFilter('all');
          }}
        />

        {/* 6. Package Grid Stream */}
        {filteredPackages.length === 0 ? (
          <NoResultsFallback
            onResetFilters={() => {
              setSortBy('match');
              setSelectedFilter('all');
            }}
            onRelaxBudget={() => setSelectedFilter('all')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {filteredPackages.map((pkg) => (
              <PackageCardItem
                key={pkg.id}
                pkg={pkg}
                onViewPackage={setSelectedDrawerPackage}
                onToggleCompare={handleToggleCompare}
                isComparing={comparingIds.includes(pkg.id)}
                onSavePackage={handleSavePackage}
                isSaved={savedIds.includes(pkg.id)}
              />
            ))}
          </div>
        )}

        {/* 7. Hard Constraints Protection Strip */}
        <HardConstraintsLock />

        {/* Bottom Call to Action */}
        <section className="text-center py-12 space-y-4 max-w-2xl mx-auto border-t border-slate-200/80 pt-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Didn't find what you were looking for?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            Chat directly with SafeBound AI to fine-tune activity dates, swap flights or expand your budget range.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/ai-chat')}
              className="w-full sm:w-auto px-7 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-brand-200" />
              <span>🤖 Chat with SafeBound AI</span>
            </button>

            <button
              onClick={() => navigate('/plan-trip')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-2xl border border-slate-200 shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Adjust Constraints</span>
            </button>
          </div>
        </section>

      </div>

      {/* Package Detail Drawer */}
      <PackageDetailDrawer
        pkg={selectedDrawerPackage}
        isOpen={!!selectedDrawerPackage}
        onClose={() => setSelectedDrawerPackage(null)}
        onProceedToReview={handleProceedToReview}
      />

      {/* Floating AI Assistant */}
      <FloatingAIAssistant />

    </div>
  );
};
