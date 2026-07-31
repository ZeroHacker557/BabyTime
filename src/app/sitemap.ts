import type { MetadataRoute } from 'next';
import { hreflangs, locales } from '@/i18n/config';
import { site } from '@/lib/site';

const paths = ['', '/contact', '/privacy', '/terms', '/offer'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1 : 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [hreflangs[l], `${site.url}/${l}${path}`]),
        ),
      },
    })),
  );
}
