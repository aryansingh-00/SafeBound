export interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  language: string;
  currency: string;
  memberSince: string;
  completionPercentage: number;
}

export interface SavedTraveller {
  id: string;
  fullName: string;
  age: number;
  dob?: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  phone?: string;
  email?: string;
  isPrimary: boolean;
  nationality: string;
  specialAssistance?: string;
  readiness: {
    basic: boolean;
    contact: boolean;
    idToken: boolean;
  };
}

export interface UserPreferences {
  travelStyles: string[];
  hotelCategories: string[];
  hotelFeatures: string[];
  preferredTransport: string[];
  maxTravelTimeHours: number;
  preferredClass: string;
  safetyPriority: 'Normal' | 'High' | 'Very High';
  weatherPreferences: string[];
  typicalBudget: string;
}

export interface SavedDestinationItem {
  id: string;
  name: string;
  state: string;
  tagline: string;
  startingPrice: number;
  imageUrl: string;
  tags: string[];
}

export interface SavedTripPlanItem {
  id: string;
  title: string;
  destination: string;
  duration: string;
  cost: number;
  travellers: number;
  createdDate: string;
}

export const DEFAULT_USER_PROFILE: UserProfileData = {
  name: 'Aryan Singh',
  email: 'aryan@safebound.ai',
  phone: '+91 98765 43210',
  dob: '2005-08-15',
  gender: 'Male',
  language: 'English',
  currency: 'INR (₹)',
  memberSince: '2026',
  completionPercentage: 85,
};

export const INITIAL_SAVED_TRAVELLERS: SavedTraveller[] = [
  {
    id: 'trv-1',
    fullName: 'Aryan Singh',
    age: 21,
    dob: '2005-08-15',
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'aryan@safebound.ai',
    isPrimary: true,
    nationality: 'Indian',
    readiness: {
      basic: true,
      contact: true,
      idToken: true,
    },
  },
  {
    id: 'trv-2',
    fullName: 'Rhea Sharma',
    age: 26,
    dob: '2000-03-22',
    gender: 'Female',
    phone: '+91 98112 33445',
    email: 'rhea.s@example.com',
    isPrimary: false,
    nationality: 'Indian',
    readiness: {
      basic: true,
      contact: true,
      idToken: true,
    },
  },
  {
    id: 'trv-3',
    fullName: 'Rahul Kumar',
    age: 24,
    gender: 'Male',
    isPrimary: false,
    nationality: 'Indian',
    readiness: {
      basic: true,
      contact: false,
      idToken: false,
    },
  },
];

export const INITIAL_USER_PREFERENCES: UserPreferences = {
  travelStyles: ['Adventure', 'Nature', 'Relaxing'],
  hotelCategories: ['4★ Hotel', '5★ Hotel'],
  hotelFeatures: ['Breakfast included', 'Free cancellation', 'High rating', 'Valley/Mountain View'],
  preferredTransport: ['Train (Vande Bharat)', 'Dedicated Chauffeur Cab'],
  maxTravelTimeHours: 8,
  preferredClass: 'AC Chair Car / Executive',
  safetyPriority: 'High',
  weatherPreferences: ['Pleasant', 'Cold / Mountain Air', 'Avoid heavy rain'],
  typicalBudget: '₹20K–₹40K',
};

export const INITIAL_SAVED_DESTINATIONS: SavedDestinationItem[] = [
  {
    id: 'dest-manali',
    name: 'Manali & Solang Valley',
    state: 'Himachal Pradesh',
    tagline: 'Snow-capped peaks, paragliding and Rohtang pass',
    startingPrice: 14999,
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Adventure', 'Snow'],
  },
  {
    id: 'dest-goa',
    name: 'South Goa Serenity',
    state: 'Goa',
    tagline: 'Pristine white-sand shores and coastal seafood',
    startingPrice: 16499,
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    tags: ['Beach', 'Relaxing', 'Nightlife'],
  },
  {
    id: 'dest-kashmir',
    name: 'Gulmarg & Srinagar',
    state: 'Jammu & Kashmir',
    tagline: 'Gondola ride, Dal Lake houseboats and pine valleys',
    startingPrice: 21999,
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Romantic', 'Scenic'],
  },
  {
    id: 'dest-kerala',
    name: 'Munnar & Alleppey',
    state: 'Kerala',
    tagline: 'Emerald tea plantations and tranquil backwater cruises',
    startingPrice: 17999,
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    tags: ['Nature', 'Relaxing', 'Backwaters'],
  },
];

export const INITIAL_SAVED_PLANS: SavedTripPlanItem[] = [
  {
    id: 'plan-delhi-goa',
    title: 'Delhi ➔ Goa 4-Day Coastal Escape',
    destination: 'South Goa',
    duration: '4 Days / 3 Nights',
    cost: 28500,
    travellers: 2,
    createdDate: 'Aug 24, 2026',
  },
  {
    id: 'plan-delhi-kashmir',
    title: 'Delhi ➔ Gulmarg 5-Day Alpine Retreat',
    destination: 'Gulmarg, Kashmir',
    duration: '5 Days / 4 Nights',
    cost: 38000,
    travellers: 2,
    createdDate: 'Aug 18, 2026',
  },
];
