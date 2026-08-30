import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmationHero } from '../components/trip-confirmation/ConfirmationHero';
import { BookingSummaryCards } from '../components/trip-confirmation/BookingSummaryCards';
import { ItineraryTimelineView } from '../components/trip-confirmation/ItineraryTimelineView';
import { LiveMonitoringBanner } from '../components/trip-confirmation/LiveMonitoringBanner';
import { AdaptiveExplainerCard } from '../components/trip-confirmation/AdaptiveExplainerCard';
import { WeatherForecastCard } from '../components/trip-confirmation/WeatherForecastCard';
import { DestinationConditionsCard } from '../components/trip-confirmation/DestinationConditionsCard';
import { ConfirmedDocumentsVault } from '../components/trip-confirmation/ConfirmedDocumentsVault';
import { EmailStatusCard } from '../components/trip-confirmation/EmailStatusCard';
import { SpendingSummaryCard } from '../components/trip-confirmation/SpendingSummaryCard';
import { ShareTripModal } from '../components/trip-confirmation/ShareTripModal';
import { EmergencySupportCard } from '../components/trip-confirmation/EmergencySupportCard';
import { ArrowRight, Sparkles, MessageSquare, Compass, Share2 } from 'lucide-react';

export const TripConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { tripId = 'SB-MUSSOORIE-4D' } = useParams();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleScrollToItinerary = () => {
    const el = document.getElementById('full-itinerary-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadDetails = () => {
    alert('Downloading complete SafeBound travel packet & offline itinerary PDF...');
  };

  const handleEmailDetails = () => {
    alert('Email confirmation re-dispatched to aryan@safebound.ai!');
  };

  const handleAskAI = () => {
    navigate(`/ai-chat?trip=${tripId}`);
  };

  return (
    <div className="bg-[#FBFBFE] min-h-screen py-8 sm:py-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. Confirmation Hero with Route & Top Actions */}
        <ConfirmationHero
          onScrollToItinerary={handleScrollToItinerary}
          onDownloadDetails={handleDownloadDetails}
          onEmailDetails={handleEmailDetails}
          onAskAI={handleAskAI}
        />

        {/* 2. Confirmed Booking References Summary Strip */}
        <BookingSummaryCards />

        {/* 3. Main 2-Column Responsive Itinerary Command Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Itinerary, Live Monitoring, Adaptive Explainer, Documents Vault (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Live Monitoring Persistent Banner */}
            <LiveMonitoringBanner />

            {/* Visual Adaptive Journey Flow */}
            <AdaptiveExplainerCard />

            {/* Complete Day-by-Day Interactive Timeline */}
            <ItineraryTimelineView />

            {/* Encrypted Documents Vault */}
            <ConfirmedDocumentsVault />

          </div>

          {/* Right Column: Spending, Weather, Conditions, Email & Support (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Spending & Budget Buffer */}
            <SpendingSummaryCard />

            {/* 5-Day Weather Forecast */}
            <WeatherForecastCard />

            {/* Safety & Road Conditions */}
            <DestinationConditionsCard />

            {/* Email Dispatch Card */}
            <EmailStatusCard />

            {/* Share Itinerary Trigger */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-brand-600" />
                <span>Share With Co-Travellers</span>
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Generate a privacy-safe link for friends & family to track your daily schedule without viewing payments.
              </p>
              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="w-full py-2.5 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs rounded-xl border border-brand-200 transition flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Generate Safe Share Link</span>
              </button>
            </div>

            {/* Emergency & Concierge Helpline */}
            <EmergencySupportCard />

          </div>

        </div>

        {/* Bottom Call to Action */}
        <section className="text-center py-12 space-y-4 max-w-2xl mx-auto border-t border-slate-200/80 pt-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your trip is ready. Enjoy the journey.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            SafeBound's 24/7 autonomous monitoring agents stay active in the background until your return.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/trips')}
              className="w-full sm:w-auto px-7 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2"
            >
              <span>View My Trips Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate(`/ai-chat?trip=${tripId}`)}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-2xl transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-brand-600" />
              <span>Ask SafeBound AI</span>
            </button>

            <button
              onClick={() => navigate('/plan-trip')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-2xl border border-slate-200 shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Plan Another Trip</span>
            </button>
          </div>
        </section>

      </div>

      {/* Share Itinerary Modal */}
      <ShareTripModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        tripId={tripId}
      />

    </div>
  );
};
