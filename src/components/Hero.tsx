'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import type { Dictionary } from '@/i18n/config';
import { Counter } from './ui/Counter';
import { StoreBadges } from './ui/StoreBadges';
import { IconStar } from './ui/Icons';

export function Hero({ t }: { t: Dictionary }) {
  const reduced = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative overflow-hidden bg-canvas pb-14 pt-[96px] md:pb-16 lg:pb-20 lg:pt-[112px]">
      {/* --- background: soft green glow + blurred organic blobs + faint grid --- */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="texture-dots absolute inset-0" />
        <div className="blob absolute -right-24 -top-32 h-[520px] w-[520px] rounded-full bg-brand-200/70" />
        <div className="blob absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-amber-soft/80" />
        <div className="blob absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-brand-100" />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* ------------------------------ copy ------------------------------ */}
          <div className="max-w-xl lg:max-w-[38rem]">
            <motion.span
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 rounded-chip bg-brand-100 px-4 py-2 text-sm font-bold text-brand-700"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              {t.hero.eyebrow}
            </motion.span>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="t-display mt-5"
            >
              {/* Binds a trailing em-dash to the word before it, so the headline
                  never breaks with a lone "—" starting a new line. Applies to
                  every locale without touching the dictionaries. */}
              {t.hero.title.replace(/\s+([—–-])\s*$/, ' $1')}{' '}
              <span className="relative inline-block text-brand-600">
                {t.hero.titleAccent}
                <svg
                  className="absolute -bottom-1 left-0 h-3 w-full text-brand-400"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <motion.path
                    d="M2 8.5C40 3.5 90 2.5 198 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={reduced ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.7, ease }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="t-lead mt-4 max-w-prose text-ink-600"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26, ease }}
              className="mt-7"
            >
              <StoreBadges t={t.store} />
            </motion.div>

            {/* trust row — TODO: numbers come from src/lib/site.ts, replace with real ones */}
            <motion.dl
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.36, ease }}
              className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              {t.hero.stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-2.5">
                  {i === 0 && <IconStar className="h-4 w-4 text-amber" />}
                  <div>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-lg font-extrabold leading-none text-ink-900">
                      <Counter
                        value={stat.value}
                        decimals={stat.decimals}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    </dd>
                    <p className="mt-1 text-[0.8rem] leading-none text-ink-400">{stat.label}</p>
                  </div>
                  {i < t.hero.stats.length - 1 && (
                    <span className="ml-4 hidden h-8 w-px bg-ink-200 sm:block" aria-hidden />
                  )}
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---------------------------- mascot ---------------------------- */}
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px]"
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--brand-200)_0%,transparent_65%)] opacity-60"
              aria-hidden
            />

            <div className="animate-float">
              <Image
                src="/mascot/hero.png"
                alt="Baby Time mascot"
                width={1122}
                height={1402}
                className="h-auto w-full drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
