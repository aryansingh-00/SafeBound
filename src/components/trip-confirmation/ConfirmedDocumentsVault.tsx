import React from 'react';
import { FileText, Download, Eye, ShieldCheck, Lock } from 'lucide-react';

export const ConfirmedDocumentsVault: React.FC = () => {
  const docs = [
    { title: 'Transport E-Ticket (Return)', desc: 'IRCTC Vande Bharat / Volvo Coach', ref: 'VB-894210.pdf', size: '1.2 MB' },
    { title: '4★ Hotel Stay Voucher', desc: 'Cedar View Heritage Balcony Suite', ref: 'HTL-894102.pdf', size: '2.4 MB' },
    { title: 'Private Chauffeur Pass', desc: 'Station pickup & sightseeing voucher', ref: 'CAB-774921.pdf', size: '890 KB' },
    { title: 'Gun Hill & Kempty Passes', desc: 'VIP fast-track cable car access', ref: 'ACT-338190.pdf', size: '1.1 MB' },
    { title: 'Razorpay Tax Invoice (GST)', desc: 'Unified single-escrow payment receipt', ref: 'INV-SB-9842.pdf', size: '640 KB' },
  ];

  const handleAction = (title: string, action: string) => {
    alert(`${action} triggered for: ${title}`);
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-5">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-600" />
            <span>Encrypted Trip Documents & Vouchers</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Offline-ready passes and GST invoices verified under SafeBound Escrow.
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>5 Verified Passes</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {docs.map((doc, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 transition flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-100/80 text-brand-700 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="truncate">
                <h4 className="text-xs font-bold text-slate-900 truncate">{doc.title}</h4>
                <p className="text-[11px] text-slate-500 truncate">{doc.desc}</p>
                <span className="font-mono text-[10px] text-brand-700 font-semibold block mt-0.5">{doc.ref} • {doc.size}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleAction(doc.title, 'View')}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction(doc.title, 'Download')}
                className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
