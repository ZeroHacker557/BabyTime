import type { Config } from 'tailwindcss';

/**
 * Every value here maps to a CSS custom property declared in `src/app/tokens.css`.
 * Components must never hard-code a hex value — change the token, the whole site follows.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'var(--brand-50)',
          100: 'var(--brand-100)',
          200: 'var(--brand-200)',
          400: 'var(--brand-400)',
          500: 'var(--brand-500)',
          600: 'var(--brand-600)',
          700: 'var(--brand-700)',
          900: 'var(--brand-900)',
        },
        ink: {
          900: 'var(--ink-900)',
          700: 'var(--ink-700)',
          600: 'var(--ink-600)',
          400: 'var(--ink-400)',
          200: 'var(--ink-200)',
        },
        surface: 'var(--surface)',
        canvas: 'var(--canvas)',
        amber: {
          DEFAULT: 'var(--warm-accent)',
          soft: 'var(--warm-accent-soft)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        media: 'var(--radius-media)',
        chip: 'var(--radius-chip)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        lift: 'var(--shadow-lift)',
        deep: 'var(--shadow-deep)',
        phone: 'var(--shadow-phone)',
      },
      maxWidth: {
        prose: '65ch',
        shell: '1200px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(4px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        // The photo strip is a much wider track than the partner row, so it needs
        // its own duration. Named for what it drives, not "slow" — at 42s it is
        // actually the faster of the two in pixels per second.
        'marquee-photos': 'marquee 42s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
