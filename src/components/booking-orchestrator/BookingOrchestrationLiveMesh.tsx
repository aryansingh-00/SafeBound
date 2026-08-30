import React from 'react';
import { ServiceBookingItem, OrchestrationOverallState } from '../../backend/booking-orchestrator/bookingTypes';
import { 
  Train, 
  Building, 
  Car, 
  Ticket, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  RotateCw, 
  ShieldCheck 
} from 'lucide-react';

interface BookingOrchestrationLiveMeshProps {
  services: ServiceBookingItem[];
  overallState: OrchestrationOverallState;
}

export const BookingOrchestrationLiveMesh: React.FC<BookingOrchestrationLiveMeshProps> = ({
  services,
  overallState,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'TRANSPORT': return Train;
      case 'HOTEL': return Building;
      case 'TRANSFER': return Car;
      default: return Ticket;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-extrabold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>CONFIRMED</span>
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[10px] font-mono font-extrabold flex items-center gap-1 animate-pulse">
            <RotateCw className="w-3 h-3 animate-spin" />
            <span>LOCKING SEATS...</span>
          </span>
        );
      case 'FAILED':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono font-extrabold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>SUPPLIER ERROR</span>
          </span>
        );
      case 'RECOVERING':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-extrabold flex items-center gap-1">
            <RotateCw className="w-3 h-3 animate-spin" />
            <span>AUTONOMOUS RECOVERY</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono font-extrabold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>PENDING</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4 text-white shadow-card">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-400" />
          <h3 className="text-sm font-extrabold text-white">
            4-Agent Parallel & Dependent Booking Swarm
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          State: <strong className="text-brand-300">{overallState}</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {services.map((svc) => {
          const Icon = getIcon(svc.type);

          return (
            <div
              key={svc.id}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  {getStatusBadge(svc.status)}
                </div>

                <h4 className="text-xs font-extrabold text-white leading-snug">{svc.providerName}</h4>
                <p className="text-[10px] font-mono text-slate-400 uppercase">{svc.type} DOMAIN AGENT</p>
              </div>

              <div className="pt-2 border-t border-slate-900 flex items-center justify-between font-mono text-[10px]">
                <span className="text-slate-400">
                  {svc.bookingReference ? `Ref: ${svc.bookingReference}` : svc.failureReason ? 'Failure Detected' : 'Connecting...'}
                </span>
                <span className="text-slate-200 font-bold">₹{svc.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
