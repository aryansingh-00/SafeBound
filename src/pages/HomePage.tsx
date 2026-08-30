import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { TrustStrip } from '../components/trust/TrustStrip';
import { HowItWorks } from '../components/how-it-works/HowItWorks';
import { AgentBanner } from '../components/agent-showcase/AgentBanner';
import { DestinationGrid } from '../components/destinations/DestinationGrid';
import { LiveDeals } from '../components/deals/LiveDeals';
import { AgentShowcase } from '../components/agent-showcase/AgentShowcase';
import { TrustFeatures } from '../components/trust/TrustFeatures';
import { FinalCTA } from '../components/hero/FinalCTA';
import { Destination, Deal, TripPlanRequest } from '../types';

interface HomePageProps {
  onStartPlanning: (request: TripPlanRequest) => void;
  onOpenChat: () => void;
  onBookDeal: (deal: Deal) => void;
  onPlanTripForDestination: (dest: Destination) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartPlanning,
  onOpenChat,
  onBookDeal,
  onPlanTripForDestination
}) => {
  return (
    <main className="min-h-screen">
      
      {/* 1. Hero Section with AI Trip Planner */}
      <HeroSection
        onStartPlanning={onStartPlanning}
        onOpenChat={onOpenChat}
      />

      {/* 2. 4-Item Trust Strip (100% Safe Bookings, Live Re-optimization, 24/7 AI Support, 10K+ Happy Travellers) */}
      <TrustStrip />

      {/* 3. 5-Step How SafeBound Works Section */}
      <HowItWorks />

      {/* 4. AI Travel Commerce Agent Purple Banner */}
      <AgentBanner onOpenChat={onOpenChat} />

      {/* 5. Popular / Recommended Destinations Grid */}
      <DestinationGrid onPlanTripForDestination={onPlanTripForDestination} />

      {/* 6. Live Deals Section (with live re-pricing) */}
      <LiveDeals onBookDeal={onBookDeal} />

      {/* 7. Autonomous Multi-Agent Showcase */}
      <AgentShowcase />

      {/* 8. Trust & Benefits Bar */}
      <TrustFeatures />

      {/* 9. Final High-Impact CTA */}
      <FinalCTA
        onPlanTrip={() => onStartPlanning({ budget: 40000, travellers: 2 })}
        onOpenChat={onOpenChat}
      />

    </main>
  );
};
