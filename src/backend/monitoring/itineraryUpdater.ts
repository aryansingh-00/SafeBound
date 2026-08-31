export interface ItineraryNodeSnapshot {
  id: string;
  type: string;
  title: string;
  originalTime: string;
  updatedTime: string;
  isAdjusted: boolean;
}

export class ItineraryUpdater {
  private static liveItineraries = new Map<string, ItineraryNodeSnapshot[]>();

  /**
   * Returns the current live journey timeline nodes for a trip.
   */
  public static getItinerary(tripId: string): ItineraryNodeSnapshot[] {
    if (!this.liveItineraries.has(tripId)) {
      this.liveItineraries.set(tripId, [
        {
          id: 'itin-1',
          type: 'TRANSIT',
          title: 'Vande Bharat Express (NDLS ➔ DDN)',
          originalTime: '06:20 AM – 11:45 AM',
          updatedTime: '06:20 AM – 11:45 AM',
          isAdjusted: false,
        },
        {
          id: 'itin-2',
          type: 'TRANSFER',
          title: 'Private Mountain Chauffeur Pickup',
          originalTime: '12:15 PM – 01:45 PM',
          updatedTime: '12:15 PM – 01:45 PM',
          isAdjusted: false,
        },
        {
          id: 'itin-3',
          type: 'HOTEL',
          title: 'The Cedar View Luxury Resort Check-in',
          originalTime: '02:00 PM',
          updatedTime: '02:00 PM',
          isAdjusted: false,
        },
        {
          id: 'itin-4',
          type: 'ACTIVITY',
          title: 'Gun Hill Cable Car VIP Fast-Track Pass',
          originalTime: '04:00 PM – 06:00 PM',
          updatedTime: '04:00 PM – 06:00 PM',
          isAdjusted: false,
        },
      ]);
    }
    return this.liveItineraries.get(tripId)!;
  }

  /**
   * Mutates the transfer pickup window and train arrival in the live itinerary graph.
   */
  public static updateTransferPickup(tripId: string, newPickupTime: string = '01:35 PM'): ItineraryNodeSnapshot[] {
    const nodes = this.getItinerary(tripId);

    const updated = nodes.map((node) => {
      if (node.type === 'TRANSIT') {
        return {
          ...node,
          updatedTime: '06:20 AM – 01:05 PM (+80m Delay)',
          isAdjusted: true,
        };
      }
      if (node.type === 'TRANSFER') {
        return {
          ...node,
          updatedTime: `${newPickupTime} – 03:05 PM (Rescheduled Chauffeur)`,
          isAdjusted: true,
        };
      }
      return node;
    });

    this.liveItineraries.set(tripId, updated);
    return updated;
  }

  public static resetItinerary(tripId: string): ItineraryNodeSnapshot[] {
    this.liveItineraries.delete(tripId);
    return this.getItinerary(tripId);
  }
}
