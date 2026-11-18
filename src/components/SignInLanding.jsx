'use client';

import { signIn } from 'next-auth/react';
import { Sprout, ShieldCheck } from 'lucide-react';
import Logo from '@/components/Logo';

export default function SignInLanding() {
  return (
    <div className="max-w-md mx-auto px-6 pt-16 sm:pt-24 pb-24 text-center animate-rise">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-light dark:bg-sage-light-on-dark flex items-center justify-center">
        <Sprout className="w-7 h-7 text-sage dark:text-sage-on-dark" strokeWidth={1.4} />
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl leading-tight text-ink dark:text-ink-on-dark">
        Welcome to <span className="italic text-sage dark:text-sage-on-dark">tulna</span>
      </h1>
      <p className="text-sm text-ink-soft dark:text-ink-soft-on-dark mt-3 max-w-sm mx-auto">
        One quiet search across Blinkit, Zepto, Instamart, BigBasket, DMart, JioMart and Flipkart Minutes.
        Sign in to compare prices and build a basket.
      </p>

      <button
        onClick={() => signIn('google')}
        className="mt-8 inline-flex items-center justify-center gap-3 h-12 px-6 rounded-pill
          bg-sage text-cream hover:bg-sage-deep
          dark:bg-sage-on-dark dark:text-cream-dark dark:hover:bg-sage-deep-on-dark
          shadow-lift dark:shadow-lift-dark font-semibold text-[15px]
          active:scale-[0.98] transition-all duration-150"
      >
        <GoogleG />
        Continue with Google
      </button>

      <p className="flex items-center justify-center gap-1.5 text-[11px] text-ink-faint dark:text-ink-faint-on-dark mt-6">
        <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.75} />
        We only use your name and email.
      </p>

      <div className="mt-16 flex items-center justify-center gap-2 opacity-60">
        <Logo size={20} />
        <span className="font-serif text-sm italic text-ink-soft dark:text-ink-soft-on-dark">tulna</span>
      </div>
    </div>
  );
}

// Small Google G mark, inline SVG so no extra dependency.
function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.4 6.5 29.5 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5c11.3 0 20.5-9.2 20.5-20.5 0-1.5-.2-3-.4-4.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8c1.8-4.3 6-7.3 10.9-7.3 3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.4 6.5 29.5 4.5 24 4.5 16.3 4.5 9.6 8.9 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 45.5c5.4 0 10.3-2.1 14-5.4l-6.5-5.5c-2 1.4-4.5 2.2-7.5 2.2-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.5 41 16.2 45.5 24 45.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.5 5.5c-.5.5 7-5.1 7-15.1 0-1.5-.2-3-.4-4.5z"/>
    </svg>
  );
}
