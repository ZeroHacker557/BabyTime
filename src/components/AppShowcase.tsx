'use client';

import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/i18n/config';
import { AppScreen, type ScreenVariant } from './ui/AppScreen';
import { Phone } from './ui/Phone';
import { Reveal } from './ui/Reveal';

const screens: ScreenVariant[] = ['map', 'detail', 'booking', 'confirm'];

export function AppShowcase({ t }: { t: Dictionary }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  return (
    <section className="section-y bg-surface">
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-600">
              {t.showcase.eyebrow}
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2 className="t-h2 mt-3">{t.showcase.title}</h2>
          </Reveal>
        </div>

        {/* ---------------- desktop: sticky phone, panels scroll past ---------------- */}
        <div className="mt-8 hidden lg:grid lg:grid-cols-[1fr_0.8fr] lg:gap-14">
          <div>
            {t.showcase.panels.map((panel, i) => (
              <Panel key={panel.title} index={i} active={active} onEnter={setActive}>
                <span className="font-display text-sm font-extrabold tracking-widest text-brand-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="t-h3 mt-3">{panel.title}</h3>
                <p className="t-lead mt-3 max-w-prose text-ink-600">{panel.body}</p>
              </Panel>
            ))}
          </div>

          <div className="relative">
            <div className="sticky top-0 flex h-screen items-center justify-center pt-16">
              <div className="relative w-full max-w-[250px]">
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--brand-100)_0%,transparent_68%)]"
                  aria-hidden
                />
                <Phone>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active}
                      className="h-full w-full"
                      initial={reduced ? false : { opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduced ? undefined : { opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <AppScreen variant={screens[active]} t={t.app} />
                    </motion.div>
                  </AnimatePresence>
                </Phone>

                {/* progress dots */}
                <div className="mt-6 flex justify-center gap-2">
                  {screens.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ease-smooth ${
                        i === active ? 'w-7 bg-brand-500' : 'w-1.5 bg-ink-200'
                      }`}
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* -------- mobile / reduced-motion fallback: plain stacked cards -------- */}
        <div className="mt-9 space-y-10 lg:hidden">
          {t.showcase.panels.map((panel, i) => (
            <Reveal key={panel.title} index={i}>
              <div className="flex flex-col items-center gap-7 sm:flex-row sm:items-start sm:gap-9">
                <div className="w-[168px] shrink-0">
                  <Phone className="shadow-lift">
                    <AppScreen variant={screens[i]} t={t.app} />
                  </Phone>
                </div>
                <div className="text-center sm:pt-6 sm:text-left">
                  <span className="font-display text-sm font-extrabold tracking-widest text-brand-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="t-h3 mt-3">{panel.title}</h3>
                  <p className="t-body mt-3 text-ink-600">{panel.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * One scroll panel. Reports to the parent when it crosses the vertical centre of
 * the viewport — the negative margins turn the viewport into a thin band, so
 * exactly one panel is ever "active".
 */
function Panel({
  index,
  active,
  onEnter,
  children,
}: {
  index: number;
  active: number;
  onEnter: (i: number) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-48% 0px -48% 0px' });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  const isActive = active === index;

  return (
    <div ref={ref} className="flex min-h-[46vh] flex-col justify-center border-l-2 pl-8 transition-colors duration-500"
      style={{ borderColor: isActive ? 'var(--brand-500)' : 'var(--ink-200)' }}
    >
      <div
        className="transition-opacity duration-500 ease-smooth"
        style={{ opacity: isActive ? 1 : 0.35 }}
      >
        {children}
      </div>
    </div>
  );
}
