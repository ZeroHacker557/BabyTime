'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Dictionary } from '@/i18n/config';
import { Reveal } from './ui/Reveal';

export function HowItWorks({ t }: { t: Dictionary }) {
  const reduced = useReducedMotion();

  return (
    <section id="how" className="section-y relative scroll-mt-24 overflow-hidden bg-canvas">
      <div className="shell relative">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-600">{t.how.eyebrow}</p>
          </Reveal>
          <Reveal index={1}>
            <h2 className="t-h2 mt-3">{t.how.title}</h2>
          </Reveal>
          <Reveal index={2}>
            <p className="t-lead mt-4 max-w-prose text-ink-600">{t.how.subtitle}</p>
          </Reveal>
        </div>

        <div className="relative mt-10">
          {/* The dashed connector. Sits at the vertical centre of the numbered
              circles (24px down), and the circles paint over it because the <ol>
              comes later in the DOM. */}
          <svg
            className="pointer-events-none absolute left-0 right-0 top-2 hidden h-8 w-full text-brand-400 md:block"
            viewBox="0 0 1000 32"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.path
              d="M60 16 C220 2 380 28 500 15 C620 2 800 28 940 14"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="10 12"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {t.how.steps.map((step, i) => (
              <Reveal as="li" key={step.title} index={i} className="relative">
                {/* Ghosted numeral, parked top-right so it never sits under the
                    copy — the text column is capped below to keep them apart. */}
                <span
                  className="pointer-events-none absolute -top-8 right-0 z-0 select-none font-display text-[4.5rem] font-extrabold leading-none text-brand-100 md:text-[5.5rem]"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 font-display text-lg font-extrabold text-white shadow-[0_12px_28px_-12px_rgba(46,90,20,0.8)]">
                    {i + 1}
                  </span>
                  <h3 className="t-h3 mt-5">{step.title}</h3>
                  <p className="t-body mt-2 text-ink-600">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
