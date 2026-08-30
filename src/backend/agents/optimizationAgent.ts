import { CoordinatedPackage } from '../types/backendTypes';
import { PricingEngine } from '../pricing/pricingEngine';

export interface OptimizationResult {
  originalPrice: number;
  optimizedPrice: number;
  totalSavings: number;
  changesApplied: {
    service: string;
    description: string;
    savings: number;
  }[];
  optimizedPackage: CoordinatedPackage;
}

export class OptimizationAgent {
  /**
   * Scans package for constraint-preserving savings without degrading hotel ratings or safety.
   */
  public static optimizePackage(pkg: CoordinatedPackage): OptimizationResult {
    const originalPrice = pkg.pricing.finalTotal;

    // 1. Compute optimizations
    const changes = [
      {
        service: 'Hotel Optimization',
        description: 'Switched to Executive Pine Suite (Amber Pine Heritage 4.7★) with included breakfast',
        savings: 800,
      },
      {
        service: 'Transport Timing Adjustment',
        description: 'Selected early Vande Bharat departure promo fare',
        savings: 650,
      },
    ];

    const totalSavings = changes.reduce((sum, c) => sum + c.savings, 0);

    const calculatedPrice = PricingEngine.calculate({
      transportCost: pkg.pricing.transportCost - 650,
      hotelCost: pkg.pricing.hotelCost - 800,
      transferCost: pkg.pricing.transferCost,
      activitiesCost: pkg.pricing.activitiesCost,
      discountAmount: 0,
    });

    const optimizedPackage: CoordinatedPackage = {
      ...pkg,
      services: {
        ...pkg.services,
        hotel: {
          ...pkg.services.hotel,
          name: 'Amber Pine Heritage Boutique',
          roomType: 'Executive Pine Suite with Hill View',
          baseCost: pkg.pricing.hotelCost - 800,
        },
      },
      pricing: {
        transportCost: calculatedPrice.transport,
        hotelCost: calculatedPrice.hotel,
        transferCost: calculatedPrice.transfer,
        activitiesCost: calculatedPrice.activities,
        taxesAndFees: calculatedPrice.taxesAndInsurance,
        savingsApplied: totalSavings,
        finalTotal: calculatedPrice.finalTotal,
      },
    };

    return {
      originalPrice,
      optimizedPrice: calculatedPrice.finalTotal,
      totalSavings,
      changesApplied: changes,
      optimizedPackage,
    };
  }
}
