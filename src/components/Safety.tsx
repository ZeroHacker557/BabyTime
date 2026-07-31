import Image from 'next/image';
import type { Dictionary } from '@/i18n/config';
import { Reveal } from './ui/Reveal';
import { IconCheck, IconShieldCheck } from './ui/Icons';

export function Safety({ t }: { t: Dictionary }) {
  return (
    <section className="bg-surface py-7 md:py-10">
      <div className="shell">
        <div className="overflow-hidden rounded-[2rem] bg-brand-50 px-6 py-10 md:px-12 md:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Reveal>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-600">
                  {t.safety.eyebrow}
                </p>
              </Reveal>
              <Reveal index={1}>
                <h2 className="t-h2 mt-3">{t.safety.title}</h2>
              </Reveal>
              <Reveal index={2}>
                <p className="t-lead mt-4 max-w-prose text-ink-600">{t.safety.body}</p>
              </Reveal>

              <ul className="mt-7 space-y-4">
                {t.safety.points.map((point, i) => (
                  <Reveal as="li" key={point.title} index={i + 3}>
                    <div className="flex gap-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500">
                        <IconCheck className="h-4 w-4 text-white" strokeWidth={3} />
                      </span>
                      <div>
                        <h3 className="font-display text-[1.05rem] font-extrabold text-ink-900">
                          {point.title}
                        </h3>
                        <p className="mt-1 max-w-prose text-[0.98rem] leading-relaxed text-ink-600">
                          {point.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal index={2} className="relative mx-auto w-full max-w-[20rem]">
              <div className="relative overflow-hidden rounded-3xl shadow-deep">
                <Image
                  src="/mascot/safety.png"
                  alt="Baby Time safety mascot with shield"
                  width={1024}
                  height={1536}
                  className="h-auto w-full"
                />
              </div>

              <div className="absolute -bottom-5 -left-4 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-lift md:-left-8">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500">
                  <IconShieldCheck className="h-5 w-5 text-white" strokeWidth={2.4} />
                </span>
                <span className="font-display text-[0.95rem] font-extrabold text-ink-900">
                  {t.safety.badge}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
