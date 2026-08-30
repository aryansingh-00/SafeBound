export interface JourneyTimelineNode {
  id: string;
  type: 'ORIGIN' | 'TRANSIT' | 'TRANSFER' | 'HOTEL' | 'ACTIVITY' | 'RETURN';
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  bufferMinutesAfter: number;
  isValid: boolean;
  validationMessage: string;
}

export type OptimizationMode = 
  | 'BEST_VALUE' 
  | 'CHEAPEST' 
  | 'FASTEST' 
  | 'COMFORT' 
  | 'FLEXIBLE' 
  | 'CUSTOM';

export interface VersionedTripPackage {
  packageId: string;
  version: number;
  destination: string;
  durationDays: number;
  mode: OptimizationMode;
  timeline: JourneyTimelineNode[];
  services: {
    transport: {
      id: string;
      provider: string;
      name: string;
      departureTime: string;
      arrivalTime: string;
      durationHours: number;
      price: number;
    };
    hotel: {
      id: string;
      name: string;
      tier: string;
      rating: number;
      roomType: string;
      distanceToCenterKm: number;
      freeBreakfast: boolean;
      cancellationPolicy: string;
      price: number;
    };
    transfer: {
      id: string;
      vehicle: string;
      pickupTime: string;
      dropTime: string;
      price: number;
    };
    activities: {
      id: string;
      name: string;
      day: number;
      startTime: string;
      endTime: string;
      price: number;
    }[];
  };
  pricing: {
    transportCost: number;
    hotelCost: number;
    transferCost: number;
    activitiesCost: number;
    taxesAndFees: number;
    discountAmount: number;
    finalTotal: number;
    calculatedAt: string;
    expiresAt: string;
    priceSignature: string;
  };
  overallScore: number;
}

export interface PackageOptimizationDiff {
  originalPackageId: string;
  originalVersion: number;
  optimizedVersion: number;
  mode: OptimizationMode;
  originalPrice: number;
  optimizedPrice: number;
  netSavings: number;
  changes: {
    serviceType: 'TRANSPORT' | 'HOTEL' | 'TRANSFER' | 'ACTIVITY';
    originalTitle: string;
    newTitle: string;
    rationale: string;
    savingsDelta: number;
  }[];
  scoreImprovement: number;
  userFacingExplanation: string;
}
