import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

const QAS = [
  {
    q: '"Why is this an AI agent and not just a chatbot?"',
    a: 'Because SafeBound doesn\'t only generate recommendations. It interprets user goals, selects and calls tools, coordinates multiple specialized agents, validates constraints, initiates bounded actions, observes real-world changes, and takes recovery actions when conditions change. A chatbot responds. An agent acts.',
  },
  {
    q: '"Where exactly is the commerce part?"',
    a: 'AI Decision → Package Optimization → Price Revalidation → Razorpay Payment → Multi-provider Booking → Post-payment Recovery. The AI isn\'t just helping the user decide what to buy — it helps complete and continuously manage the transaction.',
  },
  {
    q: '"How do you handle safety?"',
    a: 'We don\'t claim an AI can guarantee destination safety. SafeBound consumes live signals — weather alerts, travel advisories — evaluates their relevance to the specific itinerary, and uses them as monitoring inputs. When a risk materially affects the trip, SafeBound alerts the user or initiates a recovery workflow.',
  },
  {
    q: '"How do you know your AI agent is reliable?"',
    a: 'We don\'t assume that because an LLM gives a good answer, the agent is reliable. We evaluate it against 15 structured test cases — payment failures, provider timeouts, price changes, transport delays and recovery scenarios. Critical actions are protected by deterministic backend rules so the AI cannot independently move money or perform unauthorized bookings. Unauthorized action rate: 0%.',
  },
  {
    q: '"What stops the AI from doing something wrong?"',
    a: 'Bounded agency. The AI can think, recommend, and request actions. Every action passes through: 1) Backend authorization check, 2) Business rule validation, 3) User approval when cost impact or irreversible action. The AI cannot issue a refund, change a hotel silently, or spend beyond an authorized limit. Every consequential action is logged in an immutable audit trail.',
  },
];

export const JudgeQAPanel: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-card text-white space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
        <MessageSquare className="w-5 h-5 text-brand-400" />
        <h3 className="text-base font-extrabold text-white">Judge Q&A — Ready Answers</h3>
      </div>
      <div className="space-y-2">
        {QAS.map((qa, i) => (
          <div
            key={i}
            className={`rounded-2xl border overflow-hidden transition-all ${open === i ? 'border-brand-500/40 bg-brand-500/5' : 'border-slate-800 bg-slate-950'}`}
          >
            <button
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-xs font-bold text-slate-200 leading-snug">{qa.q}</span>
              {open === i
                ? <ChevronUp className="w-4 h-4 text-brand-400 shrink-0" />
                : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
            </button>
            {open === i && (
              <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
                {qa.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
