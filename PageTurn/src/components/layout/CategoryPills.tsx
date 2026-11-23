import { CATEGORY_OPTIONS } from '../../data/categories';
import type { CategoryFilter } from '../../types';

interface CategoryPillsProps {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
}

export function CategoryPills({ value, onChange }: CategoryPillsProps) {
  return (
    <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
      {CATEGORY_OPTIONS.map((category) => {
        const active = category === value;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(category)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              active
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
