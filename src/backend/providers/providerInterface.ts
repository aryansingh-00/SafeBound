/**
 * Provider Adapter Pattern Interfaces
 * 
 * Isolates the AI orchestration and backend domains from external supplier APIs.
 */

export interface TransportSearchQuery {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}

export interface TransportResult {
  id: string;
  operator: string;
  mode: 'TRAIN' | 'FLIGHT' | 'BUS';
  code: string;
  departureTime: string;
  arrivalTime: string;
  pricePerSeat: number;
  availableSeats: number;
}

export interface ITransportProvider {
  search(query: TransportSearchQuery): Promise<TransportResult[]>;
  reserveSeat(params: { tripId: string; transportId: string; passengerNames: string[] }): Promise<{ pnr: string; status: 'CONFIRMED' | 'FAILED' }>;
}

export interface HotelSearchQuery {
  destination: string;
  checkIn: string;
  nights: number;
  guests: number;
  minRating?: number;
}

export interface HotelResult {
  id: string;
  name: string;
  stars: number;
  rating: number;
  roomType: string;
  nightlyRate: number;
  freeBreakfast: boolean;
}

export interface IHotelProvider {
  search(query: HotelSearchQuery): Promise<HotelResult[]>;
  bookRoom(params: { tripId: string; hotelId: string; guestName: string }): Promise<{ bookingRef: string; status: 'CONFIRMED' | 'FAILED' }>;
}

export interface ITransferProvider {
  searchCab(params: { pickup: string; dropoff: string; time: string }): Promise<{ cabId: string; vehicleType: string; price: number }>;
  reserveTransfer(params: { tripId: string; cabId: string; passengerName: string }): Promise<{ chauffeurRef: string; status: 'CONFIRMED' | 'FAILED' }>;
}

export interface IWeatherProvider {
  getForecast(destination: string, date: string): Promise<{ temperatureC: number; condition: string; rainProbability: number; warningFlag?: string }>;
}

export interface ISafetyProvider {
  getSafetyScore(destination: string): Promise<{ safetyScore: number; roadClearance: 'CLEAR' | 'ADVISORY' | 'BLOCKED'; verifiedChauffeurAvailable: boolean }>;
}
