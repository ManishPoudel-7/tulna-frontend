'use client';

import { ShoppingBasket } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import { formatINR } from '@/lib/format';

export default function CartFab() {
  const { count, open, totals } = useCart();
  if (count === 0) return null;

  const cheapest = totals.apps[0];

  return (
    <button
      onClick={open}
      aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
      className="fixed z-40 right-4 sm:right-6 bottom-4 sm:bottom-6
        inline-flex items-center gap-2 pl-3 pr-4 h-14 rounded-pill
        bg-sage text-cream hover:bg-sage-deep
        dark:bg-sage-on-dark dark:text-cream-dark dark:hover:bg-sage-deep-on-dark
        shadow-lift dark:shadow-lift-dark active:scale-[0.97] transition-all duration-150
        animate-rise"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-cream/15">
        <ShoppingBasket className="w-5 h-5" strokeWidth={1.75} />
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full
          bg-terracotta text-cream text-[11px] font-bold leading-[18px] text-center">
          {count}
        </span>
      </span>
      <span className="font-semibold text-[15px] tabular-nums">
        {cheapest ? formatINR(cheapest.total) : 'Cart'}
      </span>
      {cheapest && (
        <span className="text-[11px] opacity-85 hidden sm:inline">on {cheapest.platform}</span>
      )}
    </button>
  );
}
