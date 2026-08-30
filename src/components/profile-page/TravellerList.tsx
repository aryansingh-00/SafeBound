import React, { useState } from 'react';
import { Users, Plus, ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';
import { SavedTraveller } from '../../data/profileData';
import { TravellerCard } from './TravellerCard';
import { AddTravellerModal } from './AddTravellerModal';

interface TravellerListProps {
  travellers: SavedTraveller[];
  onSaveTravellers: (list: SavedTraveller[]) => void;
}

export const TravellerList: React.FC<TravellerListProps> = ({
  travellers,
  onSaveTravellers,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTraveller, setEditingTraveller] = useState<SavedTraveller | null>(null);

  const handleOpenAdd = () => {
    setEditingTraveller(null);
    setIsModalOpen(true);
  };

  const handleEdit = (traveller: SavedTraveller) => {
    setEditingTraveller(traveller);
    setIsModalOpen(true);
  };

  const handleRemove = (id: string) => {
    onSaveTravellers(travellers.filter((t) => t.id !== id));
  };

  const handleSaveTraveller = (saved: SavedTraveller) => {
    const exists = travellers.some((t) => t.id === saved.id);
    if (exists) {
      onSaveTravellers(travellers.map((t) => (t.id === saved.id ? saved : t)));
    } else {
      onSaveTravellers([...travellers, saved]);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6 animate-fadeIn">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-600" />
            <span>Saved Traveller Profiles</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Pre-fills name, age, and seat preferences during checkout while always letting you edit.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Traveller</span>
        </button>
      </div>

      {/* Important Booking Guarantee Card */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="font-extrabold block">Always Reviewable Before Booking Guarantee</strong>
          <p className="text-amber-800 leading-relaxed">
            Saved traveller details will be automatically suggested in your checkout form, but SafeBound will always prompt you to confirm legal names and ages before payment.
          </p>
        </div>
      </div>

      {/* Traveller Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {travellers.map((trv) => (
          <TravellerCard
            key={trv.id}
            traveller={trv}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        ))}
      </div>

      {/* Modal */}
      <AddTravellerModal
        isOpen={isModalOpen}
        travellerToEdit={editingTraveller}
        onClose={() => setIsModalOpen(false)}
        onSaveTraveller={handleSaveTraveller}
      />

    </div>
  );
};
