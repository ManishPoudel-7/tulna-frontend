'use client';

import { useEffect, useRef, useCallback } from 'react';
import { X, Minus, Plus, Trash2, ExternalLink, Sprout, ShoppingBasket } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import { formatINR } from '@/lib/format';

export default function CartSheet() {
  const { isOpen, close, items, setQty, remove, totals, clear } = useCart();
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const onKey = useCallback((e) => { if (e.key === 'Escape') close(); }, [close]);
  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onKey]);

  if (!isOpen) return null;

  const empty = items.length === 0;
  const best = totals.apps[0];

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) close(); }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 dark:bg-black/60 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Your cart"
    >
      <div className="w-full sm:max-w-xl max-h-[90vh] flex flex-col
        bg-cream-soft dark:bg-cream-card-dark
        rounded-t-[28px] sm:rounded-[28px]
        shadow-sheet dark:shadow-sheet-dark
        animate-slide-up sm:animate-fade-in overflow-hidden">

        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-rule dark:bg-rule-dark" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-rule dark:border-rule-dark">
          <div>
            <h3 className="font-serif text-2xl leading-tight text-ink dark:text-ink-on-dark">Your basket</h3>
            <p className="text-xs text-ink-soft dark:text-ink-soft-on-dark mt-0.5">
              {empty ? 'Nothing yet.' : `${items.length} ${items.length === 1 ? 'item' : 'items'}`}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {!empty && (
              <button
                onClick={clear}
                className="px-3 py-1.5 rounded-pill text-xs font-medium text-ink-soft dark:text-ink-soft-on-dark hover:text-terracotta dark:hover:text-terracotta-on-dark hover:bg-rule/40 dark:hover:bg-rule-dark/40 transition-colors"
              >
                Clear
              </button>
            )}
            <button
              onClick={close}
              className="p-1.5 rounded-full text-ink-faint hover:text-ink dark:text-ink-faint-on-dark dark:hover:text-ink-on-dark hover:bg-rule/60 dark:hover:bg-rule-dark/60 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {empty ? (
            <div className="text-center px-6 py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream dark:bg-cream-dark border border-rule dark:border-rule-dark flex items-center justify-center">
                <ShoppingBasket className="w-7 h-7 text-ink-faint dark:text-ink-faint-on-dark" strokeWidth={1.5} />
              </div>
              <p className="font-serif text-lg text-ink dark:text-ink-on-dark">Your basket is empty</p>
              <p className="text-sm text-ink-soft dark:text-ink-soft-on-dark mt-1">
                Add items from any search to compare totals.
              </p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="px-5 py-4 space-y-2.5">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center gap-3 p-3 rounded-2xl bg-cream dark:bg-cream-dark border border-rule dark:border-rule-dark">
                    <div className="w-12 h-12 rounded-full bg-cream-soft dark:bg-cream-card-dark ring-1 ring-rule dark:ring-rule-dark flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {it.image ? (
                        <img src={it.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <Sprout className="w-5 h-5 text-ink-faint dark:text-ink-faint-on-dark" strokeWidth={1.5} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink dark:text-ink-on-dark line-clamp-1">{it.product}</p>
                      {it.quantity && (
                        <p className="text-[11px] uppercase tracking-wide text-ink-faint dark:text-ink-faint-on-dark mt-0.5">{it.quantity}</p>
                      )}
                    </div>
                    <div className="inline-flex items-center gap-1 bg-cream-soft dark:bg-cream-card-dark border border-rule dark:border-rule-dark rounded-pill p-0.5">
                      <button onClick={() => setQty(it.id, it.cartQty - 1)} aria-label="Decrease" className="w-7 h-7 rounded-full inline-flex items-center justify-center text-ink dark:text-ink-on-dark hover:bg-rule/50 dark:hover:bg-rule-dark/50">
                        {it.cartQty === 1 ? <Trash2 className="w-3.5 h-3.5 text-terracotta" strokeWidth={2} /> : <Minus className="w-3.5 h-3.5" strokeWidth={2.25} />}
                      </button>
                      <span className="w-6 text-center text-sm font-semibold tabular-nums">{it.cartQty}</span>
                      <button onClick={() => setQty(it.id, it.cartQty + 1)} aria-label="Increase" className="w-7 h-7 rounded-full inline-flex items-center justify-center bg-sage text-cream dark:bg-sage-on-dark dark:text-cream-dark hover:bg-sage-deep dark:hover:bg-sage-deep-on-dark">
                        <Plus className="w-3.5 h-3.5" strokeWidth={2.25} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="px-5 pb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-serif text-lg text-ink dark:text-ink-on-dark">Compare totals</h4>
                  {best && (
                    <span className="text-[11px] uppercase tracking-[0.18em] text-ink-faint dark:text-ink-faint-on-dark">
                      Cheapest · {best.platform}
                    </span>
                  )}
                </div>
                <div className="space-y-2.5">
                  {totals.apps.map((app, i) => (
                    <TotalRow key={app.platform} app={app} isBest={i === 0} />
                  ))}
                </div>
                <p className="text-[11px] text-ink-faint dark:text-ink-faint-on-dark mt-4 text-center">
                  Delivery fees are approximate defaults and may differ in your area.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TotalRow({ app, isBest }) {
  return (
    <div className={`p-3.5 rounded-2xl ${isBest
      ? 'bg-sage-light dark:bg-sage-light-on-dark ring-1 ring-sage/30 dark:ring-sage-on-dark/30'
      : 'bg-cream dark:bg-cream-dark border border-rule dark:border-rule-dark'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink dark:text-ink-on-dark">{app.platform}</p>
          <p className="text-xs text-ink-soft dark:text-ink-soft-on-dark mt-0.5 tabular-nums">
            Subtotal {formatINR(app.subtotal)}
            {app.delivery > 0 ? <> · Delivery {formatINR(app.delivery)}</> : <> · Free delivery</>}
          </p>
          {app.missing.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="text-[11px] text-terracotta dark:text-terracotta-on-dark font-medium">
                Missing {app.missing.length}:
              </span>
              {app.missing.slice(0, 3).map((m) => (
                <span key={m} className="text-[11px] px-2 py-0.5 rounded-pill bg-terracotta-light dark:bg-terracotta-light-on-dark text-terracotta dark:text-terracotta-on-dark">
                  {m}
                </span>
              ))}
              {app.missing.length > 3 && (
                <span className="text-[11px] text-ink-faint dark:text-ink-faint-on-dark">+{app.missing.length - 3}</span>
              )}
            </div>
          )}
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-bold tabular-nums text-ink dark:text-ink-on-dark leading-none">
            {formatINR(app.total)}
          </p>
          {isBest && (
            <p className="text-[10px] uppercase tracking-[0.18em] text-sage-deep dark:text-sage-deep-on-dark font-semibold mt-1">
              Best total
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
