'use client';

import type { Dictionary } from '@/i18n/config';
import { IconCheck, IconMapPin, IconStar, IconShieldCheck } from './Icons';

/**
 * A faithful mock of the Baby Time app UI, drawn in DOM rather than shipped as
 * screenshots. Two reasons: it stays sharp on every display and it costs ~0 KB.
 *
 * TODO: once the app ships, replace these with real screenshots
 * (export at 1170×2532, save as .webp in /public/screens/) — the phone frame
 * and all the surrounding motion stay exactly as they are.
 */

export type ScreenVariant = 'map' | 'detail' | 'booking' | 'confirm';

type Props = {
  variant: ScreenVariant;
  t: Dictionary['app'];
};

export function AppScreen({ variant, t }: Props) {
  return (
    <div className="flex h-full w-full flex-col bg-[#fbfdfa] text-ink-900">
      <StatusBar />
      {variant === 'map' && <MapScreen t={t} />}
      {variant === 'detail' && <DetailScreen t={t} />}
      {variant === 'booking' && <BookingScreen t={t} />}
      {variant === 'confirm' && <ConfirmScreen t={t} />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function StatusBar() {
  return (
    <div className="flex shrink-0 items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold text-ink-900">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-sm bg-ink-900" style={{ height: h }} />
          ))}
        </span>
        <span className="ml-1 h-[10px] w-[18px] rounded-[3px] border border-ink-900/70 p-[1.5px]">
          <span className="block h-full w-2/3 rounded-[1px] bg-ink-900" />
        </span>
      </div>
    </div>
  );
}

/* ----------------------------------- map ---------------------------------- */

function MapScreen({ t }: { t: Dictionary['app'] }) {
  return (
    <div className="relative flex-1 overflow-hidden">
      {/* map canvas */}
      <div className="absolute inset-0 bg-[#eef4e9]">
        <svg viewBox="0 0 300 560" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
          {/* parks */}
          <path d="M-20 60 L120 20 L180 90 L60 150Z" fill="#dcecd0" />
          <circle cx="245" cy="360" r="70" fill="#dcecd0" />
          <rect x="-10" y="420" width="150" height="120" rx="24" fill="#dcecd0" />
          {/* water */}
          <path d="M0 250 C60 240 90 285 160 275 C220 267 250 300 300 292 L300 320 C250 328 220 296 160 304 C90 313 60 268 0 278Z" fill="#cfe4ef" />
          {/* roads */}
          <g stroke="#ffffff" fill="none" strokeLinecap="round">
            <path d="M-10 180 H310" strokeWidth="14" />
            <path d="M-10 400 H310" strokeWidth="10" />
            <path d="M90 -10 V570" strokeWidth="12" />
            <path d="M215 -10 V570" strokeWidth="8" />
            <path d="M-10 300 L90 300 L150 240 L310 240" strokeWidth="7" />
          </g>
          {/* blocks */}
          <g fill="#ffffff" opacity="0.55">
            <rect x="105" y="200" width="90" height="60" rx="8" />
            <rect x="18" y="200" width="55" height="80" rx="8" />
            <rect x="232" y="410" width="60" height="70" rx="8" />
            <rect x="105" y="430" width="90" height="55" rx="8" />
          </g>
        </svg>
      </div>

      {/* search pill */}
      <div className="absolute inset-x-4 top-2">
        <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 shadow-[0_6px_20px_-8px_rgba(14,18,16,0.28)] backdrop-blur">
          <IconMapPin className="h-4 w-4 text-brand-500" strokeWidth={2.2} />
          <span className="truncate text-[11px] font-semibold text-ink-700">{t.search}</span>
        </div>
      </div>

      {/* inactive pins */}
      <Pin x="18%" y="30%" />
      <Pin x="76%" y="24%" />
      <Pin x="30%" y="52%" />
      <Pin x="82%" y="47%" />

      {/* active pin with price bubble */}
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2">
        <div className="mb-1 whitespace-nowrap rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-[0_6px_16px_-6px_rgba(46,90,20,0.7)]">
          25 000 {t.sum}
        </div>
        <div className="mx-auto h-3.5 w-3.5 rounded-full border-[3px] border-white bg-brand-500 shadow-md" />
      </div>

      {/* bottom sheet */}
      <div className="absolute inset-x-0 bottom-0 rounded-t-[22px] bg-white p-4 pt-2.5 shadow-[0_-10px_30px_-12px_rgba(14,18,16,0.22)]">
        <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-ink-200" />
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-ink-400">{t.nearby}</p>

        <div className="flex gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-2.5">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <p className="truncate text-[12px] font-bold text-ink-900">{t.gardenA}</p>
              <IconShieldCheck className="h-3 w-3 shrink-0 text-brand-600" strokeWidth={2.4} />
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-ink-600">
              <IconStar className="h-2.5 w-2.5 text-amber" />
              <span className="font-semibold text-ink-900">4.9</span>
              <span>· 800 m</span>
            </div>
            <span className="mt-1.5 inline-block rounded-full bg-brand-500 px-2 py-0.5 text-[9px] font-bold text-white">
              {t.available}
            </span>
          </div>
        </div>

        <div className="mt-2 flex gap-3 rounded-2xl border border-ink-200/70 p-2.5 opacity-60">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-ink-200" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-bold text-ink-900">{t.gardenB}</p>
            <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-ink-600">
              <IconStar className="h-2.5 w-2.5 text-amber" />
              <span className="font-semibold text-ink-900">4.7</span>
              <span>· 1.2 km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pin({ x, y }: { x: string; y: string }) {
  return (
    <span
      className="absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-brand-600/70 shadow"
      style={{ left: x, top: y }}
      aria-hidden
    />
  );
}

/* --------------------------------- detail --------------------------------- */

function DetailScreen({ t }: { t: Dictionary['app'] }) {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="relative h-40 bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700">
        <div className="absolute inset-0 opacity-25">
          <svg viewBox="0 0 300 160" className="h-full w-full" aria-hidden>
            <circle cx="40" cy="130" r="45" fill="#fff" />
            <circle cx="250" cy="30" r="60" fill="#fff" />
          </svg>
        </div>
        <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink-900">
          <span className="text-sm font-bold">‹</span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1">
          <IconShieldCheck className="h-3 w-3 text-brand-600" strokeWidth={2.4} />
          <span className="text-[9px] font-bold text-ink-900">{t.verified}</span>
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-[15px] font-extrabold leading-tight">{t.gardenA}</h4>
        <div className="mt-1 flex items-center gap-1.5 text-[10px] text-ink-600">
          <span className="flex gap-[1px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStar key={i} className="h-2.5 w-2.5 text-amber" />
            ))}
          </span>
          <span className="font-semibold text-ink-900">4.9</span>
          <span>· 128 {t.reviews}</span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {['2–7', '08:00–19:00', '800 m'].map((chip) => (
            <div key={chip} className="rounded-xl bg-brand-50 py-2 text-center text-[9px] font-bold text-brand-700">
              {chip}
            </div>
          ))}
        </div>

        <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-ink-400">{t.staff}</p>
        <div className="mt-2 flex gap-2">
          {['A', 'D', 'M', 'S'].map((initial, i) => (
            <div
              key={initial}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white"
              style={{ background: i % 2 ? 'var(--brand-600)' : 'var(--brand-500)' }}
            >
              {initial}
            </div>
          ))}
        </div>

        <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-ink-400">{t.photos}</p>
        <div className="mt-2 flex gap-2">
          <div className="h-14 flex-1 rounded-xl bg-brand-100" />
          <div className="h-14 flex-1 rounded-xl bg-ink-200/70" />
          <div className="h-14 flex-1 rounded-xl bg-amber-soft" />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- booking -------------------------------- */

function BookingScreen({ t }: { t: Dictionary['app'] }) {
  const dates = [12, 13, 14, 15, 16, 17, 18];
  const slots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'];
  const selectedSlots = [1, 2, 3];
  const disabled = [5];

  return (
    <div className="flex flex-1 flex-col p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">{t.pickDate}</p>
      <div className="mt-2 flex gap-1.5">
        {dates.map((d, i) => {
          const active = i === 2;
          return (
            <div
              key={d}
              className={`flex flex-1 flex-col items-center rounded-xl py-2 ${
                active ? 'bg-brand-500 text-white shadow-[0_8px_18px_-8px_rgba(46,90,20,0.6)]' : 'bg-brand-50 text-ink-600'
              }`}
            >
              <span className="text-[8px] font-semibold opacity-80">{t.days[i]}</span>
              <span className="mt-0.5 text-[12px] font-extrabold">{d}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-ink-400">{t.pickTime}</p>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {slots.map((slot, i) => {
          const isSelected = selectedSlots.includes(i);
          const isDisabled = disabled.includes(i);
          return (
            <div
              key={slot}
              className={`rounded-xl py-2.5 text-center text-[11px] font-bold ${
                isSelected
                  ? 'bg-brand-500 text-white'
                  : isDisabled
                    ? 'bg-ink-200/50 text-ink-400 line-through'
                    : 'border border-brand-200 bg-white text-ink-700'
              }`}
            >
              {slot}
            </div>
          );
        })}
      </div>

      <div className="mt-auto rounded-2xl bg-brand-50 p-3">
        <div className="flex items-end justify-between">
          <span className="text-[10px] font-semibold text-ink-600">{t.total}</span>
          <span className="font-display text-[16px] font-extrabold text-ink-900">
            75 000 <span className="text-[10px] font-bold text-ink-600">{t.sum}</span>
          </span>
        </div>
        <div className="mt-2.5 rounded-full bg-brand-500 py-2.5 text-center text-[12px] font-bold text-white shadow-[0_10px_22px_-10px_rgba(46,90,20,0.8)]">
          {t.book}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- confirm -------------------------------- */

function ConfirmScreen({ t }: { t: Dictionary['app'] }) {
  return (
    <div className="flex flex-1 flex-col items-center px-5 pt-10">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand-500">
        <span className="absolute inset-0 -m-3 rounded-full border-2 border-brand-200" aria-hidden />
        <IconCheck className="h-10 w-10 text-white" strokeWidth={3} />
      </div>

      <h4 className="mt-5 text-center text-[16px] font-extrabold">{t.confirmed}</h4>
      <p className="mt-1.5 max-w-[85%] text-center text-[10.5px] leading-relaxed text-ink-600">
        {t.confirmedBody}
      </p>

      <div className="mt-5 w-full rounded-2xl border border-brand-100 bg-white p-3.5 shadow-[0_10px_28px_-16px_rgba(46,90,20,0.4)]">
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600" />
          <div className="min-w-0">
            <p className="truncate text-[12px] font-bold">{t.gardenA}</p>
            <p className="text-[9.5px] text-ink-400">800 m</p>
          </div>
        </div>
        <div className="my-3 border-t border-dashed border-ink-200" />
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-ink-600">14.08</span>
          <span className="font-extrabold text-ink-900">09:00 – 12:00</span>
        </div>
      </div>

      <div className="mt-3 w-full rounded-full border-2 border-brand-500 py-2.5 text-center text-[11.5px] font-bold text-brand-700">
        {t.route}
      </div>
    </div>
  );
}
