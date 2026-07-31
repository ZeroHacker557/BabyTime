import type { Dictionary, Locale } from '@/i18n/config';
import { Reveal } from './ui/Reveal';
import { IconArrowRight, IconCheck } from './ui/Icons';

/** The one deliberately dark band on the page — it separates B2C from B2B at a glance. */
export function ForKindergartens({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section id="partners" className="scroll-mt-24 bg-surface py-7 md:py-10">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-900 px-6 py-10 text-white md:px-12 md:py-14">
          {/* texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden>
            <svg width="100%" height="100%">
              <defs>
                <pattern id="partnerDots" width="26" height="26" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1.5" fill="#ffffff" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#partnerDots)" />
            </svg>
          </div>
          <div
            className="blob pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-500/40"
            aria-hidden
          />

          <div className="relative grid gap-9 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <Reveal>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-400">
                  {t.partners.eyebrow}
                </p>
              </Reveal>
              <Reveal index={1}>
                <h2 className="t-h2 mt-3 text-white">{t.partners.title}</h2>
              </Reveal>
              <Reveal index={2}>
                <p className="t-lead mt-4 max-w-prose text-white/70">{t.partners.body}</p>
              </Reveal>
              <Reveal index={3}>
                <a
                  href={`/${locale}/contact`}
                  className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3 font-bold text-white transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-brand-900 active:translate-y-0 active:scale-[0.98]"
                >
                  {t.partners.cta}
                  <IconArrowRight className="h-4 w-4" />
                </a>
              </Reveal>
            </div>

            <ul className="space-y-3">
              {t.partners.points.map((point, i) => (
                <Reveal as="li" key={point.title} index={i + 2}>
                  <div className="flex gap-4 rounded-card bg-white/[0.06] p-4 backdrop-blur-sm transition-colors duration-200 hover:bg-white/[0.1]">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500">
                      <IconCheck className="h-4 w-4 text-white" strokeWidth={3} />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.05rem] font-extrabold text-white">
                        {point.title}
                      </h3>
                      <p className="mt-1 text-[0.96rem] leading-relaxed text-white/65">{point.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
