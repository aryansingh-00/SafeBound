import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AIChatSidebar } from '../components/chat-page/AIChatSidebar';
import { ChatHeader } from '../components/chat-page/ChatHeader';
import { WelcomeState } from '../components/chat-page/WelcomeState';
import { ChatMessageItem, ChatMessageData } from '../components/chat-page/ChatMessageItem';
import { ChatInputBar } from '../components/chat-page/ChatInputBar';
import { TripContextPanel } from '../components/chat-page/TripContextPanel';
import { ExtractedRequirements } from '../components/chat-page/InChatRequirementCard';
import { GeneratedTripPlan } from '../types';

interface AIChatPageProps {
  onProceedToBookingReview: (plan: GeneratedTripPlan) => void;
}

export const AIChatPage: React.FC<AIChatPageProps> = ({ onProceedToBookingReview }) => {
  const navigate = useNavigate();
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Active Trip State
  const [requirements, setRequirements] = useState<ExtractedRequirements>({
    origin: 'Delhi (DEL)',
    travelMonth: 'September',
    duration: '4 Days',
    travellers: 2,
    budget: 40000,
    theme: 'Mountains',
    safety: 'High (8.5+)',
    style: 'Peaceful',
  });

  const [activePackage, setActivePackage] = useState<{
    destination: string;
    duration: string;
    totalPrice: number;
  } | null>({
    destination: 'Mussoorie',
    duration: '4 Days / 3 Nights',
    totalPrice: 31300,
  });

  const [isPackageOptimized, setIsPackageOptimized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initial demo conversation matching prompt specifications
  const [messages, setMessages] = useState<ChatMessageData[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'I have ₹40,000. I want a 4-day trip from Delhi in September. Somewhere safe and peaceful, preferably mountains.',
      timestamp: '10:02 AM',
    },
    {
      id: 'msg-2',
      sender: 'agent',
      text: "Got it! I've extracted your core constraints and will optimize for ₹40,000 maximum, 4 days from Delhi in September with High Safety.",
      timestamp: '10:02 AM',
      cardType: 'requirement',
      requirementsData: {
        origin: 'Delhi (DEL)',
        travelMonth: 'September 2026',
        duration: '4 Days / 3 Nights',
        travellers: 2,
        budget: 40000,
        theme: 'Mountains & Nature',
        safety: 'High (9.3 Index)',
        style: 'Peaceful & Relaxed',
      },
    },
    {
      id: 'msg-3',
      sender: 'agent',
      text: 'How many people are travelling?',
      timestamp: '10:02 AM',
      quickReplies: ['1 Solo', '2 Travellers', '3 People', '4 Family'],
    },
    {
      id: 'msg-4',
      sender: 'user',
      text: '2 Travellers',
      timestamp: '10:03 AM',
    },
    {
      id: 'msg-5',
      sender: 'agent',
      text: 'Querying live airline GDS, Volvo sleeper routes, verified 4-star chalets, and real-time mountain weather radar...',
      timestamp: '10:03 AM',
      cardType: 'processing',
    },
    {
      id: 'msg-6',
      sender: 'agent',
      text: 'I found 4 strong destination matches. Mussoorie currently fits your requirements best with an overall 92% match score!',
      timestamp: '10:03 AM',
      cardType: 'destinations',
    },
    {
      id: 'msg-7',
      sender: 'agent',
      text: "Here is your customized 4-day all-inclusive package for Mussoorie under ₹40,000 budget:",
      timestamp: '10:03 AM',
      cardType: 'package',
      isOptimized: false,
    },
  ]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  // Handle user sending message
  const handleSendMessage = (userText: string) => {
    const userMsg: ChatMessageData = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    const lower = userText.toLowerCase();

    // Intent routing simulation with context memory
    setTimeout(() => {
      setIsProcessing(false);

      if (lower.includes('cheap') || lower.includes('better deal') || lower.includes('optimize') || lower.includes('discount')) {
        // Live Optimization Flow
        const optMsg: ChatMessageData = {
          id: `agt-${Date.now()}`,
          sender: 'agent',
          text: '⚡ SafeBound re-optimization engine queried alternative luxury chalets and direct Volvo routes. Here is the verified price reduction:',
          timestamp: 'Just now',
          cardType: 'optimization',
        };
        setMessages((prev) => [...prev, optMsg]);
      } else if (lower.includes('alternative') || lower.includes('compare') || lower.includes('other')) {
        // Comparison Matrix Flow
        const compMsg: ChatMessageData = {
          id: `agt-${Date.now()}`,
          sender: 'agent',
          text: 'Here is the side-by-side comparison matrix of top mountain destinations matching your ₹40k budget and September dates:',
          timestamp: 'Just now',
          cardType: 'comparison',
        };
        setMessages((prev) => [...prev, compMsg]);
      } else if (lower.includes('book') || lower.includes('ready') || lower.includes('proceed')) {
        // Approval & Booking Flow
        const appMsg: ChatMessageData = {
          id: `agt-${Date.now()}`,
          sender: 'agent',
          text: "Awesome! Your package is locked with free rescheduling protection and zero hidden booking fees. Let's proceed to review & checkout.",
          timestamp: 'Just now',
          cardType: 'approval',
          isOptimized: isPackageOptimized,
        };
        setMessages((prev) => [...prev, appMsg]);
      } else {
        // General AI Conversational Answer
        const replyMsg: ChatMessageData = {
          id: `agt-${Date.now()}`,
          sender: 'agent',
          text: `I've updated your trip parameters. Mussoorie (4 Days) remains locked at ₹${(isPackageOptimized ? 29850 : 31300).toLocaleString('en-IN')} with 24/7 AI Concierge support.`,
          timestamp: 'Just now',
          quickReplies: ['Find cheaper', 'Show alternatives', 'Ready to book', 'Change dates'],
        };
        setMessages((prev) => [...prev, replyMsg]);
      }
    }, 900);
  };

  const handleApplyOptimization = () => {
    setIsPackageOptimized(true);
    setActivePackage({
      destination: 'Mussoorie (Optimized)',
      duration: '4 Days / 3 Nights',
      totalPrice: 29850,
    });

    const successMsg: ChatMessageData = {
      id: `agt-opt-${Date.now()}`,
      sender: 'agent',
      text: '✓ Live optimization applied! Package total reduced to ₹29,850 (You saved ₹1,450).',
      timestamp: 'Just now',
      cardType: 'approval',
      isOptimized: true,
    };
    setMessages((prev) => [...prev, successMsg]);
  };

  const handleStartNewTrip = () => {
    setMessages([]);
    setActivePackage(null);
    setIsPackageOptimized(false);
  };

  const handleSelectRecent = (title: string, queryText: string) => {
    handleStartNewTrip();
    setTimeout(() => {
      handleSendMessage(queryText);
    }, 200);
  };

  const handleProceedToReview = () => {
    const plan: GeneratedTripPlan = {
      id: 'SB-MUSSOORIE-4D',
      title: '4-Day Mussoorie Misty Pine & Valley Package',
      destination: 'Mussoorie, Uttarakhand',
      duration: '4 Days / 3 Nights',
      startingCity: 'New Delhi (DEL)',
      travellers: 2,
      totalBudget: 40000,
      estimatedCost: isPackageOptimized ? 29850 : 31300,
      safetyScore: 9.3,
      weatherForecast: '18°C — Pleasant & Crisp Alpine Skies',
      breakdown: {
        flights: { title: 'AC Volvo Deluxe Semi-Sleeper Return', cost: 7800, details: 'Reserved luxury coach with mountain route escort' },
        hotel: { title: '4★ Mussoorie Cedar View Heritage Retreat', cost: isPackageOptimized ? 15650 : 16500, rating: 4.8, details: 'Balcony mountain suite with daily breakfast' },
        transfers: { title: 'Dedicated Local Chauffeur Sedan', cost: isPackageOptimized ? 1900 : 2500, details: 'All sightseeing, viewpoints, and valley transit' },
        activities: { title: '4 Curated Passes & Cable Car Ride', cost: 4500, details: 'Gun Hill cable car, Kempty falls guided hike pass' },
        taxes: { title: 'GST & SafeBound Protection Guarantee', cost: 0, details: 'Zero hidden fees' },
      },
      days: [
        {
          day: 1,
          title: 'Arrival in Mussoorie & Pine Mist Stroll',
          highlights: ['Chauffeur pickup', 'Check-in at Cedar Retreat', 'Mall Road colonial walk'],
          hotel: 'Mussoorie Cedar View Heritage Retreat',
          activities: [
            { time: '11:00 AM', title: 'Mountain Check-in', desc: 'Welcome tea with cedar forest vista.' },
            { time: '04:00 PM', title: 'Sunset Viewpoint', desc: 'Cable car ride to high ridge view.' },
          ]
        },
        {
          day: 2,
          title: 'Cascading Waterfalls & Nature Trails',
          highlights: ['Kempty Falls visit', 'Nature canopy trail', 'Local artisanal cafe dining'],
          hotel: 'Mussoorie Cedar View Heritage Retreat',
          activities: [
            { time: '09:30 AM', title: 'Waterfall Trail', desc: 'Guided nature walk to scenic cascade.' },
            { time: '02:00 PM', title: 'Himalayan Lunch', desc: 'Handcrafted local cuisine.' },
          ]
        },
        {
          day: 3,
          title: 'Colonial Heritage & Tibetan Monasteries',
          highlights: ['Historic library visit', 'Tibetan market shopping', 'Private chalet bonfire'],
          hotel: 'Mussoorie Cedar View Heritage Retreat',
          activities: [
            { time: '10:30 AM', title: 'Cultural Tour', desc: 'Explore historic buildings and weavers.' },
            { time: '08:00 PM', title: 'Bonfire Night', desc: 'Acoustic guitar and starlight bonfire.' },
          ]
        },
        {
          day: 4,
          title: 'Organic Honey Markets & Return Transit',
          highlights: ['Organic honey shopping', 'Assisted checkout', 'Smooth return transit'],
          hotel: 'Check-out completed',
          activities: [
            { time: '10:00 AM', title: 'Local Souvenirs', desc: 'Himalayan tea and organic preserves.' },
            { time: '02:00 PM', title: 'Return Transit', desc: 'Chauffeur drops you safely to transit hub.' },
          ]
        }
      ],
      status: 'Selected'
    };

    onProceedToBookingReview(plan);
    navigate('/booking/review');
  };

  return (
    <div className="bg-[#FBFBFE] min-h-[calc(100vh-5rem)] py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* Main Three-Column Workspace Layout */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 h-[calc(100vh-7rem)]">
          
          {/* 1. LEFT COLUMN: AI Workspace Sidebar */}
          <div className="hidden lg:block">
            <AIChatSidebar
              onNewTrip={handleStartNewTrip}
              onSelectRecent={handleSelectRecent}
            />
          </div>

          {/* 2. MIDDLE COLUMN: AI Conversation Command Center */}
          <div className="flex-1 bg-white rounded-3xl border border-slate-200/90 shadow-card flex flex-col justify-between overflow-hidden">
            
            {/* Chat Top Header */}
            <ChatHeader />

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              {messages.length === 0 ? (
                <WelcomeState onSelectPrompt={handleSendMessage} />
              ) : (
                messages.map((msg) => (
                  <ChatMessageItem
                    key={msg.id}
                    message={msg}
                    onQuickReplyClick={handleSendMessage}
                    onSelectDestination={(dest) => handleSendMessage(`I choose ${dest}. Please generate the full package.`)}
                    onReviewPackage={handleProceedToReview}
                    onFindBetterDeal={() => handleSendMessage('Can you find a better deal?')}
                    onCompareAlternatives={() => handleSendMessage('Show me alternative destination comparisons.')}
                    onApplyOptimization={handleApplyOptimization}
                    onChooseComparedDestination={(name) => handleSendMessage(`Switch destination to ${name}`)}
                    onProceedToBookingReview={handleProceedToReview}
                  />
                ))
              )}

              {isProcessing && (
                <div className="flex items-center gap-2 text-xs text-brand-600 font-semibold ml-10 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                  <span>SafeBound AI Agent is reasoning and searching live data...</span>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Bottom Input Bar with Action Chips */}
            <ChatInputBar
              onSendMessage={handleSendMessage}
              disabled={isProcessing}
            />

          </div>

          {/* 3. RIGHT COLUMN: Trip Context & Telemetry Panel */}
          <div className="hidden xl:block">
            <TripContextPanel
              requirements={requirements}
              activePackage={activePackage}
              onViewPackage={handleProceedToReview}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
