'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { locales, localeNames, localeShortNames, type Locale } from '@/i18n/config';
import { IconChevronDown, IconGlobe } from './Icons';

type Props = {
  current: Locale;
  label: string;
  inverted?: boolean;
  /**
   * Which side the dropdown hangs from. In the desktop toolbar the trigger sits
   * at the right edge of the header, so the menu grows leftward off `right-0`.
   * In the mobile sheet the trigger sits at the LEFT edge of a full-width block —
   * anchoring `right-0` there put the menu almost entirely off-screen to the
   * left, since a right edge pinned to an 85px-wide button leaves no room for a
   * 176px-wide menu on that side. Pass `align="left"` there so it grows rightward
   * instead, where the sheet actually has room.
   */
  align?: 'left' | 'right';
};

/** Swaps the first path segment, so the visitor stays on the section they were reading. */
function swapLocale(pathname: string, next: Locale) {
  const parts = pathname.split('/').filter(Boolean);
  parts[0] = next;
  return '/' + parts.join('/');
}

export function LangSwitcher({ current, label, inverted = false, align = 'right' }: Props) {
  const pathname = usePathname() || '/uz';
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    // w-fit, not just "relative": in the mobile sheet this sits as a plain block
    // child of a column-flex container, so without it the div stretches to the
    // sheet's full width and the dropdown's `right-0` anchors to that far edge —
    // floating well past the button instead of hanging under it.
    <div ref={ref} className="relative w-fit">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={label}
        className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
          inverted ? 'text-white/80 hover:text-white' : 'text-ink-600 hover:text-ink-900'
        }`}
      >
        <IconGlobe className="h-4 w-4" />
        {localeShortNames[current]}
        <IconChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-ink-200/70 bg-white p-1.5 shadow-lift ${
            align === 'left' ? 'left-0' : 'right-0'
          }`}
        >
          {locales.map((loc) => (
            <Link
              key={loc}
              href={swapLocale(pathname, loc)}
              role="menuitem"
              hrefLang={loc}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-colors duration-150 ${
                loc === current ? 'bg-brand-50 text-brand-700' : 'text-ink-600 hover:bg-canvas hover:text-ink-900'
              }`}
            >
              {localeNames[loc]}
              <span className="text-xs opacity-60">{localeShortNames[loc]}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
