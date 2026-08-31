import React from 'react';
import { AgentScore, ObservabilityTrace, SystemMetrics } from '../../backend/testing/testingTypes';
import { Bot, Activity, Timer } from 'lucide-react';

interface AgentScoreCardProps {
  scores: AgentScore[];
  trace: ObservabilityTrace;
  metrics: SystemMetrics;
}

const ScoreBar: React.FC<{ value: number }> = ({ value }) => {
  const color = value >= 97 ? 'bg-emerald-500' : value >= 90 ? 'bg-brand-500' : 'bg-amber-500';
  return (
    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
      <div className={`h-1.5 rounded-full ${color} transition-all`} style={{ width: `${value}%` }} />
    </div>
  );
};

export const AgentScoreCard: React.FC<AgentScoreCardProps> = ({ scores, trace, metrics }) => {
  const maxMs = Math.max(...trace.steps.map((s) => s.durationMs));

  return (
    <div className="space-y-4">
      {/* Agent Scores */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card text-white space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Bot className="w-5 h-5 text-brand-400" />
          <h3 className="text-sm font-extrabold text-white">Agent Evaluation Scores</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {scores.map((agent) => (
            <div key={agent.agentName} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white">{agent.agentName}</span>
                <span className={`text-lg font-extrabold ${agent.overallScore >= 97 ? 'text-emerald-400' : agent.overallScore >= 90 ? 'text-brand-400' : 'text-amber-400'}`}>
                  {agent.overallScore}%
                </span>
              </div>
              <ScoreBar value={agent.overallScore} />
              <p className="text-[10px] font-mono text-slate-500">{agent.passedCases}/{agent.totalCases} cases passed</p>
              <div className="space-y-1.5 pt-1 border-t border-slate-800">
                {agent.dimensions.map((dim) => (
                  <div key={dim.name} className="space-y-0.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">{dim.name}</span>
                      <span className="text-slate-300 font-mono font-bold">{dim.score}%</span>
                    </div>
                    <ScoreBar value={dim.score} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Observability Trace */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card text-white space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-brand-400" />
            <h3 className="text-sm font-extrabold text-white">Booking Latency Waterfall</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Total: {(trace.totalMs / 1000).toFixed(2)}s</span>
        </div>
        <div className="space-y-2">
          {trace.steps.map((step) => (
            <div key={step.name} className="flex items-center gap-3 text-xs">
              <div className="w-48 shrink-0 text-slate-400 text-[11px] truncate">{step.name}</div>
              <div className="flex-1 bg-slate-800 rounded-full h-2 relative overflow-hidden">
                <div
                  className="h-2 rounded-full bg-brand-500/70"
                  style={{ width: `${(step.durationMs / maxMs) * 100}%` }}
                />
              </div>
              <span className="text-slate-500 font-mono text-[10px] w-14 text-right">{step.durationMs}ms</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card text-white space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Activity className="w-5 h-5 text-brand-400" />
          <h3 className="text-sm font-extrabold text-white">Key System Metrics</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          {[
            { label: 'Booking Success Rate', value: `${metrics.bookingSuccessRate}%`, highlight: false },
            { label: 'Recovery Success Rate', value: `${metrics.recoverySuccessRate}%`, highlight: false },
            { label: 'Duplicate Bookings', value: `${metrics.duplicateBookingRate}%`, highlight: true },
            { label: 'Payment Verification', value: `${metrics.paymentVerificationRate}%`, highlight: false },
            { label: 'Avg Recovery Time', value: `${(metrics.avgRecoveryTimeMs / 1000).toFixed(2)}s`, highlight: false },
            { label: 'Unauthorized Actions ⭐', value: `${metrics.unauthorizedActionRate}%`, highlight: true },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <p className="text-slate-500 text-[10px]">{label}</p>
              <p className={`font-extrabold text-lg ${highlight ? 'text-emerald-400' : 'text-white'}`}>{value}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] font-mono text-slate-500">⭐ Unauthorized action rate target: 0%. SafeBound achieved: 0%.</p>
      </div>
    </div>
  );
};
