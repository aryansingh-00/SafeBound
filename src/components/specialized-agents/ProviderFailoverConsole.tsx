import React, { useState } from 'react';
import { TransportAgent } from '../../backend/specialized-agents/transportAgent';
import { NormalizedTransportOption } from '../../backend/specialized-agents/providerAgentTypes';
import { 
  Play, 
  RotateCw, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

export const ProviderFailoverConsole: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [simulateTimeout, setSimulateTimeout] = useState(true);
  const [result, setResult] = useState<{
    options: NormalizedTransportOption[];
    providerUsed: string;
    failoverOccurred: boolean;
  } | null>(null);

  const handleRunSearch = async () => {
    setRunning(true);
    setResult(null);

    await new Promise((r) => setTimeout(r, 600));

    const res = await TransportAgent.searchTransport('Delhi', 'Dehradun', simulateTimeout);
    setResult(res);
    setRunning(false);
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5 text-white shadow-card">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-extrabold text-white">
            Live Provider Failover & Normalization Simulator
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-mono text-slate-300 flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={simulateTimeout}
              onChange={(e) => setSimulateTimeout(e.target.checked)}
              className="accent-brand-500 rounded"
            />
            <span>Inject Primary Adapter Timeout (4000ms)</span>
          </label>
        </div>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        Demonstrates how SafeBound shields the AI and user from external vendor API outages. If the primary supplier adapter drops, the agent automatically fails over to the secondary adapter and returns the exact same normalized contract.
      </p>

      {/* Action Button */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          disabled={running}
          onClick={handleRunSearch}
          className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-brand-600/30 transition flex items-center gap-2 disabled:opacity-50"
        >
          <Play className={`w-4 h-4 ${running ? 'animate-spin' : 'fill-white'}`} />
          <span>{running ? 'Testing Provider Adapters...' : 'Execute Transport Agent Query'}</span>
        </button>

        {result && (
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-400">Adapter Resolved:</span>
            <span className={`font-bold ${result.failoverOccurred ? 'text-amber-400' : 'text-emerald-400'}`}>
              {result.providerUsed}
            </span>
          </div>
        )}
      </div>

      {/* Failover Status Banner */}
      {result && result.failoverOccurred && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-1 animate-fadeIn text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>Automated Adapter Failover Succeeded with 0 Client Disruption</span>
          </div>
          <p className="text-slate-300 text-[11px]">
            Primary IRCTC Direct GDS timed out. SafeBound caught the exception and fulfilled the request via the Secondary RailYatri/Amadeus GDS Adapter.
          </p>
        </div>
      )}

      {/* Normalized Output Grid */}
      {result && (
        <div className="space-y-2 pt-2 animate-fadeIn">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
            Normalized SafeBound Transport Result Contract:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {result.options.map((opt) => (
              <div key={opt.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.2 rounded bg-slate-800 text-brand-300 font-bold text-[9px]">
                    {opt.type}
                  </span>
                  <span className="text-emerald-400 font-bold text-[11px]">
                    ₹{opt.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <h4 className="font-extrabold text-white text-xs truncate">{opt.provider}</h4>
                <p className="text-slate-400 text-[10px]">{opt.origin} ➔ {opt.destination}</p>
                <div className="text-[10px] text-slate-300 flex justify-between pt-1 border-t border-slate-900">
                  <span>{opt.departureTime} – {opt.arrivalTime}</span>
                  <span className="text-brand-300 font-bold">{opt.seatsAvailable} seats</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
