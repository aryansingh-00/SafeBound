import React, { useState } from 'react';
import { ChangeDetectionEngine } from '../../backend/monitoring/changeDetectionEngine';
import { ImpactAnalysisEngine } from '../../backend/monitoring/impactAnalysisEngine';
import { DisruptionRecoveryEngine } from '../../backend/recovery/disruptionRecoveryEngine';
import { ItineraryUpdater, ItineraryNodeSnapshot } from '../../backend/monitoring/itineraryUpdater';
import { 
  DisruptionSnapshot, 
  DisruptionImpactReport, 
  ActiveRecoveryState,
  RecoveryOptionItem 
} from '../../backend/monitoring/monitoringTypes';
import { DisruptionImpactRadar } from './DisruptionImpactRadar';
import { UpdatedItineraryTimeline } from './UpdatedItineraryTimeline';
import { MonitoringTelemetryFeed } from './MonitoringTelemetryFeed';
import { 
  Play, 
  RotateCw, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  BellRing, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LiveMonitoringSimulator: React.FC = () => {
  const tripId = 'SB-TRIP-MUSSOORIE-4D';

  const [snapshot, setSnapshot] = useState<DisruptionSnapshot>(() =>
    ChangeDetectionEngine.getOrCreateSnapshot(tripId)
  );
  const [impactReport, setImpactReport] = useState<DisruptionImpactReport>(() =>
    ImpactAnalysisEngine.analyzeImpact(snapshot)
  );
  const [recoveryState, setRecoveryState] = useState<ActiveRecoveryState | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string>('opt-shift-window');
  const [itineraryNodes, setItineraryNodes] = useState<ItineraryNodeSnapshot[]>(() =>
    ItineraryUpdater.getItinerary(tripId)
  );
  const [notification, setNotification] = useState<string | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [approving, setApproving] = useState(false);

  const [telemetryLogs, setTelemetryLogs] = useState([
    {
      id: 'tel-1',
      agent: 'Transport Sentinel',
      timestamp: '10:30:15',
      status: 'IRCTC GDS Poll',
      details: 'Vande Bharat #22457 tracked. Current GPS location: Saharanpur Jn.',
    },
    {
      id: 'tel-2',
      agent: 'Weather Sentinel',
      timestamp: '10:30:18',
      status: 'IMD Doppler Radar Ping',
      details: 'Mussoorie mountain corridor clear. 12% precipitation probability.',
    },
    {
      id: 'tel-3',
      agent: 'Chauffeur Sentinel',
      timestamp: '10:30:20',
      status: 'Driver Standby Ping',
      details: 'Driver Rajesh Kumar confirmed for Dehradun station arrival pickup.',
    },
  ]);

  const handleSimulateTrainDelay = async () => {
    setSimulating(true);
    setNotification(null);

    await new Promise((r) => setTimeout(r, 600));

    // 1. Change Detection
    const { snapshot: newSnapshot } = ChangeDetectionEngine.recordTrainDelay(tripId, 80);
    setSnapshot({ ...newSnapshot });

    // 2. Impact Analysis
    const impact = ImpactAnalysisEngine.analyzeImpact(newSnapshot);
    setImpactReport(impact);

    // 3. Recovery Agent
    const recovery = DisruptionRecoveryEngine.generateRecoveryPlan(tripId, impact);
    setRecoveryState({ ...recovery });

    // 4. Append Telemetry
    setTelemetryLogs((prev) => [
      {
        id: `tel_${Date.now()}`,
        agent: 'Recovery Agent',
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        status: 'DISRUPTION DETECTED (+80m Delay)',
        details: 'Station pickup collision detected. 3 replacement recovery options generated.',
      },
      ...prev,
    ]);

    setSimulating(false);
  };

  const handleApproveRecovery = async () => {
    setApproving(true);
    await new Promise((r) => setTimeout(r, 800));

    // 1. Execute recovery
    const res = DisruptionRecoveryEngine.executeRecoveryOption(tripId, selectedOptionId);

    // 2. Mutate itinerary
    const updatedItin = ItineraryUpdater.getItinerary(tripId);
    setItineraryNodes([...updatedItin]);

    // 3. Set resolved notification
    setNotification(res.summary);

    if (recoveryState) {
      setRecoveryState({
        ...recoveryState,
        status: 'RESOLVED',
        resolvedActionSummary: res.summary,
      });
    }

    setTelemetryLogs((prev) => [
      {
        id: `tel_${Date.now()}`,
        agent: 'Live Monitoring Engine',
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        status: 'RECOVERY RESOLVED',
        details: 'Dehradun station chauffeur pickup shifted to 01:35 PM. Itinerary vouchers updated.',
      },
      ...prev,
    ]);

    setApproving(false);
  };

  const handleReset = () => {
    const freshSnap = ChangeDetectionEngine.resetBaseline(tripId);
    setSnapshot({ ...freshSnap });
    setImpactReport(ImpactAnalysisEngine.analyzeImpact(freshSnap));
    setRecoveryState(null);
    setNotification(null);
    const freshItin = ItineraryUpdater.resetItinerary(tripId);
    setItineraryNodes([...freshItin]);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header Action Control Bar */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white shadow-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
            <h3 className="text-base font-extrabold text-white">
              Live Monitoring & Autonomous Disruption Recovery Engine
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Trip ID: {tripId} · Continuous Real-Time Telemetry & Downstream Collision Prevention
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition"
          >
            Reset Baseline
          </button>

          <button
            type="button"
            disabled={simulating}
            onClick={handleSimulateTrainDelay}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-amber-600/30 transition flex items-center gap-2 disabled:opacity-50"
          >
            <Play className={`w-4 h-4 ${simulating ? 'animate-spin' : 'fill-white'}`} />
            <span>{simulating ? 'Processing Telemetry...' : 'Simulate IRCTC +80m Delay'}</span>
          </button>
        </div>
      </div>

      {/* High Priority Notification Alert */}
      {notification && (
        <div className="p-5 rounded-3xl bg-emerald-950/50 border border-emerald-500/50 text-white flex items-start gap-3 shadow-card animate-fadeIn">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <BellRing className="w-4 h-4 animate-bounce" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.2 rounded bg-emerald-500/30 text-emerald-200 font-mono text-[9px] font-bold">
                HIGH PRIORITY NOTIFICATION
              </span>
              <h4 className="font-extrabold text-sm text-white">Trip Schedule Automatically Recovered</h4>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {notification}
            </p>
          </div>
        </div>
      )}

      {/* 2. Impact Radar Gauge */}
      <DisruptionImpactRadar
        severity={impactReport.severity}
        headline={impactReport.headline}
        explanation={impactReport.impactExplanation}
      />

      {/* 3. Recovery Options Proposal (When disruption detected) */}
      {recoveryState && recoveryState.status !== 'RESOLVED' && (
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-brand-500/50 space-y-5 text-white shadow-card animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-400" />
              <h3 className="text-sm font-extrabold text-white">
                Recovery Agent: 3 Candidate Action Proposals
              </h3>
            </div>
            <span className="text-[10px] font-mono text-brand-300 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/30">
              Awaiting 1-Click Authorization
            </span>
          </div>

          <div className="space-y-3">
            {recoveryState.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedOptionId(opt.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    isSelected
                      ? 'bg-brand-600/20 border-brand-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-sm">{opt.title}</span>
                      {opt.isBestValue && (
                        <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold border border-emerald-500/30">
                          RECOMMENDED (₹0 EXTRA)
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">{opt.description}</p>
                  </div>

                  <div className="text-right font-mono self-end sm:self-auto shrink-0">
                    <span className="text-[10px] text-slate-400 block">New Pickup: {opt.newPickupTime}</span>
                    <span className="text-sm font-extrabold text-emerald-400">
                      {opt.priceDelta === 0 ? '₹0 Additional Cost' : `+₹${opt.priceDelta}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              disabled={approving}
              onClick={handleApproveRecovery}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center gap-2 disabled:opacity-50"
            >
              <Check className={`w-4 h-4 ${approving ? 'animate-spin' : ''}`} />
              <span>{approving ? 'Rescheduling Ground Chauffeur...' : 'Approve Recovery & Reschedule Driver'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Live Itinerary Timeline */}
      <UpdatedItineraryTimeline nodes={itineraryNodes} />

      {/* 5. Telemetry Logs */}
      <MonitoringTelemetryFeed logs={telemetryLogs} />

    </div>
  );
};
