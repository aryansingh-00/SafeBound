import React, { useState } from 'react';
import { X, Share2, Copy, Check, ShieldCheck, Lock } from 'lucide-react';

interface ShareTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
}

export const ShareTripModal: React.FC<ShareTripModalProps> = ({
  isOpen,
  onClose,
  tripId,
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/trips/share/${tripId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-md overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Share Itinerary</h3>
              <span className="text-[10px] text-slate-400">Privacy-Protected Public View</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          
          <div className="p-3.5 bg-brand-50/60 border border-brand-200 rounded-2xl space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-brand-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>Safe Privacy Guard Active</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              This link only shares day-by-day sightseeing, hotel address and meeting points with family & co-travellers. Your payment receipts and identity documents remain private and hidden.
            </p>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="block text-slate-700 font-bold">Public Share URL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-700 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
