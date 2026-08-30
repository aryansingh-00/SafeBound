import React, { useState } from 'react';
import { ShieldCheck, Lock, FileCheck, CheckCircle2 } from 'lucide-react';

export const DocumentRequirementNotice: React.FC = () => {
  const [tokenVerified, setTokenVerified] = useState(true);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-5 space-y-3">
      
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4" />
        </div>

        <div className="space-y-0.5">
          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <span>🪪 Identity Information & Privacy Guard</span>
            <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-emerald-100 text-emerald-800">
              Mock Verified
            </span>
          </h4>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            This booking requires identity verification for train PNR issuance and hotel registration. Your details are tokenized securely and only transmitted to certified booking providers upon escrow lock.
          </p>
        </div>
      </div>

      <div className="p-3 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-mono text-[11px] text-slate-600">ID Verification Token: <strong>TOK-AADHAAR-8921-X</strong></span>
        </div>

        <span className="font-bold text-emerald-700 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verified</span>
        </span>
      </div>

    </div>
  );
};
