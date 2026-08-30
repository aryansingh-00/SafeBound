import React from 'react';

interface DealCategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const DealCategoryTabs: React.FC<DealCategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    { id: 'All', label: 'All Deals' },
    { id: 'Weekend', label: '⚡ Weekend Escapes' },
    { id: 'Budget', label: '💰 Budget Top (<₹15k)' },
    { id: 'Beach', label: '🏖️ Beach & Sun' },
    { id: 'Mountains', label: '🏔️ Mountain Escapes' },
    { id: 'Family', label: '👨‍👩‍👧 Family Friendly' },
    { id: 'Adventure', label: '🎉 Adventure' },
    { id: 'Luxury', label: '👑 Luxury Stays' },
    { id: 'Last Minute', label: '⏳ Last Minute' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200/80 mb-6">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all duration-150 ${
              isActive
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25 ring-2 ring-brand-600/20'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
