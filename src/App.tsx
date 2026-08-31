import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { PlanTripPage } from './pages/PlanTripPage';
import { AIChatPage } from './pages/AIChatPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DealsPage } from './pages/DealsPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { BookingReviewPage } from './pages/BookingReviewPage';
import { BookingProcessingPage } from './pages/BookingProcessingPage';
import { TripConfirmationPage } from './pages/TripConfirmationPage';
import { ProfilePage } from './pages/ProfilePage';
import { TripResultsPage } from './pages/TripResultsPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { DashboardPage } from './pages/DashboardPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AuthPage } from './pages/AuthPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { DecisionAgentPage } from './pages/DecisionAgentPage';
import { PackageBuilderPage } from './pages/PackageBuilderPage';
import { BookingOrchestratorPage } from './pages/BookingOrchestratorPage';
import { SpecializedAgentsPage } from './pages/SpecializedAgentsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LiveMonitoringPage } from './pages/LiveMonitoringPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { SecurityPage } from './pages/SecurityPage';
import { TestingPage } from './pages/TestingPage';
import { DemoPage } from './pages/DemoPage';
import { AIChatDrawer } from './components/chat/AIChatDrawer';
import { AIProcessingModal } from './components/hero/AIProcessingModal';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { AuthModal } from './components/modals/AuthModal';
import { TripPlanRequest, GeneratedTripPlan, Destination, Deal } from './types';
import { SAMPLE_GENERATED_TRIPS } from './data/sampleTrips';

function AppContent() {
  const navigate = useNavigate();

  // Global Modals State
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'signin' | 'signup' }>({
    isOpen: false,
    mode: 'signin',
  });
  
  // AI Planning Simulation Modal
  const [isPlanningModalOpen, setIsPlanningModalOpen] = useState(false);
  const [activePlanRequest, setActivePlanRequest] = useState<TripPlanRequest | null>(null);

  // Selected Plan for Checkout
  const [selectedPlanForReview, setSelectedPlanForReview] = useState<GeneratedTripPlan | null>(null);
  const [checkoutModal, setCheckoutModal] = useState<{
    isOpen: boolean;
    plan: GeneratedTripPlan | null;
  }>({
    isOpen: false,
    plan: null,
  });

  const [bookedTrips, setBookedTrips] = useState<GeneratedTripPlan[]>([
    {
      ...SAMPLE_GENERATED_TRIPS['manali-4d'],
      id: 'SB-4598721',
      title: 'Goa Getaway 🌴',
      destination: 'Goa, India',
      estimatedCost: 38450,
      totalBudget: 45000,
      status: 'Confirmed',
      pnr: 'SB-4598721',
    }
  ]);

  // Handler to start AI trip planning from hero or buttons
  const handleStartPlanning = (req: TripPlanRequest) => {
    setActivePlanRequest(req);
    setIsPlanningModalOpen(true);
  };

  // Handler when user plans trip for specific destination
  const handlePlanTripForDestination = (dest: Destination) => {
    setActivePlanRequest({
      destination: `${dest.name}, ${dest.state}`,
      budget: dest.startingPrice * 2 + 10000,
      travellers: 2,
      interests: dest.tags,
      prompt: `Plan a trip to ${dest.name} for 2 people with budget under ₹${(dest.startingPrice * 2 + 10000).toLocaleString('en-IN')}`,
    });
    setIsPlanningModalOpen(true);
  };

  // Handler when user clicks "View Deal / Book Deal"
  const handleBookDeal = (deal: Deal) => {
    const dealPlan: GeneratedTripPlan = {
      id: deal.id,
      title: deal.title,
      destination: deal.destination,
      duration: deal.duration,
      startingCity: 'New Delhi (DEL)',
      travellers: 2,
      totalBudget: deal.originalPrice * 2,
      estimatedCost: deal.currentPrice * 2,
      safetyScore: deal.safetyScore,
      weatherForecast: 'Optimal Travel Conditions',
      breakdown: {
        flights: { title: deal.transport, cost: Math.round(deal.currentPrice * 0.7), details: 'Included in package' },
        hotel: { title: deal.hotel, cost: Math.round(deal.currentPrice * 0.9), rating: 4.8, details: 'Breakfast & taxes included' },
        transfers: { title: 'Dedicated private cab transfers', cost: Math.round(deal.currentPrice * 0.2), details: 'All intercity routes' },
        activities: { title: `${deal.activitiesCount} Curated activities`, cost: Math.round(deal.currentPrice * 0.15), details: deal.activitiesList.join(', ') },
        taxes: { title: 'GST & SafeBound protection', cost: Math.round(deal.currentPrice * 0.05), details: 'All taxes inclusive' }
      },
      days: SAMPLE_GENERATED_TRIPS['manali-4d'].days,
      status: 'Selected'
    };

    setSelectedPlanForReview(dealPlan);
    setCheckoutModal({
      isOpen: true,
      plan: dealPlan,
    });
  };

  // Handler when proceeding from AI reasoning modal to booking
  const handleProceedToBooking = (plan: GeneratedTripPlan) => {
    setIsPlanningModalOpen(false);
    setSelectedPlanForReview(plan);
    setCheckoutModal({
      isOpen: true,
      plan,
    });
  };

  // Handler when booking is confirmed in Razorpay simulation
  const handleBookingComplete = (completedPlan: GeneratedTripPlan) => {
    setBookedTrips((prev) => [completedPlan, ...prev]);
    setTimeout(() => {
      navigate('/trips');
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFE] text-slate-900">
      
      {/* Top Navbar */}
      <Navbar
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        onOpenChat={() => navigate('/ai-chat')}
      />

      {/* Main App Routes */}
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onStartPlanning={handleStartPlanning}
                onOpenChat={() => navigate('/ai-chat')}
                onBookDeal={handleBookDeal}
                onPlanTripForDestination={handlePlanTripForDestination}
              />
            }
          />
          <Route
            path="/plan-trip"
            element={
              <PlanTripPage
                onStartPlanning={handleStartPlanning}
                onOpenChat={() => navigate('/ai-chat')}
                onProceedToCheckout={(plan) => {
                  setSelectedPlanForReview(plan);
                  navigate('/booking/review');
                }}
              />
            }
          />
          <Route
            path="/ai-chat"
            element={
              <AIChatPage
                onProceedToBookingReview={(plan) => {
                  setSelectedPlanForReview(plan);
                }}
              />
            }
          />
          <Route
            path="/destinations"
            element={
              <DestinationsPage
                onPlanTripForDestination={handlePlanTripForDestination}
              />
            }
          />
          <Route
            path="/deals"
            element={
              <DealsPage
                onBookDeal={handleBookDeal}
              />
            }
          />
          <Route
            path="/trips"
            element={
              <MyTripsPage
                bookedTrips={bookedTrips}
                onOpenChat={() => navigate('/ai-chat')}
              />
            }
          />
          <Route
            path="/booking/review"
            element={
              <BookingReviewPage
                plan={selectedPlanForReview}
                onConfirmBooking={(plan) => {
                  setBookedTrips((prev) => [plan, ...prev]);
                }}
              />
            }
          />
          <Route
            path="/booking/processing"
            element={<BookingProcessingPage />}
          />
          <Route
            path="/trips/:tripId/confirmed"
            element={<TripConfirmationPage />}
          />
          <Route
            path="/trips/confirmed"
            element={<TripConfirmationPage />}
          />
          <Route
            path="/profile"
            element={<ProfilePage />}
          />
          <Route
            path="/trip-results"
            element={
              <TripResultsPage
                onSelectPlanForBooking={(plan) => {
                  setSelectedPlanForReview(plan);
                }}
              />
            }
          />
          <Route
            path="/package/:packageId"
            element={
              <PackageDetailPage
                onProceedToReview={(plan) => {
                  setSelectedPlanForReview(plan);
                }}
              />
            }
          />
          <Route
            path="/notifications"
            element={<NotificationsPage />}
          />
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />
          <Route
            path="/booking/success/:tripId"
            element={<BookingSuccessPage />}
          />
          <Route
            path="/booking/success"
            element={<BookingSuccessPage />}
          />
          <Route
            path="/admin"
            element={<AdminDashboardPage />}
          />
          <Route
            path="/agent-console"
            element={<AdminDashboardPage />}
          />
          <Route
            path="/login"
            element={<AuthPage />}
          />
          <Route
            path="/signup"
            element={<AuthPage />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route
            path="/onboarding"
            element={<OnboardingPage />}
          />
          <Route
            path="/architecture"
            element={<ArchitecturePage />}
          />
          <Route
            path="/decision-agent"
            element={<DecisionAgentPage />}
          />
          <Route
            path="/package-builder"
            element={<PackageBuilderPage />}
          />
          <Route
            path="/booking-orchestrator"
            element={<BookingOrchestratorPage />}
          />
          <Route
            path="/provider-agents"
            element={<SpecializedAgentsPage />}
          />
          <Route
            path="/checkout/:tripId"
            element={<CheckoutPage />}
          />
          <Route
            path="/checkout"
            element={<CheckoutPage />}
          />
          <Route
            path="/live-monitoring"
            element={<LiveMonitoringPage />}
          />
          <Route
            path="/trips/:tripId/monitoring"
            element={<LiveMonitoringPage />}
          />
          <Route
            path="/trips/:tripId/itinerary"
            element={<ItineraryPage />}
          />
          <Route
            path="/itinerary"
            element={<ItineraryPage />}
          />
          <Route
            path="/security"
            element={<SecurityPage />}
          />
          <Route
            path="/testing"
            element={<TestingPage />}
          />
          <Route
            path="/demo"
            element={<DemoPage />}
          />
        </Routes>
      </div>

      {/* Global Modals & Drawers */}
      <AIChatDrawer
        isOpen={isChatDrawerOpen}
        onClose={() => setIsChatDrawerOpen(false)}
        onSelectPlan={(plan) => {
          setSelectedPlanForReview(plan);
          navigate('/booking/review');
        }}
      />

      <AIProcessingModal
        isOpen={isPlanningModalOpen}
        onClose={() => setIsPlanningModalOpen(false)}
        request={activePlanRequest}
        onProceedToBooking={handleProceedToBooking}
      />

      <CheckoutModal
        isOpen={checkoutModal.isOpen}
        onClose={() => setCheckoutModal({ isOpen: false, plan: null })}
        plan={checkoutModal.plan}
        onBookingComplete={handleBookingComplete}
      />

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, mode: 'signin' })}
        initialMode={authModal.mode}
      />

      {/* Global Footer */}
      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
