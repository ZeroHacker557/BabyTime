/**
 * Hand-drawn 2px-stroke icon set. Deliberately not an icon font — every glyph
 * shares the same stroke weight, cap and corner radius so the page reads as one system.
 */
type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

export function IconMapPin({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconCalendarClock({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <path d="M20 11V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5" />
      <path d="M4 10h16M8 3v4M16 3v4" />
      <circle cx="17.5" cy="17.5" r="4.5" />
      <path d="M17.5 15.6v2.1l1.4.9" />
    </svg>
  );
}

export function IconShieldCheck({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <path d="M12 2.8 4.8 5.6v5.6c0 4.6 3 8.4 7.2 10 4.2-1.6 7.2-5.4 7.2-10V5.6L12 2.8Z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </svg>
  );
}

export function IconBellCheck({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <path d="M17.6 15.4V10a5.6 5.6 0 0 0-11.2 0v5.4L4.8 18h14.4l-1.6-2.6Z" />
      <path d="M10.2 21h3.6" />
      <path d="m9.8 10.6 1.7 1.7 3-3.1" />
    </svg>
  );
}

export function IconCheck({ className, strokeWidth = 2.4 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function IconChevronDown({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function IconArrowRight({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function IconMenu({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconGlobe({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9.5h17M3.5 14.5h17" />
      <path d="M12 3c2.4 2.4 3.6 5.4 3.6 9s-1.2 6.6-3.6 9c-2.4-2.4-3.6-5.4-3.6-9S9.6 5.4 12 3Z" />
    </svg>
  );
}

export function IconStar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
      <path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9L12 3.6Z" />
    </svg>
  );
}

export function IconQuote({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
      <path d="M9.4 5.6C6.3 7 4.4 9.9 4.4 13.4c0 3 1.7 5 4.2 5 2 0 3.5-1.4 3.5-3.4 0-1.9-1.3-3.2-3.1-3.2-.4 0-.8.1-1 .2.4-1.6 1.7-3 3.5-3.9l-2.1-2.5Zm9 0C15.3 7 13.4 9.9 13.4 13.4c0 3 1.7 5 4.2 5 2 0 3.5-1.4 3.5-3.4 0-1.9-1.3-3.2-3.1-3.2-.4 0-.8.1-1 .2.4-1.6 1.7-3 3.5-3.9l-2.1-2.5Z" />
    </svg>
  );
}

export function IconTelegram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
      <path d="M21.3 4.3 2.9 11.4c-1 .4-1 1.8.1 2.1l4.6 1.4 1.7 5.3c.3.9 1.4 1.1 2 .4l2.5-2.6 4.6 3.4c.8.6 1.9.2 2.1-.8l3-14.4c.2-1-.8-1.8-1.7-1.4l-.5.2ZM8.9 14.3l9-5.7-7.3 6.9-.3 3.4-1.4-4.6Z" />
    </svg>
  );
}

export function IconInstagram({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFacebook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3 0-1.3-.1-2.45-.1-2.4 0-4.05 1.5-4.05 4.2v2.2H7.5V13h2.7v8h3.3Z" />
    </svg>
  );
}

export function IconMail({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7.5 7.2 5a1.4 1.4 0 0 0 1.6 0l7.2-5" />
    </svg>
  );
}

export function IconPhone({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <path d="M6.4 3.5h2.9l1.5 3.7-2 1.3a11.4 11.4 0 0 0 5.4 5.4l1.3-2 3.7 1.5v2.9c0 1.1-.9 2-2 2A15.7 15.7 0 0 1 4.4 5.5c0-1.1.9-2 2-2Z" />
    </svg>
  );
}
