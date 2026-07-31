import type { Metadata, Viewport } from 'next';
import { Inter, Nunito } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getDictionary, hreflangs, isLocale, locales, type Locale } from '@/i18n/config';
import { site } from '@/lib/site';
import '../globals.css';

/**
 * Self-hosted by next/font at build time — no request to fonts.googleapis.com,
 * no render-blocking stylesheet, no FOUT. Cyrillic is loaded because RU ships
 * on the same site; Latin-ext covers the Uzbek diacritics.
 */
const nunito = Nunito({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#5cc421',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = getDictionary(locale);
  const path = `/${locale}`;

  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: site.name,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        locales.map((l) => [hreflangs[l], `/${l}`]),
      ),
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      url: path,
      locale: hreflangs[locale],
      // TODO: create a 1200×630 share image and save it at /public/og.png
      images: [{ url: '/og.png', width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: ['/og.png'],
    },
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
      apple: '/apple-touch-icon.png',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={hreflangs[locale as Locale]} className={`${nunito.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
