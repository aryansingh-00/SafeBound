import { VersionedTripPackage, OptimizationMode, PackageOptimizationDiff } from '../package-builder/packageBuilderTypes';
import { PricingEngine } from '../pricing/pricingEngine';
import { PackageLockService } from '../package-builder/packageLockService';

export class PackageOptimizerEngine {
  /**
   * Applies target optimization strategy to create a higher-value package version and diff report.
   */
  public static optimizePackage(
    currentPkg: VersionedTripPackage,
    mode: OptimizationMode = 'BEST_VALUE',
    customPrompt?: string
  ): {
    optimizedPackage: VersionedTripPackage;
    diff: PackageOptimizationDiff;
  } {
    const originalPrice = currentPkg.pricing.finalTotal;

    if (mode === 'CHEAPEST') {
      // Maximum price reduction: homestay/3★ alternative + saver train
      const newTransportPrice = currentPkg.pricing.transportCost - 1000;
      const newHotelPrice = currentPkg.pricing.hotelCost - 2500;
      const newTransferPrice = currentPkg.pricing.transferCost - 400;

      const pricing = PricingEngine.calculate({
        transportCost: newTransportPrice,
        hotelCost: newHotelPrice,
        transferCost: newTransferPrice,
        activitiesCost: currentPkg.pricing.activitiesCost,
        discountAmount: 0,
      });

      const optimizedPackage: VersionedTripPackage = {
        ...currentPkg,
        version: currentPkg.version + 1,
        mode: 'CHEAPEST',
        services: {
          ...currentPkg.services,
          transport: {
            ...currentPkg.services.transport,
            name: 'Dehradun Shatabdi Express #12017 (Saver Fare)',
            price: newTransportPrice,
          },
          hotel: {
            ...currentPkg.services.hotel,
            name: 'Oakwood Mountain Homestay & Cottage',
            tier: '3★ Scenic Homestay',
            rating: 4.6,
            roomType: 'Deluxe Pine Cottage',
            price: newHotelPrice,
          },
          transfer: {
            ...currentPkg.services.transfer,
            vehicle: 'Verified Shared Hill Cab / Compact Hatchback',
            price: newTransferPrice,
          },
        },
        pricing: {
          transportCost: pricing.transport,
          hotelCost: pricing.hotel,
          transferCost: pricing.transfer,
          activitiesCost: pricing.activities,
          taxesAndFees: pricing.taxesAndInsurance,
          discountAmount: pricing.discounts,
          finalTotal: pricing.finalTotal,
          calculatedAt: pricing.calculatedAt,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
          priceSignature: pricing.deterministicSignature,
        },
        overallScore: 88,
      };

      PackageLockService.saveVersion(optimizedPackage);

      const netSavings = originalPrice - pricing.finalTotal;

      const diff: PackageOptimizationDiff = {
        originalPackageId: currentPkg.packageId,
        originalVersion: currentPkg.version,
        optimizedVersion: optimizedPackage.version,
        mode: 'CHEAPEST',
        originalPrice,
        optimizedPrice: pricing.finalTotal,
        netSavings,
        changes: [
          {
            serviceType: 'HOTEL',
            originalTitle: currentPkg.services.hotel.name,
            newTitle: 'Oakwood Mountain Homestay & Cottage (4.6★)',
            rationale: 'Switched to clean mountain homestay 1.8km from Mall Road, saving ₹2,500.',
            savingsDelta: 2500,
          },
          {
            serviceType: 'TRANSPORT',
            originalTitle: currentPkg.services.transport.name,
            newTitle: 'Dehradun Shatabdi Express #12017 (Saver Class)',
            rationale: 'Switched to standard AC Chair Car on Shatabdi, saving ₹1,000.',
            savingsDelta: 1000,
          },
          {
            serviceType: 'TRANSFER',
            originalTitle: currentPkg.services.transfer.vehicle,
            newTitle: 'Compact AC Hill Hatchback',
            rationale: 'Selected compact hill vehicle for Dehradun station transit, saving ₹400.',
            savingsDelta: 400,
          },
        ],
        scoreImprovement: 2,
        userFacingExplanation: `Switched to a verified mountain homestay and saver rail fare to maximize cash savings (Total Saved: ₹${netSavings.toLocaleString('en-IN')}) while maintaining direct transit.`,
      };

      return { optimizedPackage, diff };
    }

    // Default: BEST_VALUE mode (-₹1,450 savings on Mussoorie)
    const newTransportPrice = currentPkg.pricing.transportCost - 650;
    const newHotelPrice = currentPkg.pricing.hotelCost - 800;

    const pricing = PricingEngine.calculate({
      transportCost: newTransportPrice,
      hotelCost: newHotelPrice,
      transferCost: currentPkg.pricing.transferCost,
      activitiesCost: currentPkg.pricing.activitiesCost,
      discountAmount: 0,
    });

    const optimizedPackage: VersionedTripPackage = {
      ...currentPkg,
      version: currentPkg.version + 1,
      mode: 'BEST_VALUE',
      services: {
        ...currentPkg.services,
        transport: {
          ...currentPkg.services.transport,
          name: 'Vande Bharat Express (Early Bird Fare)',
          price: newTransportPrice,
        },
        hotel: {
          ...currentPkg.services.hotel,
          name: 'Amber Pine Heritage Boutique',
          tier: '4★ Upscale & Boutique',
          rating: 4.7,
          roomType: 'Executive Pine Suite with Hill View & Breakfast',
          price: newHotelPrice,
        },
      },
      pricing: {
        transportCost: pricing.transport,
        hotelCost: pricing.hotel,
        transferCost: pricing.transfer,
        activitiesCost: pricing.activities,
        taxesAndFees: pricing.taxesAndInsurance,
        discountAmount: pricing.discounts,
        finalTotal: pricing.finalTotal,
        calculatedAt: pricing.calculatedAt,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        priceSignature: pricing.deterministicSignature,
      },
      overallScore: 95,
    };

    PackageLockService.saveVersion(optimizedPackage);

    const netSavings = originalPrice - pricing.finalTotal;

    const diff: PackageOptimizationDiff = {
      originalPackageId: currentPkg.packageId,
      originalVersion: currentPkg.version,
      optimizedVersion: optimizedPackage.version,
      mode: 'BEST_VALUE',
      originalPrice,
      optimizedPrice: pricing.finalTotal,
      netSavings,
      changes: [
        {
          serviceType: 'HOTEL',
          originalTitle: currentPkg.services.hotel.name,
          newTitle: 'Amber Pine Heritage Boutique (4.7★)',
          rationale: 'Switched to a similarly-rated boutique suite 1.2km away with complimentary breakfast, saving ₹800.',
          savingsDelta: 800,
        },
        {
          serviceType: 'TRANSPORT',
          originalTitle: currentPkg.services.transport.name,
          newTitle: 'Vande Bharat Express (Early Bird AC Chair Car)',
          rationale: 'Applied promotional off-peak departure timing discount, saving ₹650.',
          savingsDelta: 650,
        },
      ],
      scoreImprovement: 3,
      userFacingExplanation: `You save ₹${netSavings.toLocaleString('en-IN')} without compromising hotel luxury or transit duration. Switched to Amber Pine Heritage Suite with included breakfast.`,
    };

    return { optimizedPackage, diff };
  }
}
