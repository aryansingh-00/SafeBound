import React, { useState } from 'react';
import { X, Lock, ShieldCheck, CreditCard, Smartphone, Building, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface RazorpayPaymentModalProps {
  isOpen: boolean;
  totalAmount: number;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export const RazorpayPaymentModal: React.FC<RazorpayPaymentModalProps> = ({
  isOpen,
  totalAmount,
  onClose,
  onPaymentSuccess,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('aryan@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepState, setStepState] = useState<'form' | 'authorizing' | 'success'>('form');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStepState('authorizing');

    setTimeout(() => {
      setStepState('success');
      setTimeout(() => {
        setIsProcessing(false);
        onPaymentSuccess();
      }, 1000);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-md overflow-hidden flex flex-col">
        
        {/* Razorpay Brand Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-blue-900 flex items-center justify-center font-extrabold shadow-sm">
              <span className="text-xl font-sans tracking-tighter">R</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">Razorpay Trusted</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <h3 className="text-base font-extrabold">SafeBound Travel Escrow</h3>
            </div>
          </div>

          {!isProcessing && (
            <button
              onClick={onClose}
              className="p-1.5 text-blue-200 hover:text-white rounded-full bg-blue-950/50"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {stepState === 'authorizing' ? (
            <div className="py-10 text-center space-y-4 animate-fadeIn">
              <Loader2 className="w-12 h-12 text-brand-600 animate-spin mx-auto" />
              <div>
                <h4 className="text-base font-extrabold text-slate-900">
                  Authorizing Payment with Bank...
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Connecting to Razorpay single escrow payment gateway for ₹{totalAmount.toLocaleString('en-IN')}.
                </p>
              </div>
            </div>
          ) : stepState === 'success' ? (
            <div className="py-10 text-center space-y-4 animate-fadeIn">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
              <div>
                <h4 className="text-lg font-extrabold text-emerald-900">
                  Payment Successful!
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Transferring to SafeBound Autonomous Booking Orchestrator...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePay} className="space-y-4">
              
              {/* Amount Banner */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Total Due Amount</span>
                <span className="text-xl font-extrabold text-slate-900">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-center font-bold text-xs transition flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'upi'
                      ? 'bg-brand-50 border-brand-600 text-brand-700 ring-2 ring-brand-500/20'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-center font-bold text-xs transition flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'bg-brand-50 border-brand-600 text-brand-700 ring-2 ring-brand-500/20'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border text-center font-bold text-xs transition flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'netbanking'
                      ? 'bg-brand-50 border-brand-600 text-brand-700 ring-2 ring-brand-500/20'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Netbanking</span>
                </button>
              </div>

              {/* UPI ID Input */}
              {paymentMethod === 'upi' && (
                <div className="space-y-1 text-xs">
                  <label className="block text-slate-700 font-bold">UPI ID / VPA</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@okaxis"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
                  />
                  <span className="text-[10px] text-slate-400">Google Pay, PhonePe, Paytm, BHIM UPI supported.</span>
                </div>
              )}

              {/* Card Input Mock */}
              {paymentMethod === 'card' && (
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Card Number</label>
                    <input
                      type="text"
                      defaultValue="4532 •••• •••• 8921"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      defaultValue="12/28"
                      placeholder="MM/YY"
                      className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                    <input
                      type="password"
                      defaultValue="•••"
                      placeholder="CVV"
                      className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Authorize & Pay ₹{totalAmount.toLocaleString('en-IN')}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero convenience fee • 100% Escrow protected by Razorpay</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
