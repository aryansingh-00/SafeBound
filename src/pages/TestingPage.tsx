import React, { useState, useCallback } from 'react';
import { TestRunner } from '../backend/testing/testRunner';
import { AgentEvaluator } from '../backend/testing/agentEvaluator';
import { TestResult } from '../backend/testing/testingTypes';
import { TestSuitePanel } from '../components/testing/TestSuitePanel';
import { FailureSimConsole } from '../components/testing/FailureSimConsole';
import { AgentScoreCard } from '../components/testing/AgentScoreCard';
import { QualityGateChecker } from '../components/testing/QualityGateChecker';
import { FlaskConical, MessageSquare } from 'lucide-react';

export const TestingPage: React.FC = () => {
  const [results, setResults] = useState<Map<string, TestResult>>(new Map());
  const [running, setRunning] = useState(false);

  const scores = AgentEvaluator.getScores();
  const trace = AgentEvaluator.getObservabilityTrace();
  const gates = AgentEvaluator.getQualityGates();
  const metrics = AgentEvaluator.getSystemMetrics();

  const handleRunAll = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setResults(new Map());
    await TestRunner.runAll((_id, result) => {
      setResults((prev) => new Map(prev).set(result.testId, result));
    });
    setRunning(false);
  }, [running]);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-8">

      {/* Header */}
      <div className="max-w-5xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Testing, Failure Simulation & Agent Evaluation</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">SafeBound Test Lab</h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          A travel commerce agent is only reliable if it handles failure safely.
          We don't just test "did AI give the right answer?" — we test
          "did the entire system take the correct action?"
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">

        {/* Judge Message */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-brand-500/30 text-xs text-slate-300 leading-relaxed space-y-1.5 shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-brand-400" />
            <span className="font-extrabold text-white text-sm">For Judges: How do you know your AI agent is reliable?</span>
          </div>
          <p>
            <span className="text-brand-300 font-bold">"We don't assume that because an LLM gives a good answer, the agent is reliable.</span>{' '}
            We evaluate it against structured scenarios and test the complete system under failures — payment failures, 
            provider timeouts, price changes, booking failures, transport delays and recovery scenarios. 
            Critical actions are also protected by deterministic backend rules, so the AI cannot independently 
            move money or perform unauthorized bookings."
          </p>
        </div>

        {/* Test Suite */}
        <TestSuitePanel results={results} running={running} onRun={handleRunAll} />

        {/* Failure Simulator */}
        <FailureSimConsole />

        {/* Agent Scores + Latency + Metrics */}
        <AgentScoreCard scores={scores} trace={trace} metrics={metrics} />

        {/* Quality Gates */}
        <QualityGateChecker gates={gates} />

      </div>
    </div>
  );
};
