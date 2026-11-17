import { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, Check } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price_asc', label: 'Price · low to high' },
  { value: 'unit_price', label: 'Price per unit' },
  { value: 'most_stores', label: 'Most stores' },
];

export default function SortMenu({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const current = SORT_OPTIONS.find((o) => o.value === value) || SORT_OPTIONS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill text-xs font-medium
          border border-rule dark:border-rule-dark
          text-ink-soft dark:text-ink-soft-on-dark
          hover:border-sage/50 dark:hover:border-sage-on-dark/50
          hover:text-ink dark:hover:text-ink-on-dark
          bg-cream-soft dark:bg-cream-card-dark
          transition-colors duration-150"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <ArrowUpDown className="w-3.5 h-3.5" strokeWidth={2} />
        {current.label}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 py-1
          bg-cream-soft dark:bg-cream-card-dark
          border border-rule dark:border-rule-dark
          rounded-2xl shadow-lift dark:shadow-lift-dark
          z-20 animate-fade-in"
          role="listbox"
        >
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm
                transition-colors duration-100
                ${opt.value === value
                  ? 'text-sage-deep dark:text-sage-deep-on-dark font-semibold bg-sage-light dark:bg-sage-light-on-dark'
                  : 'text-ink dark:text-ink-on-dark hover:bg-cream dark:hover:bg-cream-dark'
                }`}
              role="option"
              aria-selected={opt.value === value}
            >
              {opt.label}
              {opt.value === value && <Check className="w-4 h-4" strokeWidth={2} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
