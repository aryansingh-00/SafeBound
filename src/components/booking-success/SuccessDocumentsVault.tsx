import React from 'react';
import { Download, FileText, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';
import { BookingSuccessRecord } from '../../data/bookingSuccessData';

interface SuccessDocumentsVaultProps {
  documents: BookingSuccessRecord['documents'];
}

export const SuccessDocumentsVault: React.FC<SuccessDocumentsVaultProps> = ({ documents }) => {
  const handleDownload = (docName: string) => {
    alert(`Downloading ${docName} (Verified Cryptographic PDF Voucher)...`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-600" />
            <span>Digital Document Vault</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Download and store verified electronic vouchers for offline access.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Downloading complete all-in-one trip travel document package (ZIP)...')}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download All (ZIP)</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white text-brand-600 border border-slate-200 flex items-center justify-center font-bold shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900">{doc.name}</h4>
                <span className="text-[11px] font-mono text-slate-400">
                  {doc.ref} • {doc.type} • {doc.size}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDownload(doc.name)}
              className="px-3.5 py-1.5 bg-white hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 shadow-2xs transition flex items-center justify-center gap-1.5 shrink-0 self-end sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
