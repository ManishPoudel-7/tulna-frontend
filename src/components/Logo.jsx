// Small sprig mark — two leaves on a stem, drawn on a soft disc.
// Used as the brand mark in the header and inside the search button.
export default function Logo({ size = 24, variant = 'solid', className = '' }) {
  const s = size;
  const stroke = variant === 'outline' ? 'currentColor' : '#F4EFE6';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full ${
        variant === 'outline' ? '' : 'bg-sage text-cream dark:bg-sage-on-dark'
      } ${className}`}
      style={{ width: s, height: s }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        width={s * 0.62}
        height={s * 0.62}
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21V8" />
        <path d="M12 12c0-3 2.4-5.5 6-6-.3 3.6-2.8 6-6 6z" />
        <path d="M12 15c0-2.5-2-4.5-5-5 .2 3 2.5 5 5 5z" />
      </svg>
    </span>
  );
}
