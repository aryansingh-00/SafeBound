import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Globe, Check, Save } from 'lucide-react';
import { UserProfileData } from '../../data/profileData';

interface PersonalInfoProps {
  user: UserProfileData;
  onSave: (updated: UserProfileData) => void;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ user, onSave }) => {
  const [formData, setFormData] = useState<UserProfileData>(user);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6 animate-fadeIn">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Personal Information
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Your primary account identity used for contact alerts and booking receipts.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1.5 animate-fadeIn">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Profile Saved!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              Full Legal Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              Preferred Language
            </label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
            >
              <option value="English">English</option>
              <option value="Hindi">हिन्दी (Hindi)</option>
              <option value="Bengali">বাংলা (Bengali)</option>
              <option value="Tamil">தமிழ் (Tamil)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              Default Currency
            </label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-brand-500"
            >
              <option value="INR (₹)">Indian Rupee (INR ₹)</option>
              <option value="USD ($)">US Dollar (USD $)</option>
              <option value="EUR (€)">Euro (EUR €)</option>
              <option value="AED (د.إ)">UAE Dirham (AED د.إ)</option>
            </select>
          </div>

        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md shadow-brand-600/30 transition flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>

      </form>

    </div>
  );
};
