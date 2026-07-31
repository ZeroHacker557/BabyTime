import type { ReactNode } from 'react';

type PhoneProps = {
  children: ReactNode;
  className?: string;
};

/**
 * The device frame. Deliberately understated — thin bezel, real corner radius,
 * one soft shadow — so attention lands on the app UI inside it, not the hardware.
 */
export function Phone({ children, className = '' }: PhoneProps) {
  return (
    <div
      className={`relative aspect-[9/19] w-full rounded-[2.6rem] bg-ink-900 p-[0.55rem] shadow-phone ${className}`}
    >
      {/* side buttons */}
      <span className="absolute -left-[2px] top-[18%] h-8 w-[3px] rounded-l bg-ink-700" aria-hidden />
      <span className="absolute -left-[2px] top-[27%] h-12 w-[3px] rounded-l bg-ink-700" aria-hidden />
      <span className="absolute -right-[2px] top-[24%] h-14 w-[3px] rounded-r bg-ink-700" aria-hidden />

      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-white">
        {/* dynamic island */}
        <span
          className="absolute left-1/2 top-2 z-20 h-[1.15rem] w-[5.2rem] -translate-x-1/2 rounded-full bg-ink-900"
          aria-hidden
        />
        {children}
        {/* home indicator */}
        <span
          className="absolute bottom-1.5 left-1/2 z-20 h-1 w-1/3 -translate-x-1/2 rounded-full bg-ink-900/25"
          aria-hidden
        />
      </div>
    </div>
  );
}
