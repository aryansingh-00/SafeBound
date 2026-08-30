import React, { useState } from 'react';
import { RazorpayOrderPayload } from '../../backend/payments/commerceTypes';
import { 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Smartphone, 
  Building2, 
  X, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';

interface RazorpayCheckoutModalProps {
  isOpen: boolean;
  order: RazorpayOrderPayload | null;
  onClose: () => void;
  onPaymentSuccess: (paymentId: string, signature: string) => void;
}

export const RazorpayCheckoutModal: React.FC<RazorpayCheckoutModalProps> = ({
  isOpen,
  order,
  onClose,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [processing, setProcessing] = useState(false);

  if (!isOpen || !order) return null;

  const handleSimulatePayment = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));

    const simulatedPaymentId = `pay_${Math.random().toString(36).substring(2, 12)}_SB`;
    const simulatedSignature = btoa(`${order.orderId}|${simulatedPaymentId}|rzp_secret_verified`);

    setProcessing(false);
    onPaymentSuccess(simulatedPaymentId, simulatedSignature);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      {/* Razorpay Dialog Frame */}
      <div className="w-full max-w-md bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden text-white flex flex-col">
        
        {/* Razorpay Brand Header */}
        <div className="p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-b border-slate-700 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">Razorpay</span>
              <span className="px-2 py-0.2 rounded bg-blue-500/30 text-blue-200 font-mono text-[9px] font-bold border border-blue-400/30">
                SMART ESCROW
              </span>
            </div>
            <p className="text-[11px] text-blue-200">SafeBound Travel Commerce · Mussoorie 4D</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Amount Strip */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
          <div className="space-y-0.5">
            <span className="text-slate-400 block text-[10px]">ORDER ID:</span>
            <span className="text-slate-200 font-bold">{order.orderId}</span>
          </div>

          <div className="text-right">
            <span className="text-slate-400 block text-[10px]">AMOUNT PAYABLE:</span>
            <span className="text-xl font-extrabold text-emerald-400">
              ₹{order.amountRupees.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6 space-y-4 text-xs font-sans">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
            Select Test Payment Instrument:
          </span>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setSelectedMethod('upi')}
              className={`w-full p-3.5 rounded-2xl border transition flex items-center justify-between ${
                selectedMethod === 'upi'
                  ? 'bg-brand-600/20 border-brand-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-brand-400" />
                <div className="text-left">
                  <span className="font-extrabold block text-xs">UPI / QR Code</span>
                  <span className="text-[10px] text-slate-400">Google Pay, PhonePe, Paytm, CRED</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">Fastest</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('card')}
              className={`w-full p-3.5 rounded-2xl border transition flex items-center justify-between ${
                selectedMethod === 'card'
                  ? 'bg-brand-600/20 border-brand-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-brand-400" />
                <div className="text-left">
                  <span className="font-extrabold block text-xs">Credit & Debit Cards</span>
                  <span className="text-[10px] text-slate-400">Visa, Mastercard, RuPay</span>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('netbanking')}
              className={`w-full p-3.5 rounded-2xl border transition flex items-center justify-between ${
                selectedMethod === 'netbanking'
                  ? 'bg-brand-600/20 border-brand-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-brand-400" />
                <div className="text-left">
                  <span className="font-extrabold block text-xs">Net Banking</span>
                  <span className="text-[10px] text-slate-400">HDFC, ICICI, SBI, Axis</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-3">
          <button
            type="button"
            disabled={processing}
            onClick={handleSimulatePayment}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Lock className="w-4 h-4" />
            <span>
              {processing
                ? 'Processing Razorpay Authorize...'
                : `Pay ₹${order.amountRupees.toLocaleString('en-IN')}`}
            </span>
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Encrypted Escrow · Powered by Razorpay</span>
          </div>
        </div>

      </div>

    </div>
  );
};
