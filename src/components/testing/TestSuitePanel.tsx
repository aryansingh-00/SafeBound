import React, { useState } from 'react';
import { TestCase, TestResult, TestStatus } from '../../backend/testing/testingTypes';
import { TEST_CASES } from '../../backend/testing/testCaseRegistry';
import { CheckCircle2, XCircle, Clock, Play, RotateCw } from 'lucide-react';

const categoryColor: Record<string, string> = {
  HAPPY_PATH: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  PAYMENT:    'text-sky-400 bg-sky-500/10 border-sky-500/30',
  PROVIDER:   'text-purple-400 bg-purple-500/10 border-purple-500/30',
  AGENT:      'text-brand-400 bg-brand-500/10 border-brand-500/30',
  SECURITY:   'text-rose-400 bg-rose-500/10 border-rose-500/30',
  RECOVERY:   'text-amber-400 bg-amber-500/10 border-amber-500/30',
  IDEMPOTENCY:'text-teal-400 bg-teal-500/10 border-teal-500/30',
};

const StatusIcon: React.FC<{ status: TestStatus }> = ({ status }) => {
  if (status === 'PASS') return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
  if (status === 'FAIL') return <XCircle className="w-4 h-4 text-rose-400" />;
  if (status === 'RUNNING') return <RotateCw className="w-4 h-4 text-amber-400 animate-spin" />;
  return <Clock className="w-4 h-4 text-slate-500" />;
};

interface TestSuitePanelProps {
  results: Map<string, TestResult>;
  running: boolean;
  onRun: () => void;
}

export const TestSuitePanel: React.FC<TestSuitePanelProps> = ({ results, running, onRun }) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const passed = Array.from(results.values()).filter((r) => r.passed).length;
  const total = results.size;

  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card text-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="space-y-0.5">
          <h3 className="text-sm font-extrabold text-white">Test Suite — TC001 to TC015</h3>
          {total > 0 && (
            <p className="text-xs text-slate-400 font-mono">{passed}/{total} passed · {total - passed} failed</p>
          )}
        </div>
        <button
          onClick={onRun}
          disabled={running}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs transition"
        >
          {running ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-white" />}
          {running ? 'Running...' : 'Run All Tests'}
        </button>
      </div>

      <div className="space-y-2">
        {TEST_CASES.map((tc: TestCase) => {
          const result = results.get(tc.id);
          const status: TestStatus = running && !result ? 'RUNNING' : (result?.status ?? 'PENDING');
          const isOpen = expanded === tc.id;

          return (
            <div key={tc.id} className="rounded-2xl bg-slate-950 border border-slate-800/70 overflow-hidden">
              <button
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-900/50 transition"
                onClick={() => setExpanded(isOpen ? null : tc.id)}
              >
                <StatusIcon status={status} />
                <span className="font-mono text-[10px] text-slate-500 shrink-0 w-10">{tc.id}</span>
                <span className="flex-1 text-xs font-bold text-white">{tc.name}</span>
                <span className={`px-1.5 py-0.5 rounded border text-[9px] font-mono font-bold ${categoryColor[tc.category]}`}>
                  {tc.category.replace('_', ' ')}
                </span>
                {result && (
                  <span className="text-[9px] font-mono text-slate-600">{result.durationMs}ms</span>
                )}
              </button>

              {isOpen && (
                <div className="p-3 pt-0 border-t border-slate-800 space-y-2 text-[11px]">
                  <p className="text-slate-400">{tc.description}</p>
                  {result && !result.passed && result.failureReason && (
                    <p className="text-rose-300 font-mono">Failure: {result.failureReason}</p>
                  )}
                  {result && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <p className="text-slate-500 text-[9px] mb-1 font-mono">EXPECTED</p>
                        <pre className="text-emerald-300 text-[9px] overflow-auto">{JSON.stringify(tc.expectedOutput, null, 2)}</pre>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <p className="text-slate-500 text-[9px] mb-1 font-mono">ACTUAL</p>
                        <pre className={`text-[9px] overflow-auto ${result.passed ? 'text-emerald-300' : 'text-rose-300'}`}>{JSON.stringify(result.actualOutput, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
