'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/i18n/config';
import { Phone } from './ui/Phone';
import { Reveal } from './ui/Reveal';

/**
 * Real screenshots, in the order a parent actually meets them:
 * sign up → location → add child → date & time → review → pay → profile.
 *
 * TODO — PERSONAL DATA, before launch. Two of these are live captures, not mock
 * data, and this section is a public page:
 *   • 07 (Sozlamalar) shows a real full name, phone number and account ID.
 *   • 05 (Tafsilotlar) shows a photo of a real child and a child's name.
 * Re-capture both against a dummy account, or blur those fields. A child's photo
 * in particular is not yours to publish without the parent's written consent.
 */
const shots = ['01.png', '02.png', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg'];

export function AppShowcase({ t }: { t: Dictionary }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const rail = useRef<HTMLUListElement>(null);

  /**
   * The mobile rail drifts right on its own, turns round at each end, and hands
   * control straight over the moment a finger lands on it.
   *
   * Driven by writing `scrollLeft` each frame rather than `scrollTo`, because at
   * this speed (~14 px/s) a frame advances a quarter of a pixel — the position is
   * kept in a float here and only handed to the DOM, since reading it back would
   * round the fraction away and the rail would never move. While the user is in
   * charge that float re-syncs from the real scroll position, so releasing mid-rail
   * carries on from where they left it instead of jumping back.
   */
  useEffect(() => {
    const el = rail.current;
    if (!el || reduced) return;

    const SPEED = 14; // px per second — deliberately slower than the eye tracks
    const TURN_PAUSE = 1400; // ms of stillness at each end
    const HAND_BACK = 2600; // ms after the last touch before it resumes

    let frame = 0;
    let last = performance.now();
    let pos = el.scrollLeft;
    let dir: 1 | -1 = 1;
    let idleUntil = 0;
    let onScreen = true;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05); // ignore tab-switch gaps
      last = now;

      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;

      if (!onScreen || now < idleUntil) {
        pos = el.scrollLeft; // the user (or nothing) is driving — stay in step
        return;
      }

      pos += dir * SPEED * dt;
      if (pos >= max) {
        pos = max;
        dir = -1;
        idleUntil = now + TURN_PAUSE;
      } else if (pos <= 0) {
        pos = 0;
        dir = 1;
        idleUntil = now + TURN_PAUSE;
      }
      el.scrollLeft = pos;
    };
    frame = requestAnimationFrame(tick);

    const yield_ = () => {
      idleUntil = performance.now() + HAND_BACK;
    };
    const events = ['pointerdown', 'touchstart', 'wheel'] as const;
    events.forEach((e) => el.addEventListener(e, yield_, { passive: true }));

    // Nothing to animate while the section is off screen.
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    io.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      events.forEach((e) => el.removeEventListener(e, yield_));
      io.disconnect();
    };
  }, [reduced]);

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
            {/* pt-16 keeps the device clear of the sticky header instead of
                centring it on the raw viewport, where the top would be cut off. */}
            <div className="sticky top-0 flex h-screen items-center justify-center pt-16">
              <div className="relative w-full max-w-[250px]">
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--brand-100)_0%,transparent_68%)]"
                  aria-hidden
                />
                <Phone chrome={false}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active}
                      className="absolute inset-0"
                      initial={reduced ? false : { opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduced ? undefined : { opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={`/screens/${shots[active]}`}
                        alt={t.showcase.panels[active].title}
                        fill
                        sizes="250px"
                        className="object-cover"
                        priority={active === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                </Phone>

                <div className="mt-6 flex justify-center gap-2">
                  {shots.map((_, i) => (
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
      </div>

      {/* ---------------- mobile: self-scrolling rail, swipeable at any time ----------------
          No scroll-snap here on purpose: `snap-mandatory` re-snaps to the nearest
          card on every frame, which would fight the quarter-pixel steps of the
          auto-scroll and leave the rail juddering in place. Free scrolling keeps
          native momentum, and the card width leaves the next one peeking so it
          still reads as swipeable. */}
      <div className="lg:hidden">
        <div className="shell">
          <ul
            ref={rail}
            className="-mx-5 mt-8 flex gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:-mx-10 md:px-10 [&::-webkit-scrollbar]:hidden"
            style={{ overscrollBehaviorX: 'contain', scrollBehavior: 'auto' }}
          >
            {t.showcase.panels.map((panel, i) => (
              <li key={panel.title} className="w-[68vw] max-w-[248px] shrink-0">
                <Phone className="shadow-lift" chrome={false}>
                  <Image
                    src={`/screens/${shots[i]}`}
                    alt={panel.title}
                    fill
                    sizes="248px"
                    className="object-cover"
                  />
                </Phone>
                <div className="mt-4">
                  <span className="font-display text-sm font-extrabold tracking-widest text-brand-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="t-h3 mt-2">{panel.title}</h3>
                  <p className="t-body mt-2 text-ink-600">{panel.body}</p>
                </div>
              </li>
            ))}
          </ul>
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
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  const isActive = active === index;

  return (
    <div
      ref={ref}
      className="flex min-h-[34vh] flex-col justify-center border-l-2 pl-8 transition-colors duration-500"
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
