'use client';

import { useEffect, useState } from 'react';
import { site } from './site';

export type Platform = 'ios' | 'android' | 'desktop';

/**
 * Returns the visitor's platform, then the store URL the primary CTA should use.
 * Starts as `desktop` so the server render and first client render match, then
 * settles after hydration — the badges are visible either way, so nothing shifts.
 */
export function usePlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>('desktop');

  useEffect(() => {
    const ua = navigator.userAgent;
    // iPadOS 13+ reports as Macintosh, so check for a touch-capable Mac too.
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (ua.includes('Macintosh') && typeof document !== 'undefined' && 'ontouchend' in document);

    if (isIOS) setPlatform('ios');
    else if (/Android/i.test(ua)) setPlatform('android');
    else setPlatform('desktop');
  }, []);

  return platform;
}

export function useStoreUrl(): string {
  const platform = usePlatform();
  if (platform === 'ios') return site.appStoreUrl;
  if (platform === 'android') return site.playStoreUrl;
  return site.appStoreUrl;
}
