import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryCluster {
  id: string;
  title: string;
  emoji: string;
  tagline: string;
  destinations: string[];
  imageUrl: string;
  gradient: string;
}

interface DestinationCategoriesProps {
  onSelectCategory: (categoryTitle: string) => void;
}

export const DestinationCategories: React.FC<DestinationCategoriesProps> = ({
  onSelectCategory,
}) => {
  const clusters: CategoryCluster[] = [
    {
      id: 'mountains',
      title: 'Mountain Escapes',
      emoji: '🏔️',
      tagline: 'Pine valleys, snow ridges & misty peaks',
      destinations: ['Manali', 'Mussoorie', 'Dharamshala', 'Kashmir'],
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop',
      gradient: 'from-purple-900/90 via-indigo-900/60 to-transparent',
    },
    {
      id: 'beach',
      title: 'Beach Getaways',
      emoji: '🏖️',
      tagline: 'Golden sands, palm shades & coral lagoons',
      destinations: ['Goa', 'Andaman', 'Pondicherry', 'Gokarna'],
      imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop',
      gradient: 'from-sky-900/90 via-blue-900/60 to-transparent',
    },
    {
      id: 'wildlife',
      title: 'Nature & Wildlife',
      emoji: '🌿',
      tagline: 'Bengal tigers, backwaters & lush reserves',
      destinations: ['Kerala', 'Jim Corbett', 'Kaziranga', 'Wayanad'],
      imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop',
      gradient: 'from-emerald-950/90 via-teal-900/60 to-transparent',
    },
    {
      id: 'culture',
      title: 'Culture & Heritage',
      emoji: '🏛️',
      tagline: 'Centuries-old forts, royal palaces & bazars',
      destinations: ['Jaipur', 'Udaipur', 'Varanasi', 'Agra'],
      imageUrl: 'https://images.unsplash.com/photo-1603288940320-9844add9467b?q=80&w=600&auto=format&fit=crop',
      gradient: 'from-amber-950/90 via-orange-900/60 to-transparent',
    },
    {
      id: 'spiritual',
      title: 'Spiritual Journeys',
      emoji: '🛕',
      tagline: 'Sacred river ghats, aartis & soul reflection',
      destinations: ['Rishikesh', 'Varanasi', 'Ayodhya', 'Amritsar'],
      imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600&auto=format&fit=crop',
      gradient: 'from-rose-950/90 via-pink-900/60 to-transparent',
    },
  ];

  return (
    <section className="space-y-6">
      
      {/* Section Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore by experience
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Pick your preferred travel mood — SafeBound ranks destinations based on live suitability.
        </p>
      </div>

      {/* 5 Thematic Experience Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {clusters.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelectCategory(c.title.split(' ')[0])}
            className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Background Photography */}
            <img
              src={c.imageUrl}
              alt={c.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient}`}></div>

            {/* Top Emoji Badge */}
            <div className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-xl shadow-xs">
              {c.emoji}
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
              <div>
                <h3 className="text-lg font-bold leading-tight">{c.title}</h3>
                <p className="text-[11px] text-slate-200 font-medium leading-snug">{c.tagline}</p>
              </div>

              {/* Destination Tag Pills */}
              <div className="flex flex-wrap gap-1 pt-1">
                {c.destinations.map((d) => (
                  <span key={d} className="text-[10px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-md font-semibold">
                    {d}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-brand-200 group-hover:text-white transition">
                <span>View {c.title}</span>
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
