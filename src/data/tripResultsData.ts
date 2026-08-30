export interface TripResultPackage {
  id: string;
  destination: string;
  state: string;
  title: string;
  duration: string;
  matchScore: number;
  isTopPick?: boolean;
  totalPrice: number;
  originalPrice?: number;
  remainingBuffer: number;
  imageUrl: string;
  tagline: string;
  weather: {
    temp: string;
    condition: string;
    suitability: 'Good' | 'Fair' | 'Moderate';
    alertNote?: string;
  };
  safety: {
    status: 'Strong Match' | 'Normal' | 'High';
    score: number;
    notes: string;
  };
  transport: {
    mode: string;
    operator: string;
    cost: number;
    travelTime: string;
  };
  hotel: {
    name: string;
    stars: string;
    roomType: string;
    cost: number;
    rating: number;
  };
  transfer: {
    type: string;
    cost: number;
    details: string;
  };
  activities: {
    count: number;
    cost: number;
    list: string[];
  };
  inclusions: string[];
  whyRecommended: string[];
  itinerarySummary: { day: number; title: string; desc: string }[];
}

export const TRIP_RESULTS_PACKAGES: TripResultPackage[] = [
  {
    id: 'pkg-mussoorie',
    destination: 'Mussoorie',
    state: 'Uttarakhand',
    title: 'Mussoorie — 4 Days Alpine Retreat',
    duration: '4 Days / 3 Nights',
    matchScore: 92,
    isTopPick: true,
    totalPrice: 31300,
    originalPrice: 38500,
    remainingBuffer: 8700,
    imageUrl: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80',
    tagline: 'Peaceful deodar ridges, cable cars and colonial bakeries',
    weather: {
      temp: '23°C',
      condition: 'Pleasant & Mild',
      suitability: 'Good',
    },
    safety: {
      status: 'Strong Match',
      score: 9.3,
      notes: 'Highway NH-707 fully clear; no active landslide advisories.',
    },
    transport: {
      mode: 'Train (Vande Bharat)',
      operator: 'IRCTC Executive Coach',
      cost: 7800,
      travelTime: '5h 40m',
    },
    hotel: {
      name: '4★ Cedar View Heritage Retreat',
      stars: '4★',
      roomType: 'Balcony Valley View Suite',
      cost: 16500,
      rating: 4.8,
    },
    transfer: {
      type: 'Private Dedicated Chauffeur',
      cost: 2500,
      details: 'Dehradun ➔ Mussoorie + all local sightseeing',
    },
    activities: {
      count: 2,
      cost: 4500,
      list: ['Gun Hill Cable Car VIP Pass', 'Kempty Nature Trail Guided Walk'],
    },
    inclusions: ['Return AC Train', '4★ Suite Stay', 'Dedicated Chauffeur', '2 Curated Passes', 'Daily Breakfast'],
    whyRecommended: [
      'Fits comfortably within your ₹40,000 budget (₹8,700 buffer)',
      'Matches your peaceful mountain & nature preference',
      'Optimal September Himalayan weather (23°C)',
      'Convenient 5.5 hour multi-modal travel time from Delhi',
      'Strong safety score (9.3/10) with synchronized chauffeur transfers',
    ],
    itinerarySummary: [
      { day: 1, title: 'Delhi to Mussoorie', desc: 'Vande Bharat to Dehradun + Chauffeur transfer to Cedar View Retreat' },
      { day: 2, title: 'Kempty Falls & Trail', desc: 'Guided nature walk through pine forests and mountain lunch' },
      { day: 3, title: 'Gun Hill & Mall Road', desc: 'VIP fast-track cable car and colonial heritage bookstore stroll' },
      { day: 4, title: 'Return Journey', desc: 'Hotel check-out and synchronized return transit to Delhi' },
    ],
  },
  {
    id: 'pkg-dharamshala',
    destination: 'Dharamshala & McLeodganj',
    state: 'Himachal Pradesh',
    title: 'Dharamshala — 4 Days Monasteries & Mist',
    duration: '4 Days / 3 Nights',
    matchScore: 89,
    totalPrice: 34200,
    originalPrice: 42000,
    remainingBuffer: 5800,
    imageUrl: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80',
    tagline: 'Tibetan spirituality, Dhauladhar views and pine tea cafes',
    weather: {
      temp: '22°C',
      condition: 'Occasional light showers',
      suitability: 'Good',
    },
    safety: {
      status: 'Strong Match',
      score: 9.1,
      notes: 'Kangra valley roads open with normal monsoon clearance.',
    },
    transport: {
      mode: 'AC Volvo Semi-Sleeper',
      operator: 'HPTDC Premium Sleeper',
      cost: 6800,
      travelTime: '9h 30m',
    },
    hotel: {
      name: '4★ Fortune Park Moksha',
      stars: '4★',
      roomType: 'Cedar Mountain Deluxe',
      cost: 18400,
      rating: 4.7,
    },
    transfer: {
      type: 'Local Private Cab',
      cost: 4200,
      details: 'Gaggal/Bus pickup + McLeodganj & Bhagsu transfers',
    },
    activities: {
      count: 3,
      cost: 4800,
      list: ['Tsuglagkhang Monastery Guided Pass', 'Bhagsu Waterfall Trek', 'Kangra Tea Tasting'],
    },
    inclusions: ['Return Volvo Coach', '4★ Mountain Stay', 'Private Transfers', '3 Activity Passes', 'Breakfast'],
    whyRecommended: [
      'Excellent cultural and spiritual immersion in peaceful McLeodganj',
      'Within budget with ₹5,800 savings buffer',
      'Stunning Dhauladhar snow-range backdrop',
      'High guest satisfaction rating (4.7/5)',
    ],
    itinerarySummary: [
      { day: 1, title: 'Arrival & Monasteries', desc: 'Check-in and evening walk around Dalai Lama Temple' },
      { day: 2, title: 'Bhagsu & Waterfalls', desc: 'Scenic mountain walk and local cafe hopping' },
      { day: 3, title: 'Kangra Tea Gardens', desc: 'Guided plantation tour and traditional Tibetan dinner' },
      { day: 4, title: 'Departure', desc: 'Shopping in Tibetan market and evening return coach' },
    ],
  },
  {
    id: 'pkg-nainital',
    destination: 'Nainital',
    state: 'Uttarakhand',
    title: 'Nainital — 4 Days Lake View & Ridge',
    duration: '4 Days / 3 Nights',
    matchScore: 86,
    totalPrice: 32800,
    originalPrice: 39000,
    remainingBuffer: 7200,
    imageUrl: 'https://images.unsplash.com/photo-1610715936287-6c2ad208cdbf?auto=format&fit=crop&w=800&q=80',
    tagline: 'Emerald boating lake, snow view point and colonial heritage',
    weather: {
      temp: '20°C',
      condition: 'Crisp mountain breeze',
      suitability: 'Good',
    },
    safety: {
      status: 'Normal',
      score: 8.8,
      notes: 'Kathgodam highway in standard condition.',
    },
    transport: {
      mode: 'Train (Kathgodam Express)',
      operator: 'IRCTC AC Chair Car',
      cost: 5600,
      travelTime: '6h 00m',
    },
    hotel: {
      name: '3.5★ The Naini Retreat',
      stars: '3.5★',
      roomType: 'Heritage Lake View Room',
      cost: 17200,
      rating: 4.6,
    },
    transfer: {
      type: 'Dedicated Hill Cab',
      cost: 5500,
      details: 'Kathgodam station return + 3-lake circuit',
    },
    activities: {
      count: 2,
      cost: 4500,
      list: ['Naini Lake Yacht Boating Pass', 'Snow View Cable Car Ticket'],
    },
    inclusions: ['Return Train Ticket', 'Heritage Hotel Stay', 'Kathgodam Cab', 'Boating & Ropeway Pass', 'Breakfast'],
    whyRecommended: [
      'Direct comfortable daytime train from Delhi to Kathgodam',
      'Classic colonial lake charm with tranquil boat rides',
      'Solid ₹7,200 budget buffer remaining',
    ],
    itinerarySummary: [
      { day: 1, title: 'Kathgodam to Nainital', desc: 'Train arrival and scenic hill climb to The Naini Retreat' },
      { day: 2, title: 'Lakes & Boating', desc: 'Private yacht boating on Naini Lake and Mallital stroll' },
      { day: 3, title: 'Snow View & Pangot', desc: 'Cable car to Snow View and birdwatching in Pangot' },
      { day: 4, title: 'Return Transit', desc: 'Check-out and afternoon train back to Delhi' },
    ],
  },
  {
    id: 'pkg-manali',
    destination: 'Manali & Solang',
    state: 'Himachal Pradesh',
    title: 'Manali — 4 Days Alpine Peaks & Adventure',
    duration: '4 Days / 3 Nights',
    matchScore: 81,
    totalPrice: 35400,
    originalPrice: 44000,
    remainingBuffer: 4600,
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    tagline: 'Towering deodars, Beas river valley and Solang adventure',
    weather: {
      temp: '19°C',
      condition: 'Cool & Crisp',
      suitability: 'Moderate',
      alertNote: 'Slightly longer 12h travel time from Delhi',
    },
    safety: {
      status: 'Normal',
      score: 8.6,
      notes: 'Kiratpur-Manali four-lane highway open and smooth.',
    },
    transport: {
      mode: 'Luxury Volvo Sleeper',
      operator: 'Zingbus Premium AC Sleeper',
      cost: 7200,
      travelTime: '11h 45m',
    },
    hotel: {
      name: '4★ The Whispering Pines Resort',
      stars: '4★',
      roomType: 'Pine Wood Balcony Chalet',
      cost: 18900,
      rating: 4.7,
    },
    transfer: {
      type: 'Private Sightseeing Cab',
      cost: 4500,
      details: 'All local transfers & Solang Valley run',
    },
    activities: {
      count: 2,
      cost: 4800,
      list: ['Solang Valley Paragliding Pass', 'Old Manali Apple Orchard Walk'],
    },
    inclusions: ['Overnight Volvo Sleeper', '4★ Chalet Resort', 'Private Cab', 'Paragliding Pass', 'Daily Breakfast'],
    whyRecommended: [
      'High altitude adventure with snow-capped mountain views',
      'Riverside cottage stay surrounded by apple orchards',
      'All-inclusive within budget with ₹4,600 buffer',
    ],
    itinerarySummary: [
      { day: 1, title: 'Overnight Volvo Arrival', desc: 'Check-in to wooden chalet and Old Manali cafe walk' },
      { day: 2, title: 'Solang Valley Adventure', desc: 'Paragliding and panoramic valley ropeway' },
      { day: 3, title: 'Naggar Castle & Waterfalls', desc: 'Art gallery, heritage stone castle and trout lunch' },
      { day: 4, title: 'Evening Return', desc: 'Shopping on Mall Road and overnight return coach' },
    ],
  },
];
