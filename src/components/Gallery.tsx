import Image from 'next/image';
import type { Dictionary } from '@/i18n/config';
import { Reveal } from './ui/Reveal';

/**
 * Photo strip that drifts right-to-left forever.
 *
 * TODO — LICENSING, before launch. These six files are stock/web photos, not
 * photos of Baby Time kindergartens. One of them (01.jpg) came from a file named
 * `stock_GettyImages-473032112`, i.e. a Getty Images asset — publishing that on a
 * commercial site without a purchased licence is copyright infringement.
 * Either buy licences for all six, or (better) replace them with photos taken at
 * real partner kindergartens, with the parents' and the centre's written consent.
 *
 * The headline deliberately says "how your child spends the day" and not "our
 * kindergartens" — the strip is atmosphere, and must not read as a claim about
 * specific listed centres until these are real partner photos.
 */
const photos = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'];

export function Gallery({ t }: { t: Dictionary }) {
  return (
    <section className="section-y overflow-hidden bg-canvas">
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-600">
              {t.gallery.eyebrow}
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2 className="t-h2 mt-3">{t.gallery.title}</h2>
          </Reveal>
          <Reveal index={2}>
            <p className="t-lead mt-4 max-w-prose text-ink-600">{t.gallery.body}</p>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed on purpose: the strip runs edge to edge, past the shell. */}
      <Reveal index={2}>
        <div
          className="bt-gallery mt-8 flex"
          style={{
            maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
          }}
        >
          {/* Both copies live on ONE animated track. `-50%` in the keyframe is a
              share of the animated element's own width, so the track must hold
              exactly two copies for one cycle to travel exactly one copy — that
              is what makes the loop seamless. Animating each copy separately
              would move it only half its width and the strip would jump.
              The second copy is aria-hidden: a screen reader reads six photos.

              Deliberately no hover/tap pause: on touch devices `:hover` sticks
              after a tap, which would leave the strip frozen with no way to
              restart it. */}
          <div className="bt-gallery__track flex shrink-0 animate-marquee-photos">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4 pr-4 md:gap-5 md:pr-5">
                {photos.map((file, i) => (
                  <li
                    key={file}
                    className="relative h-[200px] w-[286px] shrink-0 overflow-hidden rounded-media bg-brand-50 shadow-lift md:h-[248px] md:w-[356px]"
                  >
                    <Image
                      src={`/gallery/${file}`}
                      alt={copy === 0 ? t.gallery.alts[i] : ''}
                      fill
                      sizes="356px"
                      className="object-cover"
                    />
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
