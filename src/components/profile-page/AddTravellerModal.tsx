import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Calendar, ShieldCheck, HeartPulse, Check } from 'lucide-react';
import { SavedTraveller } from '../../data/profileData';

interface AddTravellerModalProps {
  isOpen: boolean;
  travellerToEdit?: SavedTraveller | null;
  onClose: () => void;
  onSaveTraveller: (traveller: SavedTraveller) => void;
}

export const AddTravellerModal: React.FC<AddTravellerModalProps> = ({
  isOpen,
  travellerToEdit,
  onClose,
  onSaveTraveller,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<SavedTraveller>({
    id: `trv-${Date.now()}`,
    fullName: '',
    age: 25,
    gender: 'Male',
    phone: '',
    email: '',
    isPrimary: false,
    nationality: 'Indian',
    specialAssistance: '',
    readiness: {
      basic: true,
      contact: true,
      idToken: true,
    },
  });

  useEffect(() => {
    if (travellerToEdit) {
      setFormData(travellerToEdit);
    } else {
      setFormData({
        id: `trv-${Date.now()}`,
        fullName: '',
        age: 25,
        gender: 'Male',
        phone: '',
        email: '',
        isPrimary: false,
        nationality: 'Indian',
        specialAssistance: '',
        readiness: {
          basic: true,
          contact: true,
          idToken: true,
        },
      });
    }
  }, [travellerToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    onSaveTraveller({
      ...formData,
      readiness: {
        basic: true,
        contact: !!(formData.phone || formData.email),
        idToken: true,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {travellerToEdit ? 'Edit Traveller Details' : 'Add New Traveller'}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Saved for 1-click booking pre-fill across SafeBound packages.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="space-y-3.5 text-xs">
            
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Full Legal Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="As per Government ID (e.g. Rahul Kumar)"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Age <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  required
                  value={formData.age || ''}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Gender <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 XXXXX"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Special Assistance / Accessibility (Optional)</label>
              <input
                type="text"
                value={formData.specialAssistance || ''}
                onChange={(e) => setFormData({ ...formData, specialAssistance: e.target.value })}
                placeholder="e.g. Wheelchair assistance, ground-floor room preference"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:border-brand-500"
              />
            </div>

          </div>

          <div className="p-3 bg-brand-50/60 border border-brand-200/80 rounded-2xl text-[11px] text-slate-600 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <p>
              SafeBound tokenizes traveller data. We only share details with certified transport & hotel providers upon your explicit checkout approval.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Traveller</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
