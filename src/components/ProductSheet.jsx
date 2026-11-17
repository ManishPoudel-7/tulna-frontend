import { useEffect, useRef, useCallback } from 'react';
import { X, Sprout } from 'lucide-react';
import StoreRow from '@/components/StoreRow';
import { unitPrice, formatINR } from '@/lib/format';

export default function ProductSheet({ product, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!product) return null;

  const { product: name, quantity, size, unit, image, prices } = product;
  const bestPrice = prices?.[0]?.price;
  const up = bestPrice != null ? unitPrice(bestPrice, size, unit) : null;
  const allSamePrice = prices?.length > 1 && prices.every((p) => p.price === bestPrice);
  const maxPrice = prices?.length > 1 ? Math.max(...prices.map((p) => p.price ?? 0)) : null;
  const savings = maxPrice != null && bestPrice != null ? maxPrice - bestPrice : null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 dark:bg-black/60 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Price comparison for ${name}`}
    >
      <div className="w-full sm:max-w-lg max-h-[88vh] flex flex-col
        bg-cream-soft dark:bg-cream-card-dark
        rounded-t-[28px] sm:rounded-[28px]
        shadow-sheet dark:shadow-sheet-dark
        animate-slide-up sm:animate-fade-in overflow-hidden">

        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-rule dark:bg-rule-dark" />
        </div>

        {/* Header */}
        <div className="p-6 pb-5 border-b border-rule dark:border-rule-dark">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-cream dark:bg-cream-dark ring-1 ring-rule dark:ring-rule-dark flex-shrink-0 overflow-hidden flex items-center justify-center">
              {image ? (
                <img src={image} alt="" className="w-full h-full rounded-full object-cover" loading="lazy" />
              ) : (
                <Sprout className="w-6 h-6 text-ink-faint dark:text-ink-faint-on-dark" strokeWidth={1.4} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-xl leading-tight text-ink dark:text-ink-on-dark">
                {name}
              </h3>
              {quantity && (
                <p className="text-xs uppercase tracking-wide text-ink-faint dark:text-ink-faint-on-dark mt-1">
                  {quantity}
                </p>
              )}
              {up && (
                <p className="text-xs text-ink-soft dark:text-ink-soft-on-dark mt-1.5 tabular-nums">{up}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 -mr-1 rounded-full text-ink-faint hover:text-ink dark:text-ink-faint-on-dark dark:hover:text-ink-on-dark hover:bg-rule/60 dark:hover:bg-rule-dark/60 transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          {savings > 0 && !allSamePrice && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-sage-light dark:bg-sage-light-on-dark">
              <span className="w-1.5 h-1.5 rounded-full bg-sage dark:bg-sage-on-dark" />
              <span className="text-xs font-medium text-sage-deep dark:text-sage-deep-on-dark">
                Save up to {formatINR(savings)} by choosing wisely
              </span>
            </div>
          )}
        </div>

        {/* Store list */}
        <div className="flex-1 overflow-y-auto p-5 pt-6 space-y-3.5">
          {allSamePrice && (
            <p className="text-sm italic text-ink-soft dark:text-ink-soft-on-dark text-center mb-1">
              Same price across every store
            </p>
          )}
          {prices?.map((store, i) => (
            <StoreRow
              key={store.platform}
              store={store}
              isBest={i === 0 && !allSamePrice}
              bestPrice={bestPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
