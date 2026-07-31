import type { Dictionary } from '@/i18n/config';
import { Reveal } from './ui/Reveal';
import { StoreBadges } from './ui/StoreBadges';

export function FinalCta({ t }: { t: Dictionary }) {
  return (
    <section className="relative bg-surface pt-10">
      {/* Organic top edge — never a straight line. */}
      <div className="relative -mb-px">
        <svg
          className="block h-[52px] w-full text-brand-500 md:h-[78px]"
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 110V52c180-46 380 30 560 22 180-8 300-64 480-52 140 9 260 58 400 40v48H0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative overflow-hidden bg-brand-500 pb-14 pt-4 md:pb-20">
        {/* soft dot pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="ctaDots" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" fill="#ffffff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ctaDots)" />
          </svg>
        </div>

        <div className="shell relative">
          <div className="flex flex-col items-center gap-9 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl text-center lg:text-left">
              <Reveal>
                <h2 className="t-h2 text-white">{t.finalCta.title}</h2>
              </Reveal>
              <Reveal index={1}>
                <p className="t-lead mx-auto mt-4 max-w-prose text-white/85 lg:mx-0">
                  {t.finalCta.body}
                </p>
              </Reveal>
              <Reveal index={2}>
                <StoreBadges t={t.store} variant="light" className="mt-7 justify-center lg:justify-start" />
              </Reveal>
            </div>

            <Reveal index={2} className="shrink-0">
              <div className="flex flex-col items-center gap-2.5 rounded-card bg-white p-4 shadow-deep">
                <QrPlaceholder />
                <p className="max-w-[168px] text-center text-[0.82rem] font-semibold leading-snug text-ink-600">
                  {t.finalCta.qr}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ⚠️ PLACEHOLDER — this pattern is decorative and does NOT scan. ⚠️
 *
 * TODO before launch: generate a real QR pointing at a single smart link that
 * redirects by platform (Branch, Firebase Dynamic Links, or your own /go route
 * reading the user agent). Save it as /public/qr.svg and replace this component
 * with <Image src="/qr.svg" width={168} height={168} alt="" />.
 */
function QrPlaceholder() {
  // Deterministic pseudo-random module layout, so it never changes between renders.
  const size = 21;
  const modules: boolean[] = Array.from({ length: size * size }, (_, i) => {
    const x = i % size;
    const y = Math.floor(i / size);
    const inFinder =
      (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
    if (inFinder) return false;
    return ((x * 7 + y * 13 + ((x * y) % 5)) % 3) === 0;
  });

  return (
    <div className="relative h-[132px] w-[132px] shrink-0 rounded-xl bg-white" aria-hidden>
      <div className="grid h-full w-full grid-cols-[repeat(21,1fr)] grid-rows-[repeat(21,1fr)]">
        {modules.map((on, i) => (
          <span key={i} className={on ? 'bg-ink-900' : ''} />
        ))}
      </div>

      {/* finder patterns, drawn over the module grid */}
      <svg viewBox="0 0 21 21" className="absolute inset-0 h-full w-full">
        {[
          [0, 0],
          [14, 0],
          [0, 14],
        ].map(([fx, fy]) => (
          <g key={`${fx}-${fy}`}>
            <rect x={fx} y={fy} width="7" height="7" fill="#fff" />
            <rect
              x={fx + 0.5}
              y={fy + 0.5}
              width="6"
              height="6"
              fill="none"
              stroke="var(--ink-900)"
              strokeWidth="1"
            />
            <rect x={fx + 2} y={fy + 2} width="3" height="3" fill="var(--ink-900)" />
          </g>
        ))}
      </svg>
    </div>
  );
}
