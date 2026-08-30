import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  BrainCircuit, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCw, 
  SlidersHorizontal,
  ArrowRight,
  Terminal,
  HelpCircle
} from 'lucide-react';
import { TravelDecisionAgent, DecisionAgentExecutionReport } from '../../backend/decision/travelDecisionAgent';
import { DecisionScoringWeights, DEFAULT_SCORING_WEIGHTS } from '../../backend/decision/decisionTypes';
import { DecisionPipelineVisualizer } from './DecisionPipelineVisualizer';
import { EvidenceScoreCard } from './EvidenceScoreCard';

export const DecisionAgentInteractiveConsole: React.FC = () => {
  const [prompt, setPrompt] = useState(
    'I want a peaceful 4-day mountain trip from Delhi under ₹40,000 for two people in September. Train preferred and I don’t want too much rain.'
  );
  const [running, setRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(7);
  const [report, setReport] = useState<DecisionAgentExecutionReport | null>(null);
  
  // Custom Weights State
  const [showWeightsConfig, setShowWeightsConfig] = useState(false);
  const [weights, setWeights] = useState<DecisionScoringWeights>(DEFAULT_SCORING_WEIGHTS);

  const samplePrompts = [
    {
      label: '🏔️ 4-Day Mountain (Under ₹40K)',
      text: 'I want a peaceful 4-day mountain trip from Delhi under ₹40,000 for two people in September. Train preferred and I don’t want too much rain.',
    },
    {
      label: '🛡️ Very High Safety Priority',
      text: 'Plan a 4-day hill station getaway from Delhi under ₹50,000 with very high safety priority and certified drivers.',
    },
    {
      label: '⚡ Make It Cheaper (Session Memory)',
      text: 'Make it cheaper for our mountain getaway.',
    },
    {
      label: '❓ Underspecified (Triggers Clarification)',
      text: 'Plan me a trip to Kashmir.',
    },
  ];

  const handleRunDecision = async (overridePrompt?: string) => {
    const textToRun = overridePrompt || prompt;
    setRunning(true);
    setCurrentStage(1);

    // Simulate animated pipeline progression
    await new Promise((r) => setTimeout(r, 150));
    setCurrentStage(3);
    await new Promise((r) => setTimeout(r, 150));
    setCurrentStage(5);
    await new Promise((r) => setTimeout(r, 150));

    const result = await TravelDecisionAgent.executeDecision(textToRun, 'SESSION_BUILDATHON_DEMO', weights);
    setReport(result);
    setCurrentStage(7);
    setRunning(false);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Decision Pipeline Visualizer */}
      <DecisionPipelineVisualizer currentStage={currentStage} />

      {/* 2. Interactive Input Bar & 1-Click Scenarios */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-card text-white">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-xs font-extrabold text-slate-300 flex items-center gap-1.5">
            <BrainCircuit className="w-4 h-4 text-brand-400" />
            <span>Enter Natural-Language Travel Intent:</span>
          </label>

          <button
            type="button"
            onClick={() => setShowWeightsConfig(!showWeightsConfig)}
            className="text-xs font-bold text-slate-400 hover:text-brand-300 transition flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showWeightsConfig ? 'Hide Weight Modifiers' : 'Configure Scoring Weights'}</span>
          </button>
        </div>

        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-xs font-semibold text-slate-100 focus:outline-none focus:border-brand-500 transition"
          />

          <button
            type="button"
            disabled={running}
            onClick={() => handleRunDecision()}
            className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${running ? 'animate-spin' : 'fill-white'}`} />
            <span>{running ? 'Evaluating Swarm...' : 'Run Decision Agent'}</span>
          </button>
        </div>

        {/* 1-Click Quick Prompts */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
            Judge 1-Click Test Prompts:
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((sp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(sp.text);
                  handleRunDecision(sp.text);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold text-[11px] transition text-left"
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Weight Sliders Configuration Panel */}
        {showWeightsConfig && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-fadeIn text-xs font-mono">
            <span className="text-slate-300 font-bold block">
              ⚙️ Decision Agent Scoring Weight Matrix (Total = 100%)
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <span className="text-slate-400 block text-[10px]">Budget Fit ({Math.round(weights.budget * 100)}%)</span>
                <input
                  type="range"
                  min="0.10"
                  max="0.50"
                  step="0.05"
                  value={weights.budget}
                  onChange={(e) => setWeights({ ...weights, budget: parseFloat(e.target.value) })}
                  className="w-full accent-brand-500"
                />
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Weather Fit ({Math.round(weights.weather * 100)}%)</span>
                <input
                  type="range"
                  min="0.10"
                  max="0.40"
                  step="0.05"
                  value={weights.weather}
                  onChange={(e) => setWeights({ ...weights, weather: parseFloat(e.target.value) })}
                  className="w-full accent-brand-500"
                />
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Preference ({Math.round(weights.preference * 100)}%)</span>
                <input
                  type="range"
                  min="0.10"
                  max="0.40"
                  step="0.05"
                  value={weights.preference}
                  onChange={(e) => setWeights({ ...weights, preference: parseFloat(e.target.value) })}
                  className="w-full accent-brand-500"
                />
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Transit ({Math.round(weights.convenience * 100)}%)</span>
                <input
                  type="range"
                  min="0.10"
                  max="0.30"
                  step="0.05"
                  value={weights.convenience}
                  onChange={(e) => setWeights({ ...weights, convenience: parseFloat(e.target.value) })}
                  className="w-full accent-brand-500"
                />
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Safety ({Math.round(weights.safety * 100)}%)</span>
                <input
                  type="range"
                  min="0.10"
                  max="0.40"
                  step="0.05"
                  value={weights.safety}
                  onChange={(e) => setWeights({ ...weights, safety: parseFloat(e.target.value) })}
                  className="w-full accent-brand-500"
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 3. Decision Evaluation Results View */}
      {report && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Clarification Notice if triggered */}
          {report.status === 'NEEDS_CLARIFICATION' && (
            <div className="p-6 rounded-3xl bg-amber-950/40 border border-amber-500/40 text-white space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <HelpCircle className="w-5 h-5" />
                <h4 className="font-extrabold text-sm">Decision Agent Clarification Prompt</h4>
              </div>
              <p className="text-sm text-slate-200">{report.clarificationQuestion}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPrompt('Plan a 4-day trip to Kashmir with ₹45,000 budget for 2 people');
                    handleRunDecision('Plan a 4-day trip to Kashmir with ₹45,000 budget for 2 people');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs"
                >
                  Provide Budget: ₹45,000
                </button>
              </div>
            </div>
          )}

          {/* Hard Filter Audit Strip */}
          {report.hardFilteredOut.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
              <span className="font-bold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Hard Constraint Filter Exclusions ({report.hardFilteredOut.length} Corridors Dropped):</span>
              </span>
              {report.hardFilteredOut.map((hf, idx) => (
                <div key={idx} className="text-slate-400 pl-5">
                  • <strong className="text-slate-200">{hf.destination}</strong>: {hf.reason}
                </div>
              ))}
            </div>
          )}

          {/* Summary Comparison Headline */}
          {report.rankedCandidates.length > 0 && (
            <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 border border-brand-500/30 text-white space-y-2">
              <h4 className="text-sm font-extrabold text-brand-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Decision Synthesis Rationale</span>
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {report.summaryExplanation.headline}
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                {report.summaryExplanation.keyTradeoffs}
              </p>
            </div>
          )}

          {/* Candidate Evidence Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {report.rankedCandidates.map((cand, idx) => (
              <EvidenceScoreCard
                key={cand.destination}
                candidate={cand}
                rank={idx + 1}
              />
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
