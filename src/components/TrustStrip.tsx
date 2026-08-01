import type { Dictionary } from '@/i18n/config';
import { Reveal } from './ui/Reveal';

/**
 * A deliberately quiet band. The hero already carries the numbers, so this row
 * carries names instead — social proof without repeating the same stat twice.
 *
 * TODO: replace these placeholder names with real partner logos
 * (grayscale SVG, ~28px tall, in /public/partners/). Delete this section
 * entirely rather than shipping invented partners.
 */
const partners = [
  'Quyoshli Bola',
  'Kichkintoy',
  'Bolajon',
  'Umid Bog’chasi',
  'Barakali Kun',
  'Yulduzcha',
];

export function TrustStrip({ t }: { t: Dictionary }) {
  return (
    <section className="border-y border-ink-200/60 bg-surface py-7">
      <div className="shell">
        <Reveal>
          <p className="text-center text-[0.8rem] font-bold uppercase tracking-[0.16em] text-ink-400">
            {t.trust.title}
          </p>
        </Reveal>
      </div>

      <Reveal index={1}>
        <div
          className="relative mt-5 flex overflow-hidden"
          style={{
            maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          }}
        >
          {/* Both copies ride ONE animated track. `-50%` is a share of the
              animated element's own width, so the track has to hold exactly two
              copies for a cycle to travel exactly one — animating each <ul>
              separately moves it only half its width and the row visibly jumps. */}
          <div className="flex shrink-0 animate-marquee">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex shrink-0 items-center gap-14 pr-14"
                aria-hidden={copy === 1}
              >
                {partners.map((name) => (
                  <li
                    key={name}
                    className="whitespace-nowrap font-display text-xl font-extrabold text-ink-200 transition-colors duration-300 hover:text-ink-400"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
