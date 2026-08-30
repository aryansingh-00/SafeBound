import { CoordinatedPackage, StructuredTripRequirements } from '../types/backendTypes';
import { PricingEngine } from '../pricing/pricingEngine';

export class PackageAgent {
  /**
   * Assembles disparate domain results into a single coordinated, verified package.
   */
  public static buildPackage(
    destination: string,
    requirements: StructuredTripRequirements
  ): CoordinatedPackage {
    const transportCost = 3300; // 2 seats @ 1650
    const hotelCost = 19200;    // 4 nights @ 4800
    const transferCost = 3700;  // Roundtrip private hill sedan
    const activitiesCost = 3600;// 2x VIP ropeway & heritage trail

    const calculatedPrice = PricingEngine.calculate({
      transportCost,
      hotelCost,
      transferCost,
      activitiesCost,
      discountAmount: 0,
    });

    return {
      packageId: `PKG_${destination.toUpperCase()}_4D_${Date.now().toString(36).toUpperCase()}`,
      destination,
      state: destination === 'Mussoorie' ? 'Uttarakhand' : 'Himachal Pradesh',
      durationDays: requirements.hardConstraints.durationDays,
      matchScore: 92,
      services: {
        transport: {
          provider: 'IRCTC Vande Bharat Express #22457',
          mode: 'TRAIN',
          name: 'Executive AC Chair Car (NDLS ➔ DDN)',
          route: 'New Delhi (06:20 AM) ➔ Dehradun (11:45 AM)',
          baseCost: transportCost,
        },
        hotel: {
          provider: 'GDS Hotel Net',
          name: 'The Cedar View Luxury Resort & Spa',
          tier: '4★ Upscale & Boutique',
          roomType: 'Deluxe Valley View Suite with Private Balcony',
          nights: 4,
          baseCost: hotelCost,
        },
        transfer: {
          provider: 'SafeBound Chauffeur Mesh',
          type: 'Station-to-Hotel Hill Chauffeur',
          assignedVehicle: 'Toyota Etios / Dzire AC (Hill Certified)',
          baseCost: transferCost,
        },
        activities: [
          { id: 'act-1', name: 'Gun Hill Cable Car VIP Fast-Track Pass', slot: 'Day 2, 10:00 AM', cost: 1800 },
          { id: 'act-2', name: 'Landour Heritage Walking Tour & Tea Tasting', slot: 'Day 3, 03:30 PM', cost: 1800 },
        ],
      },
      pricing: {
        transportCost: calculatedPrice.transport,
        hotelCost: calculatedPrice.hotel,
        transferCost: calculatedPrice.transfer,
        activitiesCost: calculatedPrice.activities,
        taxesAndFees: calculatedPrice.taxesAndInsurance,
        savingsApplied: calculatedPrice.discounts,
        finalTotal: calculatedPrice.finalTotal,
      },
    };
  }
}
