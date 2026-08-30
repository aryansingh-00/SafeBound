import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DealsHero } from '../components/deals-page/DealsHero';
import { LiveDealStatusStrip } from '../components/deals-page/LiveDealStatusStrip';
import { DealCategoryTabs } from '../components/deals-page/DealCategoryTabs';
import { DealFilterSidebar } from '../components/deals-page/DealFilterSidebar';
import { DealOfTheDay } from '../components/deals-page/DealOfTheDay';
import { PriceDropAlerts } from '../components/deals-page/PriceDropAlerts';
import { BestValueSection } from '../components/deals-page/BestValueSection';
import { DealCard } from '../components/deals-page/DealCard';
import { AIDealFinder } from '../components/deals-page/AIDealFinder';
import { DealComparisonMatrix } from '../components/deals-page/DealComparisonMatrix';
import { PriceChangeAlert } from '../components/deals-page/PriceChangeAlert';
import { DealDetailModal } from '../components/deals-page/DealDetailModal';
import { DealOptimizerModal } from '../components/deals-page/DealOptimizerModal';
import { ALL_DEALS, DealItem } from '../data/dealsData';
import { Sparkles, MessageSquare, Tag } from 'lucide-react';
import { Deal, GeneratedTripPlan } from '../types';
import { SAMPLE_GENERATED_TRIPS } from '../data/sampleTrips';

interface DealsPageProps {
  onBookDeal?: (deal: Deal) => void;
}

export const DealsPage: React.FC<DealsPageProps> = ({ onBookDeal }) => {
  const navigate = useNavigate();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxBudget, setMaxBudget] = useState(50000);
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDeparture, setSelectedDeparture] = useState('All Cities');
  const [selectedMonth, setSelectedMonth] = useState('Any Month');
  const [selectedCancellation, setSelectedCancellation] = useState('Any');

  // Modals state
  const [selectedDealForModal, setSelectedDealForModal] = useState<DealItem | null>(null);
  const [dealToOptimize, setDealToOptimize] = useState<DealItem | null>(null);
  const [dealsList, setDealsList] = useState<DealItem[]>(ALL_DEALS);

  // Dynamic Filtering
  const filteredDeals = useMemo(() => {
    return dealsList.filter((deal) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesDest = deal.destination.toLowerCase().includes(q);
        const matchesTitle = deal.title.toLowerCase().includes(q);
        const matchesInclusions = deal.inclusions.transport.toLowerCase().includes(q) || deal.inclusions.hotel.toLowerCase().includes(q);
        if (!matchesDest && !matchesTitle && !matchesInclusions) return false;
      }

      // Category Tab
      if (selectedCategory !== 'All') {
        if (deal.category !== selectedCategory) return false;
      }

      // Budget
      if (deal.currentPrice > maxBudget) return false;

      // Discount
      if (deal.discountPercentage < selectedDiscount) return false;

      // Duration
      if (selectedDuration !== 'All') {
        if (deal.durationCategory !== selectedDuration) return false;
      }

      // Destination Type
      if (selectedType !== 'All') {
        if (deal.destinationType !== selectedType) return false;
      }

      // Departure
      if (selectedDeparture !== 'All Cities') {
        if (!deal.startingCity.includes(selectedDeparture.split(' ')[0])) return false;
      }

      // Cancellation
      if (selectedCancellation !== 'Any') {
        if (deal.cancellationPolicy !== selectedCancellation) return false;
      }

      return true;
    });
  }, [
    dealsList,
    searchQuery,
    selectedCategory,
    maxBudget,
    selectedDiscount,
    selectedDuration,
    selectedType,
    selectedDeparture,
    selectedCancellation,
  ]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxBudget(50000);
    setSelectedDiscount(0);
    setSelectedDuration('All');
    setSelectedType('All');
    setSelectedDeparture('All Cities');
    setSelectedMonth('Any Month');
    setSelectedCancellation('Any');
  };

  const handleApplyOptimizedDeal = (deal: DealItem, newPrice: number) => {
    setDealsList((prev) =>
      prev.map((d) =>
        d.id === deal.id
          ? {
              ...d,
              currentPrice: newPrice,
              discountPercentage: Math.round(((d.originalPrice - newPrice) / d.originalPrice) * 100),
              liveTimestamp: '⚡ AI Optimized just now',
            }
          : d
      )
    );
    setDealToOptimize(null);
  };

  const handleBookPackage = (deal: DealItem) => {
    if (onBookDeal) {
      onBookDeal({
        id: deal.id,
        title: deal.title,
        destination: deal.destination,
        duration: deal.duration,
        originalPrice: deal.originalPrice,
        currentPrice: deal.currentPrice,
        discountPercentage: deal.discountPercentage,
        safetyScore: deal.safetyScore,
        transport: deal.inclusions.transport,
        hotel: deal.inclusions.hotel,
        activitiesCount: deal.inclusions.activitiesCount,
        activitiesList: deal.inclusions.activitiesList,
        imageUrl: deal.imageUrl,
        updatedAgo: deal.liveTimestamp,
        includes: [deal.inclusions.transport, deal.inclusions.hotel, `${deal.inclusions.activitiesCount} Activities`, deal.inclusions.meals],
      });
    } else {
      navigate('/booking/review');
    }
  };

  const dealOfTheDayItem = dealsList.find((d) => d.isDealOfTheDay) || dealsList[0];

  return (
    <div className="bg-[#FBFBFE] min-h-screen pb-16">
      
      {/* 1. Deals Hero with Natural Language Deal Search */}
      <DealsHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => {}}
      />

      {/* 2. Live Deal Status Trust Strip */}
      <LiveDealStatusStrip />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 3. Horizontal Deal Category Tabs */}
        <DealCategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 4. Live Price Change Radar Alert Banner */}
        <PriceChangeAlert
          onViewAlternative={() => setSelectedDealForModal(dealOfTheDayItem)}
        />

        {/* 5. 🔥 Deal of the Day Spotlight Card */}
        <DealOfTheDay
          deal={dealOfTheDayItem}
          onViewDeal={(d) => setSelectedDealForModal(d)}
          onOptimize={(d) => setDealToOptimize(d)}
        />

        {/* 6. Recent Live Price Drops Strip */}
        <PriceDropAlerts
          deals={dealsList}
          onSelectDeal={(d) => setSelectedDealForModal(d)}
        />

        {/* 7. Main Marketplace Layout: Filter Sidebar + Deal Grid */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          
          {/* Left: Filter Sidebar */}
          <DealFilterSidebar
            maxBudget={maxBudget}
            selectedDiscount={selectedDiscount}
            selectedDuration={selectedDuration}
            selectedType={selectedType}
            selectedDeparture={selectedDeparture}
            selectedMonth={selectedMonth}
            selectedCancellation={selectedCancellation}
            onBudgetChange={setMaxBudget}
            onDiscountChange={setSelectedDiscount}
            onDurationChange={setSelectedDuration}
            onTypeChange={setSelectedType}
            onDepartureChange={setSelectedDeparture}
            onMonthChange={setSelectedMonth}
            onCancellationChange={setSelectedCancellation}
            onClearFilters={handleClearFilters}
          />

          {/* Right: Deal Results Stream */}
          <div className="flex-1 w-full space-y-10">
            
            {/* Best Value Section */}
            <BestValueSection
              deals={dealsList}
              onViewDeal={(d) => setSelectedDealForModal(d)}
              onOptimize={(d) => setDealToOptimize(d)}
            />

            {/* AI Deal Hunter Card */}
            <AIDealFinder />

            {/* Filtered Deals Grid */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-slate-900">
                  All Live Deals ({filteredDeals.length})
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Sorted by SafeBound Best Match
                </span>
              </div>

              {filteredDeals.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                  <h4 className="text-base font-bold text-slate-900">No deals match these filter constraints</h4>
                  <p className="text-xs text-slate-500 mt-1 mb-4">
                    Try expanding your budget slider or clearing minimum discount filters.
                  </p>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="px-5 py-2 bg-brand-600 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filteredDeals.map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      onViewDeal={(d) => setSelectedDealForModal(d)}
                      onOptimize={(d) => setDealToOptimize(d)}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Deal Comparison Matrix */}
            <DealComparisonMatrix
              deals={dealsList}
              onSelectDeal={(d) => setSelectedDealForModal(d)}
            />

          </div>

        </div>

        {/* 8. Final Call to Action */}
        <section className="text-center py-10 space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Can't find the right deal?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            Tell SafeBound your budget, dates and preferences. We'll search live inventory and optimize the trip for you.
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

      {/* Deal Detail Modal */}
      <DealDetailModal
        deal={selectedDealForModal}
        onClose={() => setSelectedDealForModal(null)}
        onBookPackage={handleBookPackage}
        onOptimize={(d) => setDealToOptimize(d)}
      />

      {/* Deal Optimizer Modal */}
      <DealOptimizerModal
        deal={dealToOptimize}
        onClose={() => setDealToOptimize(null)}
        onApplyOptimizedDeal={handleApplyOptimizedDeal}
      />

    </div>
  );
};
