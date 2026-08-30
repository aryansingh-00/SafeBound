import React from 'react';
import { DashboardGreeting } from '../components/dashboard/DashboardGreeting';
import { AICommandInput } from '../components/dashboard/AICommandInput';
import { UpcomingTripCard } from '../components/dashboard/UpcomingTripCard';
import { CriticalAlertCallout } from '../components/dashboard/CriticalAlertCallout';
import { ProactiveInsightCard } from '../components/dashboard/ProactiveInsightCard';
import { AIRecommendationsGrid } from '../components/dashboard/AIRecommendationsGrid';
import { LiveIntelligenceStrip } from '../components/dashboard/LiveIntelligenceStrip';
import { PriceOpportunitiesSection } from '../components/dashboard/PriceOpportunitiesSection';
import { SavedPlansWidget } from '../components/dashboard/SavedPlansWidget';
import { UpcomingActionsList } from '../components/dashboard/UpcomingActionsList';
import { RecentActivityFeed } from '../components/dashboard/RecentActivityFeed';
import { QuickBudgetSlider } from '../components/dashboard/QuickBudgetSlider';
import { TravelStyleWidget } from '../components/dashboard/TravelStyleWidget';
import { IndiaRegionalExplorer } from '../components/dashboard/IndiaRegionalExplorer';
import { FloatingAIAssistant } from '../components/trip-results/FloatingAIAssistant';
import { DASHBOARD_UPCOMING_TRIP } from '../data/dashboardData';

export const DashboardPage: React.FC = () => {
  return (
    <div className="bg-[#FBFBFE] min-h-screen py-6 sm:py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. Personalized Greeting & Metric Banner */}
        <DashboardGreeting
          userName="Aryan"
          upcomingDaysLeft={DASHBOARD_UPCOMING_TRIP.daysLeft}
          upcomingDestination={DASHBOARD_UPCOMING_TRIP.destination}
        />

        {/* 2. Central Natural Language AI Command Input */}
        <AICommandInput />

        {/* 3. Action Required Critical Callout */}
        <CriticalAlertCallout />

        {/* 4. Main 2-Column Responsive Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Upcoming Trip Command Center */}
            <UpcomingTripCard trip={DASHBOARD_UPCOMING_TRIP} />

            {/* Proactive AI Suggestion */}
            <ProactiveInsightCard />

            {/* AI Curated Recommendations */}
            <AIRecommendationsGrid />

            {/* Price Opportunities */}
            <PriceOpportunitiesSection />

            {/* Explore India Regional Navigator */}
            <IndiaRegionalExplorer />

          </div>

          {/* Right Column: Feeds & Interactive Widgets (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Live Intelligence Strip */}
            <LiveIntelligenceStrip />

            {/* Next Trip Milestones */}
            <UpcomingActionsList />

            {/* Quick Budget Explorer Slider */}
            <QuickBudgetSlider />

            {/* Saved Plans */}
            <SavedPlansWidget />

            {/* Active Travel Style */}
            <TravelStyleWidget />

            {/* Recent Autonomous Activity Feed */}
            <RecentActivityFeed />

          </div>

        </div>

      </div>

      {/* Floating AI Assistant */}
      <FloatingAIAssistant />

    </div>
  );
};
