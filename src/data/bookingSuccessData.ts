export interface ConfirmedServiceItem {
  id: string;
  type: 'transport' | 'hotel' | 'transfer' | 'activity';
  title: string;
  subtitle: string;
  confirmationRef: string;
  status: 'Confirmed' | 'Reserved';
  dateRange: string;
  details: string;
}

export interface BookingSuccessRecord {
  tripId: string;
  destination: string;
  state: string;
  dateRange: string;
  duration: string;
  travellersCount: number;
  travellers: string[];
  status: string;
  totalAmount: number;
  plannedBudget: number;
  remainingBuffer: number;
  payment: {
    status: 'Success';
    transactionId: string;
    gateway: string;
    paymentDate: string;
    method: string;
  };
  email: {
    address: string;
    status: 'Sent' | 'Failed';
    dispatchTime: string;
  };
  confirmedServices: ConfirmedServiceItem[];
  documents: {
    id: string;
    name: string;
    type: string;
    size: string;
    ref: string;
  }[];
}

export const DEFAULT_BOOKING_SUCCESS_RECORD: BookingSuccessRecord = {
  tripId: 'SB-TRIP-8X72K',
  destination: 'Mussoorie',
  state: 'Uttarakhand',
  dateRange: 'Sep 15 – Sep 19, 2026',
  duration: '4 Days / 3 Nights',
  travellersCount: 2,
  travellers: ['Aryan Singh (Primary)', 'Rhea Sharma'],
  status: 'Fully Confirmed',
  totalAmount: 31300,
  plannedBudget: 40000,
  remainingBuffer: 8700,
  payment: {
    status: 'Success',
    transactionId: 'RZP_LIVE_98412849',
    gateway: 'Razorpay 256-Bit Escrow Vault',
    paymentDate: 'Aug 31, 2026 • 04:30 AM',
    method: 'HDFC Bank Visa Card (•••• 1234)',
  },
  email: {
    address: 'aryan@safebound.ai',
    status: 'Sent',
    dispatchTime: 'Just now',
  },
  confirmedServices: [
    {
      id: 'srv-train',
      type: 'transport',
      title: '🚆 Vande Bharat Express (Train #22457)',
      subtitle: 'New Delhi (NDLS) ➔ Dehradun (DDN) • 2 AC Chairs',
      confirmationRef: 'PNR: TRN-984120',
      status: 'Confirmed',
      dateRange: 'Sep 15, 08:20 AM – 02:00 PM',
      details: 'Seats C3-45 & C3-46 • Breakfast included • Return on Sep 18 (Train #22458)',
    },
    {
      id: 'srv-hotel',
      type: 'hotel',
      title: '🏨 4★ Cedar View Heritage Retreat',
      subtitle: 'Balcony Valley View Deluxe Suite • 3 Nights',
      confirmationRef: 'Voucher: HTL-774192',
      status: 'Confirmed',
      dateRange: 'Sep 15 – Sep 18 (Check-in 02:00 PM)',
      details: 'Complimentary buffet breakfast • Free Wi-Fi • Camel\'s Back Road',
    },
    {
      id: 'srv-transfer',
      type: 'transfer',
      title: '🚕 Dedicated Hill Chauffeur Cab',
      subtitle: 'Dehradun Station ➔ Mussoorie Hotel & Local Touring',
      confirmationRef: 'Booking: TRF-332189',
      status: 'Confirmed',
      dateRange: 'Sep 15 – Sep 18 (Full Journey)',
      details: 'Assigned Driver: Rajesh Verma (Sedan) • Autonomous train delay synchronization active',
    },
    {
      id: 'srv-act',
      type: 'activity',
      title: '🎟️ 2 Curated VIP Experience Passes',
      subtitle: 'Gun Hill Cable Car & Guided Kempty Pine Trail',
      confirmationRef: 'Booking: ACT-551029',
      status: 'Confirmed',
      dateRange: 'Sep 16 (10:00 AM) & Sep 17 (10:00 AM)',
      details: 'VIP Fast-track QR codes issued in Document Vault • Weather-adapted schedule',
    },
  ],
  documents: [
    {
      id: 'doc-train',
      name: 'IRCTC Electronic Reservation Ticket (ERT)',
      type: 'PDF Voucher',
      size: '420 KB',
      ref: 'TRN-984120',
    },
    {
      id: 'doc-hotel',
      name: 'Cedar View Retreat Official Hotel Voucher',
      type: 'PDF Voucher',
      size: '680 KB',
      ref: 'HTL-774192',
    },
    {
      id: 'doc-transfer',
      name: 'Private Chauffeur Duty Slip & Pickup Pass',
      type: 'PDF Pass',
      size: '210 KB',
      ref: 'TRF-332189',
    },
    {
      id: 'doc-act',
      name: 'Gun Hill Ropeway & Kempty Trail VIP Passes',
      type: 'Digital Pass',
      size: '340 KB',
      ref: 'ACT-551029',
    },
    {
      id: 'doc-invoice',
      name: 'SafeBound GST Tax Invoice & Escrow Receipt',
      type: 'Tax Receipt',
      size: '180 KB',
      ref: 'INV-2026-8891',
    },
  ],
};
