'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Stagger index — each sibling enters 80ms after the previous one. */
  index?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'span';
};

/**
 * The single entrance animation used everywhere on the site.
 * opacity 0→1 + translateY(24px→0), 600ms, once, at 15% visible.
 * Under `prefers-reduced-motion` it collapses to a plain, instantly-visible element.
 */
export function Reveal({ children, index = 0, className, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}
