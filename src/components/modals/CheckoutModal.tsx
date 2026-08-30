import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Loader2, 
  Plane, 
  Building, 
  Car, 
  Compass, 
  Sparkles,
  ArrowRight,
  Download,
  QrCode
} from 'lucide-react';
import { GeneratedTripPlan } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: GeneratedTripPlan | null;
  onBookingComplete: (completedPlan: GeneratedTripPlan) => void;
}

type BookingState = 'Selected' | 'Payment Pending' | 'Razorpay Processing' | 'Payment Successful' | 'Booking Processing' | 'Confirmed';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  plan,
  onBookingComplete,
}) => {
  const [bookingState, setBookingState] = useState<BookingState>('Selected');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('traveller@okaxis');

  if (!isOpen || !plan) return null;

  const handleStartPayment = () => {
    setBookingState('Payment Pending');
    
    // Simulate Razorpay Gateway Opening & Processing
    setTimeout(() => {
      setBookingState('Razorpay Processing');
      
      setTimeout(() => {
        setBookingState('Payment Successful');
        
        // Multi-Agent Vendor Booking Execution
        setTimeout(() => {
          setBookingState('Booking Processing');
          
          setTimeout(() => {
            setBookingState('Confirmed');
            const finalizedPlan: GeneratedTripPlan = {
              ...plan,
              status: 'Confirmed',
              pnr: `SB-${Math.floor(100000 + Math.random() * 900000)}`,
            };
            onBookingComplete(finalizedPlan);
          }, 1800);
        }, 1200);
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header with State Indicator */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">SafeBound Unified Checkout</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  Razorpay Secured
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                State: <strong className="text-white">{bookingState}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* State Flow Visualizer */}
        <div className="px-6 py-2.5 bg-slate-800 border-b border-slate-700/80 overflow-x-auto text-[11px] font-medium text-slate-400 flex items-center gap-2 whitespace-nowrap">
          <span className={bookingState === 'Selected' ? 'text-brand-300 font-bold' : 'text-slate-500'}>1. Selected</span>
          <span>→</span>
          <span className={bookingState === 'Payment Pending' || bookingState === 'Razorpay Processing' ? 'text-brand-300 font-bold' : 'text-slate-500'}>2. Razorpay Escrow</span>
          <span>→</span>
          <span className={bookingState === 'Payment Successful' || bookingState === 'Booking Processing' ? 'text-brand-300 font-bold' : 'text-slate-500'}>3. Multi-Vendor Sync</span>
          <span>→</span>
          <span className={bookingState === 'Confirmed' ? 'text-emerald-400 font-bold' : 'text-slate-500'}>4. Confirmed</span>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {bookingState === 'Selected' && (
            <div className="space-y-6">
              {/* Order summary */}
              <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider block">Unified Trip Package</span>
                  <h4 className="text-base font-bold text-slate-900">{plan.title}</h4>
                  <p className="text-xs text-slate-600">{plan.destination} • {plan.travellers} Travellers</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Due</span>
                  <span className="text-xl font-extrabold text-brand-700">₹{plan.estimatedCost.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Select Payment Method (Razorpay)
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'upi', label: 'UPI / QR', desc: 'GPay, PhonePe, Paytm' },
                    { id: 'card', label: 'Credit/Debit Card', desc: 'Visa, Master, RuPay' },
                    { id: 'netbanking', label: 'Net Banking', desc: 'HDFC, ICICI, SBI' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        paymentMethod === m.id
                          ? 'border-brand-600 bg-brand-50/80 shadow-xs ring-1 ring-brand-500'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-800 block">{m.label}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{m.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Enter UPI VPA / Virtual ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 focus:bg-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">A payment request will be sent to your UPI app.</p>
                </div>
              )}

              {/* Razorpay Trust Strip */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  SafeBound guarantees 100% refund protection if any flight, hotel or cab component fails verification.
                </span>
              </div>
            </div>
          )}

          {(bookingState === 'Payment Pending' || bookingState === 'Razorpay Processing' || bookingState === 'Payment Successful' || bookingState === 'Booking Processing') && (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center mx-auto shadow-inner">
                <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  {bookingState === 'Payment Pending' && 'Connecting to Razorpay Secure Gateway...'}
                  {bookingState === 'Razorpay Processing' && 'Authorizing ₹' + plan.estimatedCost.toLocaleString('en-IN') + ' payment...'}
                  {bookingState === 'Payment Successful' && 'Payment Verified! Orchestrating Vendor APIs...'}
                  {bookingState === 'Booking Processing' && 'SafeBound AI Agents Locking Flights, Stays & Cabs...'}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Please do not refresh or close this window. Your single payment is locking all travel assets.
                </p>
              </div>
            </div>
          )}

          {bookingState === 'Confirmed' && (
            <div className="py-4 space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  Booking Confirmed
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  You're all set to travel!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Unified PNR & Voucher: <strong className="text-slate-800 font-mono">SB-948210</strong>
                </p>
              </div>

              {/* Booking Summary Pass */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Trip</span>
                  <span className="font-bold text-slate-900">{plan.title}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Dates</span>
                  <span className="font-bold text-slate-900">{plan.duration}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Total Paid (Razorpay)</span>
                  <span className="font-bold text-emerald-600">₹{plan.estimatedCost.toLocaleString('en-IN')} (One Payment)</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Coordinator</span>
                  <span className="font-bold text-brand-600">SafeBound 24/7 AI Concierge</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          {bookingState === 'Selected' && (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStartPayment}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-md shadow-brand-600/30 flex items-center gap-2"
              >
                <span>Pay ₹{plan.estimatedCost.toLocaleString('en-IN')} via Razorpay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {bookingState === 'Confirmed' && (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Done & View in My Trips</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
