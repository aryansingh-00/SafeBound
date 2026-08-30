import React, { useState } from 'react';
import { Send, Sparkles, Mic, Paperclip } from 'lucide-react';

interface ChatInputBarProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [text, setText] = useState('');

  const quickActionChips = [
    '⚡ Find cheaper',
    '🏔️ Show alternatives',
    '📅 Change dates',
    '🛡️ Make it safer',
    '👥 Add 1 traveller',
    '🏖️ Switch to beach trip',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSendMessage(text);
    setText('');
  };

  const handleChipClick = (chip: string) => {
    const cleanChip = chip.replace(/^[^\w]+/, '');
    onSendMessage(cleanChip);
  };

  return (
    <div className="bg-white p-4 border-t border-slate-200/80 rounded-b-3xl space-y-2.5 shrink-0 shadow-xs">
      
      {/* Quick action chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {quickActionChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleChipClick(chip)}
            className="text-[11px] font-semibold text-slate-600 hover:text-brand-700 bg-slate-100/80 hover:bg-brand-50 border border-slate-200/60 hover:border-brand-200 rounded-full px-2.5 py-1 transition whitespace-nowrap"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={disabled}
            placeholder="Tell SafeBound what you want (e.g. ₹40k mein safe mountain trip)..."
            className="w-full pl-4 pr-10 py-3 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50 border border-slate-200/90 rounded-2xl focus:outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/15 transition placeholder:text-slate-400"
          />
        </div>

        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className="p-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-2xl shadow-md shadow-brand-600/30 transition transform active:scale-95 shrink-0"
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
