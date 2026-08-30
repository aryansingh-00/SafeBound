import React from 'react';
import { ProviderAgentCard } from './ProviderAgentCard';
import { ProviderFailoverConsole } from './ProviderFailoverConsole';
import { WeatherSafetyRadar } from './WeatherSafetyRadar';
import { 
  Train, 
  Building, 
  Car, 
  Ticket, 
  CloudSun, 
  ShieldCheck, 
  Cpu, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SpecializedAgentsWorkspace: React.FC = () => {
  const agents = [
    {
      title: 'Transport Agent',
      domain: 'TRANSPORT',
      roleDescription: 'Searches multi-modal routes (Vande Bharat trains, IndiGo flights, Volvo buses), compares classes, and secures authoritative PNR reservations.',
      icon: Train,
      primaryProvider: 'IRCTC Direct GDS Adapter',
      latencyMs: 310,
      toolsRoster: ['search_transport', 'get_transport_details', 'check_availability', 'create_booking'],
      securityConstraint: 'Read/Book Transport only. No financial access.',
    },
    {
      title: 'Hotel Agent',
      domain: 'HOTEL',
      roleDescription: 'Queries boutique PMS networks, inspects room categories, verifies cancellation terms, and issues verified hotel vouchers.',
      icon: Building,
      primaryProvider: 'Boutique Hill PMS Adapter',
      latencyMs: 280,
      toolsRoster: ['search_hotels', 'get_hotel_details', 'check_room_availability', 'create_hotel_booking'],
      securityConstraint: 'Hotel PMS inventory only. Isolated credentials.',
    },
    {
      title: 'Transfer Agent',
      domain: 'TRANSFER',
      roleDescription: 'Secures arrival-synchronized private hill chauffeurs, calculates station pickup windows, and adapts to transit delays.',
      icon: Car,
      primaryProvider: 'SafeBound Verified Fleet Adapter',
      latencyMs: 190,
      toolsRoster: ['search_transfers', 'check_transfer_availability', 'reserve_transfer', 'modify_transfer'],
      securityConstraint: 'Chauffeur dispatch only. No card storage.',
    },
    {
      title: 'Activity Agent',
      domain: 'ACTIVITY',
      roleDescription: 'Validates non-overlapping activity timing buffers, checks participant capacities, and issues QR-verified VIP entry passes.',
      icon: Ticket,
      primaryProvider: 'Activity Gateway Adapter',
      latencyMs: 220,
      toolsRoster: ['search_activities', 'get_activity_details', 'check_availability', 'book_activity'],
      securityConstraint: 'Pass allocation only. Weather-tagged.',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. Network Grid: 4 Domain Agents */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-400" />
            <span>4 Domain Reservation Micro-Agents</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Domain-Isolated APIs & Standardized Contracts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((ag) => (
            <ProviderAgentCard key={ag.title} {...ag} />
          ))}
        </div>
      </div>

      {/* 2. Interactive Failover Console */}
      <ProviderFailoverConsole />

      {/* 3. Supporting Intelligence Agents (Weather & Safety) */}
      <div className="space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>2 Supporting Intelligence Sentinels</span>
        </h3>
        <WeatherSafetyRadar />
      </div>

    </div>
  );
};
