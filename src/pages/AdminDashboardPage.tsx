import React, { useState } from 'react';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminSidebar, AdminTab } from '../components/admin/AdminSidebar';
import { OperationsKPIGrid } from '../components/admin/OperationsKPIGrid';
import { AgentSwarmGrid } from '../components/admin/AgentSwarmGrid';
import { BookingOrchestrationVisualizer } from '../components/admin/BookingOrchestrationVisualizer';
import { LiveBookingsMonitor } from '../components/admin/LiveBookingsMonitor';
import { RecoveryOperationsCenter } from '../components/admin/RecoveryOperationsCenter';
import { ProviderAPIHealthGrid } from '../components/admin/ProviderAPIHealthGrid';
import { RazorpayEscrowMonitor } from '../components/admin/RazorpayEscrowMonitor';
import { ActiveTripsSentinelMap } from '../components/admin/ActiveTripsSentinelMap';
import { LiveEventStream } from '../components/admin/LiveEventStream';
import { BuildathonDemoControls } from '../components/admin/BuildathonDemoControls';
import { ADMIN_EVENT_STREAM, LiveEventLogItem } from '../data/adminOperationsData';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [demoModeActive, setDemoModeActive] = useState(true);
  const [events, setEvents] = useState<LiveEventLogItem[]>(ADMIN_EVENT_STREAM);

  const handleTriggerScenario = (scenarioId: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    let newEvent: LiveEventLogItem;

    if (scenarioId === 'train_delay') {
      newEvent = {
        id: `evt-${Date.now()}`,
        timestamp,
        eventType: 'TRAIN_DELAY_ADAPTED',
        tripId: 'TRIP-8421',
        agentName: 'Transfer Agent',
        summary: 'Train #22457 delay of 80m confirmed. Chauffeur pickup seamlessly moved from 12:15 PM to 1:45 PM.',
        decisionFactors: ['IRCTC Live Telemetry', 'Station Chauffeur GPS (Rajesh V.)', 'Zero Surcharge Policy'],
        status: 'WARN',
      };
    } else if (scenarioId === 'hotel_overbooked') {
      newEvent = {
        id: `evt-${Date.now()}`,
        timestamp,
        eventType: 'HOTEL_RECOVERY_EXECUTED',
        tripId: 'TRIP-7392',
        agentName: 'Recovery Agent',
        summary: 'Cedar View standard suite unavailable. Auto-negotiated Executive Pine Suite at ₹800 lower cost with free breakfast.',
        decisionFactors: ['Property Inventory Signal', 'Price Protection Margin', '1-Click User Notification Sent'],
        status: 'WARN',
      };
    } else if (scenarioId === 'cab_outage') {
      newEvent = {
        id: `evt-${Date.now()}`,
        timestamp,
        eventType: 'CAB_PROVIDER_FAILOVER',
        tripId: 'TRIP-4412',
        agentName: 'Transfer Agent',
        summary: 'Primary fleet API timeout (1.8s). Auto-switched to pre-contracted hill syndicate backup sedan with zero trip disruption.',
        decisionFactors: ['Gateway Latency > 1500ms', 'Driver Reliability Score 4.9', 'SafeBound Guaranteed Pickup SLA'],
        status: 'SUCCESS',
      };
    } else if (scenarioId === 'weather_rain') {
      newEvent = {
        id: `evt-${Date.now()}`,
        timestamp,
        eventType: 'WEATHER_SLOT_RESCHEDULED',
        tripId: 'TRIP-5529',
        agentName: 'Activity Agent',
        summary: 'IMD predicted 65% rain on Day 3 afternoon. Rescheduled Gun Hill Cable Car pass to Day 2 morning (Sunny 23°C).',
        decisionFactors: ['Doppler Cloudburst Radar', 'VIP Slot Availability', 'Traveller Experience Score'],
        status: 'INFO',
      };
    } else {
      newEvent = {
        id: `evt-${Date.now()}`,
        timestamp,
        eventType: 'FULL_SWARM_ORCHESTRATION',
        tripId: `TRIP-${Math.floor(1000 + Math.random() * 9000)}`,
        agentName: 'Booking Orchestrator',
        summary: 'Simulated single-escrow booking. Parallel Transport, Hotel, Transfer & Activity agents locked all 5 vouchers in 4.2s.',
        decisionFactors: ['Razorpay Escrow Validated', 'Concurrent micro-agents locked', 'Smart Contract Signed'],
        status: 'SUCCESS',
      };
    }

    setEvents((prev) => [newEvent, ...prev]);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 flex flex-col font-sans pb-20">
      
      {/* 1. Operations Header */}
      <AdminHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        demoModeActive={demoModeActive}
        onToggleDemoMode={() => setDemoModeActive(!demoModeActive)}
      />

      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* 2. Operations Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />

        {/* 3. Main Dashboard Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Hackathon Judge Interactive Simulator (Demo Mode) */}
          {demoModeActive && (
            <BuildathonDemoControls onTriggerScenario={handleTriggerScenario} />
          )}

          {/* Top 6 KPI Cards */}
          <OperationsKPIGrid />

          {/* Dynamic Tab Views */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <AgentSwarmGrid />
              <BookingOrchestrationVisualizer />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LiveBookingsMonitor />
                <RecoveryOperationsCenter />
              </div>
              <ActiveTripsSentinelMap />
              <LiveEventStream events={events} />
            </div>
          )}

          {activeTab === 'agents' && (
            <div className="space-y-6">
              <AgentSwarmGrid />
              <BookingOrchestrationVisualizer />
            </div>
          )}

          {activeTab === 'orchestration' && (
            <div className="space-y-6">
              <BookingOrchestrationVisualizer />
              <LiveBookingsMonitor />
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <LiveBookingsMonitor />
              <RazorpayEscrowMonitor />
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="space-y-6">
              <ActiveTripsSentinelMap />
              <LiveEventStream events={events} />
            </div>
          )}

          {activeTab === 'providers' && (
            <div className="space-y-6">
              <ProviderAPIHealthGrid />
              <RazorpayEscrowMonitor />
            </div>
          )}

          {activeTab === 'recovery' && (
            <div className="space-y-6">
              <RecoveryOperationsCenter />
              <LiveBookingsMonitor />
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6">
              <LiveEventStream events={events} />
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
