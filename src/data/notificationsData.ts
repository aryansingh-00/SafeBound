export type NotificationPriority = 'critical' | 'important' | 'informational' | 'promotional';

export type NotificationCategory = 'trips' | 'bookings' | 'price' | 'weather' | 'safety' | 'promotions';

export type NotificationState = 'unread' | 'read' | 'action_required' | 'resolved' | 'expired';

export interface NotificationItem {
  id: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  state: NotificationState;
  title: string;
  summary: string;
  tripName?: string;
  tripId?: string;
  bookingRef?: string;
  timestamp: string;
  timeAgo: string;
  whatHappened: string;
  whatChanged?: {
    original: string;
    updated: string;
  };
  agentAction: {
    performed: boolean;
    title: string;
    description: string;
    resolutionState: string;
  };
  actions: {
    primaryLabel: string;
    primaryAction: string;
    secondaryLabel?: string;
    secondaryAction?: string;
  };
}

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'trips',
    priority: 'important',
    state: 'unread',
    title: '🚆 Train Delay Detected — Pickup Autonomously Synchronized',
    summary: 'Delhi ➔ Dehradun Vande Bharat is running 1h 20m late. SafeBound adjusted your station chauffeur pickup.',
    tripName: '🏔️ Mussoorie Alpine Retreat',
    tripId: 'SB-MUSSOORIE-4D',
    bookingRef: 'TRN-22457',
    timestamp: '2026-08-31T04:15:00Z',
    timeAgo: '12 minutes ago',
    whatHappened: 'IRCTC telemetry reported Vande Bharat (Train #22457) delayed by 1 hour 20 minutes due to northern signal clearance.',
    whatChanged: {
      original: 'Train arrival: 12:00 PM • Chauffeur pickup: 12:15 PM',
      updated: 'Train arrival: 01:20 PM • Chauffeur pickup: 01:45 PM',
    },
    agentAction: {
      performed: true,
      title: 'Autonomous Transfer Adaptation',
      description: 'SafeBound Transport Agent contacted your assigned hill chauffeur and automatically rescheduled your pickup without any extra charge or phone calls.',
      resolutionState: '✓ Resolved & Synchronized',
    },
    actions: {
      primaryLabel: 'View Updated Itinerary',
      primaryAction: '/trips',
      secondaryLabel: 'View Changes',
      secondaryAction: 'drawer',
    },
  },
  {
    id: 'notif-2',
    category: 'bookings',
    priority: 'critical',
    state: 'action_required',
    title: '⚠️ Action Required: Alternative Hotel Suite Found',
    summary: 'Original standard suite experienced property overbooking. SafeBound found a 4★ Executive Suite with a ₹700 discount.',
    tripName: '🏔️ Mussoorie Alpine Retreat',
    tripId: 'SB-MUSSOORIE-4D',
    bookingRef: 'HTL-9841',
    timestamp: '2026-08-31T03:45:00Z',
    timeAgo: '42 minutes ago',
    whatHappened: 'Cedar View Retreat reported duplicate booking on Standard Valley Room for Sep 15–18.',
    whatChanged: {
      original: 'Standard Valley Room (₹16,500)',
      updated: '4★ Executive Pine Suite (₹15,800 • Save ₹700)',
    },
    agentAction: {
      performed: true,
      title: 'Auto-Negotiated Alternative Suite',
      description: 'Hotel Booking Agent locked a higher-tier Executive Pine Suite at the same property with complimentary breakfast at a reduced rate of ₹15,800. Awaiting your approval before final escrow release.',
      resolutionState: '⚠️ User Approval Required',
    },
    actions: {
      primaryLabel: 'Approve Alternative (Save ₹700)',
      primaryAction: 'approve_hotel',
      secondaryLabel: 'See Other Stays',
      secondaryAction: '/plan-trip',
    },
  },
  {
    id: 'notif-3',
    category: 'weather',
    priority: 'important',
    state: 'unread',
    title: '🌦️ Weather Advisory: Rain Expected for Day 3 Activity',
    summary: 'IMD radar predicts 65% rain probability for your outdoor ropeway excursion on Day 3.',
    tripName: '🏔️ Mussoorie Alpine Retreat',
    tripId: 'SB-MUSSOORIE-4D',
    timestamp: '2026-08-31T02:30:00Z',
    timeAgo: '2 hours ago',
    whatHappened: 'Local meteorological radar in Mussoorie indicates heavy mountain showers on Sep 17 between 11:00 AM – 03:00 PM.',
    whatChanged: {
      original: 'Day 3: Gun Hill Ropeway & Kempty Falls',
      updated: 'Suggested: Move Gun Hill Ropeway to Day 2 morning (Clear Skies)',
    },
    agentAction: {
      performed: false,
      title: 'Itinerary Re-Sequencing Recommendation',
      description: 'Activity Agent has checked VIP slot availability for Sep 16 (Day 2) morning when weather is 23°C and completely sunny.',
      resolutionState: '⚡ Recommendation Ready',
    },
    actions: {
      primaryLabel: 'Swap to Day 2 (Recommended)',
      primaryAction: 'swap_itinerary',
      secondaryLabel: 'Keep Original',
      secondaryAction: 'dismiss',
    },
  },
  {
    id: 'notif-4',
    category: 'price',
    priority: 'promotional',
    state: 'unread',
    title: '💰 Price Drop: Watched Goa Getaway Dropped by ₹2,400',
    summary: 'Flight and 4★ beach resort package to South Goa is now ₹22,400 per person (down from ₹24,800).',
    tripName: '🏖️ South Goa Serenity',
    timestamp: '2026-08-30T22:10:00Z',
    timeAgo: '6 hours ago',
    whatHappened: 'Indigo Airlines released monsoon flash fare reductions on New Delhi ➔ Goa (Dabolim) return routes.',
    whatChanged: {
      original: 'Package price: ₹24,800',
      updated: 'Package price: ₹22,400 (Save ₹2,400)',
    },
    agentAction: {
      performed: true,
      title: 'Price Watch Sentinel',
      description: 'SafeBound Price Watcher detected the 10% price drop and verified that free breakfast and airport cab inclusions remain unchanged.',
      resolutionState: '✓ Price Locked for 24h',
    },
    actions: {
      primaryLabel: 'View Deal & Package',
      primaryAction: '/deals',
      secondaryLabel: 'Dismiss Alert',
      secondaryAction: 'dismiss',
    },
  },
  {
    id: 'notif-5',
    category: 'safety',
    priority: 'informational',
    state: 'read',
    title: '🛡️ Safety Radar: Highway NH-707 Confirmed Clear',
    summary: 'Dehradun-Mussoorie hill highway inspected by regional transit authority. Normal traffic flow with zero active advisories.',
    tripName: '🏔️ Mussoorie Alpine Retreat',
    tripId: 'SB-MUSSOORIE-4D',
    timestamp: '2026-08-30T18:00:00Z',
    timeAgo: '10 hours ago',
    whatHappened: 'Automated road telemetry clearance check completed across NH-707 and Camel\'s Back bypass.',
    agentAction: {
      performed: true,
      title: 'Continuous Route Telemetry',
      description: 'Safety Agent verified weather radar, highway department notices, and local cab syndicate reports. Safety rating remains 9.3/10.',
      resolutionState: '✓ Optimal Conditions',
    },
    actions: {
      primaryLabel: 'View Safety Details',
      primaryAction: 'drawer',
    },
  },
  {
    id: 'notif-6',
    category: 'bookings',
    priority: 'informational',
    state: 'read',
    title: '🎫 All Digital Vouchers & Invoices Dispatched',
    summary: 'Your IRCTC train e-tickets, 4★ hotel suite voucher, and GST invoice are ready in your Document Vault.',
    tripName: '🏔️ Mussoorie Alpine Retreat',
    tripId: 'SB-MUSSOORIE-4D',
    bookingRef: 'SB-4598721',
    timestamp: '2026-08-30T14:30:00Z',
    timeAgo: '14 hours ago',
    whatHappened: 'Verification Agent successfully generated and signed all 5 electronic travel vouchers.',
    agentAction: {
      performed: true,
      title: 'Digital Document Dispatcher',
      description: 'Vouchers emailed to aryan@safebound.ai and archived securely in your encrypted Document Vault for offline viewing.',
      resolutionState: '✓ Downloadable',
    },
    actions: {
      primaryLabel: 'Open Document Vault',
      primaryAction: '/trips/SB-MUSSOORIE-4D/confirmed',
    },
  },
  {
    id: 'notif-7',
    category: 'promotions',
    priority: 'promotional',
    state: 'read',
    title: '✨ Curated Weekend Escape: Kashmir Autumn Retreat',
    summary: 'SafeBound AI generated a 5-day Gulmarg alpine trip tailored to your 90% mountain affinity score.',
    timestamp: '2026-08-29T10:00:00Z',
    timeAgo: '1 day ago',
    whatHappened: 'Weekly AI personalization engine created a high-fit escape package based on your mountain travel style.',
    agentAction: {
      performed: true,
      title: 'Personalized Deal Matcher',
      description: 'Matched 4★ Gondola view resort with non-stop flights under your ₹40K typical budget.',
      resolutionState: '✓ Ready to Inspect',
    },
    actions: {
      primaryLabel: 'Explore Kashmir Trip',
      primaryAction: '/destinations',
    },
  },
  {
    id: 'notif-8',
    category: 'trips',
    priority: 'informational',
    state: 'read',
    title: '🟢 24/7 Live Escrow & Trip Sentinel Active',
    summary: 'SafeBound multi-agent monitoring network is actively guarding your upcoming September journey.',
    tripName: '🏔️ Mussoorie Alpine Retreat',
    tripId: 'SB-MUSSOORIE-4D',
    timestamp: '2026-08-28T09:00:00Z',
    timeAgo: '2 days ago',
    whatHappened: 'Escrow payment locked and 5 autonomous monitoring agents deployed.',
    agentAction: {
      performed: true,
      title: 'Multi-Agent Network Deployed',
      description: 'Central Orchestrator assigned Transport, Stay, Transfer, Weather, and Safety agents to continuously monitor your trip status.',
      resolutionState: '🟢 Active Sentinel',
    },
    actions: {
      primaryLabel: 'View Sentinel Status',
      primaryAction: '/trips',
    },
  },
];
