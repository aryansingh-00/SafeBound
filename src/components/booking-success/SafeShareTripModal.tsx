import React, { useState } from 'react';
import { X, Share2, Copy, Check, ShieldCheck, Lock } from 'lucide-react';
import { BookingSuccessRecord } from '../../data/bookingSuccessData';

interface SafeShareTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: BookingSuccessRecord;
}

export const SafeShareTripModal: React.FC<SafeShareTripModalProps> = ({
  isOpen,
  onClose,
  record,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareableUrl = `https://safebound.ai/itinerary/share/${record.tripId.toLowerCase()}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Share Trip Summary
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Safe public link with zero sensitive payment or personal ID details.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Public Itinerary Preview
          </span>
          <h4 className="text-sm font-extrabold text-slate-900">
            🏔️ {record.destination} 4-Day Journey
          </h4>
          <p className="text-slate-600">
            {record.dateRange} • {record.duration} • 2 Travellers
          </p>
          <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Prices, transaction IDs and personal documents are automatically hidden.</span>
          </div>
        </div>

        {/* Share Link Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Shareable Itinerary Link</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareableUrl}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 select-all focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
        >
          Done
        </button>

      </div>
    </div>
  );
};
