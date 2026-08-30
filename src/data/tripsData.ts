export interface TripBookingDetail {
  id: string;
  type: 'transport' | 'hotel' | 'transfer' | 'activity';
  title: string;
  provider: string;
  routeOrLocation: string;
  dateTime: string;
  bookingRef: string;
  status: 'Confirmed' | 'Upcoming' | 'In progress' | 'Completed' | 'Changed' | 'Cancelled';
  details: string;
  notes?: string;
}

export interface TripTimelineEvent {
  id: string;
  dateStr: string;
  timeStr: string;
  type: 'transport' | 'transfer' | 'hotel' | 'activity';
  title: string;
  subtitle: string;
  status: 'Confirmed' | 'Upcoming' | 'In progress' | 'Completed' | 'Changed' | 'Cancelled';
  badgeText?: string;
  pnrOrRef?: string;
}

export interface TripDocument {
  id: string;
  name: string;
  type: 'Ticket' | 'Voucher' | 'Pass' | 'Invoice';
  fileFormat: string;
  fileSize: string;
  referenceNo: string;
  downloadUrl: string;
}

export interface UpcomingTripData {
  id: string;
  title: string;
  destination: string;
  state: string;
  dates: string;
  duration: string;
  status: 'Confirmed' | 'In Progress' | 'Completed';
  route: {
    from: string;
    midpoint?: { name: string; mode: string };
    to: string;
  };
  travellers: number;
  totalCost: number;
  totalBudget: number;
  remainingBuffer: number;
  weather: {
    today: { temp: string; condition: string };
    tomorrow: { temp: string; condition: string };
    status: string;
  };
  safetyStatus: {
    status: 'Normal' | 'Advisory' | 'Alert';
    text: string;
  };
  liveMonitoring: {
    transport: boolean;
    hotel: boolean;
    transfers: boolean;
    activities: boolean;
    weather: boolean;
  };
  disruption?: {
    hasDisruption: boolean;
    type: string;
    title: string;
    description: string;
    originalTime: string;
    updatedTime: string;
    status: string;
  };
  bookings: TripBookingDetail[];
  timeline: TripTimelineEvent[];
  documents: TripDocument[];
  monitoringLogs: {
    time: string;
    event: string;
  }[];
}

export const ACTIVE_UPCOMING_TRIP: UpcomingTripData = {
  id: 'SB-MUSSOORIE-4D',
  title: 'Delhi → Mussoorie Pine & Valley Getaway',
  destination: 'Mussoorie',
  state: 'Uttarakhand',
  dates: 'Sep 15 – Sep 19, 2026',
  duration: '4 Days / 3 Nights',
  status: 'Confirmed',
  route: {
    from: 'New Delhi (DEL)',
    midpoint: { name: 'Dehradun Station', mode: '🚆 Vande Bharat / Volvo' },
    to: 'Mussoorie Valley',
  },
  travellers: 2,
  totalCost: 31300,
  totalBudget: 40000,
  remainingBuffer: 8700,
  weather: {
    today: { temp: '24°C', condition: 'Light rain & misty pine breeze' },
    tomorrow: { temp: '23°C', condition: 'Clear crisp mountain skies' },
    status: 'Good for Mountain Trails',
  },
  safetyStatus: {
    status: 'Normal',
    text: 'Normal — No road blockages or weather alerts detected on NH-707.',
  },
  liveMonitoring: {
    transport: true,
    hotel: true,
    transfers: true,
    activities: true,
    weather: true,
  },
  disruption: {
    hasDisruption: true,
    type: 'Transport Delay',
    title: '⚠️ Transport delay detected on Delhi ➔ Dehradun route',
    description: 'Your train is currently delayed by 1h 35m due to track maintenance.',
    originalTime: '10:45 AM Pickup',
    updatedTime: '12:20 PM Pickup',
    status: 'Station transfer adjusted automatically',
  },
  bookings: [
    {
      id: 'bk-1',
      type: 'transport',
      title: 'Delhi ➔ Dehradun Return AC Coach',
      provider: 'Vande Bharat Express / Volvo Deluxe',
      routeOrLocation: 'New Delhi Railway Station ➔ Dehradun Hub',
      dateTime: '15 Sep, 08:20 AM – 12:20 PM',
      bookingRef: 'PNR: VB-894210',
      status: 'Confirmed',
      details: 'Reserved Window Seats 14 & 15 (Coach C2) with onboard meals.',
      notes: 'Real-time delay tracking active.',
    },
    {
      id: 'bk-2',
      type: 'transfer',
      title: 'Dehradun Station ➔ Mussoorie Hotel Chauffeur',
      provider: 'SafeBound Escort Fleet (Sedan)',
      routeOrLocation: 'Dehradun Station Exit ➔ Cedar View Retreat',
      dateTime: '15 Sep, 12:20 PM (Updated)',
      bookingRef: 'TX-77492',
      status: 'Changed',
      details: 'Driver: Rajesh Rawat (White Dzire UK07-AB-4821).',
      notes: 'Pickup time automatically synchronized with train delay.',
    },
    {
      id: 'bk-3',
      type: 'hotel',
      title: '4★ Mussoorie Cedar View Heritage Retreat',
      provider: 'Cedar View Hospitality',
      routeOrLocation: 'Mall Road Ridge, Mussoorie',
      dateTime: 'Check-in: 15 Sep (02:00 PM) • Check-out: 19 Sep (11:00 AM)',
      bookingRef: 'HTL-894102',
      status: 'Confirmed',
      details: 'Premium Valley View Suite with King Bed, private balcony & daily buffet breakfast.',
    },
    {
      id: 'bk-4',
      type: 'activity',
      title: 'Gun Hill Ropeway & Kempty Falls Guided Trek',
      provider: 'Uttarakhand Mountain Adventures',
      routeOrLocation: 'Gun Hill Base & Kempty Trail',
      dateTime: '16 Sep, 10:00 AM',
      bookingRef: 'ACT-33819',
      status: 'Confirmed',
      details: 'VIP Fast-track cable car passes + certified local naturalist guide.',
    },
  ],
  timeline: [
    {
      id: 'tl-1',
      dateStr: 'SEP 15 (DAY 1)',
      timeStr: '08:20 AM',
      type: 'transport',
      title: '🚆 Delhi → Dehradun Departure',
      subtitle: 'Vande Bharat Express (PNR: VB-894210)',
      status: 'Confirmed',
      badgeText: 'On Track',
    },
    {
      id: 'tl-2',
      dateStr: 'SEP 15 (DAY 1)',
      timeStr: '12:20 PM',
      type: 'transfer',
      title: '🚕 Station → Hotel Mountain Chauffeur',
      subtitle: 'Dehradun Station ➔ Mussoorie Retreat',
      status: 'Changed',
      badgeText: 'Adjusted Automatically (12:20 PM)',
    },
    {
      id: 'tl-3',
      dateStr: 'SEP 15 (DAY 1)',
      timeStr: '02:00 PM',
      type: 'hotel',
      title: '🏨 Cedar View Retreat Check-in',
      subtitle: 'Valley Suite Key Handover with Welcome Herbal Tea',
      status: 'Confirmed',
      badgeText: 'Pre-Registered',
    },
    {
      id: 'tl-4',
      dateStr: 'SEP 16 (DAY 2)',
      timeStr: '10:00 AM',
      type: 'activity',
      title: '🏞️ Kempty Falls Nature Trail & Local Cafe Tour',
      subtitle: 'Private guide pickup from hotel lobby',
      status: 'Confirmed',
      badgeText: 'Guide Assigned',
    },
    {
      id: 'tl-5',
      dateStr: 'SEP 17 (DAY 3)',
      timeStr: '11:00 AM',
      type: 'activity',
      title: '🎟️ Gun Hill Ropeway Ride & Stargazing Bonfire',
      subtitle: 'Panoramic 360° Himalayan vista pass',
      status: 'Confirmed',
      badgeText: 'VIP Fast-track',
    },
    {
      id: 'tl-6',
      dateStr: 'SEP 19 (DAY 4)',
      timeStr: '11:00 AM',
      type: 'transport',
      title: '🚆 Return Transit ➔ New Delhi',
      subtitle: 'Express return coach to Delhi NCR',
      status: 'Upcoming',
      badgeText: 'Confirmed',
    },
  ],
  documents: [
    {
      id: 'doc-1',
      name: 'Delhi-Dehradun Train E-Ticket (Return)',
      type: 'Ticket',
      fileFormat: 'PDF',
      fileSize: '412 KB',
      referenceNo: 'PNR: VB-894210',
      downloadUrl: '#download-train-ticket',
    },
    {
      id: 'doc-2',
      name: 'Cedar View Retreat Confirmed Hotel Voucher',
      type: 'Voucher',
      fileFormat: 'PDF',
      fileSize: '320 KB',
      referenceNo: 'HTL-894102',
      downloadUrl: '#download-hotel-voucher',
    },
    {
      id: 'doc-3',
      name: 'Mountain Chauffeur Transfer Voucher',
      type: 'Voucher',
      fileFormat: 'PDF',
      fileSize: '210 KB',
      referenceNo: 'TX-77492',
      downloadUrl: '#download-transfer-voucher',
    },
    {
      id: 'doc-4',
      name: 'Gun Hill & Kempty Activity Passes (x2)',
      type: 'Pass',
      fileFormat: 'PDF',
      fileSize: '290 KB',
      referenceNo: 'ACT-33819',
      downloadUrl: '#download-activity-pass',
    },
    {
      id: 'doc-5',
      name: 'SafeBound Unified Tax Invoice & Escrow Receipt',
      type: 'Invoice',
      fileFormat: 'PDF',
      fileSize: '540 KB',
      referenceNo: 'INV-2026-9821',
      downloadUrl: '#download-invoice',
    },
  ],
  monitoringLogs: [
    { time: '10:32 AM Today', event: 'Train status checked: Delayed 1h 35m. Delay impact analyzed.' },
    { time: '10:30 AM Today', event: 'Transfer Agent: Station pickup rescheduled from 10:45 AM to 12:20 PM.' },
    { time: '10:15 AM Today', event: 'Weather Agent: 24°C mild rain verified. Mountain roads clear.' },
    { time: 'Yesterday', event: 'Hotel Agent: Cedar Retreat check-in confirmed with valley balcony request.' },
    { time: '14 Aug 2026', event: 'SafeBound Payment Escrow: ₹31,300 locked with Razorpay single receipt.' },
  ],
};

export const PAST_TRIPS = [
  {
    id: 'past-goa',
    title: 'Goa Coastal Sun & Catamaran Cruise',
    destination: 'Goa',
    state: 'Goa',
    dates: 'Jan 12 – Jan 16, 2026',
    duration: '5 Days',
    totalSpent: 28450,
    bookingsCount: 4,
    rating: 5,
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'past-jaipur',
    title: 'Jaipur & Amer Palace Royal Heritage',
    destination: 'Jaipur',
    state: 'Rajasthan',
    dates: 'Dec 03 – Dec 05, 2025',
    duration: '3 Days',
    totalSpent: 16900,
    bookingsCount: 3,
    rating: 5,
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1603288940320-9844add9467b?q=80&w=400&auto=format&fit=crop',
  },
];
