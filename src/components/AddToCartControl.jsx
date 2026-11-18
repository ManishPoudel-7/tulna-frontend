'use client';

import { Plus, Minus, Trash2, Check } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import { cartItemId } from '@/lib/cart';

// Reusable add/qty control. Pass `product` (full shape used in results).
// `variant`: 'icon' (compact, used on ProductCard) or 'bar' (big, used in ProductSheet footer).
export default function AddToCartControl({ product, variant = 'icon' }) {
  const { items, addProduct, setQty } = useCart();
  const id = cartItemId(product);
  const inCart = items.find((x) => x.id === id);

  const stop = (e) => { e.stopPropagation(); e.preventDefault(); };

  if (variant === 'bar') {
    if (!inCart) {
      return (
        <button
          onClick={(e) => { stop(e); addProduct(product); }}
          className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-pill
            bg-sage text-cream hover:bg-sage-deep
            dark:bg-sage-on-dark dark:text-cream-dark dark:hover:bg-sage-deep-on-dark
            shadow-soft dark:shadow-soft-dark font-semibold text-sm active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Add to basket
        </button>
      );
    }
    return (
      <div className="w-full flex items-center justify-between h-12 pl-4 pr-1 rounded-pill
        bg-sage-light dark:bg-sage-light-on-dark ring-1 ring-sage/30 dark:ring-sage-on-dark/30">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-sage-deep dark:text-sage-deep-on-dark">
          <Check className="w-4 h-4" strokeWidth={2.25} />
          In basket
        </span>
        <div className="inline-flex items-center gap-1 bg-cream-soft dark:bg-cream-card-dark rounded-pill p-0.5">
          <button onClick={(e) => { stop(e); setQty(id, inCart.cartQty - 1); }} aria-label="Decrease" className="w-8 h-8 rounded-full inline-flex items-center justify-center text-ink dark:text-ink-on-dark hover:bg-rule/60 dark:hover:bg-rule-dark/60">
            {inCart.cartQty === 1 ? <Trash2 className="w-4 h-4 text-terracotta" strokeWidth={2} /> : <Minus className="w-4 h-4" strokeWidth={2.25} />}
          </button>
          <span className="w-7 text-center text-sm font-bold tabular-nums">{inCart.cartQty}</span>
          <button onClick={(e) => { stop(e); setQty(id, inCart.cartQty + 1); }} aria-label="Increase" className="w-8 h-8 rounded-full inline-flex items-center justify-center bg-sage text-cream dark:bg-sage-on-dark dark:text-cream-dark hover:bg-sage-deep dark:hover:bg-sage-deep-on-dark">
            <Plus className="w-4 h-4" strokeWidth={2.25} />
          </button>
        </div>
      </div>
    );
  }

  // Icon variant for product cards
  if (!inCart) {
    return (
      <button
        onClick={(e) => { stop(e); addProduct(product); }}
        aria-label="Add to basket"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full
          bg-sage text-cream hover:bg-sage-deep
          dark:bg-sage-on-dark dark:text-cream-dark dark:hover:bg-sage-deep-on-dark
          shadow-soft dark:shadow-soft-dark active:scale-90 transition-all"
      >
        <Plus className="w-4.5 h-4.5" strokeWidth={2.5} />
      </button>
    );
  }
  return (
    <div className="inline-flex items-center gap-0.5 bg-sage-light dark:bg-sage-light-on-dark ring-1 ring-sage/30 dark:ring-sage-on-dark/30 rounded-pill p-0.5">
      <button onClick={(e) => { stop(e); setQty(id, inCart.cartQty - 1); }} aria-label="Decrease" className="w-7 h-7 rounded-full inline-flex items-center justify-center text-sage-deep dark:text-sage-deep-on-dark hover:bg-sage/15">
        {inCart.cartQty === 1 ? <Trash2 className="w-3.5 h-3.5 text-terracotta" strokeWidth={2} /> : <Minus className="w-3.5 h-3.5" strokeWidth={2.25} />}
      </button>
      <span className="w-6 text-center text-xs font-bold tabular-nums text-sage-deep dark:text-sage-deep-on-dark">{inCart.cartQty}</span>
      <button onClick={(e) => { stop(e); setQty(id, inCart.cartQty + 1); }} aria-label="Increase" className="w-7 h-7 rounded-full inline-flex items-center justify-center bg-sage text-cream dark:bg-sage-on-dark dark:text-cream-dark hover:bg-sage-deep dark:hover:bg-sage-deep-on-dark">
        <Plus className="w-3.5 h-3.5" strokeWidth={2.25} />
      </button>
    </div>
  );
}
