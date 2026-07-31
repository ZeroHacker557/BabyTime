/**
 * The Baby Time mark, rebuilt as inline SVG so it stays crisp at any size,
 * inherits the brand token, and costs zero network requests in the header.
 *
 * TODO: this is a faithful reconstruction, not the original artwork. Ask your
 * designer for the official SVG and replace the <g> below — the surrounding
 * layout, sizes and wordmark stay exactly as they are.
 */
type LogoProps = {
  className?: string;
  /** Show the "BABY TIME" wordmark next to the mark. */
  withWordmark?: boolean;
  /** Render the wordmark in white, for use on the dark and green bands. */
  inverted?: boolean;
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Baby Time">
      {/* Clock face */}
      <circle cx="60" cy="60" r="52" fill="var(--brand-500)" />

      {/* Tick marks — the "time" half of the concept */}
      <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.95">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const outer = 48;
          const inner = i % 3 === 0 ? 40 : 43;
          // Rounded on purpose: Math.sin's last bits differ between Node and the
          // browser, and the raw values cause a React hydration mismatch.
          const at = (r: number, fn: (n: number) => number) => (fn(angle) * r).toFixed(3);
          return (
            <line
              key={i}
              x1={60 + Number(at(inner, Math.sin))}
              y1={60 - Number(at(inner, Math.cos))}
              x2={60 + Number(at(outer, Math.sin))}
              y2={60 - Number(at(outer, Math.cos))}
            />
          );
        })}
      </g>

      {/* The child — the "baby" half */}
      <g>
        {/* ears */}
        <ellipse cx="35.5" cy="63" rx="6.5" ry="7.5" fill="#ffffff" stroke="#0e1210" strokeWidth="3" />
        <ellipse cx="84.5" cy="63" rx="6.5" ry="7.5" fill="#ffffff" stroke="#0e1210" strokeWidth="3" />
        {/* face */}
        <path
          d="M40 52c0-11 9-19 20-19s20 8 20 19v10c0 12-9 21-20 21s-20-9-20-21V52Z"
          fill="#ffffff"
          stroke="#0e1210"
          strokeWidth="3.4"
        />
        {/* hair */}
        <path
          d="M37.5 51.5c-1-13 9-24 22.5-24 8 0 14 3 18 8.5 3.5-.5 6 .5 7.5 2.5-2 .5-3.5 1.5-4.5 3 3 3 4.5 6.5 4.5 10-4.5-5.5-11-8.5-19-8.5-8.5 0-15.5 3-19 8h-2c-3.5 0-6 .5-8 .5Z"
          fill="#0e1210"
        />
        {/* closed, smiling eyes */}
        <path
          d="M49 60c1.6-2.2 4.6-2.2 6.2 0M64.8 60c1.6-2.2 4.6-2.2 6.2 0"
          stroke="#0e1210"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* smile */}
        <path
          d="M52 68c2.5 3.4 6 5.1 10.5 5.1 2.6 0 4.8-.6 6.5-1.8"
          stroke="#0e1210"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* tongue */}
        <path d="M62.5 72.8c2.6 0 4.4 1.2 4.4 3.1s-1.8 3.3-4.4 3.3-4.3-1.4-4.3-3.3 1.7-3.1 4.3-3.1Z" fill="#0e1210" />
      </g>
    </svg>
  );
}

export function Logo({ className = '', withWordmark = true, inverted = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      {withWordmark && (
        <span
          className={`font-display text-[1.3rem] font-extrabold leading-none tracking-[-0.03em] ${
            inverted ? 'text-white' : 'text-ink-900'
          }`}
        >
          Baby Time
        </span>
      )}
    </span>
  );
}
