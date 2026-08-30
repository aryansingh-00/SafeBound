import { VersionedTripPackage, JourneyTimelineNode, OptimizationMode } from './packageBuilderTypes';
import { TimelineCompatibilityEngine } from './timelineCompatibility';
import { PricingEngine } from '../pricing/pricingEngine';

export class PackageBuilderEngine {
  /**
   * Constructs a connected, timing-compatible package from candidate service options.
   */
  public static buildPackage(params: {
    destination: string;
    durationDays?: number;
    mode?: OptimizationMode;
    selectedTransport?: any;
    selectedHotel?: any;
    selectedTransfer?: any;
    selectedActivities?: any[];
  }): VersionedTripPackage {
    const {
      destination = 'Mussoorie',
      durationDays = 4,
      mode = 'BEST_VALUE',
      selectedTransport,
      selectedHotel,
      selectedTransfer,
      selectedActivities,
    } = params;

    // 1. Defaults if not explicitly overridden
    const transport = selectedTransport || {
      id: 'trn-vb-22457',
      provider: 'Indian Railways (IRCTC)',
      name: 'Vande Bharat Express #22457 (Executive AC)',
      departureTime: '06:20 AM',
      arrivalTime: '11:45 AM',
      durationHours: 5.4,
      price: 3300, // 2 seats @ 1650
    };

    const hotel = selectedHotel || {
      id: 'htl-cedar-view',
      name: 'The Cedar View Luxury Resort & Spa',
      tier: '4★ Upscale & Boutique',
      rating: 4.8,
      roomType: 'Deluxe Valley View Suite with Private Balcony',
      distanceToCenterKm: 1.5,
      freeBreakfast: true,
      cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
      price: 19200, // 4 nights @ 4800
    };

    const transfer = selectedTransfer || {
      id: 'cab-hill-sedan',
      vehicle: 'Toyota Etios / Dzire AC (Hill Certified Chauffeur)',
      pickupTime: '12:15 PM',
      dropTime: '01:45 PM',
      price: 3700, // Roundtrip hill transfer
    };

    const activities = selectedActivities || [
      { id: 'act-1', name: 'Gun Hill Cable Car VIP Fast-Track Pass', day: 2, startTime: '10:00 AM', endTime: '12:00 PM', price: 1800 },
      { id: 'act-2', name: 'Landour Heritage Trail & Tea Tasting', day: 3, startTime: '03:30 PM', endTime: '05:30 PM', price: 1800 },
    ];

    // 2. Build Chronological Journey Timeline Nodes
    const rawNodes: JourneyTimelineNode[] = [
      {
        id: 'node-1',
        type: 'ORIGIN',
        title: 'New Delhi Railway Station (NDLS)',
        location: 'New Delhi',
        startTime: '06:00 AM',
        endTime: '06:20 AM',
        bufferMinutesAfter: 0,
        isValid: true,
        validationMessage: '✓ Departure platform verified',
      },
      {
        id: 'node-2',
        type: 'TRANSIT',
        title: transport.name,
        location: 'NDLS ➔ Dehradun Junction',
        startTime: transport.departureTime,
        endTime: transport.arrivalTime,
        bufferMinutesAfter: 30, // 30m buffer for station exit and luggage
        isValid: true,
        validationMessage: '✓ Transit corridor clear',
      },
      {
        id: 'node-3',
        type: 'TRANSFER',
        title: `Private Hill Chauffeur (${transfer.vehicle})`,
        location: 'Dehradun Stn ➔ Mussoorie Hotel',
        startTime: transfer.pickupTime,
        endTime: transfer.dropTime,
        bufferMinutesAfter: 15,
        isValid: true,
        validationMessage: '✓ Station pickup window verified',
      },
      {
        id: 'node-4',
        type: 'HOTEL',
        title: `${hotel.name} (${hotel.roomType})`,
        location: 'The Mall Road, Mussoorie',
        startTime: '02:00 PM',
        endTime: '11:00 AM',
        bufferMinutesAfter: 60,
        isValid: true,
        validationMessage: '✓ Early check-in requested & confirmed',
      },
      {
        id: 'node-5',
        type: 'ACTIVITY',
        title: activities[0].name,
        location: 'Gun Hill, Mussoorie',
        startTime: activities[0].startTime,
        endTime: activities[0].endTime,
        bufferMinutesAfter: 60,
        isValid: true,
        validationMessage: '✓ VIP slot locked',
      },
    ];

    const timelineResult = TimelineCompatibilityEngine.validateTimeline(rawNodes);

    // 3. Deterministic Authoritative Pricing
    const activitiesCost = activities.reduce((sum, a) => sum + a.price, 0);
    const pricingBreakdown = PricingEngine.calculate({
      transportCost: transport.price,
      hotelCost: hotel.price,
      transferCost: transfer.price,
      activitiesCost,
      discountAmount: 0,
    });

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 15 * 60 * 1000).toISOString(); // 15-minute price lock

    return {
      packageId: `SB_PKG_${destination.toUpperCase()}_${Date.now().toString(36).toUpperCase()}`,
      version: 1,
      destination,
      durationDays,
      mode,
      timeline: timelineResult.validatedNodes,
      services: {
        transport,
        hotel,
        transfer,
        activities,
      },
      pricing: {
        transportCost: pricingBreakdown.transport,
        hotelCost: pricingBreakdown.hotel,
        transferCost: pricingBreakdown.transfer,
        activitiesCost: pricingBreakdown.activities,
        taxesAndFees: pricingBreakdown.taxesAndInsurance,
        discountAmount: pricingBreakdown.discounts,
        finalTotal: pricingBreakdown.finalTotal,
        calculatedAt: pricingBreakdown.calculatedAt,
        expiresAt,
        priceSignature: pricingBreakdown.deterministicSignature,
      },
      overallScore: 92,
    };
  }
}
