import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale, locales, type Locale } from '@/i18n/config';
import { PageShell } from '@/components/PageShell';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale);
  return { title: `${t.footer.links.offer} — Baby Time` };
}

export default async function OfferPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <PageShell t={t} locale={locale as Locale} title={t.footer.links.offer} legal>
      {/*
        TODO: replace with the public offer (ommaviy oferta) your lawyer prepares.
        In Uzbekistan this document is what makes an online payment enforceable,
        so payment providers will ask for its URL during onboarding. It must state
        the legal entity, INN/STIR, bank details, the exact service being sold,
        the price mechanism, and how acceptance is recorded.
      */}
      <p>
        This page is a structural placeholder. Your payment provider will ask for this URL during
        merchant onboarding, so it needs the real document — including the legal entity, STIR and
        bank details — before payments can go live.
      </p>
    </PageShell>
  );
}
