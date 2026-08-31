import {
  FullItinerary,
  ItineraryDay,
  TimelineEvent,
  TripDocument,
  ItineraryChangeRecord,
  TripHealthSnapshot,
  ItineraryVersion,
} from './itineraryTypes';
import { EventBus } from '../events/eventBus';

export class ItineraryEngine {
  private static itineraries = new Map<string, FullItinerary>();
  private static versionHistory = new Map<string, ItineraryVersion[]>();

  /** Builds or returns the current itinerary for a trip. */
  public static getOrBuild(tripId: string): FullItinerary {
    if (!this.itineraries.has(tripId)) {
      this.itineraries.set(tripId, this.buildFresh(tripId));
    }
    return this.itineraries.get(tripId)!;
  }

  private static buildFresh(tripId: string): FullItinerary {
    const days: ItineraryDay[] = [
      {
        dayNumber: 1,
        date: 'Sep 15, 2026',
        label: 'Travel Day — Delhi to Mussoorie',
        events: [
          {
            id: 'evt-d1-1',
            type: 'TRANSPORT',
            title: 'Vande Bharat Express — NDLS → DDN',
            subtitle: 'Platform 4 · Executive AC Chair Car · 2 Seats',
            startTime: '06:20 AM',
            endTime: '11:45 AM',
            location: 'New Delhi (NDLS)',
            bookingRef: 'PNR-WL8247',
            status: 'CONFIRMED',
            icon: '🚆',
          },
          {
            id: 'evt-d1-2',
            type: 'TRANSFER',
            title: 'Private Hill Chauffeur — DDN Station → Resort',
            subtitle: 'Sedan · AC · Certified Mountain Driver · Luggage Assist',
            startTime: '12:15 PM',
            endTime: '01:45 PM',
            location: 'Dehradun Railway Station',
            bookingRef: 'TRF-8821',
            status: 'CONFIRMED',
            icon: '🚕',
          },
          {
            id: 'evt-d1-3',
            type: 'HOTEL',
            title: 'The Cedar View Luxury Resort — Check-in',
            subtitle: 'Deluxe Valley View Suite · Breakfast Included',
            startTime: '02:00 PM',
            endTime: '02:30 PM',
            location: 'Camel\'s Back Road, Mussoorie',
            bookingRef: 'HTL-CV4421',
            status: 'CONFIRMED',
            icon: '🏨',
          },
          {
            id: 'evt-d1-4',
            type: 'FREE_TIME',
            title: 'Mall Road Evening Stroll',
            subtitle: 'Explore the iconic promenade, shops & local cuisine',
            startTime: '05:00 PM',
            endTime: '08:00 PM',
            location: 'Mall Road, Mussoorie',
            bookingRef: '',
            status: 'CONFIRMED',
            icon: '🌄',
          },
        ],
      },
      {
        dayNumber: 2,
        date: 'Sep 16, 2026',
        label: 'Mountain Exploration Day',
        events: [
          {
            id: 'evt-d2-1',
            type: 'ACTIVITY',
            title: 'Gun Hill Cable Car — VIP Fast-Track Pass',
            subtitle: '2x Passes · Sunrise Viewing Platform · Tea Included',
            startTime: '09:00 AM',
            endTime: '11:30 AM',
            location: 'Gun Hill, Mussoorie',
            bookingRef: 'ACT-GH1122',
            status: 'CONFIRMED',
            icon: '🚡',
          },
          {
            id: 'evt-d2-2',
            type: 'ACTIVITY',
            title: 'Landour Heritage Tea Tasting Walk',
            subtitle: 'Small group · Colonial bungalow route · Chai tasting',
            startTime: '03:00 PM',
            endTime: '05:30 PM',
            location: 'Landour Bazaar, Mussoorie',
            bookingRef: 'ACT-LT8834',
            status: 'CONFIRMED',
            icon: '🍵',
          },
        ],
      },
      {
        dayNumber: 3,
        date: 'Sep 17, 2026',
        label: 'Adventure & Nature Day',
        events: [
          {
            id: 'evt-d3-1',
            type: 'ACTIVITY',
            title: 'George Everest Trek — Guided',
            subtitle: '6km round trip · Guide included · Packed breakfast',
            startTime: '07:00 AM',
            endTime: '11:00 AM',
            location: 'Park Estate, Mussoorie',
            bookingRef: 'ACT-GE5541',
            status: 'CONFIRMED',
            icon: '⛰️',
          },
          {
            id: 'evt-d3-2',
            type: 'FREE_TIME',
            title: 'Kempty Falls Visit (Optional)',
            subtitle: 'Approx 15km from hotel · Self-arranged cab',
            startTime: '02:00 PM',
            endTime: '05:00 PM',
            location: 'Kempty Falls, Mussoorie',
            bookingRef: '',
            status: 'CONFIRMED',
            icon: '💦',
          },
        ],
      },
      {
        dayNumber: 4,
        date: 'Sep 18, 2026',
        label: 'Checkout & Return Journey',
        events: [
          {
            id: 'evt-d4-1',
            type: 'HOTEL',
            title: 'The Cedar View Luxury Resort — Check-out',
            subtitle: 'Breakfast included · Late checkout until 11 AM',
            startTime: '11:00 AM',
            endTime: '11:30 AM',
            location: 'Camel\'s Back Road, Mussoorie',
            bookingRef: 'HTL-CV4421',
            status: 'CONFIRMED',
            icon: '🏨',
          },
          {
            id: 'evt-d4-2',
            type: 'TRANSFER',
            title: 'Return Chauffeur — Resort → DDN Station',
            subtitle: 'Sedan · AC · Station drop with luggage assist',
            startTime: '11:45 AM',
            endTime: '01:15 PM',
            location: 'The Cedar View Luxury Resort',
            bookingRef: 'TRF-8822',
            status: 'CONFIRMED',
            icon: '🚕',
          },
        ],
      },
    ];

    const documents: TripDocument[] = [
      {
        id: 'doc-1',
        name: 'Vande Bharat — PNR Ticket',
        type: 'TICKET',
        category: 'TRANSPORT',
        status: 'READY',
        bookingRef: 'PNR-WL8247',
        createdAt: new Date().toLocaleDateString('en-IN'),
        signedUrl: '/docs/pnr-wl8247.pdf',
      },
      {
        id: 'doc-2',
        name: 'Cedar View Resort — Booking Voucher',
        type: 'VOUCHER',
        category: 'HOTEL',
        status: 'READY',
        bookingRef: 'HTL-CV4421',
        createdAt: new Date().toLocaleDateString('en-IN'),
        signedUrl: '/docs/htl-cv4421.pdf',
      },
      {
        id: 'doc-3',
        name: 'Hill Chauffeur — Transfer Confirmation',
        type: 'CONFIRMATION',
        category: 'TRANSFER',
        status: 'READY',
        bookingRef: 'TRF-8821',
        createdAt: new Date().toLocaleDateString('en-IN'),
        signedUrl: '/docs/trf-8821.pdf',
      },
      {
        id: 'doc-4',
        name: 'Activity Passes (3 Experiences)',
        type: 'PASS',
        category: 'ACTIVITY',
        status: 'READY',
        bookingRef: 'ACT-BUNDLE',
        createdAt: new Date().toLocaleDateString('en-IN'),
        signedUrl: '/docs/act-bundle.pdf',
      },
      {
        id: 'doc-5',
        name: 'Payment Receipt — ₹31,300',
        type: 'RECEIPT',
        category: 'PAYMENT',
        status: 'READY',
        bookingRef: 'PAY-SB-31300',
        createdAt: new Date().toLocaleDateString('en-IN'),
        signedUrl: '/docs/receipt-31300.pdf',
      },
    ];

    const health: TripHealthSnapshot = {
      transport: 'CONFIRMED',
      hotel: 'CONFIRMED',
      transfer: 'CONFIRMED',
      activities: 'CONFIRMED',
      overallHealth: 'GOOD',
    };

    return {
      tripId,
      destination: 'Mussoorie',
      version: 1,
      days,
      health,
      documents,
      changeHistory: [],
      emailState: 'SENT',
      lastUpdatedAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
    };
  }

  /** Applies a train delay and produces Itinerary v2. */
  public static applyTrainDelayUpdate(tripId: string): FullItinerary {
    const itin = this.getOrBuild(tripId);

    // Stamp previous version
    const prevVersions = this.versionHistory.get(tripId) || [];
    prevVersions.push({
      version: itin.version,
      generatedAt: itin.lastUpdatedAt,
      reason: 'Original confirmed itinerary',
      changedEventIds: [],
    });
    this.versionHistory.set(tripId, prevVersions);

    // Mutate events
    itin.days = itin.days.map((day) => ({
      ...day,
      events: day.events.map((evt) => {
        if (evt.id === 'evt-d1-1') {
          return { ...evt, endTime: '01:05 PM', isAdjusted: true, adjustedNote: 'Train running +80 min late.', status: 'CHANGED' as const };
        }
        if (evt.id === 'evt-d1-2') {
          return { ...evt, startTime: '01:35 PM', endTime: '03:05 PM', isAdjusted: true, adjustedNote: 'Chauffeur pickup rescheduled by SafeBound.', status: 'CHANGED' as const };
        }
        return evt;
      }),
    }));

    const changeRecord: ItineraryChangeRecord = {
      id: `chg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      version: itin.version + 1,
      field: 'Transfer Pickup Window',
      before: '12:15 PM',
      after: '01:35 PM',
      reason: 'Vande Bharat Express running +80 minutes late. New arrival: 1:05 PM.',
      handledBy: 'SafeBound Live Monitoring Engine (Auto)',
    };

    itin.changeHistory = [changeRecord, ...itin.changeHistory];
    itin.version += 1;
    itin.health.transfer = 'CHANGED';
    itin.health.overallHealth = 'WARNING';
    itin.lastUpdatedAt = new Date().toLocaleTimeString('en-US', { hour12: false });

    this.itineraries.set(tripId, itin);

    EventBus.publish({
      id: `evt_itin_${Date.now()}`,
      type: 'ITINERARY_VERSION_UPDATED',
      tripId,
      agent: 'Itinerary Engine',
      timestamp: itin.lastUpdatedAt,
      payload: { newVersion: itin.version, changeCount: itin.changeHistory.length },
    });

    return { ...itin };
  }

  public static resetItinerary(tripId: string): FullItinerary {
    this.itineraries.delete(tripId);
    this.versionHistory.delete(tripId);
    return this.getOrBuild(tripId);
  }

  public static getVersionHistory(tripId: string): ItineraryVersion[] {
    return this.versionHistory.get(tripId) || [];
  }
}
