import type { Dictionary } from '@/i18n/config';
import { Reveal } from './ui/Reveal';
import { IconBellCheck, IconCalendarClock, IconMapPin, IconShieldCheck } from './ui/Icons';

const icons = [IconMapPin, IconCalendarClock, IconShieldCheck, IconBellCheck];

export function Features({ t }: { t: Dictionary }) {
  return (
    <section id="features" className="section-y scroll-mt-24 bg-surface">
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-600">
              {t.features.eyebrow}
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2 className="t-h2 mt-3">{t.features.title}</h2>
          </Reveal>
          <Reveal index={2}>
            <p className="t-lead mt-4 max-w-prose text-ink-600">{t.features.subtitle}</p>
          </Reveal>
        </div>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={item.title} index={i}>
                <article className="group h-full rounded-card border border-ink-200/60 bg-surface p-6 shadow-soft transition-all duration-200 ease-smooth hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 transition-colors duration-200 ease-smooth group-hover:bg-brand-500">
                    <Icon className="h-6 w-6 text-brand-600 transition-colors duration-200 group-hover:text-white" />
                  </span>
                  <h3 className="t-h3 mt-4">{item.title}</h3>
                  <p className="t-body mt-2 text-ink-600">{item.body}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
