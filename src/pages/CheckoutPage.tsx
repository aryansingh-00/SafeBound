import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PriceRevalidationBanner } from '../components/checkout/PriceRevalidationBanner';
import { ItemizedCommerceBreakdown } from '../components/checkout/ItemizedCommerceBreakdown';
import { TravellerConsentCard } from '../components/checkout/TravellerConsentCard';
import { RazorpayCheckoutModal } from '../components/checkout/RazorpayCheckoutModal';
import { WebhookTelemetryInspector } from '../components/checkout/WebhookTelemetryInspector';
import { RazorpayCommerceEngine } from '../backend/payments/razorpayCommerceEngine';
import { CheckoutRevalidationService, RevalidationResult } from '../backend/payments/checkoutRevalidationService';
import { RazorpayOrderPayload } from '../backend/payments/commerceTypes';
import { ShieldCheck, ArrowLeft, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { tripId = 'SB-TRIP-MUSSOORIE-4D' } = useParams<{ tripId: string }>();
  const navigate = useNavigate();

  const [basePrice, setBasePrice] = useState(31300);
  const [revalidationState, setRevalidationState] = useState<RevalidationResult>(() =>
    CheckoutRevalidationService.revalidateAndLock('PKG_MUSSOORIE_4D', 31300, false)
  );
  const [secondsRemaining, setSecondsRemaining] = useState(600);
  const [isSimulatingHike, setIsSimulatingHike] = useState(false);

  const [confirmedConsent, setConfirmedConsent] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderPayload, setOrderPayload] = useState<RazorpayOrderPayload | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const [lastWebhookEvent, setLastWebhookEvent] = useState<{
    event: string;
    orderId: string;
    paymentId: string;
    timestamp: string;
    hmacDigest: string;
  } | null>(null);

  // 10-minute lock countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefreshLock = () => {
    const fresh = CheckoutRevalidationService.revalidateAndLock('PKG_MUSSOORIE_4D', basePrice, false);
    setRevalidationState(fresh);
    setSecondsRemaining(600);
    setIsSimulatingHike(false);
  };

  const handleToggleSimulateHike = () => {
    const nextHikeState = !isSimulatingHike;
    setIsSimulatingHike(nextHikeState);
    const fresh = CheckoutRevalidationService.revalidateAndLock('PKG_MUSSOORIE_4D', basePrice, nextHikeState);
    setRevalidationState(fresh);
  };

  const handleAcceptUpdatedPrice = () => {
    setBasePrice(revalidationState.updatedPrice);
    const fresh = CheckoutRevalidationService.revalidateAndLock('PKG_MUSSOORIE_4D', revalidationState.updatedPrice, false);
    setRevalidationState(fresh);
    setIsSimulatingHike(false);
  };

  const handleTriggerPayment = () => {
    setLoadingOrder(true);
    setTimeout(() => {
      const order = RazorpayCommerceEngine.createOrder({
        tripId,
        packageId: 'PKG_MUSSOORIE_4D',
        amountRupees: revalidationState.updatedPrice,
      });
      setOrderPayload(order);
      setLoadingOrder(false);
      setIsModalOpen(true);
    }, 400);
  };

  const handlePaymentSuccess = (paymentId: string, signature: string) => {
    if (!orderPayload) return;

    // 1. Verify payment on backend with HMAC
    const verifyResult = RazorpayCommerceEngine.verifyPayment({
      orderId: orderPayload.orderId,
      paymentId,
      signature,
      tripId,
      amountRupees: orderPayload.amountRupees,
    });

    // 2. Deliver webhook
    RazorpayCommerceEngine.processWebhook({
      eventId: `evt_wh_${Date.now()}`,
      event: 'payment.captured',
      orderId: orderPayload.orderId,
      paymentId,
      amountPaise: orderPayload.amountPaise,
      currency: 'INR',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      signature: verifyResult.hmacDigest,
    });

    setLastWebhookEvent({
      event: 'payment.captured (ORDER_PAID)',
      orderId: orderPayload.orderId,
      paymentId,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      hmacDigest: verifyResult.hmacDigest,
    });

    setIsModalOpen(false);

    // 3. Seamlessly advance to Booking Processing page after 1.2s
    setTimeout(() => {
      navigate('/booking/processing');
    }, 1200);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Breadcrumb & Title */}
      <div className="max-w-4xl mx-auto space-y-3">
        <Link
          to="/package-builder"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-brand-300 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Package Optimizer</span>
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Razorpay Smart Escrow Layer</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Review & Pay
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              🏔️ Mussoorie Escape · 4 Days · 2 Travellers · Trip ID: {tripId}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-right font-mono">
            <span className="text-[10px] text-slate-400 block uppercase">Total Payable</span>
            <span className="text-2xl font-extrabold text-emerald-400">
              ₹{revalidationState.updatedPrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Checkout Columns */}
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* 1. Live Price Revalidation Banner & 10m Lock */}
        <PriceRevalidationBanner
          secondsRemaining={secondsRemaining}
          hasPriceChanged={revalidationState.hasPriceChanged}
          previousPrice={revalidationState.previousPrice}
          updatedPrice={revalidationState.updatedPrice}
          priceDelta={revalidationState.priceDelta}
          onRefreshLock={handleRefreshLock}
          onAcceptUpdatedPrice={handleAcceptUpdatedPrice}
          onGoBack={() => navigate('/package-builder')}
          onToggleSimulateHike={handleToggleSimulateHike}
          isSimulatingHike={isSimulatingHike}
        />

        {/* 2. Deterministic Itemized Breakdown */}
        <ItemizedCommerceBreakdown finalAmount={revalidationState.updatedPrice} />

        {/* 3. Traveller Info & Consent Authorization */}
        <TravellerConsentCard
          confirmedConsent={confirmedConsent}
          onToggleConsent={() => setConfirmedConsent(!confirmedConsent)}
          onTriggerPayment={handleTriggerPayment}
          payableAmount={revalidationState.updatedPrice}
          loading={loadingOrder}
        />

        {/* 4. Real-time Webhook & HMAC Telemetry Stream */}
        <WebhookTelemetryInspector lastEvent={lastWebhookEvent} />

      </div>

      {/* Official-Style Razorpay Checkout Modal */}
      <RazorpayCheckoutModal
        isOpen={isModalOpen}
        order={orderPayload}
        onClose={() => setIsModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

    </div>
  );
};
