export interface DealItem {
  id: string;
  title: string;
  destination: string;
  state: string;
  startingCity: string;
  duration: string; // e.g. '4 Days / 3 Nights'
  durationCategory: '1-2 Days' | '3-4 Days' | '5-7 Days' | '7+ Days';
  category: 'Weekend' | 'Budget' | 'Beach' | 'Mountains' | 'Family' | 'Adventure' | 'Luxury' | 'Last Minute';
  destinationType: 'Beach' | 'Mountains' | 'Nature' | 'Culture' | 'Adventure' | 'Family' | 'Spiritual';
  originalPrice: number;
  currentPrice: number;
  discountPercentage: number;
  priceDropAmount?: number;
  matchScore: number;
  safetyScore: number;
  rating: number;
  reviewsCount: number;
  status: 'LIVE' | 'UPDATED' | 'PRICE_CHANGED' | 'SOLD_OUT' | 'EXPIRED' | 'BOOKING_AVAILABLE';
  liveTimestamp: string;
  inclusions: {
    transport: string;
    hotel: string;
    hotelRating: string;
    transfers: string;
    activitiesCount: number;
    activitiesList: string[];
    meals: string;
  };
  breakdown: {
    transport: number;
    hotel: number;
    transfers: number;
    activities: number;
    taxes: number;
  };
  cancellationPolicy: 'Free cancellation' | 'Flexible cancellation' | 'Standard';
  provider: {
    name: string;
    verified: boolean;
    rating: number;
  };
  imageUrl: string;
  isDealOfTheDay?: boolean;
  isBestValue?: boolean;
}

export const ALL_DEALS: DealItem[] = [
  {
    id: 'deal-goa-4d',
    title: 'Goa Coastal Sun & Cruise Escape',
    destination: 'Goa, India',
    state: 'Goa',
    startingCity: 'New Delhi (DEL)',
    duration: '4 Days / 3 Nights',
    durationCategory: '3-4 Days',
    category: 'Beach',
    destinationType: 'Beach',
    originalPrice: 27500,
    currentPrice: 18499,
    discountPercentage: 33,
    priceDropAmount: 3901,
    matchScore: 91,
    safetyScore: 9.1,
    rating: 4.9,
    reviewsCount: 342,
    status: 'LIVE',
    liveTimestamp: 'Updated 2 min ago',
    inclusions: {
      transport: 'Direct Flight (DEL ➔ GOI Return)',
      hotel: '4★ Whispering Palms Beach Resort',
      hotelRating: '4.8/5',
      transfers: 'Private AC Airport Pickup & Drop',
      activitiesCount: 2,
      activitiesList: ['Grand Island Scuba & Dolphin Cruise', 'Mandovi Luxury Sunset Cruise'],
      meals: 'Daily Buffet Breakfast & Welcome Drink',
    },
    breakdown: {
      transport: 7800,
      hotel: 7200,
      transfers: 1500,
      activities: 1999,
      taxes: 0,
    },
    cancellationPolicy: 'Flexible cancellation',
    provider: {
      name: 'SafeBound Direct Escrow',
      verified: true,
      rating: 4.9,
    },
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop',
    isDealOfTheDay: true,
    isBestValue: true,
  },
  {
    id: 'deal-manali-4d',
    title: 'Manali Snow Valley & Solang Adventure',
    destination: 'Manali, Himachal Pradesh',
    state: 'Himachal Pradesh',
    startingCity: 'New Delhi (DEL)',
    duration: '4 Days / 3 Nights',
    durationCategory: '3-4 Days',
    category: 'Mountains',
    destinationType: 'Mountains',
    originalPrice: 24800,
    currentPrice: 21200,
    discountPercentage: 15,
    priceDropAmount: 3600,
    matchScore: 88,
    safetyScore: 8.8,
    rating: 4.8,
    reviewsCount: 289,
    status: 'LIVE',
    liveTimestamp: 'Updated 5 min ago',
    inclusions: {
      transport: 'AC Volvo Semi-Sleeper Coach Return',
      hotel: '4★ Apple Country Snow View Resort',
      hotelRating: '4.7/5',
      transfers: 'Dedicated Mountain Cab for 4 Days',
      activitiesCount: 3,
      activitiesList: ['Solang Valley Snow Pass & Zipline', 'Jogini Waterfall Guided Hike', 'Old Manali Cafe Tour'],
      meals: 'Breakfast & Dinner Included',
    },
    breakdown: {
      transport: 4800,
      hotel: 10400,
      transfers: 3500,
      activities: 2500,
      taxes: 0,
    },
    cancellationPolicy: 'Free cancellation',
    provider: {
      name: 'Himalayan Escapes Verified',
      verified: true,
      rating: 4.8,
    },
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop',
    isBestValue: true,
  },
  {
    id: 'deal-kerala-5d',
    title: 'Kerala Emerald Houseboat & Munnar Mist',
    destination: 'Munnar & Alleppey, Kerala',
    state: 'Kerala',
    startingCity: 'Mumbai (BOM)',
    duration: '5 Days / 4 Nights',
    durationCategory: '5-7 Days',
    category: 'Family',
    destinationType: 'Nature',
    originalPrice: 29500,
    currentPrice: 26900,
    discountPercentage: 10,
    priceDropAmount: 2600,
    matchScore: 95,
    safetyScore: 9.5,
    rating: 4.9,
    reviewsCount: 512,
    status: 'LIVE',
    liveTimestamp: 'Updated 1 min ago',
    inclusions: {
      transport: 'Direct Flight Return (BOM ➔ COK)',
      hotel: '4★ Munnar Tea Mist Resort + 1 Night Private Houseboat',
      hotelRating: '4.9/5',
      transfers: 'Private AC Sedan for Entire Route',
      activitiesCount: 4,
      activitiesList: ['Private Houseboat Cruise with Chef', 'Tea Museum & Factory Tour', 'Periyar Wildlife Sanctuary', 'Kathakali Cultural Show'],
      meals: 'All Meals on Houseboat + Daily Breakfast',
    },
    breakdown: {
      transport: 8900,
      hotel: 12500,
      transfers: 3000,
      activities: 2500,
      taxes: 0,
    },
    cancellationPolicy: 'Flexible cancellation',
    provider: {
      name: 'Kerala Tourism Approved',
      verified: true,
      rating: 4.9,
    },
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop',
    isBestValue: true,
  },
  {
    id: 'deal-mussoorie-4d',
    title: 'Mussoorie Queen of Hills & Pine Retreat',
    destination: 'Mussoorie, Uttarakhand',
    state: 'Uttarakhand',
    startingCity: 'New Delhi (DEL)',
    duration: '4 Days / 3 Nights',
    durationCategory: '3-4 Days',
    category: 'Weekend',
    destinationType: 'Mountains',
    originalPrice: 24000,
    currentPrice: 21500,
    discountPercentage: 11,
    priceDropAmount: 2500,
    matchScore: 92,
    safetyScore: 9.3,
    rating: 4.8,
    reviewsCount: 198,
    status: 'LIVE',
    liveTimestamp: 'Updated 4 min ago',
    inclusions: {
      transport: 'AC Volvo Semi-Sleeper Deluxe Return',
      hotel: '4★ Cedar View Heritage Retreat',
      hotelRating: '4.8/5',
      transfers: 'Chauffeur Sightseeing Sedan',
      activitiesCount: 4,
      activitiesList: ['Gun Hill Cable Car Passes', 'Kempty Falls Guided Hike', 'Landour Bakery & Tea Trail', 'Library Cafe Tour'],
      meals: 'Daily Mountain View Breakfast',
    },
    breakdown: {
      transport: 4200,
      hotel: 11800,
      transfers: 2500,
      activities: 3000,
      taxes: 0,
    },
    cancellationPolicy: 'Free cancellation',
    provider: {
      name: 'SafeBound Verified',
      verified: true,
      rating: 4.8,
    },
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    isBestValue: true,
  },
  {
    id: 'deal-jaipur-3d',
    title: 'Jaipur & Udaipur Royal Forts Palace Getaway',
    destination: 'Jaipur & Udaipur, Rajasthan',
    state: 'Rajasthan',
    startingCity: 'New Delhi (DEL)',
    duration: '3 Days / 2 Nights',
    durationCategory: '3-4 Days',
    category: 'Budget',
    destinationType: 'Culture',
    originalPrice: 19800,
    currentPrice: 14999,
    discountPercentage: 24,
    priceDropAmount: 4801,
    matchScore: 90,
    safetyScore: 9.2,
    rating: 4.7,
    reviewsCount: 220,
    status: 'LIVE',
    liveTimestamp: 'Updated 8 min ago',
    inclusions: {
      transport: 'Vande Bharat Express AC Chair Car Return',
      hotel: '4★ Heritage Haveli Boutique Hotel',
      hotelRating: '4.7/5',
      transfers: 'Dedicated AC Chauffeur Cab',
      activitiesCount: 3,
      activitiesList: ['Amber Fort Fast-Track Pass', 'City Palace & Jantar Mantar Guide', 'Chokhi Dhani Traditional Dinner'],
      meals: 'Breakfast & Rajasthani Dinner Buffet',
    },
    breakdown: {
      transport: 3200,
      hotel: 7800,
      transfers: 2200,
      activities: 1799,
      taxes: 0,
    },
    cancellationPolicy: 'Flexible cancellation',
    provider: {
      name: 'Rajasthan Royal Escrow',
      verified: true,
      rating: 4.8,
    },
    imageUrl: 'https://images.unsplash.com/photo-1603288940320-9844add9467b?q=80&w=800&auto=format&fit=crop',
    isBestValue: false,
  },
  {
    id: 'deal-rishikesh-3d',
    title: 'Rishikesh Ganga River Rafting & Yoga Camp',
    destination: 'Rishikesh, Uttarakhand',
    state: 'Uttarakhand',
    startingCity: 'New Delhi (DEL)',
    duration: '3 Days / 2 Nights',
    durationCategory: '1-2 Days',
    category: 'Adventure',
    destinationType: 'Spiritual',
    originalPrice: 14500,
    currentPrice: 9999,
    discountPercentage: 31,
    priceDropAmount: 4501,
    matchScore: 89,
    safetyScore: 9.3,
    rating: 4.9,
    reviewsCount: 410,
    status: 'LIVE',
    liveTimestamp: 'Updated 3 min ago',
    inclusions: {
      transport: 'AC Deluxe Coach Return',
      hotel: 'Luxury Riverside Glamping Tent with AC',
      hotelRating: '4.9/5',
      transfers: 'Rafting Point & Ghat Transfers',
      activitiesCount: 3,
      activitiesList: ['16 KM Grade-III River Rafting', 'Cliff Jumping & Body Surfing', 'Triveni Ghat VIP Evening Aarti'],
      meals: 'All 3 Meals + Evening Campfire & BBQ',
    },
    breakdown: {
      transport: 2000,
      hotel: 4500,
      transfers: 1200,
      activities: 2299,
      taxes: 0,
    },
    cancellationPolicy: 'Free cancellation',
    provider: {
      name: 'Ganga Adventure Hub',
      verified: true,
      rating: 4.9,
    },
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    isBestValue: true,
  },
  {
    id: 'deal-kashmir-5d',
    title: 'Kashmir Gulmarg Gondola & Dal Lake Luxury Houseboat',
    destination: 'Srinagar & Gulmarg, Kashmir',
    state: 'Jammu & Kashmir',
    startingCity: 'New Delhi (DEL)',
    duration: '5 Days / 4 Nights',
    durationCategory: '5-7 Days',
    category: 'Luxury',
    destinationType: 'Mountains',
    originalPrice: 42000,
    currentPrice: 34999,
    discountPercentage: 17,
    priceDropAmount: 7001,
    matchScore: 94,
    safetyScore: 8.7,
    rating: 4.9,
    reviewsCount: 175,
    status: 'LIVE',
    liveTimestamp: 'Updated 10 min ago',
    inclusions: {
      transport: 'Direct Flight Return (DEL ➔ SXR)',
      hotel: '5★ Luxury Dal Lake Houseboat + 4★ Gulmarg Pine Chalet',
      hotelRating: '4.9/5',
      transfers: 'Dedicated Private Chauffeur SUV',
      activitiesCount: 3,
      activitiesList: ['Private Shikara Sunset Ride', 'Gulmarg Phase 1 & 2 Gondola Tickets', 'Pahalgam Valley Horse Trail'],
      meals: 'Wazwan Dinner & Daily Gourmet Breakfast',
    },
    breakdown: {
      transport: 12000,
      hotel: 14500,
      transfers: 4500,
      activities: 3999,
      taxes: 0,
    },
    cancellationPolicy: 'Flexible cancellation',
    provider: {
      name: 'Kashmir Luxury Escrow',
      verified: true,
      rating: 4.9,
    },
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop',
    isBestValue: true,
  },
  {
    id: 'deal-andaman-5d',
    title: 'Andaman Havelock Scuba & Radhanagar Beach',
    destination: 'Havelock & Port Blair, Andaman',
    state: 'Andaman & Nicobar',
    startingCity: 'Chennai (MAA)',
    duration: '5 Days / 4 Nights',
    durationCategory: '5-7 Days',
    category: 'Last Minute',
    destinationType: 'Beach',
    originalPrice: 48000,
    currentPrice: 38500,
    discountPercentage: 20,
    priceDropAmount: 9500,
    matchScore: 93,
    safetyScore: 9.4,
    rating: 4.8,
    reviewsCount: 140,
    status: 'LIVE',
    liveTimestamp: 'Updated 6 min ago',
    inclusions: {
      transport: 'Direct Flight Return + Makruzz Luxury Catamaran Ferry',
      hotel: '4★ Barefoot Havelock Eco-Resort',
      hotelRating: '4.8/5',
      transfers: 'Private Island Cab Transfers',
      activitiesCount: 3,
      activitiesList: ['Guided Coral Reef Scuba Diving', 'Elephant Beach Snorkeling', 'Cellular Jail Light & Sound Show'],
      meals: 'Buffet Breakfast & Island Seafood Dinners',
    },
    breakdown: {
      transport: 14500,
      hotel: 15000,
      transfers: 4000,
      activities: 5000,
      taxes: 0,
    },
    cancellationPolicy: 'Standard',
    provider: {
      name: 'Island Escapes Verified',
      verified: true,
      rating: 4.8,
    },
    imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=800&auto=format&fit=crop',
    isBestValue: false,
  }
];
