import { notFound } from 'next/navigation';
import { getDictionary, isLocale, type Locale } from '@/i18n/config';
import { site } from '@/lib/site';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { AppShowcase } from '@/components/AppShowcase';
import { CoverageMap } from '@/components/CoverageMap';
import { Safety } from '@/components/Safety';
import { Testimonials } from '@/components/Testimonials';
import { ForKindergartens } from '@/components/ForKindergartens';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const loc = locale as Locale;

  return (
    <>
      <StructuredData locale={loc} />
      <Header t={t} locale={loc} />
      <main id="main">
        <Hero t={t} />
        <TrustStrip t={t} />
        <Features t={t} />
        <HowItWorks t={t} />
        <AppShowcase t={t} />
        <CoverageMap t={t} />
        <Safety t={t} />
        <Testimonials t={t} />
        <ForKindergartens t={t} locale={loc} />
        <Faq t={t} />
        <FinalCta t={t} />
      </main>
      <Footer t={t} locale={loc} />
    </>
  );
}

/** SoftwareApplication + Organization + FAQPage, so the store listing and the
 *  FAQ can win rich results. */
function StructuredData({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/favicon.svg`,
        email: site.email,
        telephone: site.phone,
        sameAs: Object.values(site.social).filter(Boolean),
      },
      {
        '@type': 'SoftwareApplication',
        name: site.name,
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'iOS, Android',
        description: t.meta.description,
        url: site.url,
        installUrl: [site.appStoreUrl, site.playStoreUrl],
        // TODO: remove aggregateRating until the store listings actually have
        // ratings — publishing an unearned rating is a structured-data violation.
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: site.stats.rating,
          ratingCount: site.stats.bookings,
        },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'UZS' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
