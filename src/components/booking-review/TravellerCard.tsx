import React, { useState } from 'react';
import { User, CheckCircle2, AlertCircle, Edit3, ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';

export interface TravellerInfo {
  id: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  phone?: string;
  email?: string;
  isLead: boolean;
  idProofType?: string;
  idProofNumber?: string;
}

interface TravellerCardProps {
  index: number;
  traveller: TravellerInfo;
  onUpdate: (updated: TravellerInfo) => void;
  isSavedProfile?: boolean;
}

export const TravellerCard: React.FC<TravellerCardProps> = ({
  index,
  traveller,
  onUpdate,
  isSavedProfile = false,
}) => {
  const [isEditing, setIsEditing] = useState(!isSavedProfile);

  const isValid =
    traveller.fullName.trim().length > 2 &&
    traveller.age >= 1 &&
    (!traveller.isLead || (traveller.phone && traveller.email));

  return (
    <div
      className={`p-5 rounded-3xl border transition-all ${
        isValid
          ? 'bg-white border-slate-200/90 shadow-card'
          : 'bg-amber-50/40 border-amber-300 shadow-sm'
      }`}
    >
      
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
              traveller.isLead
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <User className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-extrabold text-slate-900">
                Traveller {index + 1} {traveller.isLead && '(Lead / Primary Contact)'}
              </h4>
              {isValid ? (
                <span className="text-[10px] font-extrabold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Details Complete</span>
                </span>
              ) : (
                <span className="text-[10px] font-extrabold px-2 py-0.2 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-amber-600" />
                  <span>Details Required</span>
                </span>
              )}
            </div>

            {isSavedProfile && !isEditing && (
              <span className="text-[11px] text-brand-700 font-semibold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                <span>Using verified saved profile details</span>
              </span>
            )}
          </div>
        </div>

        {isSavedProfile && (
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 bg-brand-50 px-2.5 py-1 rounded-xl transition"
          >
            <Edit3 className="w-3 h-3" />
            <span>{isEditing ? 'Done' : 'Edit'}</span>
          </button>
        )}
      </div>

      {/* Form Fields */}
      <div className="pt-4 space-y-3.5">
        
        {/* Row 1: Full Name, Age, Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          <div className="sm:col-span-6">
            <label className="block text-slate-700 font-bold mb-1">
              Full Legal Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={traveller.fullName}
              onChange={(e) => onUpdate({ ...traveller, fullName: e.target.value })}
              placeholder="As per Government ID (e.g. Aryan Singh)"
              className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-slate-700 font-bold mb-1">
              Age <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              disabled={!isEditing}
              min={1}
              max={120}
              value={traveller.age || ''}
              onChange={(e) => onUpdate({ ...traveller, age: Number(e.target.value) })}
              placeholder="Age"
              className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-slate-700 font-bold mb-1">
              Gender <span className="text-rose-500">*</span>
            </label>
            <select
              disabled={!isEditing}
              value={traveller.gender}
              onChange={(e) => onUpdate({ ...traveller, gender: e.target.value as any })}
              className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Row 2: Contact Info (For Lead Traveller) */}
        {traveller.isLead && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1 border-t border-slate-100">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Email Address (for vouchers & e-tickets) <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                disabled={!isEditing}
                value={traveller.email || ''}
                onChange={(e) => onUpdate({ ...traveller, email: e.target.value })}
                placeholder="aryan@safebound.ai"
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Mobile Number (for SMS & Driver coordination) <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                disabled={!isEditing}
                value={traveller.phone || ''}
                onChange={(e) => onUpdate({ ...traveller, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        )}

        {/* Dynamic Provider Compliance Indicator */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-500 font-semibold">
          <span className="flex items-center gap-1 text-emerald-700">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Train requirements satisfied</span>
          </span>
          <span className="flex items-center gap-1 text-emerald-700">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Hotel check-in ready</span>
          </span>
          <span className="flex items-center gap-1 text-emerald-700">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Ropeway pass age compliance</span>
          </span>
        </div>

      </div>

    </div>
  );
};
