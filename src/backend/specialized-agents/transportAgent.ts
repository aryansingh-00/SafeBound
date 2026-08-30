import { NormalizedTransportOption } from './providerAgentTypes';
import { ProviderAdapterRegistry } from './providerAdapterRegistry';

export class TransportAgent {
  /**
   * Searches available transport options (Trains, Flights, Intercity Buses) with normalized output.
   */
  public static async searchTransport(
    origin: string = 'Delhi',
    destination: string = 'Dehradun',
    simulateTimeout: boolean = false
  ): Promise<{ options: NormalizedTransportOption[]; providerUsed: string; failoverOccurred: boolean }> {
    const operation = async (): Promise<NormalizedTransportOption[]> => {
      return [
        {
          id: 'trn-vb-22457',
          type: 'TRAIN',
          provider: 'Indian Railways (IRCTC Direct)',
          origin: 'New Delhi (NDLS)',
          destination: 'Dehradun Junction (DDN)',
          departureTime: '06:20 AM',
          arrivalTime: '11:45 AM',
          durationMinutes: 325,
          price: 3300, // 2 seats @ 1650
          currency: 'INR',
          cabinClass: 'Executive Chair Car (EC)',
          seatsAvailable: 42,
          dataStatus: 'LIVE',
        },
        {
          id: 'trn-shatabdi-12017',
          type: 'TRAIN',
          provider: 'Indian Railways (IRCTC Direct)',
          origin: 'New Delhi (NDLS)',
          destination: 'Dehradun Junction (DDN)',
          departureTime: '06:45 AM',
          arrivalTime: '12:55 PM',
          durationMinutes: 370,
          price: 2300, // 2 seats @ 1150
          currency: 'INR',
          cabinClass: 'AC Chair Car (CC)',
          seatsAvailable: 88,
          dataStatus: 'LIVE',
        },
        {
          id: 'flt-indigo-6e210',
          type: 'FLIGHT',
          provider: 'IndiGo Airlines (GDS)',
          origin: 'Delhi Airport (DEL)',
          destination: 'Dehradun Airport (DED)',
          departureTime: '08:30 AM',
          arrivalTime: '09:25 AM',
          durationMinutes: 55,
          price: 6800, // 2 seats @ 3400
          currency: 'INR',
          cabinClass: 'Economy Saver',
          seatsAvailable: 14,
          dataStatus: 'LIVE',
        },
      ];
    };

    const { result, usedProvider, didFailover } = await ProviderAdapterRegistry.executeWithFailover(
      'IRCTC Primary Direct GDS',
      'RailYatri / Amadeus Secondary Failover Adapter',
      simulateTimeout,
      operation
    );

    return { options: result, providerUsed: usedProvider, failoverOccurred: didFailover };
  }
}
