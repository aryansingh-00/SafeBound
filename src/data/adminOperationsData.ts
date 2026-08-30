export interface AgentMetricItem {
  id: string;
  name: string;
  role: string;
  status: 'ACTIVE' | 'PROCESSING' | 'STANDBY';
  activeTasks: number;
  completedToday: number;
  successRate: number;
  avgResponseTime: string;
  currentTaskDescription: string;
  iconName: string;
}

export interface ActiveBookingItem {
  id: string;
  tripName: string;
  traveller: string;
  amount: number;
  confirmedSteps: number;
  totalSteps: number;
  status: 'PROCESSING' | 'CONFIRMED' | 'RECOVERING' | 'ACTION_REQUIRED';
  stepStatuses: {
    payment: boolean;
    transport: boolean;
    hotel: boolean;
    transfer: boolean;
    activities: boolean;
    verification: boolean;
  };
}

export interface RecoveryCaseItem {
  id: string;
  tripId: string;
  issue: string;
  agent: string;
  actionTaken: string;
  priceDifference: string;
  status: 'REBOOKED' | 'RESOLVED' | 'PENDING_APPROVAL' | 'FAILED';
  timestamp: string;
}

export interface ProviderHealthItem {
  id: string;
  name: string;
  service: string;
  status: 'OPERATIONAL' | 'DEGRADED' | 'OUTAGE';
  latency: string;
  uptime24h: string;
  activeRequests: number;
}

export interface LiveEventLogItem {
  id: string;
  timestamp: string;
  eventType: string;
  tripId: string;
  agentName: string;
  summary: string;
  decisionFactors: string[];
  status: 'SUCCESS' | 'WARN' | 'INFO';
}

export const ADMIN_KPIS = {
  activeTrips: 128,
  bookingsToday: 342,
  successRate: 96.8,
  activeMicroAgents: 47,
  recoveriesToday: 12,
  totalGMV: '₹18.4L',
};

export const ADMIN_AGENT_SWARM: AgentMetricItem[] = [
  {
    id: 'agent-destination',
    name: 'Destination Discovery Agent',
    role: 'Vector Suitability & Semantic Ranker',
    status: 'ACTIVE',
    activeTasks: 14,
    completedToday: 512,
    successRate: 98.6,
    avgResponseTime: '1.1s',
    currentTaskDescription: 'Evaluating Mussoorie vs. Dharamshala for budget constraint ₹30,000...',
    iconName: 'Compass',
  },
  {
    id: 'agent-transport',
    name: 'Transport Agent',
    role: 'IRCTC / Multi-Modal Transit Connector',
    status: 'ACTIVE',
    activeTasks: 18,
    completedToday: 243,
    successRate: 98.2,
    avgResponseTime: '1.4s',
    currentTaskDescription: 'Verifying return Vande Bharat (NDLS ➔ DDN) seat buffer availability...',
    iconName: 'Train',
  },
  {
    id: 'agent-hotel',
    name: 'Hotel Agent',
    role: 'Direct Property & Channel Manager',
    status: 'ACTIVE',
    activeTasks: 12,
    completedToday: 218,
    successRate: 96.4,
    avgResponseTime: '1.8s',
    currentTaskDescription: 'Confirming Balcony Valley Suite allocation at Cedar View Retreat...',
    iconName: 'Building',
  },
  {
    id: 'agent-transfer',
    name: 'Transfer Agent',
    role: 'Chauffeur Dispatcher & Dynamic Sync',
    status: 'ACTIVE',
    activeTasks: 8,
    completedToday: 194,
    successRate: 99.1,
    avgResponseTime: '1.2s',
    currentTaskDescription: 'Synchronizing Dehradun station sedan with train arrival telemetry...',
    iconName: 'Car',
  },
  {
    id: 'agent-activity',
    name: 'Activity Agent',
    role: 'Curated Pass & VIP Slot Issuer',
    status: 'ACTIVE',
    activeTasks: 6,
    completedToday: 180,
    successRate: 97.8,
    avgResponseTime: '1.5s',
    currentTaskDescription: 'Issuing QR fast-track passes for Gun Hill Cable Car & Kempty Nature Walk...',
    iconName: 'Ticket',
  },
  {
    id: 'agent-weather',
    name: 'Weather Sentinel Agent',
    role: 'Microclimate & Rainfall Forecaster',
    status: 'ACTIVE',
    activeTasks: 4,
    completedToday: 680,
    successRate: 99.9,
    avgResponseTime: '0.4s',
    currentTaskDescription: 'Scanning IMD radar for Uttarakhand mountain cloudburst warnings...',
    iconName: 'CloudSun',
  },
  {
    id: 'agent-safety',
    name: 'Safety Sentinel Agent',
    role: 'Route Clearance & Highway Telemetry',
    status: 'ACTIVE',
    activeTasks: 5,
    completedToday: 420,
    successRate: 99.8,
    avgResponseTime: '0.6s',
    currentTaskDescription: 'Checking NH-707 landslide inspection reports and municipal traffic status...',
    iconName: 'ShieldCheck',
  },
  {
    id: 'agent-optimization',
    name: 'Optimization Agent',
    role: 'Price Drop & Route Arbitrage Engine',
    status: 'ACTIVE',
    activeTasks: 7,
    completedToday: 165,
    successRate: 94.2,
    avgResponseTime: '2.1s',
    currentTaskDescription: 'Scanning live fare drops on Delhi ➔ Goa routes (saving ₹2,400)...',
    iconName: 'Zap',
  },
  {
    id: 'agent-recovery',
    name: 'Autonomous Recovery Agent',
    role: 'Disruption Resolver & Fallback Matcher',
    status: 'ACTIVE',
    activeTasks: 3,
    completedToday: 17,
    successRate: 91.5,
    avgResponseTime: '2.4s',
    currentTaskDescription: 'Auto-negotiating Executive Pine Suite alternative for overbooked standard room...',
    iconName: 'RotateCw',
  },
  {
    id: 'agent-notification',
    name: 'Notification Dispatch Agent',
    role: 'Event-Impact Context Dispatcher',
    status: 'ACTIVE',
    activeTasks: 2,
    completedToday: 742,
    successRate: 99.9,
    avgResponseTime: '0.3s',
    currentTaskDescription: 'Dispatching WhatsApp and web push alerts for train delay adaptation...',
    iconName: 'Bell',
  },
];

export const ADMIN_ACTIVE_BOOKINGS: ActiveBookingItem[] = [
  {
    id: 'TRIP-8421',
    tripName: 'Mussoorie 4-Day Alpine Package',
    traveller: 'Aryan Singh',
    amount: 31300,
    confirmedSteps: 3,
    totalSteps: 5,
    status: 'PROCESSING',
    stepStatuses: {
      payment: true,
      transport: true,
      hotel: true,
      transfer: false,
      activities: false,
      verification: false,
    },
  },
  {
    id: 'TRIP-7392',
    tripName: 'Manali 5-Day Winter Special',
    traveller: 'Pooja Verma',
    amount: 35400,
    confirmedSteps: 2,
    totalSteps: 5,
    status: 'ACTION_REQUIRED',
    stepStatuses: {
      payment: true,
      transport: true,
      hotel: false,
      transfer: false,
      activities: false,
      verification: false,
    },
  },
  {
    id: 'TRIP-9104',
    tripName: 'South Goa Beachfront Escape',
    traveller: 'Rohan Mehra',
    amount: 22400,
    confirmedSteps: 5,
    totalSteps: 5,
    status: 'CONFIRMED',
    stepStatuses: {
      payment: true,
      transport: true,
      hotel: true,
      transfer: true,
      activities: true,
      verification: true,
    },
  },
];

export const ADMIN_RECOVERIES: RecoveryCaseItem[] = [
  {
    id: 'REC-101',
    tripId: 'TRIP-7392',
    issue: 'Hotel Overbooking (Cedar Retreat standard room unavailable)',
    agent: 'Recovery Agent',
    actionTaken: 'Auto-locked 4★ Executive Suite with breakfast discount',
    priceDifference: '₹800 lower',
    status: 'PENDING_APPROVAL',
    timestamp: '10:30 AM',
  },
  {
    id: 'REC-102',
    tripId: 'TRIP-6841',
    issue: 'Train #22457 Delayed by 1h 20m',
    agent: 'Transfer Agent',
    actionTaken: 'Chauffeur pickup rescheduled from 12:15 PM to 1:45 PM',
    priceDifference: '₹0 (Free Adaptation)',
    status: 'RESOLVED',
    timestamp: '10:15 AM',
  },
  {
    id: 'REC-103',
    tripId: 'TRIP-5529',
    issue: 'Heavy Rain Forecast on Day 3 Ropeway Slot',
    agent: 'Activity Agent',
    actionTaken: 'VIP pass rescheduled to Day 2 morning (Clear Skies)',
    priceDifference: '₹0 (Slot Swap)',
    status: 'RESOLVED',
    timestamp: '09:45 AM',
  },
  {
    id: 'REC-104',
    tripId: 'TRIP-4412',
    issue: 'Cab syndicate fleet delay in Srinagar',
    agent: 'Recovery Agent',
    actionTaken: 'Switched to pre-contracted backup chauffeur',
    priceDifference: '₹0 (Absorbed by SafeBound)',
    status: 'REBOOKED',
    timestamp: '08:20 AM',
  },
];

export const ADMIN_PROVIDERS: ProviderHealthItem[] = [
  {
    id: 'prv-irctc',
    name: 'IRCTC Transit Gateway',
    service: 'Trains & Rail Telemetry',
    status: 'OPERATIONAL',
    latency: '240ms',
    uptime24h: '99.94%',
    activeRequests: 42,
  },
  {
    id: 'prv-hotel-gds',
    name: 'Hospitality Direct Engine',
    service: 'Hotels & Heritage Stays',
    status: 'OPERATIONAL',
    latency: '420ms',
    uptime24h: '99.85%',
    activeRequests: 28,
  },
  {
    id: 'prv-cab-syndicate',
    name: 'Regional Cab Fleet Mesh',
    service: 'Private Chauffeur Transfers',
    status: 'DEGRADED',
    latency: '1.8s',
    uptime24h: '98.12%',
    activeRequests: 14,
  },
  {
    id: 'prv-activity-gds',
    name: 'Experience Pass Issuer API',
    service: 'Ropeways & Guided Passes',
    status: 'OPERATIONAL',
    latency: '310ms',
    uptime24h: '99.90%',
    activeRequests: 19,
  },
  {
    id: 'prv-imd-weather',
    name: 'IMD Weather Radar Radar',
    service: 'Microclimate Sensors',
    status: 'OPERATIONAL',
    latency: '95ms',
    uptime24h: '100%',
    activeRequests: 65,
  },
  {
    id: 'prv-razorpay',
    name: 'Razorpay Escrow Gateway',
    service: 'Single Escrow Payments',
    status: 'OPERATIONAL',
    latency: '180ms',
    uptime24h: '99.99%',
    activeRequests: 54,
  },
];

export const ADMIN_EVENT_STREAM: LiveEventLogItem[] = [
  {
    id: 'evt-1',
    timestamp: '10:32:14',
    eventType: 'TRAIN_DELAY_DETECTED',
    tripId: 'TRIP-8421',
    agentName: 'Transport Agent',
    summary: 'Vande Bharat #22457 delayed by 80 mins. Adjusted Dehradun station chauffeur pickup.',
    decisionFactors: ['IRCTC GPS Telemetry', 'Station Distance 34km', 'Chauffeur Availability Window'],
    status: 'WARN',
  },
  {
    id: 'evt-2',
    timestamp: '10:30:02',
    eventType: 'HOTEL_SUITE_RECOVERY',
    tripId: 'TRIP-7392',
    agentName: 'Recovery Agent',
    summary: 'Standard suite unavailable. Negotiated 4★ Executive Pine Suite at ₹800 discount.',
    decisionFactors: ['Overbooking Signal', 'Same Property Requirement', 'Budget Protection Margin'],
    status: 'WARN',
  },
  {
    id: 'evt-3',
    timestamp: '10:28:45',
    eventType: 'ESCROW_PAYMENT_LOCKED',
    tripId: 'TRIP-8421',
    agentName: 'Verification Agent',
    summary: 'Razorpay payment of ₹31,300 locked into SafeBound smart escrow contract.',
    decisionFactors: ['256-Bit Signature Verified', 'Card Auth Approved', 'Escrow Ledger Allocated'],
    status: 'SUCCESS',
  },
  {
    id: 'evt-4',
    timestamp: '10:24:19',
    eventType: 'PRICE_DROP_DETECTED',
    tripId: 'TRIP-9104',
    agentName: 'Optimization Agent',
    summary: 'Indigo flash discount triggered ₹2,400 package price reduction for South Goa.',
    decisionFactors: ['10% Flash Fare Drop', 'Inclusion Match Verified', 'Watchlist Notification Triggered'],
    status: 'INFO',
  },
  {
    id: 'evt-5',
    timestamp: '10:20:00',
    eventType: 'HIGHWAY_CLEARANCE_VERIFIED',
    tripId: 'TRIP-ALL',
    agentName: 'Safety Agent',
    summary: 'NH-707 landslide inspection clear with zero active advisories.',
    decisionFactors: ['Transit Authority Feed', 'Highway Camera Feed', 'Local syndicate status'],
    status: 'SUCCESS',
  },
];
