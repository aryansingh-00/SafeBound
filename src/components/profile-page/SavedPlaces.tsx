import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, MapPin, Sparkles, Trash2, ArrowRight } from 'lucide-react';
import { SavedDestinationItem } from '../../data/profileData';

interface SavedPlacesProps {
  destinations: SavedDestinationItem[];
  onRemove: (id: string) => void;
}

export const SavedPlaces: React.FC<SavedPlacesProps> = ({ destinations, onRemove }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6 animate-fadeIn">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-brand-600" />
            <span>Saved Destinations</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Bookmarked getaways ready for 1-click AI itinerary and deal searches.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-500">
          {destinations.length} Places
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="rounded-3xl border border-slate-200/80 hover:border-brand-300 transition overflow-hidden bg-slate-50 flex flex-col justify-between group"
          >
            <div className="relative h-36 overflow-hidden">
              <img
                src={dest.imageUrl}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <button
                type="button"
                onClick={() => onRemove(dest.id)}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-slate-900/60 text-white hover:bg-rose-600 transition"
                title="Remove from saved"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div className="absolute bottom-2.5 left-2.5">
                <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white">
                  From ₹{dest.startingPrice.toLocaleString('en-IN')}/person
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">{dest.name}</h4>
                <p className="text-xs text-slate-500 font-medium">{dest.tagline}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {dest.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-semibold px-2 py-0.2 rounded-md bg-white border border-slate-200 text-slate-600">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/destinations')}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Explore Details
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/plan-trip?dest=${encodeURIComponent(dest.name)}`)}
                  className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Plan Trip</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
