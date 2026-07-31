import type { Dictionary, Locale } from '@/i18n/config';
import { Header } from './Header';
import { Footer } from './Footer';
import { IconArrowRight } from './ui/Icons';

type Props = {
  t: Dictionary;
  locale: Locale;
  title: string;
  children: React.ReactNode;
  /** Shows the "not legally reviewed" banner. */
  legal?: boolean;
};

/** Shared frame for the secondary routes: legal pages and contact. */
export function PageShell({ t, locale, title, children, legal = false }: Props) {
  return (
    <>
      <Header t={t} locale={locale} />
      <main id="main" className="bg-surface pb-24 pt-[132px]">
        <div className="shell max-w-3xl">
          <a
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition-colors hover:text-brand-600"
          >
            <IconArrowRight className="h-4 w-4 rotate-180" />
            {t.pages.back}
          </a>

          <h1 className="t-h2 mt-6">{title}</h1>

          {legal && (
            <p className="mt-8 rounded-card border-l-4 border-amber bg-amber-soft px-5 py-4 text-[0.95rem] leading-relaxed text-ink-700">
              {t.pages.legalNotice}
            </p>
          )}

          <div className="mt-10 space-y-6 text-[1.02rem] leading-relaxed text-ink-600 [&_h2]:pt-4 [&_h2]:font-display [&_h2]:text-[1.3rem] [&_h2]:font-extrabold [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
            {children}
          </div>
        </div>
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
