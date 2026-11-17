'use client';
import { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, LogOut, LogIn } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Logo from '@/components/Logo';

export default function Header({ location, onLocationClick }) {
  const label = location
    ? location.label || (location.pincode ? location.pincode : 'Current location')
    : 'Set location';

  return (
    <header className="sticky top-0 z-30 bg-cream/85 dark:bg-cream-dark/85 backdrop-blur-lg border-b border-rule dark:border-rule-dark">
      <div className="max-w-content mx-auto flex items-center justify-between gap-2 px-3 sm:px-6 h-16">
        <a href="/" className="flex items-center gap-2 group min-w-0" aria-label="Tulna home">
          <Logo size={32} />
          <span className="font-serif text-[22px] sm:text-[26px] leading-none tracking-tight text-ink dark:text-ink-on-dark hidden xs:inline sm:inline">
            <span className="italic text-sage dark:text-sage-on-dark">tulna</span>
          </span>
        </a>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <button
            onClick={onLocationClick}
            className="group inline-flex items-center gap-1.5 pl-2 pr-2.5 py-1.5 rounded-pill
              bg-cream-soft dark:bg-cream-card-dark
              border border-rule dark:border-rule-dark
              text-ink-soft dark:text-ink-soft-on-dark text-[13px] sm:text-sm
              hover:border-sage/50 dark:hover:border-sage-on-dark/50
              hover:text-ink dark:hover:text-ink-on-dark
              transition-colors duration-150"
            aria-label="Change location"
          >
            <MapPin className="w-3.5 h-3.5 text-sage dark:text-sage-on-dark flex-shrink-0" strokeWidth={1.75} />
            <span className="max-w-[80px] sm:max-w-[140px] truncate font-medium tabular-nums">{label}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60 flex-shrink-0" strokeWidth={2} />
          </button>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}

function AuthButton() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  if (status === 'loading') {
    return <span className="w-9 h-9 rounded-full bg-cream-soft dark:bg-cream-card-dark border border-rule dark:border-rule-dark" />;
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn('google')}
        className="inline-flex items-center justify-center gap-1.5 h-9 px-3 sm:px-4 rounded-pill text-[13px] sm:text-sm font-semibold
          bg-sage text-cream hover:bg-sage-deep
          dark:bg-sage-on-dark dark:text-cream-dark dark:hover:bg-sage-deep-on-dark
          shadow-soft dark:shadow-soft-dark transition-colors duration-150 active:scale-[0.97]"
      >
        <LogIn className="w-3.5 h-3.5" strokeWidth={2} />
        <span className="hidden xs:inline">Sign in</span>
      </button>
    );
  }

  const initials = (session.user?.name || session.user?.email || '?')
    .split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center justify-center w-9 h-9 rounded-full overflow-hidden
          bg-cream-soft dark:bg-cream-card-dark ring-1 ring-rule dark:ring-rule-dark
          hover:ring-sage dark:hover:ring-sage-on-dark transition-all"
        aria-label="Account"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {session.user?.image ? (
          <img src={session.user.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <span className="text-xs font-semibold text-ink dark:text-ink-on-dark">{initials}</span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-60 rounded-2xl overflow-hidden
            bg-cream-soft dark:bg-cream-card-dark border border-rule dark:border-rule-dark
            shadow-lift dark:shadow-lift-dark z-40 animate-fade-in"
        >
          <div className="px-4 py-3 border-b border-rule dark:border-rule-dark">
            <p className="text-sm font-semibold text-ink dark:text-ink-on-dark truncate">
              {session.user?.name || 'Signed in'}
            </p>
            {session.user?.email && (
              <p className="text-xs text-ink-soft dark:text-ink-soft-on-dark truncate mt-0.5">
                {session.user.email}
              </p>
            )}
          </div>
          <button
            onClick={() => { setOpen(false); signOut(); }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-ink dark:text-ink-on-dark
              hover:bg-cream dark:hover:bg-cream-dark transition-colors"
            role="menuitem"
          >
            <LogOut className="w-4 h-4 text-ink-soft dark:text-ink-soft-on-dark" strokeWidth={2} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
