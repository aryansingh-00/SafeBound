import React from 'react';
import { TripDocument } from '../../backend/itinerary/itineraryTypes';
import { FileText, Download, Eye, Lock, Train, Building, Car, Ticket, Receipt } from 'lucide-react';

interface DocumentVaultPanelProps {
  documents: TripDocument[];
}

const categoryIcon: Record<string, React.ReactNode> = {
  TRANSPORT: <Train className="w-4 h-4 text-sky-400" />,
  HOTEL: <Building className="w-4 h-4 text-purple-400" />,
  TRANSFER: <Car className="w-4 h-4 text-amber-400" />,
  ACTIVITY: <Ticket className="w-4 h-4 text-emerald-400" />,
  PAYMENT: <Receipt className="w-4 h-4 text-rose-400" />,
};

export const DocumentVaultPanel: React.FC<DocumentVaultPanelProps> = ({ documents }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5 text-white shadow-card">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-brand-400" />
          <h3 className="text-sm font-extrabold text-white">Secure Document Vault</h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          {documents.filter((d) => d.status === 'READY').length}/{documents.length} Ready
        </span>
      </div>

      <p className="text-[11px] text-slate-400 leading-relaxed">
        Documents are served via authenticated short-lived signed URLs. Never publicly accessible.
      </p>

      <div className="space-y-2.5">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                {categoryIcon[doc.category] || <FileText className="w-4 h-4 text-slate-400" />}
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-white">{doc.name}</h4>
                <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
                  <span>{doc.type}</span>
                  <span>·</span>
                  <span>Ref: {doc.bookingRef}</span>
                  <span>·</span>
                  <span>{doc.createdAt}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                  doc.status === 'READY'
                    ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30'
                    : 'text-amber-300 bg-amber-500/10 border-amber-500/30'
                }`}
              >
                {doc.status}
              </span>
              <button
                type="button"
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition flex items-center gap-1.5 text-[11px]"
              >
                <Eye className="w-3.5 h-3.5" /> View
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold transition flex items-center gap-1.5 text-[11px]"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
