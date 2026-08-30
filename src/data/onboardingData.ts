export interface TravelOnboardingPreferences {
  homeCity: string;
  travelStyles: string[];
  budgetTier: string;
  duration: string;
  transportModes: string[];
  stayTier: string;
  safetyPriority: 'normal' | 'high' | 'very_high';
  weatherPreference: string[];
  avoidHeavyRain: boolean;
}

export const DEFAULT_ONBOARDING_PREFERENCES: TravelOnboardingPreferences = {
  homeCity: 'Delhi',
  travelStyles: ['Mountains', 'Nature Trails', 'Adventure'],
  budgetTier: '₹20,000 – ₹40,000',
  duration: '3–5 Days',
  transportModes: ['Train', 'Flight'],
  stayTier: '4★ Upscale & Boutique',
  safetyPriority: 'high',
  weatherPreference: ['🌤️ Pleasant (20°C–25°C)'],
  avoidHeavyRain: true,
};

export const POPULAR_CITIES = [
  'Delhi (NCR)',
  'Mumbai',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Chandigarh',
  'Jaipur',
];

export const TRAVEL_STYLES = [
  { id: 'mountains', label: '🏔️ Mountains & Valleys', desc: 'Snow ridges, hill stations and pine forests' },
  { id: 'beaches', label: '🏖️ Beaches & Coastlines', desc: 'White sands, sunsets and ocean retreats' },
  { id: 'nature', label: '🌿 Nature & Waterfalls', desc: 'Tea estates, trekking trails and lake view cabins' },
  { id: 'culture', label: '🏛️ Heritage & Culture', desc: 'Palaces, ancient forts and local architecture' },
  { id: 'relaxing', label: '🧘 Peaceful & Quiet', desc: 'Slow travel, wellness resorts and scenic isolation' },
  { id: 'adventure', label: '🧗 Extreme Adventure', desc: 'Rafting, paragliding, high passes and camping' },
  { id: 'wildlife', label: '🐅 Wildlife & Safaris', desc: 'National parks, tiger reserves and jungle lodges' },
  { id: 'spiritual', label: '🛕 Spiritual & Temple', desc: 'Sacred river ghats, heritage temples and calm' },
  { id: 'entertainment', label: '🎉 Nightlife & Food', desc: 'Cafes, night markets and culinary exploration' },
];

export const BUDGET_TIERS = [
  { id: 'under_10k', label: 'Under ₹10,000', desc: 'Quick weekend budget escapes' },
  { id: '10k_20k', label: '₹10,000 – ₹20,000', desc: 'Smart value stays & train getaways' },
  { id: '20k_40k', label: '₹20,000 – ₹40,000', desc: 'Comfortable 4★ all-inclusive packages (Popular)' },
  { id: '40k_75k', label: '₹40,000 – ₹75,000', desc: 'Premium flights & luxury heritage stays' },
  { id: '75k_plus', label: '₹75,000+', desc: 'Bespoke luxury & 5★ experiential journeys' },
  { id: 'no_fixed', label: 'No Fixed Limit', desc: 'Optimize for best quality regardless of price' },
];

export const DURATION_OPTIONS = [
  { id: 'weekend', label: 'Weekend (2 Days)', desc: 'Friday night to Sunday evening' },
  { id: '3_5_days', label: '3–5 Days', desc: 'Ideal for Himachal, Goa & short breaks' },
  { id: '5_7_days', label: '5–7 Days', desc: 'Full exploration of a state/region' },
  { id: '1_2_weeks', label: '1–2 Weeks', desc: 'Multi-destination extended journey' },
];

export const TRANSPORT_OPTIONS = [
  { id: 'train', label: '🚆 Train (Vande Bharat / Express)', desc: 'Scenic rail & comfortable AC travel' },
  { id: 'flight', label: '✈️ Flight (Non-stop)', desc: 'Fastest for inter-state distances' },
  { id: 'car', label: '🚗 Private Cab / Self-Drive', desc: 'Flexible routes & road trips' },
  { id: 'bus', label: '🚌 Volvo Semi-Sleeper Bus', desc: 'Overnight hill station connectivity' },
  { id: 'best', label: '⚡ Whatever SafeBound AI Recommends', desc: 'Auto-select fastest & most comfortable mode' },
];

export const STAY_TIERS = [
  { id: 'budget', label: 'Budget / Homestay', desc: 'Clean, verified homestays & hostels' },
  { id: '3star', label: '3★ Comfortable Hotel', desc: 'Standard amenities, AC & breakfast' },
  { id: '4star', label: '4★ Upscale & Boutique', desc: 'Scenic valley view suites & fine dining (Popular)' },
  { id: '5star', label: '5★ Luxury Resort', desc: 'Full-service luxury, spa & premium concierge' },
];

export const SAFETY_PRIORITY_OPTIONS = [
  {
    id: 'normal',
    label: 'Standard Safety Weight',
    desc: 'Consider safety indicators alongside budget and experiences.',
  },
  {
    id: 'high',
    label: 'High Safety Priority (Recommended)',
    desc: 'Prioritize certified routes, verified chauffeurs, and clear highway advisories.',
  },
  {
    id: 'very_high',
    label: 'Maximum Safety Priority',
    desc: 'Strictly filter for top safety ratings and zero active weather/transit warnings.',
  },
];

export const WEATHER_OPTIONS = [
  { id: 'pleasant', label: '🌤️ Pleasant & Mild (18°C–25°C)' },
  { id: 'cold', label: '❄️ Cold / Snow (0°C–15°C)' },
  { id: 'warm', label: '☀️ Warm & Sunny (25°C–32°C)' },
  { id: 'rainy', label: '🌧️ Monsoon / Lush Mist' },
  { id: 'no_pref', label: '🌈 Any Weather Conditions' },
];
