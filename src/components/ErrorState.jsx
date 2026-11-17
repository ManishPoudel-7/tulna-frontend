import { CircleAlert, RefreshCw } from 'lucide-react';

export function ErrorCard({ message, onRetry }) {
  return (
    <div className="text-center py-20 px-4 animate-rise">
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-terracotta-light dark:bg-terracotta-light-on-dark flex items-center justify-center">
        <CircleAlert className="w-7 h-7 text-terracotta dark:text-terracotta-on-dark" strokeWidth={1.6} />
      </div>
      <h3 className="font-serif text-2xl text-ink dark:text-ink-on-dark">Something went off-track</h3>
      <p className="text-sm text-ink-soft dark:text-ink-soft-on-dark mt-2 max-w-sm mx-auto">
        {message || 'Could not fetch results. Please try again.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-pill text-sm font-semibold
            bg-sage text-cream hover:bg-sage-deep
            dark:bg-sage-on-dark dark:text-cream-dark dark:hover:bg-sage-deep-on-dark
            shadow-soft dark:shadow-soft-dark
            transition-colors duration-150"
        >
          <RefreshCw className="w-4 h-4" strokeWidth={2} />
          Try again
        </button>
      )}
    </div>
  );
}

export function ErrorNote({ errors }) {
  if (!errors?.length) return null;
  return (
    <div className="px-4 py-2.5 rounded-pill bg-terracotta-light dark:bg-terracotta-light-on-dark border border-terracotta/20 dark:border-terracotta-on-dark/30">
      <p className="text-xs text-terracotta dark:text-terracotta-on-dark font-medium">
        {errors.map((e) => `Couldn't reach ${e.platform}`).join(' · ')}
      </p>
    </div>
  );
}

export default ErrorCard;
