import React from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

interface InChatComparisonTableProps {
  onChooseDestination: (destName: string, price: number) => void;
}

export const InChatComparisonTable: React.FC<InChatComparisonTableProps> = ({
  onChooseDestination,
}) => {
  const candidates = [
    { name: 'Mussoorie', match: '92%', price: 31300, safety: 'High (9.3/10)', weather: '18°C Pleasant', travel: '5.5h (Volvo)', top: true },
    { name: 'Dharamshala', match: '89%', price: 34200, safety: 'High (9.1/10)', weather: '16°C Fresh', travel: '8h (Volvo)', top: false },
    { name: 'Nainital', match: '86%', price: 32800, safety: 'High (9.0/10)', weather: '17°C Lakeside', travel: '6h (Car/Train)', top: false },
  ];

  return (
    <div className="w-full max-w-xl bg-white rounded-3xl p-5 border border-slate-200/90 shadow-md space-y-3.5 my-2 animate-fadeIn">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>Destination Package Comparison</span>
        </h4>
        <span className="text-[10px] text-slate-400 font-semibold">Under ₹40k Budget</span>
      </div>

      {/* Comparison Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
              <th className="py-2 pr-2">Feature</th>
              {candidates.map((c) => (
                <th key={c.name} className="py-2 px-2 text-slate-800">
                  <div className="flex items-center gap-1">
                    <span>{c.name}</span>
                    {c.top && <span className="text-[9px] bg-brand-600 text-white px-1.5 py-0.2 rounded font-extrabold">TOP</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-2 pr-2 font-semibold text-slate-500">AI Match</td>
              {candidates.map((c) => (
                <td key={c.name} className="py-2 px-2 font-bold text-brand-700">{c.match}</td>
              ))}
            </tr>
            <tr>
              <td className="py-2 pr-2 font-semibold text-slate-500">Trip Total</td>
              {candidates.map((c) => (
                <td key={c.name} className="py-2 px-2 font-extrabold text-slate-900">₹{c.price.toLocaleString('en-IN')}</td>
              ))}
            </tr>
            <tr>
              <td className="py-2 pr-2 font-semibold text-slate-500">Safety Index</td>
              {candidates.map((c) => (
                <td key={c.name} className="py-2 px-2 text-emerald-700 font-semibold">{c.safety}</td>
              ))}
            </tr>
            <tr>
              <td className="py-2 pr-2 font-semibold text-slate-500">Weather</td>
              {candidates.map((c) => (
                <td key={c.name} className="py-2 px-2 text-slate-700">{c.weather}</td>
              ))}
            </tr>
            <tr>
              <td className="py-2 pr-2 font-semibold text-slate-500">Travel Time</td>
              {candidates.map((c) => (
                <td key={c.name} className="py-2 px-2 text-slate-700">{c.travel}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Row */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2">
        {candidates.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => onChooseDestination(c.name, c.price)}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
              c.top
                ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>Choose {c.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

    </div>
  );
};
