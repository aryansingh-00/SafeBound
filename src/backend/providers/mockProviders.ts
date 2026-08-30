import {
  ITransportProvider,
  IHotelProvider,
  ITransferProvider,
  IWeatherProvider,
  ISafetyProvider,
  TransportSearchQuery,
  TransportResult,
  HotelSearchQuery,
  HotelResult,
} from './providerInterface';

export class MockTransportProvider implements ITransportProvider {
  async search(query: TransportSearchQuery): Promise<TransportResult[]> {
    await new Promise((r) => setTimeout(r, 120));
    return [
      {
        id: 'trn-22457',
        operator: 'Indian Railways (IRCTC)',
        mode: 'TRAIN',
        code: 'Vande Bharat Express #22457',
        departureTime: '06:20 AM',
        arrivalTime: '11:45 AM',
        pricePerSeat: 1650,
        availableSeats: 34,
      },
      {
        id: 'trn-12017',
        operator: 'Indian Railways (IRCTC)',
        mode: 'TRAIN',
        code: 'Dehradun Shatabdi #12017',
        departureTime: '06:45 AM',
        arrivalTime: '12:55 PM',
        pricePerSeat: 1120,
        availableSeats: 18,
      },
    ];
  }

  async reserveSeat(params: { tripId: string; transportId: string; passengerNames: string[] }) {
    await new Promise((r) => setTimeout(r, 150));
    return {
      pnr: `PNR-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      status: 'CONFIRMED' as const,
    };
  }
}

export class MockHotelProvider implements IHotelProvider {
  async search(query: HotelSearchQuery): Promise<HotelResult[]> {
    await new Promise((r) => setTimeout(r, 140));
    return [
      {
        id: 'htl-cedar-view',
        name: 'The Cedar View Luxury Resort & Spa',
        stars: 4,
        rating: 4.8,
        roomType: 'Deluxe Valley View Suite',
        nightlyRate: 4800,
        freeBreakfast: true,
      },
      {
        id: 'htl-amber-pine',
        name: 'Amber Pine Heritage Boutique',
        stars: 4,
        rating: 4.7,
        roomType: 'Executive Pine Suite',
        nightlyRate: 4000,
        freeBreakfast: true,
      },
    ];
  }

  async bookRoom(params: { tripId: string; hotelId: string; guestName: string }) {
    await new Promise((r) => setTimeout(r, 180));
    return {
      bookingRef: `HTL-RES-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      status: 'CONFIRMED' as const,
    };
  }
}

export class MockTransferProvider implements ITransferProvider {
  async searchCab(params: { pickup: string; dropoff: string; time: string }) {
    await new Promise((r) => setTimeout(r, 90));
    return {
      cabId: 'cab-sedan-etios',
      vehicleType: 'Toyota Etios / Dzire AC (Hill Certified)',
      price: 1850,
    };
  }

  async reserveTransfer(params: { tripId: string; cabId: string; passengerName: string }) {
    await new Promise((r) => setTimeout(r, 130));
    return {
      chauffeurRef: `CAB-SYNC-UK07-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'CONFIRMED' as const,
    };
  }
}

export class MockWeatherProvider implements IWeatherProvider {
  async getForecast(destination: string, date: string) {
    await new Promise((r) => setTimeout(r, 60));
    return {
      temperatureC: 22,
      condition: 'Partly Sunny & Mild',
      rainProbability: 10,
    };
  }
}

export class MockSafetyProvider implements ISafetyProvider {
  async getSafetyScore(destination: string) {
    await new Promise((r) => setTimeout(r, 50));
    return {
      safetyScore: 94,
      roadClearance: 'CLEAR' as const,
      verifiedChauffeurAvailable: true,
    };
  }
}
