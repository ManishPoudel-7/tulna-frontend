import { Sprout } from 'lucide-react';

const SUGGESTIONS = ['Toned milk', 'Brown eggs', 'Aashirvaad atta', 'Butter', 'Dahi', 'Bread'];

export default function EmptyState({ onSearch, noResults = false, query = '' }) {
  if (noResults) {
    return (
      <div className="text-center py-20 px-4 animate-rise">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-cream-soft dark:bg-cream-card-dark border border-rule dark:border-rule-dark flex items-center justify-center">
          <Sprout className="w-7 h-7 text-ink-faint dark:text-ink-faint-on-dark" strokeWidth={1.6} />
        </div>
        <h3 className="font-serif text-2xl text-ink dark:text-ink-on-dark leading-tight">
          Nothing to compare for <span className="italic">&ldquo;{query}&rdquo;</span>
        </h3>
        <p className="text-sm text-ink-soft dark:text-ink-soft-on-dark mt-2 max-w-xs mx-auto">
          Try a simpler term, or a different spelling.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16 sm:py-24 px-4 animate-rise">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sage-light dark:bg-sage-light-on-dark flex items-center justify-center">
        <Sprout className="w-9 h-9 text-sage dark:text-sage-on-dark" strokeWidth={1.4} />
      </div>
      <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-ink dark:text-ink-on-dark max-w-md mx-auto">
        Find the best price, <span className="italic text-sage dark:text-sage-on-dark">quietly.</span>
      </h2>
      <p className="text-sm text-ink-soft dark:text-ink-soft-on-dark mt-3 max-w-sm mx-auto">
        One search across Blinkit, Zepto, Instamart and BigBasket.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-md mx-auto">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSearch(s)}
            className="px-4 py-1.5 rounded-pill text-sm font-medium
              bg-cream-soft dark:bg-cream-card-dark
              border border-rule dark:border-rule-dark
              text-ink dark:text-ink-on-dark
              hover:border-sage dark:hover:border-sage-on-dark
              hover:bg-sage-light dark:hover:bg-sage-light-on-dark
              transition-colors duration-150"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
