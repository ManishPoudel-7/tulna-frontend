const DOTS = {
  blinkit: '#F8CB46',
  zepto: '#5B1E9E',
  instamart: '#FC8019',
  'swiggy instamart': '#FC8019',
  bigbasket: '#84C225',
  dmart: '#1B4F9A',
  jiomart: '#00318D',
  flipkart: '#2874F0',
};

export default function PlatformBadge({ platform, icon, size = 'sm' }) {
  const dot = DOTS[(platform || '').toLowerCase()] || '#A8B1A5';
  const isSmall = size === 'sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill font-medium
        bg-cream dark:bg-cream-dark border border-rule dark:border-rule-dark
        text-ink dark:text-ink-on-dark
        ${isSmall ? 'pl-1 pr-2.5 py-0.5 text-xs' : 'pl-1.5 pr-3 py-1 text-sm'}`}
    >
      {icon ? (
        <img
          src={icon}
          alt=""
          className={`rounded-full object-contain bg-white ${isSmall ? 'w-4 h-4' : 'w-5 h-5'}`}
          loading="lazy"
        />
      ) : (
        <span
          className={`rounded-full ${isSmall ? 'w-2.5 h-2.5' : 'w-3 h-3'}`}
          style={{ backgroundColor: dot }}
        />
      )}
      {platform}
    </span>
  );
}

// A circular stacked logo chip, used in product-card footers.
export function PlatformDisc({ platform, icon, size = 24 }) {
  const dot = DOTS[(platform || '').toLowerCase()] || '#A8B1A5';
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-white ring-2 ring-cream-soft dark:ring-cream-card-dark shadow-soft overflow-hidden"
      style={{ width: size, height: size }}
      title={platform}
    >
      {icon ? (
        <img
          src={icon}
          alt={platform}
          className="w-full h-full rounded-full object-contain p-[2px]"
          loading="lazy"
        />
      ) : (
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dot }} />
      )}
    </span>
  );
}
