import { NormalizedHotelOption } from './providerAgentTypes';
import { ProviderAdapterRegistry } from './providerAdapterRegistry';

export class HotelAgent {
  /**
   * Searches available hotel properties and suites with normalized output.
   */
  public static async searchHotels(
    destination: string = 'Mussoorie',
    nights: number = 4,
    simulateTimeout: boolean = false
  ): Promise<{ hotels: NormalizedHotelOption[]; providerUsed: string; failoverOccurred: boolean }> {
    const operation = async (): Promise<NormalizedHotelOption[]> => {
      return [
        {
          hotelId: 'htl-cedar-view',
          name: 'The Cedar View Luxury Resort & Spa',
          location: 'The Mall Road, Mussoorie',
          rating: 4.8,
          category: '4star',
          roomType: 'Deluxe Valley View Suite with Balcony',
          pricePerNight: 4800,
          totalPrice: 19200,
          breakfastIncluded: true,
          cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
          availability: 'AVAILABLE',
          dataStatus: 'LIVE',
        },
        {
          hotelId: 'htl-amber-pine',
          name: 'Amber Pine Heritage Boutique Suite',
          location: 'Near Picture Palace, Mussoorie',
          rating: 4.7,
          category: '4star',
          roomType: 'Executive Pine Suite',
          pricePerNight: 4600,
          totalPrice: 18400,
          breakfastIncluded: true,
          cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
          availability: 'AVAILABLE',
          dataStatus: 'LIVE',
        },
        {
          hotelId: 'htl-oakwood-cottage',
          name: 'Oakwood Mountain Homestay & Cottage',
          location: 'Library Bazaar, Mussoorie',
          rating: 4.6,
          category: '3star',
          roomType: 'Cozy Mountain Cottage',
          pricePerNight: 4175,
          totalPrice: 16700,
          breakfastIncluded: false,
          cancellationPolicy: 'Non-refundable (Saver Deal)',
          availability: 'FEW_LEFT',
          dataStatus: 'LIVE',
        },
      ];
    };

    const { result, usedProvider, didFailover } = await ProviderAdapterRegistry.executeWithFailover(
      'Hill PMS Direct Gateway',
      'Global Hotel Distribution Network Adapter',
      simulateTimeout,
      operation
    );

    return { hotels: result, providerUsed: usedProvider, failoverOccurred: didFailover };
  }
}
