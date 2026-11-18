import { ExternalLink, Zap } from 'lucide-react';
import { formatINR, discountPct } from '@/lib/format';

const BRAND_BAR = {
  blinkit:  'bg-[#F8CB46]',
  zepto:    'bg-[#5B1E9E]',
  instamart:'bg-[#FC8019]',
  bigbasket:'bg-[#84C225]',
  dmart:    'bg-[#1B4F9A]',
  jiomart:  'bg-[#00318D]',
  flipkart: 'bg-[#2874F0]',
};

export default function StoreRow({ store, isBest, bestPrice }) {
  const { platform, icon, price, mrp, delivery, url } = store;
  const pct = discountPct(price, mrp);
  const diff = !isBest && bestPrice != null && price != null ? price - bestPrice : null;

  return (
    <div
      className={`relative flex items-center justify-between gap-3 p-4 rounded-2xl
        ${isBest
          ? 'bg-sage-light dark:bg-sage-light-on-dark ring-1 ring-sage/30 dark:ring-sage-on-dark/30'
          : 'bg-cream dark:bg-cream-dark border border-rule dark:border-rule-dark'}
        transition-colors duration-150`}
    >
      {isBest && (
        <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]
          bg-sage text-cream dark:bg-sage-on-dark dark:text-cream-dark rounded-pill">
          Best price
        </span>
      )}

      <div className="flex items-center gap-3 min-w-0">
        {icon ? (
          <img
            src={icon}
            alt=""
            className="w-11 h-11 rounded-full object-contain bg-white p-1.5 ring-1 ring-rule dark:ring-rule-dark flex-shrink-0"
            loading="lazy"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-rule dark:bg-rule-dark flex-shrink-0" />
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink dark:text-ink-on-dark truncate">
            {platform}
          </p>
          {delivery && delivery !== 'NA' && (
            <p className="flex items-center gap-1 text-xs text-ink-soft dark:text-ink-soft-on-dark mt-0.5">
              <Zap className="w-3 h-3" strokeWidth={2} />
              {delivery}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right">
          <p className="text-[19px] font-bold tabular-nums text-ink dark:text-ink-on-dark leading-none">
            {formatINR(price) || '—'}
          </p>
          <div className="flex items-center gap-1.5 justify-end mt-1">
            {mrp != null && mrp > (price || 0) && (
              <span className="text-xs text-ink-faint dark:text-ink-faint-on-dark line-through tabular-nums">
                {formatINR(mrp)}
              </span>
            )}
            {pct && (
              <span className="text-xs font-semibold text-terracotta dark:text-terracotta-on-dark">{pct}% off</span>
            )}
            {diff != null && diff > 0 && (
              <span className="text-xs text-ink-faint dark:text-ink-faint-on-dark">
                +{formatINR(diff)}
              </span>
            )}
          </div>
        </div>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center w-10 h-10 rounded-full
              ${isBest
                ? 'bg-sage text-cream hover:bg-sage-deep dark:bg-sage-on-dark dark:text-cream-dark dark:hover:bg-sage-deep-on-dark'
                : 'bg-cream-soft text-ink border border-rule hover:border-sage hover:text-sage dark:bg-cream-card-dark dark:text-ink-on-dark dark:border-rule-dark dark:hover:border-sage-on-dark dark:hover:text-sage-on-dark'}
              transition-colors duration-150 active:scale-95`}
            aria-label={`Buy on ${platform}`}
          >
            <ExternalLink className="w-4 h-4" strokeWidth={2} />
          </a>
        )}
      </div>
    </div>
  );
}
