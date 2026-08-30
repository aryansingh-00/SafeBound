import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Plus, 
  Calendar, 
  Bookmark, 
  Clock, 
  Compass, 
  Sparkles, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface AIChatSidebarProps {
  onNewTrip: () => void;
  onSelectRecent: (tripTitle: string, query: string) => void;
}

export const AIChatSidebar: React.FC<AIChatSidebarProps> = ({
  onNewTrip,
  onSelectRecent,
}) => {
  const recentTrips = [
    { id: '1', title: 'Delhi → Mussoorie (4D)', budget: '₹31,300', query: 'I have ₹40,000. I want a 4-day mountain trip from Delhi in September for 2 people. Somewhere safe and peaceful.' },
    { id: '2', title: 'Delhi → Goa Beach (3D)', budget: '₹28,500', query: 'Plan a 3-day beach vacation to Goa for 2 people with water sports under ₹30,000.' },
    { id: '3', title: 'Mumbai → Kerala (5D)', budget: '₹34,000', query: 'Peaceful Kerala backwaters and Munnar tea mist trip from Mumbai for family.' },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white rounded-3xl p-4 border border-slate-200/90 shadow-card flex flex-col justify-between h-[calc(100vh-8rem)] shrink-0">
      
      {/* Top Section */}
      <div className="space-y-4">
        
        {/* Header */}
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">SafeBound AI</h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Autonomous Agent
            </span>
          </div>
        </div>

        {/* Primary + New Trip Action */}
        <button
          type="button"
          onClick={onNewTrip}
          className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-brand-600/25 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ New Trip</span>
        </button>

        {/* Workspace Links */}
        <div className="space-y-1 pt-1">
          <Link
            to="/trips"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition text-xs font-semibold"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>My Trips</span>
            </div>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700">2</span>
          </Link>

          <button
            onClick={() => alert("Showing 3 saved AI travel packages.")}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition text-xs font-semibold"
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-slate-400" />
              <span>Saved Plans</span>
            </div>
            <span className="text-[10px] text-slate-400">3</span>
          </button>
        </div>

        {/* Recent Conversations */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-2 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Recent Sessions</span>
          </span>

          <div className="space-y-1">
            {recentTrips.map((trip) => (
              <button
                key={trip.id}
                onClick={() => onSelectRecent(trip.title, trip.query)}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-brand-600 truncate max-w-[140px]">
                    {trip.title}
                  </span>
                  <span className="text-[10px] font-extrabold text-brand-600">
                    {trip.budget}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {trip.query}
                </p>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Guarantee Badge */}
      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Direct Razorpay single-item escrow checkout</span>
      </div>

    </aside>
  );
};
