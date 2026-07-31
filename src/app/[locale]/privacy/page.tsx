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
  return { title: `${t.footer.links.privacy} — Baby Time`, robots: { index: true, follow: true } };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <PageShell t={t} locale={locale as Locale} title={t.footer.links.privacy} legal>
      {/*
        TODO: replace everything below with the policy your lawyer prepares.
        A childcare booking product collects children's data, so this document is
        a legal requirement — not boilerplate. At minimum it must cover, under
        O'zbekiston Respublikasining "Shaxsga doir ma'lumotlar to'g'risida"gi qonuni:
          — what personal data is collected (parent and child)
          — the legal basis and purpose for each category
          — how location data from the map is used and retained
          — payment data handling and which processor is used
          — retention periods and deletion requests
          — third parties the data is shared with (kindergartens, analytics)
          — the data controller's legal entity, address and contact
        Apple and Google both block store submissions without a reachable,
        accurate privacy policy URL.
      */}
      <p>
        This page is a structural placeholder. The production text must be supplied by your legal
        counsel before the app is submitted to the App Store or Google Play — both stores reject
        listings whose privacy policy URL is missing or does not match the data the app collects.
      </p>
    </PageShell>
  );
}
