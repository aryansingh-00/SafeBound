import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  User, 
  MapPin, 
  ArrowRight, 
  ShieldCheck,
  RefreshCw,
  Zap
} from 'lucide-react';
import { ChatMessage, GeneratedTripPlan } from '../../types';
import { SAMPLE_GENERATED_TRIPS } from '../../data/sampleTrips';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: GeneratedTripPlan) => void;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'agent',
      text: "Namaste! I'm SafeBound's AI Travel Commerce Agent. Tell me what kind of trip you have in mind — budget, destination, number of days, or travel vibe. I'll build and coordinate your entire package.",
      timestamp: 'Just now',
      quickReplies: [
        '₹40,000 budget mountain trip from Delhi',
        'Goa beach & water sports weekend for 2',
        'Kashmir honeymoon with Dal Lake houseboat',
        'Kerala 4-day backwaters & tea hills',
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI Agent reasoning & synthesizing full package
    setTimeout(() => {
      let replyText = "I've synthesized the optimal travel routes, verified 4-star mountain stays, and locked safe adventure passes within your budget!";
      let suggestedPlan = SAMPLE_GENERATED_TRIPS['manali-4d'];

      if (text.toLowerCase().includes('goa') || text.toLowerCase().includes('beach')) {
        replyText = "Awesome choice! I've filtered beachfront 4-star resorts in North Goa, direct flights, and 5 water sports passes with free rescheduling guard.";
        suggestedPlan = {
          ...SAMPLE_GENERATED_TRIPS['manali-4d'],
          id: 'TRIP-GOA-1029',
          title: '4-Day Goa Coastal & Adventure Package',
          destination: 'Goa, India',
          estimatedCost: 34990,
          totalBudget: 40000,
          weatherForecast: '28°C — Warm & Sunny Beach Weather',
          safetyScore: 9.2,
        };
      } else if (text.toLowerCase().includes('kashmir') || text.toLowerCase().includes('houseboat')) {
        replyText = "Kashmir is paradise! I've bundled a luxury Dal Lake Houseboat night, Gulmarg Phase 2 Gondola tickets, and a dedicated 4x4 Innova.";
        suggestedPlan = {
          ...SAMPLE_GENERATED_TRIPS['manali-4d'],
          id: 'TRIP-KASH-5521',
          title: '5-Day Kashmir Royal Houseboat & Gulmarg Ski Tour',
          destination: 'Srinagar & Gulmarg, Kashmir',
          estimatedCost: 38500,
          totalBudget: 45000,
          weatherForecast: '11°C — Clear Crisp Himalayan Sky',
          safetyScore: 8.8,
        };
      }

      const agentMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: replyText,
        timestamp: 'Just now',
        suggestedPlan,
        quickReplies: [
          'Review cost breakdown',
          'Switch to 5-star resort',
          'Proceed to single-click checkout',
        ],
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-fadeIn flex justify-end">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col border-l border-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">SafeBound AI Agent</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-xs text-brand-100 font-medium">
                Live Multi-Agent Travel Orchestrator
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Safety Guarantee strip */}
        <div className="px-4 py-2 bg-brand-50 border-b border-brand-100 flex items-center justify-between text-xs font-semibold text-brand-800 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Razorpay 100% Guaranteed Escrow</span>
          </div>
          <span className="text-[10px] bg-brand-200/60 px-2 py-0.5 rounded-full text-brand-900">
            Real-time API
          </span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-end gap-2 max-w-[88%]">
                {msg.sender === 'agent' && (
                  <div className="w-7 h-7 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0 mb-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-br-xs shadow-sm'
                      : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>

              {/* Suggested Plan Card if attached */}
              {msg.suggestedPlan && (
                <div className="mt-3 w-full max-w-sm ml-9 p-4 rounded-2xl bg-white border-2 border-brand-200 shadow-md space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-100 text-brand-800">
                      ⚡ AI Synthesized Package
                    </span>
                    <span className="text-xs font-extrabold text-brand-600">
                      ₹{msg.suggestedPlan.estimatedCost.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{msg.suggestedPlan.title}</h4>
                    <p className="text-xs text-slate-500">{msg.suggestedPlan.destination} • {msg.suggestedPlan.duration}</p>
                  </div>

                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl space-y-1">
                    <p>✈️ {msg.suggestedPlan.breakdown.flights.title}</p>
                    <p>🏨 {msg.suggestedPlan.breakdown.hotel.title}</p>
                    <p>🚗 {msg.suggestedPlan.breakdown.transfers.title}</p>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectPlan(msg.suggestedPlan!);
                    }}
                    className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>View & Book Full Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Quick replies */}
              {msg.quickReplies && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 ml-9">
                  {msg.quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(reply)}
                      className="text-[11px] font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200/80 rounded-full px-2.5 py-1 transition text-left"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 ml-9">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span>SafeBound AI is reasoning...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything (e.g. 4 days Goa trip under 30k)..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-xl shadow-md transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
