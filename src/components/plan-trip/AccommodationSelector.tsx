import React from 'react';
import { Building, Star, Check } from 'lucide-react';

interface AccommodationSelectorProps {
  stayCategory: string;
  stayAmenities: string[];
  onStayCategoryChange: (cat: string) => void;
  onToggleAmenity: (amenity: string) => void;
}

export const AccommodationSelector: React.FC<AccommodationSelectorProps> = ({
  stayCategory,
  stayAmenities,
  onStayCategoryChange,
  onToggleAmenity,
}) => {
  const categories = ['Budget', '3★ Standard', '4★ Premium', '5★ Luxury', 'Boutique Chalet'];
  const amenities = [
    'Complimentary Breakfast',
    'Free Cancellation',
    'High Rating (4.5★+)',
    'Mountain / Ocean View',
    'Central Location',
  ];

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3.5">
      
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-brand-600" />
          <span>Accommodation Category</span>
        </label>
        
        <span className="text-[11px] font-bold text-brand-600">
          Verified Hygiene & Reviews
        </span>
      </div>

      {/* Category Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {categories.map((cat) => {
          const isSelected = stayCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onStayCategoryChange(cat)}
              className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                isSelected
                  ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Amenities check tags */}
      <div className="pt-2 border-t border-slate-100">
        <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">
          Preferred Inclusions
        </span>
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity) => {
            const isChecked = stayAmenities.includes(amenity);

            return (
              <button
                key={amenity}
                type="button"
                onClick={() => onToggleAmenity(amenity)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 ${
                  isChecked
                    ? 'bg-purple-50 text-brand-700 border-brand-300 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isChecked ? 'bg-brand-600 border-brand-600 text-white' : 'border-slate-300 bg-white'}`}>
                  {isChecked && <Check className="w-2.5 h-2.5" />}
                </div>
                <span>{amenity}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
