'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import type { Dictionary } from '@/i18n/config';
import { mapPins, site } from '@/lib/site';
import { Reveal } from './ui/Reveal';
import { IconMapPin } from './ui/Icons';

/**
 * The Baby Time mark as a plain SVG string.
 *
 * Leaflet's divIcon takes HTML, not React, so the mark from ui/Logo.tsx cannot be
 * reused directly. The tick coordinates are pre-computed rather than derived with
 * Math.sin/cos — same reason as in Logo.tsx, and here it also keeps the string cheap
 * to stamp out once per pin.
 */
const TICKS = [
  [60, 20, 60, 12],
  [81.5, 22.761, 84, 18.431],
  [97.239, 38.5, 101.569, 36],
  [100, 60, 108, 60],
  [97.239, 81.5, 101.569, 84],
  [81.5, 97.239, 84, 101.569],
  [60, 100, 60, 108],
  [38.5, 97.239, 36, 101.569],
  [22.761, 81.5, 18.431, 84],
  [20, 60, 12, 60],
  [22.761, 38.5, 18.431, 36],
  [38.5, 22.761, 36, 18.431],
]
  .map(([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`)
  .join('');

const MARK_SVG = `
<svg viewBox="0 0 120 120" aria-hidden="true">
  <circle cx="60" cy="60" r="52" fill="#5CC421"/>
  <g stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.95">${TICKS}</g>
  <ellipse cx="35.5" cy="63" rx="6.5" ry="7.5" fill="#fff" stroke="#0e1210" stroke-width="3"/>
  <ellipse cx="84.5" cy="63" rx="6.5" ry="7.5" fill="#fff" stroke="#0e1210" stroke-width="3"/>
  <path d="M40 52c0-11 9-19 20-19s20 8 20 19v10c0 12-9 21-20 21s-20-9-20-21V52Z" fill="#fff" stroke="#0e1210" stroke-width="3.4"/>
  <path d="M37.5 51.5c-1-13 9-24 22.5-24 8 0 14 3 18 8.5 3.5-.5 6 .5 7.5 2.5-2 .5-3.5 1.5-4.5 3 3 3 4.5 6.5 4.5 10-4.5-5.5-11-8.5-19-8.5-8.5 0-15.5 3-19 8h-2c-3.5 0-6 .5-8 .5Z" fill="#0e1210"/>
  <path d="M49 60c1.6-2.2 4.6-2.2 6.2 0M64.8 60c1.6-2.2 4.6-2.2 6.2 0" stroke="#0e1210" stroke-width="3.2" stroke-linecap="round" fill="none"/>
  <path d="M52 68c2.5 3.4 6 5.1 10.5 5.1 2.6 0 4.8-.6 6.5-1.8" stroke="#0e1210" stroke-width="3.2" stroke-linecap="round" fill="none"/>
  <path d="M62.5 72.8c2.6 0 4.4 1.2 4.4 3.1s-1.8 3.3-4.4 3.3-4.3-1.4-4.3-3.3 1.7-3.1 4.3-3.1Z" fill="#0e1210"/>
</svg>`.trim();

export function CoverageMap({ t }: { t: Dictionary }) {
  const holder = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = holder.current;
    if (!node) return;

    let map: import('leaflet').Map | undefined;
    let observer: ResizeObserver | undefined;
    let cancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    // Leaflet reads `window` at import time, so it can only be loaded in the effect.
    import('leaflet').then(({ default: L }) => {
      if (cancelled || !node) return;

      map = L.map(node, {
        center: [site.mapCenter.lat, site.mapCenter.lng],
        zoom: site.mapCenter.zoom,
        // A landing page must never steal the wheel. Drag and the +/- buttons stay.
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });

      // Positron: a near-monochrome basemap, so the green pins are the only colour
      // on it. Free, keyless, and the attribution below is required by both parties.
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        className: 'bt-pin-wrap',
        html: `<span class="bt-pin"><span class="bt-pin__ring"></span><span class="bt-pin__mark">${MARK_SVG}</span></span>`,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      });

      // Frame every pin rather than trusting a fixed zoom: the box is 340px tall on
      // a phone and 440px on a desktop, and the pin list will grow.
      //
      // Leaflet caches the container size at construction and computes the fit zoom
      // from that cache. Here the cache is stale by the time the dynamic import
      // resolves, so the fit has to be redone against a measured size — hence
      // invalidateSize first, and a ResizeObserver to repeat it on every resize
      // (which also fires once immediately, after layout has settled).
      const bounds = L.latLngBounds(mapPins.map((p) => [p.lat, p.lng] as [number, number]));
      const frame = () =>
        map?.fitBounds(bounds, { padding: [46, 46], maxZoom: 14, animate: false });

      // The size Leaflet cached at construction predates layout, so re-measure
      // before the first frame or it fits against the wrong box.
      map.invalidateSize({ animate: false });
      frame();

      // Leaflet re-measures itself on window resize and then emits `resize`, so
      // this handler only has to re-frame. No invalidateSize here — that is what
      // would turn this into a loop.
      map.on('resize', frame);

      // Layout changes that never touch the window size (a sidebar, a font swap)
      // still move this box, and only the observer sees those.
      observer = new ResizeObserver(() => {
        map?.invalidateSize({ animate: false });
        frame();
      });
      observer.observe(node);

      mapPins.forEach((pin) => {
        const marker = L.marker([pin.lat, pin.lng], {
          icon,
          title: `${pin.name} · ${pin.district}`,
          keyboard: true,
          alt: pin.name,
        }).addTo(map!);

        // The click is pure feedback: a ring pulses out and the mark springs.
        // Nothing is selected, navigated to, or changed — by design.
        marker.on('click keypress', () => {
          if (reduced) return;
          const el = marker.getElement()?.querySelector('.bt-pin');
          if (!el) return;
          el.classList.remove('bt-pin--tapped');
          void (el as HTMLElement).offsetWidth; // restart the animation
          el.classList.add('bt-pin--tapped');
          const id = setTimeout(() => el.classList.remove('bt-pin--tapped'), 900);
          timers.add(id);
        });
      });
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      observer?.disconnect();
      map?.remove();
    };
  }, [reduced]);

  return (
    <section className="section-y bg-canvas">
      <div className="shell">
        <div className="grid items-center gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          {/* ------------------------------ copy ------------------------------ */}
          <div>
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-600">
                {t.map.eyebrow}
              </p>
            </Reveal>
            <Reveal index={1}>
              <h2 className="t-h2 mt-3">{t.map.title}</h2>
            </Reveal>
            <Reveal index={2}>
              <p className="t-lead mt-4 max-w-prose text-ink-600">{t.map.body}</p>
            </Reveal>

            <dl className="mt-7 space-y-4">
              {t.map.points.map((point, i) => (
                <Reveal key={point.title} index={i + 3}>
                  <div className="border-l-2 border-brand-200 pl-4">
                    <dt className="font-display text-[1.05rem] font-extrabold text-ink-900">
                      {point.title}
                    </dt>
                    <dd className="mt-1 text-[0.96rem] leading-relaxed text-ink-600">
                      {point.body}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal index={6}>
              <p className="mt-7 inline-flex items-center gap-2 rounded-chip bg-brand-100 px-4 py-2 text-[0.85rem] font-bold text-brand-700">
                <IconMapPin className="h-4 w-4" strokeWidth={2.2} />
                {t.map.hint}
              </p>
            </Reveal>
          </div>

          {/* ------------------------------ map ------------------------------- */}
          <Reveal index={2}>
            <div className="bt-map overflow-hidden rounded-media border border-ink-200/70 shadow-lift">
              <div
                ref={holder}
                className="h-[340px] w-full bg-brand-50 md:h-[440px]"
                role="application"
                aria-label={t.map.title}
              />
            </div>
            <p className="mt-3 text-[0.8rem] leading-relaxed text-ink-400">{t.map.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
