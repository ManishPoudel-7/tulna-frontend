import { useState, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';

export default function SearchBar({ initialQuery = '', onSearch, isLoading }) {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) onSearch(q);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-faint dark:text-ink-faint-on-dark pointer-events-none"
          strokeWidth={1.75}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search milk, bread, eggs, atta..."
          className="w-full h-14 pl-14 pr-24 rounded-pill
            bg-cream-soft dark:bg-cream-card-dark
            border border-rule dark:border-rule-dark
            text-ink dark:text-ink-on-dark
            placeholder:text-ink-faint dark:placeholder:text-ink-faint-on-dark
            focus:border-sage dark:focus:border-sage-on-dark
            focus:shadow-soft dark:focus:shadow-soft-dark
            outline-none transition-all duration-200 text-[15px]"
          aria-label="Search products"
          autoComplete="off"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && !isLoading && (
            <button
              type="button"
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              className="p-2 rounded-full text-ink-faint hover:text-ink dark:text-ink-faint-on-dark dark:hover:text-ink-on-dark
                hover:bg-rule/60 dark:hover:bg-rule-dark/60 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          )}
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="inline-flex items-center justify-center w-11 h-11 rounded-full
              bg-sage text-cream hover:bg-sage-deep
              dark:bg-sage-on-dark dark:text-cream-dark dark:hover:bg-sage-deep-on-dark
              shadow-soft dark:shadow-soft-dark
              disabled:opacity-40 disabled:cursor-not-allowed
              active:scale-[0.97] transition-all duration-150"
            aria-label="Search"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2} />
            ) : (
              <Logo size={26} className="shadow-none" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
