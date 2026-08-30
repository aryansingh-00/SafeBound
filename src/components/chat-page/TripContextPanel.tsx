import React, { useState } from 'react';
import { 
  Bot, 
  MapPin, 
  Calendar, 
  Users, 
  Wallet, 
  ShieldCheck, 
  Sparkles, 
  Radio, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Package
} from 'lucide-react';
import { ExtractedRequirements } from './InChatRequirementCard';

interface TripContextPanelProps {
  requirements: ExtractedRequirements;
  activePackage: {
    destination: string;
    duration: string;
    totalPrice: number;
  } | null;
  onViewPackage: () => void;
}

export const TripContextPanel: React.FC<TripContextPanelProps> = ({
  requirements,
  activePackage,
  onViewPackage,
}) => {
  const [agentsExpanded, setAgentsExpanded] = useState(true);

  const coordinatingAgents = [
    { name: 'Destination Agent', status: 'Optimal fit', color: 'text-purple-600' },
    { name: 'Transport Agent', status: 'Seats locked', color: 'text-sky-600' },
    { name: 'Hotel Agent', status: '4★ Chalet negotiated', color: 'text-violet-600' },
    { name: 'Weather Agent', status: '18°C radar clear', color: 'text-amber-600' },
    { name: 'Safety Agent', status: '9.3/10 verified', color: 'text-emerald-600' },
    { name: 'Optimization Agent', status: 'Re-pricing active', color: 'text-brand-600' },
  ];

  return (
    <aside className="w-full lg:w-72 bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between h-[calc(100vh-8rem)] shrink-0 overflow-y-auto space-y-5">
      
      <div className="space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Trip Context</h3>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
            Active
          </span>
        </div>

        {/* Current Active Package Card (if generated) */}
        {activePackage && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-brand-50 via-purple-50 to-indigo-50 border border-brand-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-brand-700 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3" />
                <span>Active Package</span>
              </span>
              <span className="text-xs font-extrabold text-brand-800">
                ₹{activePackage.totalPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900">{activePackage.destination}</h4>
              <p className="text-[10px] text-slate-500">{activePackage.duration} • 2 Travellers</p>
            </div>

            <button
              type="button"
              onClick={onViewPackage}
              className="w-full py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-[11px] rounded-xl shadow-xs transition flex items-center justify-center gap-1"
            >
              <span>View Package Breakdown</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Current Extracted Requirements */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
            Active Constraints
          </span>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-medium">📍 Origin</span>
              <span className="font-bold text-slate-900">{requirements.origin}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-medium">📅 Dates</span>
              <span className="font-bold text-slate-900">{requirements.travelMonth}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-medium">🌙 Duration</span>
              <span className="font-bold text-slate-900">{requirements.duration}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-medium">👥 People</span>
              <span className="font-bold text-slate-900">{requirements.travellers} Travellers</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-medium">💰 Max Limit</span>
              <span className="font-extrabold text-brand-600">₹{requirements.budget.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-medium">🛡️ Safety</span>
              <span className="font-bold text-emerald-700">{requirements.safety}</span>
            </div>
          </div>
        </div>

        {/* Live Data Telemetry Feeds */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
            Live Commercial Feeds
          </span>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold text-slate-700">
            <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Transport
            </span>
            <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Hotels
            </span>
            <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Weather
            </span>
            <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Activities
            </span>
          </div>
        </div>

        {/* Agent Activity Coordination */}
        <div className="p-3 rounded-2xl bg-slate-900 text-white space-y-2">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setAgentsExpanded(!agentsExpanded)}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Coordinating Multi-Agents</span>
            </span>
            {agentsExpanded ? <ChevronUp className="w-3 h-3 text-slate-400" /> : <ChevronDown className="w-3 h-3 text-slate-400" />}
          </div>

          {agentsExpanded && (
            <div className="space-y-1.5 text-[11px] pt-1 border-t border-slate-800">
              {coordinatingAgents.map((a, i) => (
                <div key={i} className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{a.name}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{a.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <div className="pt-2 text-center text-[10px] text-slate-400">
        SafeBound AI is orchestrating live APIs in real-time.
      </div>

    </aside>
  );
};
