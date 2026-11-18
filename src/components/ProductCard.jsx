'use client';

import { Sprout } from 'lucide-react';
import { PlatformDisc } from '@/components/PlatformBadge';
import AddToCartControl from '@/components/AddToCartControl';
import { formatINR, unitPrice, discountPct } from '@/lib/format';

export default function ProductCard({ product, onSelect }) {
  const { product: name, quantity, size, unit, image, prices } = product;
  const best = prices?.[0];
  const storeCount = prices?.length || 0;
  const up = best ? unitPrice(best.price, size, unit) : null;
  const pct = best ? discountPct(best.price, best.mrp) : null;
  const multi = storeCount > 1;

  const open = () => onSelect(product);
  const onKey = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={onKey}
      className="w-full text-left cursor-pointer bg-cream-soft dark:bg-cream-card-dark
        rounded-card border border-rule dark:border-rule-dark
        shadow-soft dark:shadow-soft-dark
        hover:shadow-lift dark:hover:shadow-lift-dark
        hover:-translate-y-0.5 hover:border-sage/30 dark:hover:border-sage-on-dark/30
        transition-all duration-200 group overflow-hidden"
    >
      <div className="p-5 flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-cream dark:bg-cream-dark ring-1 ring-rule dark:ring-rule-dark
          flex-shrink-0 overflow-hidden flex items-center justify-center">
          {image ? (
            <img src={image} alt="" className="w-full h-full rounded-full object-cover" loading="lazy" />
          ) : (
            <Sprout className="w-8 h-8 text-ink-faint dark:text-ink-faint-on-dark" strokeWidth={1.4} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-[18px] leading-tight text-ink dark:text-ink-on-dark line-clamp-2">
            {name}
          </h3>
          {quantity && (
            <p className="text-xs text-ink-faint dark:text-ink-faint-on-dark mt-1 uppercase tracking-wide">{quantity}</p>
          )}

          {best && (
            <div className="mt-2 flex items-baseline gap-2 flex-wrap">
              <span className="text-[22px] font-bold tabular-nums text-ink dark:text-ink-on-dark leading-none">
                {formatINR(best.price)}
              </span>
              {best.mrp != null && best.mrp > (best.price || 0) && (
                <span className="text-sm text-ink-faint dark:text-ink-faint-on-dark line-through tabular-nums">
                  {formatINR(best.mrp)}
                </span>
              )}
              {pct && (
                <span className="text-[11px] font-semibold text-terracotta dark:text-terracotta-on-dark bg-terracotta-light dark:bg-terracotta-light-on-dark px-2 py-0.5 rounded-pill">
                  {pct}% off
                </span>
              )}
            </div>
          )}

          {up && (
            <p className="text-xs text-ink-soft dark:text-ink-soft-on-dark mt-1.5 tabular-nums">{up}</p>
          )}
        </div>

        <div className="flex-shrink-0 self-start pt-1">
          <AddToCartControl product={product} variant="icon" />
        </div>
      </div>

      <div className="px-5 py-3 border-t border-rule/70 dark:border-rule-dark/70
        bg-cream/40 dark:bg-cream-dark/40 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {multi ? (
            <>
              <div className="flex -space-x-1.5">
                {prices.slice(0, 4).map((p) => (
                  <PlatformDisc key={p.platform} platform={p.platform} icon={p.icon} size={22} />
                ))}
              </div>
              <span className="text-xs text-ink-soft dark:text-ink-soft-on-dark">
                Available on <span className="font-semibold text-ink dark:text-ink-on-dark">{storeCount}</span> stores
              </span>
            </>
          ) : (
            <span className="text-xs text-ink-soft dark:text-ink-soft-on-dark inline-flex items-center gap-2">
              <PlatformDisc platform={best?.platform} icon={best?.icon} size={22} />
              {best?.platform}
              {best?.delivery && best.delivery !== 'NA' && (
                <span className="text-ink-faint dark:text-ink-faint-on-dark">· {best.delivery}</span>
              )}
            </span>
          )}
        </div>
        {multi && (
          <span className="text-xs font-semibold text-sage dark:text-sage-on-dark whitespace-nowrap">
            Compare prices
            <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        )}
      </div>
    </div>
  );
}
