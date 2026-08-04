'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Dictionary, Locale } from '@/i18n/config';
import { useStoreUrl } from '@/lib/usePlatform';
import { Logo } from './ui/Logo';
import { LangSwitcher } from './ui/LangSwitcher';
import { IconArrowRight, IconClose, IconMenu } from './ui/Icons';

type Props = {
  t: Dictionary;
  locale: Locale;
};

const sections = ['features', 'how', 'partners', 'faq'] as const;

export function Header({ t, locale }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const storeUrl = useStoreUrl();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-500 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        {t.nav.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth ${
          scrolled
            ? 'border-b border-ink-200/60 bg-white/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-4">
          <a href={`/${locale}`} className="shrink-0" aria-label={t.meta.title}>
            <Logo />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full px-4 py-2 text-[0.95rem] font-semibold text-ink-600 transition-colors duration-200 hover:bg-brand-50 hover:text-ink-900"
              >
                {t.nav[id]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <div className="hidden sm:block">
              <LangSwitcher current={locale} label={t.footer.langLabel} />
            </div>

            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-[0.95rem] font-bold text-white shadow-soft transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lift active:translate-y-0 active:scale-[0.98] md:inline-flex"
            >
              {t.nav.download}
              <IconArrowRight className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t.nav.openMenu}
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-brand-50 lg:hidden"
            >
              <IconMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell flex h-[72px] shrink-0 items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={t.nav.closeMenu}
                className="flex h-11 w-11 items-center justify-center rounded-full text-ink-900 hover:bg-brand-50"
              >
                <IconClose className="h-6 w-6" />
              </button>
            </div>

            <nav className="shell flex flex-1 flex-col gap-1 pt-6" aria-label="Mobile">
              {sections.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[60px] items-center justify-between rounded-2xl px-4 font-display text-[1.5rem] font-extrabold text-ink-900 transition-colors active:bg-brand-50"
                >
                  {t.nav[id]}
                  <IconArrowRight className="h-5 w-5 text-brand-500" />
                </a>
              ))}
            </nav>

            <div className="shell shrink-0 space-y-3 border-t border-ink-200/70 py-5">
              <LangSwitcher current={locale} label={t.footer.langLabel} align="left" />
              <a
                href={storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-[1.05rem] font-bold text-white shadow-lift"
              >
                {t.nav.download}
                <IconArrowRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
