import { Destination } from '../types';

export const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    tagline: 'Mountains • Adventure • Nature',
    tags: ['Mountains', 'Adventure', 'Snow', 'Romantic'],
    startingPrice: 12500,
    bestSeason: 'Oct - Jun',
    safetyScore: 8.8,
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop',
    description: 'High-altitude Himalayan resort town known for scenic valleys, adventure sports, snow-capped Solang Valley, and serene pine forests.',
    highlights: ['Solang Valley Snow Trek', 'Rohtang Pass Panoramic Vista', 'Old Manali Cafe Trail', 'Vashisht Hot Springs'],
    weather: {
      temp: '14°C',
      condition: 'Sunny & Crisp'
    }
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    tagline: 'Beaches • Nightlife • Heritage',
    tags: ['Beach', 'Nightlife', 'Seafood', 'Relaxation'],
    startingPrice: 9999,
    bestSeason: 'Nov - Apr',
    safetyScore: 9.1,
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
    description: 'Sun-kissed Arabian Sea beaches, Portuguese colonial architecture, vibrant night markets, and world-class coastal cuisine.',
    highlights: ['Vagator & Palolem Sunset', 'Mandovi Luxury River Cruise', 'Old Goa UNESCO Churches', 'Water Sports at Baga'],
    weather: {
      temp: '28°C',
      condition: 'Tropical Breeze'
    }
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    state: 'Jammu & Kashmir',
    tagline: 'Lakes • Snow Valleys • Shikara',
    tags: ['Mountains', 'Romantic', 'Lakes', 'Nature'],
    startingPrice: 16800,
    bestSeason: 'Mar - Nov',
    safetyScore: 8.6,
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop',
    description: 'Known as Paradise on Earth, featuring Dal Lake houseboats, Gulmarg gondolas, and lush green saffron valleys.',
    highlights: ['Dal Lake Shikara & Houseboat', 'Gulmarg World Highest Gondola', 'Pahalgam Betaab Valley', 'Mughal Gardens'],
    weather: {
      temp: '11°C',
      condition: 'Clear Sky'
    }
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'Palaces • Heritage • Royal Culture',
    tags: ['Culture', 'Heritage', 'Shopping', 'Photography'],
    startingPrice: 8500,
    bestSeason: 'Oct - Mar',
    safetyScore: 9.3,
    imageUrl: 'https://images.unsplash.com/photo-1603288940320-9844add9467b?q=80&w=1200&auto=format&fit=crop',
    description: 'The iconic Pink City boasting majestic hill forts, royal palaces, astronomical observatories, and vibrant colorful bazaars.',
    highlights: ['Amber Fort Elephant Walk', 'Hawa Mahal Photography', 'City Palace Royal Artifacts', 'Chokhi Dhani Folk Night'],
    weather: {
      temp: '24°C',
      condition: 'Pleasant & Warm'
    }
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'Kerala',
    tagline: 'Backwaters • Tea Gardens • Ayurveda',
    tags: ['Nature', 'Relaxation', 'Family', 'Ayurveda'],
    startingPrice: 14200,
    bestSeason: 'Sep - Mar',
    safetyScore: 9.5,
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
    description: 'God\'s Own Country, celebrated for serene palm-fringed Alleppey backwaters, misty Munnar tea hills, and authentic Ayurvedic wellness.',
    highlights: ['Alleppey Private Houseboat Cruise', 'Munnar Tea Plantation Trek', 'Kovalam Lighthouse Beach', 'Periyar Wildlife Sanctuary'],
    weather: {
      temp: '26°C',
      condition: 'Gentle Showers'
    }
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    tagline: 'Yoga • River Rafting • Spirituality',
    tags: ['Adventure', 'Spiritual', 'Nature', 'Wellness'],
    startingPrice: 7200,
    bestSeason: 'Sep - Jun',
    safetyScore: 9.2,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
    description: 'The Yoga Capital of the World along the holy Ganges, famous for white-water river rafting, bungee jumping, and evening Ganga Aarti.',
    highlights: ['Ganges Grade IV River Rafting', 'Triveni Ghat Evening Aarti', 'Beatles Ashram Exploration', 'Cliff Jumping & Camping'],
    weather: {
      temp: '19°C',
      condition: 'Fresh Mountain Air'
    }
  }
];
