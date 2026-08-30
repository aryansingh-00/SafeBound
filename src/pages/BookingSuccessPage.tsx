import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Send, Lock, ArrowRight, CheckCircle2, ChevronRight, Home } from 'lucide-react';
import { SuccessHero } from '../components/booking-success/SuccessHero';
import { ConfirmedServicesCards } from '../components/booking-success/ConfirmedServicesCards';
import { PaymentReceiptCard } from '../components/booking-success/PaymentReceiptCard';
import { EmailDispatchNotice } from '../components/booking-success/EmailDispatchNotice';
import { SuccessDocumentsVault } from '../components/booking-success/SuccessDocumentsVault';
import { NextJourneyTimelineCTA } from '../components/booking-success/NextJourneyTimelineCTA';
import { ContinuousMonitoringCard } from '../components/booking-success/ContinuousMonitoringCard';
import { AdaptiveWhatNextCard } from '../components/booking-success/AdaptiveWhatNextCard';
import { SuccessAIAssistant } from '../components/booking-success/SuccessAIAssistant';
import { SuccessTripHealth } from '../components/booking-success/SuccessTripHealth';
import { SafeShareTripModal } from '../components/booking-success/SafeShareTripModal';
import { SuccessSupportCard } from '../components/booking-success/SuccessSupportCard';
import { DEFAULT_BOOKING_SUCCESS_RECORD } from '../data/bookingSuccessData';

export const BookingSuccessPage: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();

  const [record, setRecord] = useState(DEFAULT_BOOKING_SUCCESS_RECORD);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  return (
    <div className="bg-[#FBFBFE] min-h-screen pb-24 text-slate-900">
      
      {/* Simplified Distraction-Free Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
              <Send className="w-4 h-4 text-white transform -rotate-45 translate-x-0.5 -translate-y-0.5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              Safe<span className="text-brand-600">Bound</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>🔒 256-Bit Escrow Secured Booking</span>
            </span>

            <Link
              to="/dashboard"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 px-3 py-1.5 rounded-xl hover:bg-brand-50 transition hidden sm:inline"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8">
        
        {/* 1. Success Hero & SafeBound Trip ID */}
        <SuccessHero
          record={record}
          onOpenShareModal={() => setShareModalOpen(true)}
        />

        {/* 2. Main 2-Column Responsive Confirmation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 cols): Bookings, Itinerary & Documents */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 4 Confirmed Service Cards */}
            <ConfirmedServicesCards services={record.confirmedServices} />

            {/* Direct Itinerary CTA */}
            <NextJourneyTimelineCTA tripId={record.tripId} />

            {/* Download Documents Vault */}
            <SuccessDocumentsVault documents={record.documents} />

            {/* Continuous Sentinel Monitoring */}
            <ContinuousMonitoringCard />

            {/* Adaptive What Happens Next Flow */}
            <AdaptiveWhatNextCard />

          </div>

          {/* Right Column (5 cols): Payment, Email, Health & AI Support */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Payment Confirmation & Budget Summary */}
            <PaymentReceiptCard record={record} />

            {/* Email Dispatch Notice */}
            <EmailDispatchNotice email={record.email.address} />

            {/* 5-Factor Trip Health Readiness */}
            <SuccessTripHealth />

            {/* Context-Aware AI Assistant Prompts */}
            <SuccessAIAssistant tripId={record.tripId} />

            {/* 24/7 Concierge Support Card */}
            <SuccessSupportCard />

          </div>

        </div>

        {/* Final Bottom Navigation Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-bold">
          <div className="flex items-center gap-2 text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All 4 supplier contracts safely stored and monitored in SafeBound Escrow.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
            >
              Open Dashboard
            </button>

            <button
              type="button"
              onClick={() => navigate(`/trips/${record.tripId}/confirmed`)}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <span>View Full Itinerary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </main>

      {/* Safe Share Trip Modal */}
      <SafeShareTripModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        record={record}
      />

    </div>
  );
};
