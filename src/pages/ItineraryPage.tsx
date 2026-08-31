import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ItineraryEngine } from '../backend/itinerary/itineraryEngine';
import { EmailEngineService } from '../backend/itinerary/emailEngineService';
import { FullItinerary } from '../backend/itinerary/itineraryTypes';
import { TripHealthSummaryBar } from '../components/itinerary/TripHealthSummaryBar';
import { DayTimelineView } from '../components/itinerary/DayTimelineView';
import { ItineraryChangeHistory } from '../components/itinerary/ItineraryChangeHistory';
import { DocumentVaultPanel } from '../components/itinerary/DocumentVaultPanel';
import { EmailConfirmationCard } from '../components/itinerary/EmailConfirmationCard';
import { 
  MapPin, 
  AlertTriangle, 
  RotateCw, 
  Play, 
  Activity,
  ArrowLeft,
  BookOpen
} from 'lucide-react';

export const ItineraryPage: React.FC = () => {
  const { tripId = 'SB-TRIP-MUSSOORIE-4D' } = useParams<{ tripId: string }>();
  const [itin, setItin] = useState<FullItinerary>(() => ItineraryEngine.getOrBuild(tripId));
  const [simulating, setSimulating] = useState(false);

  const handleSimulateDelay = async () => {
    setSimulating(true);
    await new Promise((r) => setTimeout(r, 700));
    const updated = ItineraryEngine.applyTrainDelayUpdate(tripId);
    EmailEngineService.queueDisruptionEmail(tripId, 'Train +80m, Transfer rescheduled');
    setItin({ ...updated });
    setSimulating(false);
  };

  const handleReset = () => {
    const fresh = ItineraryEngine.resetItinerary(tripId);
    setItin({ ...fresh });
  };

  const hasChanges = itin.changeHistory.length > 0;

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Page Header */}
      <div className="max-w-5xl mx-auto space-y-3">
        <Link
          to="/trips"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-brand-300 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Trips
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Living Itinerary — Different Providers, One SafeBound Trip</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">My Itinerary</h1>
            <p className="text-xs text-slate-400 font-medium">
              Trip ID: {tripId} · Itinerary v{itin.version} · Last updated: {itin.lastUpdatedAt}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" /> Reset to v1
            </button>
            <button
              type="button"
              disabled={simulating || hasChanges}
              onClick={handleSimulateDelay}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-amber-600/30 transition flex items-center gap-2 disabled:opacity-50"
            >
              <Play className={`w-4 h-4 ${simulating ? 'animate-spin' : 'fill-white'}`} />
              <span>{simulating ? 'Updating Itinerary...' : 'Simulate Train Delay → v2'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Disruption Alert Banner */}
      {hasChanges && (
        <div className="max-w-5xl mx-auto p-4 rounded-2xl bg-amber-950/40 border border-amber-500/50 flex items-start gap-3 text-xs text-white animate-fadeIn shadow-card">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-extrabold text-sm text-white">
              Itinerary Updated — Your train arrival changed. Transfer has been rescheduled.
            </p>
            <p className="text-slate-300">
              Vande Bharat +80 min. SafeBound moved your Dehradun chauffeur pickup to 01:35 PM automatically.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* 1. Trip Health Summary */}
        <TripHealthSummaryBar
          health={itin.health}
          destination={itin.destination}
          dates="Sep 15 – Sep 18, 2026"
          totalPaid={31300}
          version={itin.version}
        />

        {/* 2. 4-Day Timeline */}
        <DayTimelineView days={itin.days} />

        {/* 3. Version Change History */}
        <ItineraryChangeHistory
          changes={itin.changeHistory}
          currentVersion={itin.version}
        />

        {/* 4. Document Vault */}
        <DocumentVaultPanel documents={itin.documents} />

        {/* 5. Email Confirmation */}
        <EmailConfirmationCard
          emailState={itin.emailState}
          onResend={() => EmailEngineService.queueConfirmationEmail(tripId)}
        />

        {/* 6. Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/live-monitoring"
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-brand-500/40 transition flex items-center gap-3 text-xs text-white"
          >
            <Activity className="w-5 h-5 text-emerald-400" />
            <div>
              <h4 className="font-extrabold text-sm">Live Trip Monitoring</h4>
              <p className="text-slate-400">Track transport, weather & instant recovery</p>
            </div>
          </Link>
          <Link
            to="/booking-orchestrator"
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-brand-500/40 transition flex items-center gap-3 text-xs text-white"
          >
            <MapPin className="w-5 h-5 text-brand-400" />
            <div>
              <h4 className="font-extrabold text-sm">Booking Orchestrator</h4>
              <p className="text-slate-400">View confirmation audit trail & booking swarm</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
};
