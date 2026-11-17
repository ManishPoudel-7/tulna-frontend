import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Navigation, X, Loader2 } from 'lucide-react';

export default function LocationPicker({
  isOpen, onClose, onSelect, geoLoading, geoError, onRequestGeo, currentLocation,
}) {
  const [pincode, setPincode] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const overlayRef = useRef(null);
  const firstFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      firstFocusRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && currentLocation) onClose();
  }, [onClose, currentLocation]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current && currentLocation) onClose();
  };

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    const p = pincode.trim();
    if (!/^\d{6}$/.test(p)) {
      setPincodeError('Enter a valid 6-digit pincode');
      return;
    }
    setPincodeError('');
    onSelect({ pincode: p, label: p });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 dark:bg-black/60 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Set your delivery location"
    >
      <div className="w-full sm:max-w-md bg-cream-soft dark:bg-cream-card-dark rounded-t-[28px] sm:rounded-[28px] shadow-sheet dark:shadow-sheet-dark animate-slide-up sm:animate-fade-in overflow-hidden">
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-rule dark:bg-rule-dark" />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="font-serif text-2xl leading-tight text-ink dark:text-ink-on-dark">
                Where to deliver
              </h2>
              <p className="text-sm text-ink-soft dark:text-ink-soft-on-dark mt-1">
                Prices and stock depend on where you are.
              </p>
            </div>
            {currentLocation && (
              <button
                onClick={onClose}
                className="p-1.5 -mr-1 -mt-1 rounded-full text-ink-faint hover:text-ink dark:text-ink-faint-on-dark dark:hover:text-ink-on-dark hover:bg-rule/60 dark:hover:bg-rule-dark/60 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            )}
          </div>

          <button
            ref={firstFocusRef}
            onClick={onRequestGeo}
            disabled={geoLoading}
            className="w-full flex items-center gap-3 p-4 rounded-2xl
              bg-sage-light dark:bg-sage-light-on-dark
              border border-sage/20 dark:border-sage-on-dark/30
              hover:bg-sage/15 dark:hover:bg-sage-on-dark/15
              text-sage-deep dark:text-sage-deep-on-dark
              disabled:opacity-60 transition-all duration-200"
          >
            <span className="w-10 h-10 rounded-full bg-sage dark:bg-sage-on-dark text-cream dark:text-cream-dark flex items-center justify-center flex-shrink-0">
              {geoLoading ? <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2} /> : <Navigation className="w-5 h-5" strokeWidth={1.75} />}
            </span>
            <div className="text-left">
              <p className="text-[15px] font-semibold">
                {geoLoading ? 'Finding you...' : 'Use my current location'}
              </p>
              <p className="text-xs opacity-80 mt-0.5">Most accurate results</p>
            </div>
          </button>

          {geoError && (
            <p className="mt-3 text-sm text-terracotta dark:text-terracotta-on-dark bg-terracotta-light dark:bg-terracotta-light-on-dark px-3 py-2 rounded-xl">
              {geoError}
            </p>
          )}

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-rule dark:bg-rule-dark" />
            <span className="text-[11px] font-medium text-ink-faint dark:text-ink-faint-on-dark uppercase tracking-[0.18em]">or</span>
            <div className="flex-1 h-px bg-rule dark:bg-rule-dark" />
          </div>

          <form onSubmit={handlePincodeSubmit}>
            <label className="block text-sm font-medium text-ink-soft dark:text-ink-soft-on-dark mb-2">
              Enter pincode
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint dark:text-ink-faint-on-dark" strokeWidth={1.75} />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setPincode(v);
                    setPincodeError('');
                  }}
                  placeholder="e.g. 110019"
                  className="w-full h-12 pl-10 pr-3 rounded-pill
                    bg-cream dark:bg-cream-dark
                    border border-rule dark:border-rule-dark
                    text-ink dark:text-ink-on-dark
                    placeholder:text-ink-faint dark:placeholder:text-ink-faint-on-dark
                    focus:border-sage dark:focus:border-sage-on-dark
                    outline-none transition-all duration-200 text-[15px] tabular-nums"
                />
              </div>
              <button
                type="submit"
                disabled={pincode.length !== 6}
                className="px-5 h-12 rounded-pill text-sm font-semibold
                  bg-sage text-cream hover:bg-sage-deep
                  dark:bg-sage-on-dark dark:text-cream-dark dark:hover:bg-sage-deep-on-dark
                  disabled:opacity-40 disabled:cursor-not-allowed
                  shadow-soft dark:shadow-soft-dark
                  transition-colors duration-150"
              >
                Save
              </button>
            </div>
            {pincodeError && (
              <p className="mt-2 text-sm text-terracotta dark:text-terracotta-on-dark">{pincodeError}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
