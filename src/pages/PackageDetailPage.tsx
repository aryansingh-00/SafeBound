import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PackageBreadcrumb } from '../components/package-detail/PackageBreadcrumb';
import { PackageHero } from '../components/package-detail/PackageHero';
import { LiveAvailabilityStrip } from '../components/package-detail/LiveAvailabilityStrip';
import { PackageOverviewCards } from '../components/package-detail/PackageOverviewCards';
import { DetailItineraryTimeline } from '../components/package-detail/DetailItineraryTimeline';
import { WhyChosenRadar } from '../components/package-detail/WhyChosenRadar';
import { HotelDetailCard } from '../components/package-detail/HotelDetailCard';
import { TransportDetailCard } from '../components/package-detail/TransportDetailCard';
import { TransferDetailCard } from '../components/package-detail/TransferDetailCard';
import { ActivityPassesCard } from '../components/package-detail/ActivityPassesCard';
import { WeatherAndSafetyCard } from '../components/package-detail/WeatherAndSafetyCard';
import { StickyPriceCard } from '../components/package-detail/StickyPriceCard';
import { PackageOptimizerCard } from '../components/package-detail/PackageOptimizerCard';
import { SimilarPackagesSection } from '../components/package-detail/SimilarPackagesSection';
import { PolicyAccordion } from '../components/package-detail/PolicyAccordion';
import { BeforeYouBookNotice } from '../components/package-detail/BeforeYouBookNotice';
import { TravellerPreviewBadge } from '../components/package-detail/TravellerPreviewBadge';
import { FloatingAIAssistant } from '../components/trip-results/FloatingAIAssistant';
import { TRIP_RESULTS_PACKAGES, TripResultPackage } from '../data/tripResultsData';
import { GeneratedTripPlan } from '../types';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

interface PackageDetailPageProps {
  onProceedToReview?: (plan: GeneratedTripPlan) => void;
}

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({ onProceedToReview }) => {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();

  const selectedPkg: TripResultPackage =
    TRIP_RESULTS_PACKAGES.find((p) => p.id === packageId) || TRIP_RESULTS_PACKAGES[0];

  const [currentPrice, setCurrentPrice] = useState(selectedPkg.totalPrice);
  const [isOptimized, setIsOptimized] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleApplyOptimization = () => {
    setIsOptimized(true);
    setCurrentPrice(29850);
    alert('✓ Package optimized! Price reduced to ₹29,850 (₹1,450 savings).');
  };

  const handleSaveTrip = () => {
    setIsSaved(!isSaved);
    alert(isSaved ? 'Removed from saved trips.' : `✓ Saved ${selectedPkg.title} to your profile!`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    alert('✓ Safe public package link copied to clipboard!');
  };

  const handleProceedToBookingReview = () => {
    const generatedPlan: GeneratedTripPlan = {
      id: selectedPkg.id === 'pkg-mussoorie' ? 'SB-MUSSOORIE-4D' : `SB-${selectedPkg.destination.toUpperCase()}-4D`,
      title: selectedPkg.title,
      destination: `${selectedPkg.destination}, ${selectedPkg.state}`,
      duration: selectedPkg.duration,
      startingCity: 'New Delhi (DEL)',
      travellers: 2,
      totalBudget: 40000,
      estimatedCost: currentPrice,
      safetyScore: selectedPkg.safety.score,
      weatherForecast: `${selectedPkg.weather.temp} ${selectedPkg.weather.condition}`,
      breakdown: {
        flights: { title: selectedPkg.transport.mode, cost: selectedPkg.transport.cost, details: selectedPkg.transport.operator },
        hotel: { title: `${selectedPkg.hotel.stars} ${selectedPkg.hotel.name}`, cost: selectedPkg.hotel.cost, rating: selectedPkg.hotel.rating, details: selectedPkg.hotel.roomType },
        transfers: { title: selectedPkg.transfer.type, cost: selectedPkg.transfer.cost, details: selectedPkg.transfer.details },
        activities: { title: `${selectedPkg.activities.count} Curated passes`, cost: selectedPkg.activities.cost, details: selectedPkg.activities.list.join(', ') },
        taxes: { title: 'SafeBound escrow protection', cost: 0, details: '100% inclusive' },
      },
      days: [],
      status: 'Selected',
    };

    if (onProceedToReview) {
      onProceedToReview(generatedPlan);
    }

    navigate('/booking/review');
  };

  return (
    <div className="bg-[#FBFBFE] min-h-screen py-6 sm:py-10 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* 1. Breadcrumb Navigation */}
        <PackageBreadcrumb destination={selectedPkg.destination} />

        {/* 2. Visual Hero */}
        <PackageHero
          pkg={{ ...selectedPkg, totalPrice: currentPrice }}
          onProceedToReview={handleProceedToBookingReview}
          onSaveTrip={handleSaveTrip}
          isSaved={isSaved}
          onShare={handleShare}
        />

        {/* 3. Real-Time Availability Verification Strip */}
        <LiveAvailabilityStrip />

        {/* 4. 2-Column Inspection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Comprehensive Components (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            <PackageOverviewCards pkg={selectedPkg} />

            <DetailItineraryTimeline pkg={selectedPkg} />

            <WhyChosenRadar />

            <HotelDetailCard pkg={selectedPkg} />

            <TransportDetailCard pkg={selectedPkg} />

            <TransferDetailCard pkg={selectedPkg} />

            <ActivityPassesCard pkg={selectedPkg} />

            <WeatherAndSafetyCard pkg={selectedPkg} />

            <PolicyAccordion />

            <BeforeYouBookNotice />

            <TravellerPreviewBadge />

            <SimilarPackagesSection currentPkgId={selectedPkg.id} />

          </div>

          {/* Right Column: Sticky Price Breakdown & AI Optimizer (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <StickyPriceCard
              pkg={{ ...selectedPkg, totalPrice: currentPrice }}
              onProceedToReview={handleProceedToBookingReview}
              isOptimized={isOptimized}
            />

            <PackageOptimizerCard
              onApplyOptimization={handleApplyOptimization}
              isOptimized={isOptimized}
            />

          </div>

        </div>

      </div>

      {/* Floating AI Assistant */}
      <FloatingAIAssistant />

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 lg:hidden flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase block">All-Inclusive</span>
          <span className="text-xl font-extrabold text-slate-900">
            ₹{currentPrice.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          type="button"
          onClick={handleProceedToBookingReview}
          className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
        >
          <span>Review & Book</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
