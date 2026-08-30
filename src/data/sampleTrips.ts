import { GeneratedTripPlan } from '../types';

export const SAMPLE_GENERATED_TRIPS: Record<string, GeneratedTripPlan> = {
  'manali-4d': {
    id: 'TRIP-SB-9842',
    title: '4-Day Manali Alpine & Mountain Adventure',
    destination: 'Manali, Himachal Pradesh',
    duration: '4 Days / 3 Nights',
    startingCity: 'New Delhi (DEL)',
    travellers: 2,
    totalBudget: 40000,
    estimatedCost: 36490,
    safetyScore: 8.9,
    weatherForecast: '14°C — Clear & Crisp Alpine Skies',
    breakdown: {
      flights: {
        title: 'Delhi to Bhuntar / AC Volvo Luxe Sleeper',
        cost: 11200,
        details: '2x Premium Semi-Sleeper with onboard Wi-Fi + Mountain transit guard'
      },
      hotel: {
        title: 'The Himalayan Cedar Woods Chalet (4★)',
        cost: 14800,
        rating: 4.8,
        details: '3 Nights Deluxe Mountain-view Room with daily warm breakfast'
      },
      transfers: {
        title: 'Dedicated 4x4 Private SUV for 4 Days',
        cost: 6200,
        details: 'Verified local driver for Solang, Old Manali, and Rohtang circuits'
      },
      activities: {
        title: 'Solang Adventure Pass & Guided Old Manali Walk',
        cost: 3200,
        details: 'Tandem paragliding, hot springs pass, and historic Hadimba temple guide'
      },
      taxes: {
        title: 'GST, SafeBound Travel Insurance & 24/7 Agent Support',
        cost: 1090,
        details: 'Complete end-to-end trip coverage & single-tap emergency coordination'
      }
    },
    days: [
      {
        day: 1,
        title: 'Arrival in the Valley of the Gods & Pine Trail',
        highlights: ['Private SUV pickup', 'Check-in at Cedar Woods Chalet', 'Hadimba Temple & Van Vihar pine stroll', 'Cafe hopping in Old Manali'],
        hotel: 'The Himalayan Cedar Woods Chalet',
        activities: [
          { time: '09:30 AM', title: 'Private Valley Transit', desc: 'Chauffeur meets you upon arrival with warm local spiced tea.' },
          { time: '11:00 AM', title: 'Mountain Chalet Check-in', desc: 'Settle into cedar-scented balcony suite overlooking snowy peaks.' },
          { time: '03:30 PM', title: 'Old Manali Cultural Walk', desc: 'Explore historic Hadimba Temple and artisanal woodcarving shops.' },
          { time: '07:30 PM', title: 'Riverside Dinner at Drifters Cafe', desc: 'Handcrafted wood-fired pizzas and live acoustic folk music.' }
        ]
      },
      {
        day: 2,
        title: 'Solang Valley Snow Glides & High Altitude Thrills',
        highlights: ['Tandem Paragliding', 'ATV quad bike trail', 'Zorbing & snow photography', 'Vashisht hot sulfur springs'],
        hotel: 'The Himalayan Cedar Woods Chalet',
        activities: [
          { time: '08:30 AM', title: 'Alpine Breakfast', desc: 'Hearty Himalayan breakfast with fresh apple preserves.' },
          { time: '10:00 AM', title: 'Solang Adventure Hub', desc: 'SafeBound certified instructor for tandem paragliding glide over snowfields.' },
          { time: '02:00 PM', title: 'Anjani Mahadev Hike', desc: 'Gentle scenic 2km walk to the hidden frozen waterfall.' },
          { time: '05:00 PM', title: 'Vashisht Healing Springs', desc: 'Soak in the natural mineral hot springs at ancient Vashisht village.' }
        ]
      },
      {
        day: 3,
        title: 'Jogini Waterfalls Trek & Naggar Castle Royalty',
        highlights: ['Jogini Waterfall pine trek', 'Naggar Castle heritage museum', 'Roerich Art Gallery', 'Stargazing campfire'],
        hotel: 'The Himalayan Cedar Woods Chalet',
        activities: [
          { time: '09:00 AM', title: 'Jogini Falls Forest Trek', desc: 'Guided trek through apple orchards to cascading multi-tier waterfall.' },
          { time: '01:30 PM', title: 'Naggar Royal Castle Lunch', desc: 'Traditional Himachali Dham cuisine with panoramic Beas river views.' },
          { time: '04:30 PM', title: 'Local Wool & Shawl Weaving Tour', desc: 'Authentic Kullu handloom artisans demonstration.' },
          { time: '08:00 PM', title: 'Private Chalet Bonfire', desc: 'Stargazing under crisp Himalayan skies with roasted chestnuts.' }
        ]
      },
      {
        day: 4,
        title: 'Mall Road Souvenirs & Seamless Return',
        highlights: ['Mall Road shopping', 'Local Tibetan monastery blessing', 'Assisted checkout & return transit'],
        hotel: 'Check-out completed',
        activities: [
          { time: '10:00 AM', title: 'Tibetan Monastery & Handicrafts', desc: 'Spin prayer wheels and shop for organic Himalayan honey and teas.' },
          { time: '01:00 PM', title: 'Gourmet Trout Lunch', desc: 'Freshly caught tandoori trout at Johnson\'s Cafe.' },
          { time: '04:00 PM', title: 'Coordinated Departure', desc: 'Driver transfers you to return transit with live flight/bus tracking.' }
        ]
      }
    ],
    status: 'Recommended'
  }
};
