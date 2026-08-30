import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, Edit3 } from 'lucide-react';

export const TravelStyleWidget: React.FC = () => {
  const navigate = useNavigate();

  const styles = [
    { label: '🏔️ Mountains', fit: '90% affinity', bg: 'bg-indigo-50 text-indigo-900 border-indigo-200' },
    { label: '🌿 Nature Trails', fit: '80% affinity', bg: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
    { label: '🧗 Adventure', fit: '70% affinity', bg: 'bg-amber-50 text-amber-900 border-amber-200' },
    { label: '🧘 Peaceful & Quiet', fit: 'Top priority', bg: 'bg-purple-50 text-purple-900 border-purple-200' },
    { label: '🏖️ Coastal Escapes', fit: '50% affinity', bg: 'bg-sky-50 text-sky-900 border-sky-200' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-600" />
          <span>Your Active Travel Style</span>
        </h3>

        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
        >
          <Edit3 className="w-3 h-3" />
          <span>Edit</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {styles.map((s, idx) => (
          <div
            key={idx}
            className={`px-3 py-1.5 rounded-xl font-bold border flex items-center gap-1.5 ${s.bg}`}
          >
            <span>{s.label}</span>
            <span className="text-[10px] opacity-75 font-mono">({s.fit})</span>
          </div>
        ))}
      </div>

    </div>
  );
};
