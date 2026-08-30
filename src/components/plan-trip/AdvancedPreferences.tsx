import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp, Utensils, BedDouble, Accessibility, Moon, Activity, ShoppingBag } from 'lucide-react';

interface AdvancedPreferencesProps {
  foodPreference: string;
  roomPreference: string;
  activityIntensity: string;
  nightTravel: string;
  onFoodChange: (food: string) => void;
  onRoomChange: (room: string) => void;
  onIntensityChange: (intensity: string) => void;
  onNightTravelChange: (travel: string) => void;
}

export const AdvancedPreferences: React.FC<AdvancedPreferencesProps> = ({
  foodPreference,
  roomPreference,
  activityIntensity,
  nightTravel,
  onFoodChange,
  onRoomChange,
  onIntensityChange,
  onNightTravelChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden transition-all">
      
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-600" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            More Preferences (Optional)
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Food, Room, Pacing & Accessibility
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-brand-600">
          <span>{isOpen ? 'Hide' : 'Expand'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable content */}
      {isOpen && (
        <div className="p-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-4 animate-in slide-in-from-top-1 duration-200">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Food Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-brand-600" />
                <span>Food & Dietary Preference</span>
              </label>
              <select
                value={foodPreference}
                onChange={(e) => onFoodChange(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500"
              >
                <option value="Any Food">Any / No Restrictions</option>
                <option value="Vegetarian Only">Pure Vegetarian</option>
                <option value="Jain Friendly">Jain Friendly</option>
                <option value="Non-Vegetarian">Non-Vegetarian Preferred</option>
                <option value="Vegan">Vegan / Organic</option>
              </select>
            </div>

            {/* Room Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-brand-600" />
                <span>Room Configuration</span>
              </label>
              <select
                value={roomPreference}
                onChange={(e) => onRoomChange(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500"
              >
                <option value="1 King Bed">1 King Bed / Couple Room</option>
                <option value="Twin Beds">2 Separate Twin Beds</option>
                <option value="Balcony View Suite">Balcony / Mountain View Suite</option>
                <option value="Family Interconnected">Family Interconnected Rooms</option>
              </select>
            </div>

            {/* Activity Pacing */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-brand-600" />
                <span>Activity Pacing & Intensity</span>
              </label>
              <div className="flex gap-2">
                {['Relaxed (1-2 acts/day)', 'Moderate (Balanced)', 'High Adrenaline'].map((int) => (
                  <button
                    key={int}
                    type="button"
                    onClick={() => onIntensityChange(int)}
                    className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-xl border transition ${
                      activityIntensity === int
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {int.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Night Travel */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-brand-600" />
                <span>Overnight Transit Preference</span>
              </label>
              <div className="flex gap-2">
                {['Daylight Travel Only', 'Overnight Volvo/Train OK'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onNightTravelChange(opt)}
                    className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-xl border transition ${
                      nightTravel === opt
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
