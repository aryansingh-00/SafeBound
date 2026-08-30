import { MockTransportProvider, MockHotelProvider, MockTransferProvider } from '../providers/mockProviders';

export class TransportAgent {
  private static provider = new MockTransportProvider();

  public static async lockSeat(tripId: string, passengerName: string) {
    const res = await this.provider.reserveSeat({
      tripId,
      transportId: 'trn-22457',
      passengerNames: [passengerName],
    });
    return {
      agent: 'Transport Agent',
      status: res.status,
      pnr: res.pnr,
      details: 'IRCTC Vande Bharat #22457 • Seats 14A, 14B (Executive AC)',
    };
  }
}

export class HotelAgent {
  private static provider = new MockHotelProvider();

  public static async reserveSuite(tripId: string, guestName: string) {
    const res = await this.provider.bookRoom({
      tripId,
      hotelId: 'htl-cedar-view',
      guestName,
    });
    return {
      agent: 'Hotel Agent',
      status: res.status,
      bookingRef: res.bookingRef,
      details: 'The Cedar View Luxury Resort • 4 Nights Deluxe Valley Suite',
    };
  }
}

export class TransferAgent {
  private static provider = new MockTransferProvider();

  public static async lockChauffeur(tripId: string, passengerName: string) {
    const res = await this.provider.reserveTransfer({
      tripId,
      cabId: 'cab-sedan-etios',
      passengerName,
    });
    return {
      agent: 'Transfer Agent',
      status: res.status,
      chauffeurRef: res.chauffeurRef,
      details: 'Assigned Driver: Rajesh Verma (Rating 4.9) • Toyota Etios AC',
    };
  }
}

export class ActivityAgent {
  public static async issuePasses(tripId: string) {
    await new Promise((r) => setTimeout(r, 100));
    return {
      agent: 'Activity Agent',
      status: 'CONFIRMED' as const,
      passRef: `VIP-PASS-${Math.floor(100000 + Math.random() * 900000)}`,
      details: '2x Gun Hill Cable Car VIP Passes + Landour Heritage Walk Voucher',
    };
  }
}
