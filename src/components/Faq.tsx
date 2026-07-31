'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { Dictionary } from '@/i18n/config';
import { Reveal } from './ui/Reveal';
import { IconChevronDown } from './ui/Icons';

export function Faq({ t }: { t: Dictionary }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section id="faq" className="section-y scroll-mt-24 bg-canvas">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-600">
                {t.faq.eyebrow}
              </p>
            </Reveal>
            <div className="lg:sticky lg:top-24">
              <Reveal index={1}>
                <h2 className="t-h2 mt-3">{t.faq.title}</h2>
              </Reveal>
              <Reveal index={2} className="mt-6 hidden lg:block">
                <div className="mx-auto max-w-[15rem] overflow-hidden rounded-3xl">
                  <Image
                    src="/mascot/faq.png"
                    alt="Baby Time FAQ mascot"
                    width={1024}
                    height={1536}
                    className="h-auto w-full"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          <ul className="divide-y divide-ink-200/70 border-y border-ink-200/70">
            {t.faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-trigger-${i}`}
                      className="flex w-full items-start justify-between gap-6 py-4 text-left"
                    >
                      <span
                        className={`font-display text-[1rem] font-extrabold leading-snug transition-colors duration-200 md:text-[1.08rem] ${
                          isOpen ? 'text-brand-700' : 'text-ink-900'
                        }`}
                      >
                        {item.q}
                      </span>
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-smooth ${
                          isOpen ? 'rotate-180 bg-brand-500 text-white' : 'bg-brand-100 text-brand-700'
                        }`}
                      >
                        <IconChevronDown className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                        initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                        exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="t-body max-w-prose pb-5 pr-12 text-ink-600">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
