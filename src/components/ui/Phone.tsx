import type { ReactNode } from 'react';

type PhoneProps = {
  children: ReactNode;
  className?: string;
  /**
   * Draw the notch and home indicator. Turn off when the content is a real
   * screenshot — it already carries the phone's own status bar, and the fake
   * island would sit right on top of it.
   */
  chrome?: boolean;
};

/**
 * The device frame. Deliberately understated — thin bezel, real corner radius,
 * one soft shadow — so attention lands on the app UI inside it, not the hardware.
 *
 * The 9/18 aspect sits on the SCREEN, not on the outer frame. Put it on the frame
 * and the 0.55rem bezel eats into the ratio unevenly (a 250px frame ends up with a
 * 0.482 screen, not 0.5), which makes `object-cover` scale every screenshot up and
 * crop it — the "UI is too big for the phone" look. On the screen it stays exactly
 * 9/18 at any width, matching the app's own captures (1080×2107–2160).
 */
export function Phone({ children, className = '', chrome = true }: PhoneProps) {
  return (
    <div
      className={`relative w-full rounded-[2.6rem] bg-ink-900 p-[0.55rem] shadow-phone ${className}`}
    >
      {/* side buttons */}
      <span className="absolute -left-[2px] top-[18%] h-8 w-[3px] rounded-l bg-ink-700" aria-hidden />
      <span className="absolute -left-[2px] top-[27%] h-12 w-[3px] rounded-l bg-ink-700" aria-hidden />
      <span className="absolute -right-[2px] top-[24%] h-14 w-[3px] rounded-r bg-ink-700" aria-hidden />

      <div className="relative aspect-[9/18] w-full overflow-hidden rounded-[2.1rem] bg-white">
        {chrome && (
          <span
            className="absolute left-1/2 top-2 z-20 h-[1.15rem] w-[5.2rem] -translate-x-1/2 rounded-full bg-ink-900"
            aria-hidden
          />
        )}
        {children}
        {chrome && (
          <span
            className="absolute bottom-1.5 left-1/2 z-20 h-1 w-1/3 -translate-x-1/2 rounded-full bg-ink-900/25"
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}
