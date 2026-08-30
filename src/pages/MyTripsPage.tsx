import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripHeroCard } from '../components/trips-page/TripHeroCard';
import { DisruptionAlert } from '../components/trips-page/DisruptionAlert';
import { TripTimeline } from '../components/trips-page/TripTimeline';
import { BookingsSection } from '../components/trips-page/BookingsSection';
import { DocumentVault } from '../components/trips-page/DocumentVault';
import { TripWeatherCard } from '../components/trips-page/TripWeatherCard';
import { SafetyStatusCard } from '../components/trips-page/SafetyStatusCard';
import { BudgetSummaryCard } from '../components/trips-page/BudgetSummaryCard';
import { AITripAssistantCard } from '../components/trips-page/AITripAssistantCard';
import { ReoptimizationCard } from '../components/trips-page/ReoptimizationCard';
import { RecoveryCenter } from '../components/trips-page/RecoveryCenter';
import { ActivityLogTimeline } from '../components/trips-page/ActivityLogTimeline';
import { ManageTripMenu } from '../components/trips-page/ManageTripMenu';
import { PastTripsSection } from '../components/trips-page/PastTripsSection';
import { EmptyTripsState } from '../components/trips-page/EmptyTripsState';
import { ACTIVE_UPCOMING_TRIP, UpcomingTripData, TripBookingDetail } from '../data/tripsData';
import { GeneratedTripPlan } from '../types';
import { Plus, Sparkles, MessageSquare, Radio, ShieldCheck } from 'lucide-react';

interface MyTripsPageProps {
  bookedTrips?: GeneratedTripPlan[];
  onOpenChat?: () => void;
}

export const MyTripsPage: React.FC<MyTripsPageProps> = ({
  bookedTrips = [],
  onOpenChat,
}) => {
  const navigate = useNavigate();

  const [activeTrip, setActiveTrip] = useState<UpcomingTripData | null>(ACTIVE_UPCOMING_TRIP);
  const [isManageMenuOpen, setIsManageMenuOpen] = useState(false);

  const handleOpenItinerary = () => {
    const timelineEl = document.getElementById('trip-timeline-section');
    if (timelineEl) {
      timelineEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewBooking = (b: TripBookingDetail) => {
    alert(`Opening verified booking voucher for: ${b.title}\nRef: ${b.bookingRef}\nStatus: ${b.status}`);
  };

  return (
    <div className="bg-[#FBFBFE] min-h-screen py-6 sm:py-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>🟢 Trip Monitoring Active</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              My Trips
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Everything you've booked, organized and continuously monitored in one place.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => navigate('/plan-trip')}
              className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md shadow-brand-600/30 transition flex items-center gap-1.5 transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>+ Plan a New Trip</span>
            </button>
          </div>
        </div>

        {!activeTrip ? (
          <EmptyTripsState />
        ) : (
          <>
            {/* 1. Upcoming Trip Hero Card */}
            <TripHeroCard
              trip={activeTrip}
              onOpenItinerary={handleOpenItinerary}
              onManageTrip={() => setIsManageMenuOpen(true)}
            />

            {/* 2. Live Disruption Alert Banner */}
            <DisruptionAlert
              onViewChanges={handleOpenItinerary}
            />

            {/* 3. Autonomous Recovery Center Simulator */}
            <RecoveryCenter />

            {/* 4. Main 2-Column Responsive Dashboard Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Itinerary, Bookings, Documents, Past Trips (8 cols) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Timeline */}
                <div id="trip-timeline-section">
                  <TripTimeline timeline={activeTrip.timeline} />
                </div>

                {/* Coordinated Bookings Section */}
                <BookingsSection
                  bookings={activeTrip.bookings}
                  onViewBooking={handleViewBooking}
                />

                {/* Secure Documents Vault */}
                <DocumentVault documents={activeTrip.documents} />

                {/* Completed Past Trips Section */}
                <PastTripsSection
                  onViewPastTrip={(title) => alert(`Opening historical archive for ${title}.`)}
                />

              </div>

              {/* Right Column: Intelligence Telemetry Sidebar (4 cols) */}
              <div className="lg:col-span-4 space-y-6 sticky top-24">
                
                {/* 1. Ask SafeBound AI Card (Pre-loaded with Trip Context) */}
                <AITripAssistantCard tripId={activeTrip.id} />

                {/* 2. ⚡ Re-Optimize My Trip Engine */}
                <ReoptimizationCard />

                {/* 3. Real-Time Weather Forecast */}
                <TripWeatherCard weather={activeTrip.weather} />

                {/* 4. Destination Safety Status */}
                <SafetyStatusCard safety={activeTrip.safetyStatus} />

                {/* 5. Trip Spending & Buffer Summary */}
                <BudgetSummaryCard
                  totalBudget={activeTrip.totalBudget}
                  totalCost={activeTrip.totalCost}
                  remainingBuffer={activeTrip.remainingBuffer}
                />

                {/* 6. Background Monitoring Audit Log */}
                <ActivityLogTimeline logs={activeTrip.monitoringLogs} />

              </div>

            </div>
          </>
        )}

        {/* Bottom Call to Action */}
        <section className="text-center py-10 space-y-4 max-w-2xl mx-auto border-t border-slate-200/80 pt-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Need help with your trip?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            SafeBound's 24/7 autonomous agents are ready to assist with rescheduling, local tips, and immediate emergency coordination.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(`/ai-chat?trip=${activeTrip?.id || 'TRIP'}`)}
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-brand-200" />
              <span>🤖 Ask SafeBound AI</span>
            </button>

            <button
              onClick={() => navigate('/plan-trip')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl border border-slate-200 shadow-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>✨ Plan Another Trip</span>
            </button>
          </div>
        </section>

      </div>

      {/* Manage Trip Modal */}
      <ManageTripMenu
        trip={activeTrip}
        isOpen={isManageMenuOpen}
        onClose={() => setIsManageMenuOpen(false)}
      />

    </div>
  );
};
