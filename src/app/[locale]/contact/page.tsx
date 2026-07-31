import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale, locales, type Locale } from '@/i18n/config';
import { site } from '@/lib/site';
import { PageShell } from '@/components/PageShell';
import { IconMail, IconPhone, IconTelegram } from '@/components/ui/Icons';

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
  return { title: `${t.pages.contact.title} — Baby Time`, description: t.pages.contact.body };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const c = t.pages.contact;

  const channels = [
    { Icon: IconMail, label: c.emailLabel, value: site.email, href: `mailto:${site.email}` },
    { Icon: IconPhone, label: c.phoneLabel, value: site.phone, href: `tel:${site.phoneHref}` },
    { Icon: IconTelegram, label: 'Telegram', value: '@babytime', href: site.social.telegram },
  ];

  return (
    <PageShell t={t} locale={locale as Locale} title={c.title}>
      <p className="t-lead">{c.body}</p>

      {/*
        Deliberately no form. A form needs a backend, spam protection and a
        privacy notice at the point of collection — until those exist, direct
        channels convert better and collect no personal data at all.
        TODO: when the partner pipeline is ready, replace this with a real form
        (name, kindergarten, city, phone) posting to your CRM.
      */}
      <ul className="!mt-10 grid gap-3 sm:grid-cols-3">
        {channels.map(({ Icon, label, value, href }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex h-full flex-col gap-3 rounded-card border border-ink-200/60 bg-canvas p-5 transition-all duration-200 ease-smooth hover:-translate-y-1 hover:border-brand-200 hover:bg-surface hover:shadow-lift"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[0.8rem] font-bold uppercase tracking-wider text-ink-400">
                  {label}
                </span>
                <span className="mt-1 block font-display text-[1.02rem] font-extrabold text-ink-900">
                  {value}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="!mt-12 rounded-card bg-brand-50 p-7">
        <h2 className="!pt-0">{c.partnerTitle}</h2>
        <p className="mt-3">{c.partnerBody}</p>
        <a
          href={`mailto:${site.email}`}
          className="mt-5 inline-flex rounded-full bg-brand-500 px-6 py-3 font-bold text-white transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lift"
        >
          {site.email}
        </a>
      </div>
    </PageShell>
  );
}
