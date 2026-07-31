'use client';

import { site } from '@/lib/site';
import type { Dictionary } from '@/i18n/config';

/**
 * ⚠️ TRADEMARK — READ BEFORE LAUNCH ⚠️
 *
 * Apple and Google both require their *official*, unmodified badge artwork.
 * The badges below are correctly proportioned stand-ins so the layout is real,
 * but they are NOT the official assets.
 *
 * TODO before launch — download the official SVGs and swap them in here:
 *   App Store    → https://developer.apple.com/app-store/marketing/guidelines/
 *   Google Play  → https://play.google.com/intl/en_us/badges/
 * Drop them in /public/badges/ and replace the two <svg> blocks with <Image>.
 * Never recolour, stretch, outline or redraw the official badges.
 */

type Props = {
  t: Dictionary['store'];
  /** `dark` = black badge on light backgrounds, `light` = white badge on the green band. */
  variant?: 'dark' | 'light';
  className?: string;
};

// min-w matches the two badges to each other so they stay visually paired when
// they wrap onto separate rows at 360px.
const badgeBase =
  'inline-flex items-center gap-2.5 rounded-[12px] px-4 py-2.5 transition duration-200 ease-smooth hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] min-h-[52px] min-w-[172px]';

export function StoreBadges({ t, variant = 'dark', className = '' }: Props) {
  const skin =
    variant === 'dark'
      ? 'bg-ink-900 text-white shadow-soft hover:shadow-lift'
      : 'bg-white text-ink-900 shadow-soft hover:shadow-lift';

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={site.appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${badgeBase} ${skin}`}
        aria-label={`${t.appStoreSmall} ${t.appStoreBig}`}
      >
        <AppleGlyph />
        <span className="flex flex-col items-start leading-none">
          <span className="text-[0.6rem] font-medium uppercase tracking-wider opacity-80">
            {t.appStoreSmall}
          </span>
          <span className="mt-1 text-[1.05rem] font-semibold leading-none">{t.appStoreBig}</span>
        </span>
      </a>

      <a
        href={site.playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${badgeBase} ${skin}`}
        aria-label={`${t.playSmall} ${t.playBig}`}
      >
        <PlayGlyph />
        <span className="flex flex-col items-start leading-none">
          <span className="text-[0.6rem] font-medium uppercase tracking-wider opacity-80">
            {t.playSmall}
          </span>
          <span className="mt-1 text-[1.05rem] font-semibold leading-none">{t.playBig}</span>
        </span>
      </a>
    </div>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-7 w-7 shrink-0">
      <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.15-2.8.85-3.5.85-.7 0-1.85-.83-3-.8-1.55.02-3 .9-3.8 2.28-1.6 2.8-.4 6.95 1.15 9.2.76 1.1 1.67 2.35 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.78.74 3 .72 1.24-.02 2.02-1.13 2.78-2.24.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.67ZM14.1 5.9c.63-.77 1.06-1.83.94-2.9-.9.04-2 .6-2.66 1.36-.58.68-1.1 1.77-.96 2.81 1.01.08 2.04-.51 2.68-1.27Z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6 shrink-0">
      <path d="M3.7 2.5c-.3.3-.45.75-.45 1.35v16.3c0 .6.15 1.05.45 1.35l.1.08 9.13-9.13v-.2L3.8 2.42l-.1.08Z" fill="#00C3FF" />
      <path d="m16 15.5-3.07-3.05v-.2L16 9.2l.1.06 3.63 2.06c1.04.59 1.04 1.55 0 2.14L16.1 15.5l-.1.02Z" fill="#FFCE00" />
      <path d="M16.1 15.48 12.93 12.3 3.7 21.5c.34.36.9.4 1.55.05l10.85-6.07Z" fill="#FF3A44" />
      <path d="M16.1 8.52 5.25 2.45C4.6 2.1 4.04 2.14 3.7 2.5l9.23 9.2 3.17-3.18Z" fill="#00E676" />
    </svg>
  );
}
