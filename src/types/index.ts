export interface Destination {
  id: string;
  name: string;
  state: string;
  tagline: string;
  tags: string[];
  startingPrice: number;
  bestSeason: string;
  safetyScore: number;
  imageUrl: string;
  description: string;
  highlights: string[];
  weather: {
    temp: string;
    condition: string;
  };
}

export interface Deal {
  id: string;
  title: string;
  destination: string;
  duration: string;
  transport: string;
  hotel: string;
  activitiesCount: number;
  activitiesList: string[];
  currentPrice: number;
  originalPrice: number;
  discountPercentage: number;
  updatedAgo: string;
  imageUrl: string;
  badge?: string;
  safetyScore: number;
  includes: string[];
}

export interface TripPlanRequest {
  startingFrom?: string;
  destination?: string;
  dates?: string;
  travellers?: number;
  budget?: number;
  interests?: string[];
  prompt?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  highlights: string[];
  hotel: string;
  activities: { time: string; title: string; desc: string; icon?: string }[];
}

export interface GeneratedTripPlan {
  id: string;
  title: string;
  destination: string;
  duration: string;
  startingCity: string;
  travellers: number;
  totalBudget: number;
  estimatedCost: number;
  safetyScore: number;
  weatherForecast: string;
  breakdown: {
    flights: { title: string; cost: number; details: string };
    hotel: { title: string; cost: number; rating: number; details: string };
    transfers: { title: string; cost: number; details: string };
    activities: { title: string; cost: number; details: string };
    taxes: { title: string; cost: number; details: string };
  };
  days: ItineraryDay[];
  status: 'Recommended' | 'Selected' | 'Payment Pending' | 'Payment Successful' | 'Booking Processing' | 'Confirmed';
  pnr?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  suggestedPlan?: GeneratedTripPlan;
  quickReplies?: string[];
}
