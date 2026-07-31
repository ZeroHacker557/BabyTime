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
  return { title: `${t.footer.links.terms} — Baby Time` };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <PageShell t={t} locale={locale as Locale} title={t.footer.links.terms} legal>
      {/*
        TODO: replace with the terms your lawyer prepares. For a childcare
        marketplace the document must at minimum address:
          — that Baby Time is an intermediary platform, not the childcare provider
          — the liability split between the platform, the kindergarten and the parent
          — booking, cancellation and refund rules
          — the kindergarten's obligations and the vetting standard they must meet
          — account suspension and dispute resolution
          — governing law and jurisdiction
      */}
      <p>
        This page is a structural placeholder. The liability split between Baby Time, the
        kindergarten and the parent is the single most important clause in this document and must
        be drafted by a lawyer familiar with Uzbek consumer and childcare law.
      </p>
    </PageShell>
  );
}
