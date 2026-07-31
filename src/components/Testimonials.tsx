import type { Dictionary } from '@/i18n/config';
import { Reveal } from './ui/Reveal';
import { IconQuote, IconStar } from './ui/Icons';

export function Testimonials({ t }: { t: Dictionary }) {
  return (
    <section className="section-y bg-surface">
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-600">
              {t.testimonials.eyebrow}
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2 className="t-h2 mt-3">{t.testimonials.title}</h2>
          </Reveal>
        </div>

        <ul className="mt-9 grid gap-4 md:grid-cols-3">
          {t.testimonials.items.map((item, i) => (
            <Reveal as="li" key={item.name} index={i}>
              <figure className="flex h-full flex-col rounded-card border border-ink-200/60 bg-canvas p-6 transition-all duration-200 ease-smooth hover:-translate-y-1 hover:bg-surface hover:shadow-lift">
                <IconQuote className="h-6 w-6 text-brand-200" />
                <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-ink-700">
                  {item.quote}
                </blockquote>

                <div className="mt-5 flex gap-0.5" aria-label="5 / 5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <IconStar key={s} className="h-4 w-4 text-amber" />
                  ))}
                </div>

                <figcaption className="mt-4 flex items-center gap-3 border-t border-ink-200/70 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 font-display text-base font-extrabold text-white">
                    {item.initial}
                  </span>
                  <span>
                    <span className="block font-display text-[0.98rem] font-extrabold text-ink-900">
                      {item.name}
                    </span>
                    <span className="block text-[0.86rem] text-ink-400">{item.city}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
