import React, { useState } from 'react';
import { TravellerProfile, TravellerSnapshot } from '../../backend/security/securityTypes';
import { CheckCircle2, Edit3, ShieldCheck, User } from 'lucide-react';

interface TravellerConfirmCardProps {
  profile: TravellerProfile;
  onConfirm: (snapshot: Omit<TravellerSnapshot, 'snapshotId' | 'takenAt'>) => void;
  tripId: string;
  alreadyConfirmed?: boolean;
}

export const TravellerConfirmCard: React.FC<TravellerConfirmCardProps> = ({
  profile,
  onConfirm,
  tripId,
  alreadyConfirmed = false,
}) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: profile.name, dateOfBirth: profile.dateOfBirth, gender: profile.gender });
  const [confirmed, setConfirmed] = useState(alreadyConfirmed);

  const handleConfirm = () => {
    onConfirm({
      tripId,
      travellerId: profile.travellerId,
      confirmedByUser: true,
      name: form.name,
      dateOfBirth: form.dateOfBirth,
      gender: form.gender,
    });
    setConfirmed(true);
    setEditing(false);
  };

  if (confirmed) {
    return (
      <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex items-start gap-3 text-xs text-white">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-extrabold text-sm text-emerald-300">Traveller Details Confirmed & Locked</p>
          <p className="text-slate-300">
            <strong>{form.name}</strong> · {form.dateOfBirth} · {form.gender}
          </p>
          <p className="text-slate-500 font-mono text-[10px]">
            Booking snapshot created. Profile changes will not affect this trip.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-5 text-white shadow-card">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
        <User className="w-5 h-5 text-brand-400" />
        <h3 className="text-sm font-extrabold text-white">Confirm Traveller Details</h3>
      </div>

      <p className="text-xs text-amber-300 bg-amber-950/30 border border-amber-500/30 px-3 py-2 rounded-xl">
        ⚠️ Please verify this information before booking. Your booking will be made using these exact details.
      </p>

      {editing ? (
        <div className="space-y-3 text-xs">
          {[
            { label: 'Full Name', key: 'name', type: 'text' },
            { label: 'Date of Birth', key: 'dateOfBirth', type: 'date' },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="block text-slate-400 mb-1 font-semibold">{label}</label>
              <input
                type={type}
                value={(form as Record<string, string>)[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-brand-500"
              />
            </div>
          ))}
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value as 'MALE' | 'FEMALE' | 'OTHER' }))}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-brand-500"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={() => setEditing(false)} className="flex-1 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800 transition">Cancel</button>
            <button onClick={handleConfirm} className="flex-1 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition">Save & Confirm</button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3 text-xs">
            {[
              { label: 'Full Name', value: form.name },
              { label: 'Date of Birth', value: form.dateOfBirth },
              { label: 'Gender', value: form.gender },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 font-semibold">{label}</span>
                <span className="font-bold text-white">{value}</span>
              </div>
            ))}
          </div>
          <p className="text-sm font-bold text-white text-center">Is this information correct?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setEditing(true)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800 transition"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Details
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/30 transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Confirm & Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
};
