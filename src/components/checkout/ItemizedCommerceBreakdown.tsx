import React from 'react';
import { Train, Building, Car, Ticket, ShieldCheck } from 'lucide-react';

interface ItemizedCommerceBreakdownProps {
  finalAmount: number;
}

export const ItemizedCommerceBreakdown: React.FC<ItemizedCommerceBreakdownProps> = ({
  finalAmount,
}) => {
  const items = [
    {
      title: 'Transport (Vande Bharat Express Executive AC)',
      subtitle: 'New Delhi (NDLS) ➔ Dehradun (DDN) · 2 Seats',
      icon: Train,
      cost: 7800,
    },
    {
      title: 'Hotel (The Cedar View Luxury Resort & Spa)',
      subtitle: '4 Nights · Deluxe Valley View Suite with Balcony · Free Breakfast',
      icon: Building,
      cost: 16500,
    },
    {
      title: 'Private Hill Chauffeur Transfers',
      subtitle: 'Roundtrip Dehradun Stn ➔ Mussoorie Resort · Certified Mountain Driver',
      icon: Car,
      cost: 2500,
    },
    {
      title: 'Curated Experiences & VIP Passes',
      subtitle: '2x Gun Hill Cable Car Fast-Track + Landour Tea Tasting Heritage Walk',
      icon: Ticket,
      cost: 4500,
    },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5 text-white shadow-card">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <h3 className="text-sm font-extrabold text-white">
          Itemized Package Summary & Deterministic Breakdown
        </h3>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          ✓ Backend Authoritative Formula
        </span>
      </div>

      {/* Service Lines */}
      <div className="space-y-3">
        {items.map((it, idx) => {
          const Icon = it.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-400 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-white">{it.title}</h4>
                  <p className="text-[11px] text-slate-400">{it.subtitle}</p>
                </div>
              </div>

              <span className="font-mono font-bold text-white text-xs shrink-0">
                ₹{it.cost.toLocaleString('en-IN')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Total Calculations Block */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
        <div className="flex justify-between text-slate-400">
          <span>Subtotal (4 Services):</span>
          <span className="text-slate-200">₹31,300</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>SafeBound Trip Insurance & 5% GST:</span>
          <span className="text-emerald-400">Included (₹0 Extra)</span>
        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm">
          <span className="font-extrabold text-white">Final Payable Amount:</span>
          <span className="text-xl font-extrabold text-emerald-400">
            ₹{finalAmount.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
};
