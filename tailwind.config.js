/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'media',
  theme: {
    extend: {
      screens: { xs: '400px' },
      colors: {
        // Modern Organic palette
        cream: {
          DEFAULT: '#F4EFE6',
          soft: '#FBF8F2',
          dark: '#1A1F1C',
          'card-dark': '#232B25',
        },
        rule: {
          DEFAULT: '#E3DCCE',
          dark: '#2E362F',
        },
        ink: {
          DEFAULT: '#2B3A2E',
          soft: '#7B8A78',
          faint: '#A8B1A5',
          'on-dark': '#EFEBE1',
          'soft-on-dark': '#A8B1A5',
          'faint-on-dark': '#6F7A6E',
        },
        sage: {
          DEFAULT: '#6B8E4E',
          deep: '#577540',
          light: '#E8EFDF',
          'on-dark': '#9FBE7F',
          'deep-on-dark': '#B4CF99',
          'light-on-dark': '#2F3B29',
        },
        terracotta: {
          DEFAULT: '#C3663A',
          light: '#F3E4DA',
          'on-dark': '#E08A61',
          'light-on-dark': '#3B2820',
        },
        // Platform brand dots (used only on tiny indicators)
        platform: {
          blinkit: '#F8CB46',
          zepto: '#5B1E9E',
          instamart: '#FC8019',
          bigbasket: '#84C225',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '760px',
      },
      borderRadius: {
        card: '20px',
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(43,58,46,0.04), 0 2px 8px rgba(43,58,46,0.04)',
        lift: '0 6px 16px rgba(43,58,46,0.08), 0 2px 4px rgba(43,58,46,0.05)',
        sheet: '0 -8px 32px rgba(43,58,46,0.12)',
        'soft-dark': '0 1px 2px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.3)',
        'lift-dark': '0 6px 16px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
        'sheet-dark': '0 -8px 32px rgba(0,0,0,0.5)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'rise': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s ease-in-out infinite',
        'slide-up': 'slide-up 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-in': 'fade-in 0.2s ease-out',
        'rise': 'rise 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
