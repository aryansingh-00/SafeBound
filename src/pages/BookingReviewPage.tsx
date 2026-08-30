import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutHeader } from '../components/booking-review/CheckoutHeader';
import { CheckoutProgress } from '../components/booking-review/CheckoutProgress';
import { PackageSummaryCard } from '../components/booking-review/PackageSummaryCard';
import { IncludedServicesList } from '../components/booking-review/IncludedServicesList';
import { TravellerCard, TravellerInfo } from '../components/booking-review/TravellerCard';
import { DocumentRequirementNotice } from '../components/booking-review/DocumentRequirementNotice';
import { AIFinalCheckCard } from '../components/booking-review/AIFinalCheckCard';
import { CancellationPolicies } from '../components/booking-review/CancellationPolicies';
import { PriceSummarySticky } from '../components/booking-review/PriceSummarySticky';
import { RazorpayPaymentModal } from '../components/booking-review/RazorpayPaymentModal';
import { GeneratedTripPlan } from '../types';
import { SAMPLE_GENERATED_TRIPS } from '../data/sampleTrips';
import { Users, Plus, ShieldCheck } from 'lucide-react';

interface BookingReviewPageProps {
  plan: GeneratedTripPlan | null;
  onConfirmBooking?: (confirmedPlan: GeneratedTripPlan) => void;
}

export const BookingReviewPage: React.FC<BookingReviewPageProps> = ({
  plan,
  onConfirmBooking,
}) => {
  const navigate = useNavigate();

  const activePlan = plan || {
    ...SAMPLE_GENERATED_TRIPS['manali-4d'],
    id: 'SB-MUSSOORIE-4D',
    title: 'Mussoorie — 4 Days All-Inclusive Package',
    destination: 'Mussoorie, Uttarakhand',
    duration: '4 Days / 3 Nights',
    startingCity: 'New Delhi (DEL)',
    travellers: 2,
    totalBudget: 40000,
    estimatedCost: 31300,
    safetyScore: 9.3,
  };

  // Travellers State with saved profile for Aryan Singh
  const [travellers, setTravellers] = useState<TravellerInfo[]>([
    {
      id: 'trv-1',
      fullName: 'Aryan Singh',
      age: 21,
      gender: 'Male',
      phone: '+91 98765 43210',
      email: 'aryan@safebound.ai',
      isLead: true,
    },
    {
      id: 'trv-2',
      fullName: 'Rhea Sharma',
      age: 26,
      gender: 'Female',
      isLead: false,
    },
  ]);

  const [isPolicyConfirmed, setIsPolicyConfirmed] = useState(false);
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);

  // Validate all travellers have names and valid ages
  const isTravellersValid = travellers.every(
    (t) => t.fullName.trim().length > 2 && t.age >= 1 && (!t.isLead || (t.email && t.phone))
  );

  const handleUpdateTraveller = (idx: number, updated: TravellerInfo) => {
    setTravellers((prev) => {
      const copy = [...prev];
      copy[idx] = updated;
      return copy;
    });
  };

  const handleAddTraveller = () => {
    setTravellers((prev) => [
      ...prev,
      {
        id: `trv-${Date.now()}`,
        fullName: '',
        age: 18,
        gender: 'Male',
        isLead: false,
      },
    ]);
  };

  const handlePaymentSuccess = () => {
    setIsRazorpayModalOpen(false);
    
    const finalizedPlan: GeneratedTripPlan = {
      ...activePlan,
      status: 'Confirmed',
      pnr: `SB-${Math.floor(1000000 + Math.random() * 9000000)}`,
    };

    if (onConfirmBooking) {
      onConfirmBooking(finalizedPlan);
    }

    navigate('/booking/processing', { state: { plan: finalizedPlan } });
  };

  return (
    <div className="bg-[#FBFBFE] min-h-screen pb-20">
      
      {/* 1. Simplified Distraction-Free Header */}
      <CheckoutHeader />

      {/* 2. 4-Stage Progress Indicator */}
      <CheckoutProgress currentStep={2} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title */}
        <div className="pb-2 border-b border-slate-200/80">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Review your trip
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Confirm your package and traveller details before single-escrow payment.
          </p>
        </div>

        {/* Main 2-Column Responsive Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Trip & Traveller Details (7-8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Trip Package Summary */}
            <PackageSummaryCard plan={activePlan} />

            {/* 2. Included Services List */}
            <IncludedServicesList plan={activePlan} />

            {/* 3. Who is Travelling (Critical Feature) */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-600" />
                    <span>Who is travelling?</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    These legal details will be used by our autonomous agents to issue tickets and vouchers.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddTraveller}
                  className="px-3.5 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs rounded-xl border border-brand-200 transition flex items-center gap-1.5 w-fit"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Traveller</span>
                </button>
              </div>

              {/* Multi-Traveller Cards */}
              <div className="space-y-4">
                {travellers.map((trv, idx) => (
                  <TravellerCard
                    key={trv.id}
                    index={idx}
                    traveller={trv}
                    onUpdate={(u) => handleUpdateTraveller(idx, u)}
                    isSavedProfile={idx === 0}
                  />
                ))}
              </div>
            </section>

            {/* 4. Identity Information Notice */}
            <DocumentRequirementNotice />

            {/* 5. SafeBound AI Final Check */}
            <AIFinalCheckCard />

            {/* 6. Cancellation & Policies */}
            <CancellationPolicies />

          </div>

          {/* Right Column: Sticky Price Summary & Payment CTA (4-5 cols) */}
          <div className="lg:col-span-4">
            <PriceSummarySticky
              plan={activePlan}
              isConfirmed={isPolicyConfirmed}
              onConfirmChange={setIsPolicyConfirmed}
              onInitiatePayment={() => setIsRazorpayModalOpen(true)}
              isValidToPay={isTravellersValid}
            />
          </div>

        </div>

      </div>

      {/* Razorpay Checkout Modal */}
      <RazorpayPaymentModal
        isOpen={isRazorpayModalOpen}
        totalAmount={activePlan.estimatedCost || 31300}
        onClose={() => setIsRazorpayModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

    </div>
  );
};
