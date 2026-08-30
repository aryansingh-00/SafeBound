import React from 'react';
import { User, CheckCircle2, AlertCircle, Edit3, Trash2, ShieldCheck, Phone, Mail } from 'lucide-react';
import { SavedTraveller } from '../../data/profileData';

interface TravellerCardProps {
  traveller: SavedTraveller;
  onEdit: (traveller: SavedTraveller) => void;
  onRemove: (id: string) => void;
}

export const TravellerCard: React.FC<TravellerCardProps> = ({
  traveller,
  onEdit,
  onRemove,
}) => {
  const isComplete = traveller.readiness.basic && traveller.readiness.contact;

  return (
    <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 transition flex flex-col justify-between space-y-4">
      
      {/* Header: Name, Primary Badge, Actions */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                traveller.isPrimary
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              <User className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-extrabold text-slate-900">{traveller.fullName}</h4>
                {traveller.isPrimary && (
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-extrabold bg-brand-100 text-brand-800 border border-brand-200">
                    Primary
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Age: {traveller.age} • Gender: {traveller.gender} • {traveller.nationality}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(traveller)}
              className="p-1.5 text-slate-500 hover:text-brand-600 rounded-xl hover:bg-white transition"
              title="Edit details"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            {!traveller.isPrimary && (
              <button
                type="button"
                onClick={() => onRemove(traveller.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-white transition"
                title="Remove traveller"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Contact Strip */}
        {(traveller.phone || traveller.email) && (
          <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-wrap items-center gap-3 text-xs text-slate-600">
            {traveller.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                <span className="font-mono">{traveller.phone}</span>
              </span>
            )}
            {traveller.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>{traveller.email}</span>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Booking Readiness Indicator */}
      <div className="pt-2.5 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Booking Readiness:
          </span>
          {isComplete ? (
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.2 rounded flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Details Complete</span>
            </span>
          ) : (
            <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.2 rounded flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-600" />
              <span>Contact Required</span>
            </span>
          )}
        </div>

        <span className="text-[10px] text-slate-400 font-medium">
          {traveller.isPrimary ? 'Auto Pre-Filled' : 'Ready for Packages'}
        </span>
      </div>

    </div>
  );
};
