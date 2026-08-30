export interface DashboardUpcomingTrip {
  id: string;
  title: string;
  destination: string;
  state: string;
  startDate: string;
  endDate: string;
  days: number;
  travellers: number;
  totalCost: number;
  status: 'Confirmed' | 'Monitoring';
  route: string[];
  health: {
    overall: string;
    bookings: boolean;
    transport: boolean;
    hotel: boolean;
    weather: boolean;
    transfers: boolean;
  };
  daysLeft: number;
}

export interface DashboardMetric {
  tripsCount: number;
  savedPlansCount: number;
  moneySaved: number;
  activeAlertsCount: number;
}

export interface DashboardRecommendation {
  id: string;
  name: string;
  state: string;
  matchScore: number;
  imageUrl: string;
  typicalBudget: number;
  bestSeason: string;
  tagline: string;
  tags: string[];
}

export interface PriceOpportunityItem {
  id: string;
  destination: string;
  tagline: string;
  originalPrice: number;
  currentPrice: number;
  savings: number;
  duration: string;
  imageUrl: string;
}

export interface UpcomingActionItem {
  id: string;
  type: 'ticket' | 'hotel' | 'activity' | 'transfer';
  title: string;
  timing: string;
  status: string;
  actionRequired: boolean;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'booked' | 'optimized' | 'alert' | 'voucher';
  link: string;
}

export const DASHBOARD_METRICS: DashboardMetric = {
  tripsCount: 3,
  savedPlansCount: 5,
  moneySaved: 4850,
  activeAlertsCount: 1,
};

export const DASHBOARD_UPCOMING_TRIP: DashboardUpcomingTrip = {
  id: 'SB-MUSSOORIE-4D',
  title: 'Mussoorie 4-Day Alpine Retreat',
  destination: 'Mussoorie',
  state: 'Uttarakhand',
  startDate: 'Sep 15, 2026',
  endDate: 'Sep 19, 2026',
  days: 4,
  travellers: 2,
  totalCost: 31300,
  status: 'Confirmed',
  route: ['Delhi (NDLS)', 'Dehradun (DDN)', 'Mussoorie'],
  health: {
    overall: 'Everything looks good',
    bookings: true,
    transport: true,
    hotel: true,
    weather: true,
    transfers: true,
  },
  daysLeft: 15,
};

export const DASHBOARD_RECOMMENDATIONS: DashboardRecommendation[] = [
  {
    id: 'rec-kashmir',
    name: 'Gulmarg & Srinagar',
    state: 'Jammu & Kashmir',
    matchScore: 94,
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    typicalBudget: 38000,
    bestSeason: 'Sep – Nov',
    tagline: 'Gondola ride, Dal Lake houseboats and snow pines',
    tags: ['Mountains', 'Romantic', 'Scenic'],
  },
  {
    id: 'rec-kerala',
    name: 'Munnar & Alleppey',
    state: 'Kerala',
    matchScore: 91,
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    typicalBudget: 28000,
    bestSeason: 'Sep – Feb',
    tagline: 'Emerald tea plantations and luxury backwater houseboats',
    tags: ['Nature', 'Relaxing', 'Backwaters'],
  },
  {
    id: 'rec-goa',
    name: 'South Goa Serenity',
    state: 'Goa',
    matchScore: 88,
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    typicalBudget: 22400,
    bestSeason: 'Oct – Mar',
    tagline: 'Pristine white sands, coastal dining and boutique stays',
    tags: ['Beach', 'Relaxing', 'Coastal'],
  },
];

export const DASHBOARD_PRICE_OPPORTUNITIES: PriceOpportunityItem[] = [
  {
    id: 'deal-goa',
    destination: 'South Goa Beach Escape',
    tagline: 'Your saved Goa package dropped by ₹2,400 with Indigo fare reduction',
    originalPrice: 24800,
    currentPrice: 22400,
    savings: 2400,
    duration: '4 Days / 3 Nights',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'deal-kashmir',
    destination: 'Kashmir Autumn Gondola Pass',
    tagline: 'Package rates down 12% for September advance bookings',
    originalPrice: 42000,
    currentPrice: 37500,
    savings: 4500,
    duration: '5 Days / 4 Nights',
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
  },
];

export const DASHBOARD_UPCOMING_ACTIONS: UpcomingActionItem[] = [
  {
    id: 'act-1',
    type: 'ticket',
    title: '🚆 Vande Bharat Seat Confirmation & Check-in',
    timing: 'Opens Sep 14 • 08:00 AM',
    status: 'Automated by SafeBound',
    actionRequired: false,
  },
  {
    id: 'act-2',
    type: 'hotel',
    title: '🏨 Cedar View Retreat Check-in Voucher',
    timing: 'Confirmed for Sep 15 • 02:00 PM',
    status: 'Digital Voucher Ready',
    actionRequired: false,
  },
  {
    id: 'act-3',
    type: 'activity',
    title: '🎟️ Gun Hill Ropeway VIP Pass',
    timing: 'Scheduled for Sep 17 • 10:00 AM',
    status: 'Pass in Wallet',
    actionRequired: false,
  },
];

export const DASHBOARD_RECENT_ACTIVITY: RecentActivityItem[] = [
  {
    id: 'rec-1',
    title: 'Trip Confirmed',
    description: 'Mussoorie 4-Day Alpine Package (SB-MUSSOORIE-4D) secured in escrow for ₹31,300.',
    timestamp: '2 hours ago',
    type: 'booked',
    link: '/trips/SB-MUSSOORIE-4D/confirmed',
  },
  {
    id: 'rec-2',
    title: 'Package Autonomous Optimization',
    description: 'Re-optimizer scanned alternative room suites and saved ₹1,450.',
    timestamp: '4 hours ago',
    type: 'optimized',
    link: '/trip-results',
  },
  {
    id: 'rec-3',
    title: 'Price Watcher Alert',
    description: 'South Goa 4-Day package dropped from ₹24,800 to ₹22,400.',
    timestamp: '6 hours ago',
    type: 'alert',
    link: '/deals',
  },
  {
    id: 'rec-4',
    title: 'Digital Documents Ready',
    description: 'IRCTC tickets, stay vouchers & GST tax invoice added to Document Vault.',
    timestamp: '14 hours ago',
    type: 'voucher',
    link: '/trips',
  },
];
