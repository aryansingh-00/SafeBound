import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrchestrationProgress } from '../components/booking-processing/OrchestrationProgress';
import { AgentNetworkVisualizer, AgentStatusNode } from '../components/booking-processing/AgentNetworkVisualizer';
import { AgentCardList } from '../components/booking-processing/AgentCardList';
import { RecoveryDemoCard } from '../components/booking-processing/RecoveryDemoCard';
import { BookingProgressSummary } from '../components/booking-processing/BookingProgressSummary';
import { AgentActivityLog } from '../components/booking-processing/AgentActivityLog';
import { PaymentAndPackageSidebar } from '../components/booking-processing/PaymentAndPackageSidebar';
import { FinalTripReadyView } from '../components/booking-processing/FinalTripReadyView';
import { GeneratedTripPlan } from '../types';
import { 
  Bot, 
  Train, 
  Building, 
  Car, 
  Compass, 
  ShieldCheck, 
  FileCheck, 
  Lock, 
  Zap, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';

export const BookingProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plan: GeneratedTripPlan | null = location.state?.plan || null;

  const transactionId = `RZP_${Math.floor(100000000 + Math.random() * 900000000)}`;

  // Orchestration Agents State
  const [agents, setAgents] = useState<AgentStatusNode[]>([
    {
      id: 'transport-agent',
      name: 'Transport Agent',
      role: 'IRCTC / GDS Connector',
      status: 'PROCESSING',
      icon: Train,
      detail: 'Querying live seat inventory for Delhi ➔ Dehradun AC Volvo semi-sleeper...',
      badge: 'Seats 14 & 15 Locking...',
    },
    {
      id: 'hotel-agent',
      name: 'Hotel Agent',
      role: 'Hospitality Desk',
      status: 'PENDING',
      icon: Building,
      detail: 'Connecting to 4★ Cedar View Heritage Retreat reservations desk...',
    },
    {
      id: 'transfer-agent',
      name: 'Transfer Agent',
      role: 'Fleet Dispatcher',
      status: 'PENDING',
      icon: Car,
      detail: 'Scheduling dedicated chauffeur sedan with delay synchronization...',
    },
    {
      id: 'activity-agent',
      name: 'Activity Agent',
      role: 'Experience Pass Issuer',
      status: 'PENDING',
      icon: Compass,
      detail: 'Generating VIP fast-track cable car & Kempty trail access passes...',
    },
    {
      id: 'verification-agent',
      name: 'Verification Agent',
      role: 'Escrow Security Guard',
      status: 'PENDING',
      icon: ShieldCheck,
      detail: 'Validating PNRs, hotel vouchers and cross-checking insurance policies...',
    },
  ]);

  const [currentStage, setCurrentStage] = useState(2); // 1: Payment, 2: Booking, 3: Verification, 4: Itinerary, 5: Complete
  const [isCompleted, setIsCompleted] = useState(false);
  const [confirmedCount, setConfirmedCount] = useState(1);

  // Live Agent Event Log
  const [logs, setLogs] = useState<{ time: string; agent: string; message: string }[]>([
    { time: '10:32:10', agent: 'Escrow Agent', message: 'Razorpay single-escrow payment of ₹31,300 verified.' },
    { time: '10:32:12', agent: 'Orchestrator', message: 'Triggered 5 autonomous booking micro-agents in parallel.' },
    { time: '10:32:14', agent: 'Transport Agent', message: 'Submitted AC Volvo Deluxe seat reservation.' },
  ]);

  useEffect(() => {
    // Step 1: Transport confirmed (after 1.2s)
    const t1 = setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === 'transport-agent'
            ? { ...a, status: 'CONFIRMED', detail: 'AC Volvo Semi-Sleeper Seats 14 & 15 Locked', badge: 'PNR: VB-894210 Verified' }
            : a.id === 'hotel-agent'
            ? { ...a, status: 'PROCESSING', detail: 'Negotiating 4★ Valley Suite reservation allocation...' }
            : a
        )
      );
      setConfirmedCount(2);
      setLogs((prev) => [
        { time: '10:32:16', agent: 'Transport Agent', message: 'Seats confirmed. PNR #VB-894210 generated.' },
        ...prev,
      ]);
    }, 1200);

    // Step 2: Hotel confirmed (after 2.5s)
    const t2 = setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === 'hotel-agent'
            ? { ...a, status: 'CONFIRMED', detail: '4★ Cedar View Retreat Suite Registered with Breakfast', badge: 'Ref: HTL-894102' }
            : a.id === 'transfer-agent'
            ? { ...a, status: 'PROCESSING', detail: 'Assigning Dehradun station private chauffeur sedan...' }
            : a
        )
      );
      setConfirmedCount(3);
      setLogs((prev) => [
        { time: '10:32:18', agent: 'Hotel Agent', message: 'Balcony Valley Suite pre-registered with free breakfast.' },
        ...prev,
      ]);
    }, 2500);

    // Step 3: Transfer & Activities confirmed (after 3.8s)
    const t3 = setTimeout(() => {
      setCurrentStage(3);
      setAgents((prev) =>
        prev.map((a) =>
          a.id === 'transfer-agent'
            ? { ...a, status: 'CONFIRMED', detail: 'Dedicated Chauffeur Sedan Assigned (UK07-AB-4821)', badge: 'Adaptive Rescheduling Active' }
            : a.id === 'activity-agent'
            ? { ...a, status: 'CONFIRMED', detail: 'Gun Hill Cable Car & Kempty Passes Issued', badge: 'Pass #ACT-33819' }
            : a.id === 'verification-agent'
            ? { ...a, status: 'PROCESSING', detail: 'Cross-verifying all provider vouchers with escrow ledger...' }
            : a
        )
      );
      setConfirmedCount(4);
      setLogs((prev) => [
        { time: '10:32:20', agent: 'Transfer Agent', message: 'Station chauffeur assigned with live train delay sync.' },
        { time: '10:32:21', agent: 'Activity Agent', message: 'VIP fast-track cable car passes generated.' },
        ...prev,
      ]);
    }, 3800);

    // Step 4: Verification completed & Celebration view (after 5.2s)
    const t4 = setTimeout(() => {
      setCurrentStage(5);
      setAgents((prev) =>
        prev.map((a) => ({
          ...a,
          status: 'CONFIRMED',
        }))
      );
      setConfirmedCount(5);
      setIsCompleted(true);
      setLogs((prev) => [
        { time: '10:32:24', agent: 'Verification Agent', message: 'All vouchers verified. Unified encrypted PNR locked.' },
        { time: '10:32:25', agent: 'Orchestrator', message: 'Trip itinerary synchronized. Ready for traveller.' },
        ...prev,
      ]);
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 py-8 sm:py-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-700 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-brand-500/25">
              <Bot className="w-6 h-6 animate-pulse-subtle" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  SafeBound is securing your trip…
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>AI Swarm Active</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                Your payment is confirmed. Our specialized booking agents are coordinating each part of your journey.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Escrow Protected (₹{(plan?.estimatedCost || 31300).toLocaleString('en-IN')})</span>
          </div>
        </div>

        {/* 1. 5-Stage Orchestration Stepper */}
        <OrchestrationProgress currentStage={currentStage} />

        {/* If completed, show celebration banner */}
        {isCompleted && (
          <FinalTripReadyView plan={plan} />
        )}

        {/* Main 2-Column Orchestration Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Agent Visualizer, Detailed Agent Cards, Recovery Simulator (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 2. Visual Multi-Agent Network */}
            <AgentNetworkVisualizer agents={agents} />

            {/* 3. Detailed Micro-Agent Status Cards */}
            <AgentCardList agents={agents} />

            {/* 4. Autonomous Recovery Demo Card (Judges Tool) */}
            <RecoveryDemoCard />

          </div>

          {/* Right Column: Progress Summary, Payment Receipt, Live Activity Log (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* 5. Booking Progress Summary */}
            <BookingProgressSummary
              confirmedCount={confirmedCount}
              totalServices={5}
              serviceStatuses={[
                { name: 'Transport (Volvo Return)', status: confirmedCount >= 2 ? 'confirmed' : 'processing' },
                { name: '4★ Cedar View Hotel', status: confirmedCount >= 3 ? 'confirmed' : confirmedCount === 2 ? 'processing' : 'pending' },
                { name: 'Station Chauffeur Transfer', status: confirmedCount >= 4 ? 'confirmed' : confirmedCount === 3 ? 'processing' : 'pending' },
                { name: 'Curated Activities & Passes', status: confirmedCount >= 4 ? 'confirmed' : 'pending' },
                { name: 'SafeBound Final Verification', status: confirmedCount >= 5 ? 'confirmed' : confirmedCount === 4 ? 'processing' : 'pending' },
              ]}
            />

            {/* 6. Payment & Package Receipt Info */}
            <PaymentAndPackageSidebar
              plan={plan}
              transactionId={transactionId}
            />

            {/* 7. Timestamped Agent Activity Log */}
            <AgentActivityLog logs={logs} />

          </div>

        </div>

      </div>
    </div>
  );
};
