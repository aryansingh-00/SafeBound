import React from 'react';
import { SlidersHorizontal, RotateCcw, Wallet, Percent, Calendar, MapPin, CheckSquare, ShieldCheck } from 'lucide-react';

interface DealFilterSidebarProps {
  maxBudget: number;
  selectedDiscount: number;
  selectedDuration: string;
  selectedType: string;
  selectedDeparture: string;
  selectedMonth: string;
  selectedCancellation: string;
  onBudgetChange: (val: number) => void;
  onDiscountChange: (val: number) => void;
  onDurationChange: (val: string) => void;
  onTypeChange: (val: string) => void;
  onDepartureChange: (val: string) => void;
  onMonthChange: (val: string) => void;
  onCancellationChange: (val: string) => void;
  onClearFilters: () => void;
}

export const DealFilterSidebar: React.FC<DealFilterSidebarProps> = ({
  maxBudget,
  selectedDiscount,
  selectedDuration,
  selectedType,
  selectedDeparture,
  selectedMonth,
  selectedCancellation,
  onBudgetChange,
  onDiscountChange,
  onDurationChange,
  onTypeChange,
  onDepartureChange,
  onMonthChange,
  onCancellationChange,
  onClearFilters,
}) => {
  const discountOptions = [
    { label: 'Any Discount', value: 0 },
    { label: '10%+ OFF', value: 10 },
    { label: '20%+ OFF', value: 20 },
    { label: '30%+ OFF', value: 30 },
  ];

  const durationOptions = ['All', '1-2 Days', '3-4 Days', '5-7 Days'];
  const typeOptions = ['All', 'Beach', 'Mountains', 'Nature', 'Culture', 'Adventure', 'Spiritual'];
  const departureOptions = ['All Cities', 'New Delhi (DEL)', 'Mumbai (BOM)', 'Chennai (MAA)'];
  const monthOptions = ['Any Month', 'This Month (Aug)', 'Next Month (Sep)', 'October'];
  const cancellationOptions = ['Any', 'Free cancellation', 'Flexible cancellation'];

  return (
    <aside className="w-full lg:w-72 bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-6 shrink-0 h-fit">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-600" />
          <h3 className="font-extrabold text-sm text-slate-900">Filter Deals</h3>
        </div>

        <button
          type="button"
          onClick={onClearFilters}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 hover:underline"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Budget Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 uppercase flex items-center gap-1">
            <Wallet className="w-3.5 h-3.5 text-brand-600" />
            <span>Max Budget</span>
          </span>
          <span className="font-extrabold text-brand-700 text-sm">
            ₹{maxBudget.toLocaleString('en-IN')}
          </span>
        </div>

        <input
          type="range"
          min={10000}
          max={60000}
          step={2500}
          value={maxBudget}
          onChange={(e) => onBudgetChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
        />
        <div className="flex justify-between text-[10px] font-bold text-slate-400">
          <span>₹10,000</span>
          <span>₹35,000</span>
          <span>₹60,000+</span>
        </div>
      </div>

      {/* 2. Minimum Discount */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
          <Percent className="w-3 h-3 text-brand-600" />
          <span>Minimum Discount</span>
        </span>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {discountOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onDiscountChange(opt.value)}
              className={`p-2 rounded-xl text-left font-bold transition ${
                selectedDiscount === opt.value
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Duration */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
          <Calendar className="w-3 h-3 text-brand-600" />
          <span>Duration</span>
        </span>
        <select
          value={selectedDuration}
          onChange={(e) => onDurationChange(e.target.value)}
          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
        >
          {durationOptions.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* 4. Departure City */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
          <MapPin className="w-3 h-3 text-brand-600" />
          <span>Departure City</span>
        </span>
        <select
          value={selectedDeparture}
          onChange={(e) => onDepartureChange(e.target.value)}
          className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
        >
          {departureOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* 5. Destination Type */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Destination Type
        </span>
        <div className="flex flex-wrap gap-1">
          {typeOptions.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onTypeChange(t)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                selectedType === t
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Cancellation Protection */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Cancellation Policy</span>
        </span>
        <div className="space-y-1 text-xs">
          {cancellationOptions.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-slate-50 rounded-lg">
              <input
                type="radio"
                name="cancellation"
                checked={selectedCancellation === c}
                onChange={() => onCancellationChange(c)}
                className="accent-brand-600"
              />
              <span className="font-semibold text-slate-700">{c}</span>
            </label>
          ))}
        </div>
      </div>

    </aside>
  );
};
