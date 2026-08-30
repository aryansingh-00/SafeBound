import React, { useState } from 'react';
import { Bot, MapPin, Calendar, Users, Wallet, ShieldCheck, Sparkles, Edit3, Check } from 'lucide-react';

export interface ExtractedRequirements {
  origin: string;
  travelMonth: string;
  duration: string;
  travellers: number;
  budget: number;
  theme: string;
  safety: string;
  style: string;
}

interface InChatRequirementCardProps {
  requirements: ExtractedRequirements;
  onUpdateRequirements?: (updated: ExtractedRequirements) => void;
}

export const InChatRequirementCard: React.FC<InChatRequirementCardProps> = ({
  requirements,
  onUpdateRequirements,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ExtractedRequirements>(requirements);

  const handleSave = () => {
    setIsEditing(false);
    if (onUpdateRequirements) {
      onUpdateRequirements(formData);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl p-4 sm:p-5 border-2 border-brand-200/90 shadow-sm space-y-3.5 my-2">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            I understood
          </h4>
        </div>

        <button
          type="button"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 bg-brand-50 hover:bg-brand-100 px-2.5 py-1 rounded-lg transition"
        >
          {isEditing ? <Check className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
          <span>{isEditing ? 'Save' : 'Edit requirements'}</span>
        </button>
      </div>

      {/* Grid of Parsed Items */}
      {!isEditing ? (
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500 font-medium">📍 From</span>
            <span className="font-bold text-slate-900">{requirements.origin}</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500 font-medium">📅 Travel</span>
            <span className="font-bold text-slate-900">{requirements.travelMonth}</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500 font-medium">🌙 Duration</span>
            <span className="font-bold text-slate-900">{requirements.duration}</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500 font-medium">👥 Travellers</span>
            <span className="font-bold text-slate-900">{requirements.travellers} People</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500 font-medium">💰 Budget</span>
            <span className="font-extrabold text-brand-600">₹{requirements.budget.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500 font-medium">🏔️ Theme</span>
            <span className="font-bold text-slate-900">{requirements.theme}</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500 font-medium">🛡️ Safety</span>
            <span className="font-bold text-emerald-700">{requirements.safety}</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500 font-medium">🌿 Style</span>
            <span className="font-bold text-slate-900">{requirements.style}</span>
          </div>
        </div>
      ) : (
        /* Inline Editor */
        <div className="space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Origin</label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                className="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Budget (₹)</label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                className="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Travellers</label>
              <input
                type="number"
                value={formData.travellers}
                onChange={(e) => setFormData({ ...formData, travellers: Number(e.target.value) })}
                className="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-semibold"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-2 bg-brand-600 text-white font-bold rounded-xl text-xs"
          >
            Apply Changes
          </button>
        </div>
      )}

      <p className="text-[10px] text-slate-400 font-medium">
        SafeBound evaluates live inventory and weather according to these parameters.
      </p>

    </div>
  );
};
