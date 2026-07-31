import type { Dictionary, Locale } from '@/i18n/config';
import { site } from '@/lib/site';
import { Logo } from './ui/Logo';
import { IconFacebook, IconInstagram, IconMail, IconPhone, IconTelegram } from './ui/Icons';

export function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  const l = t.footer.links;

  const columns = [
    {
      title: t.footer.colApp,
      links: [
        { label: l.features, href: `/${locale}#features` },
        { label: l.how, href: `/${locale}#how` },
        { label: l.faq, href: `/${locale}#faq` },
      ],
    },
    {
      title: t.footer.colCompany,
      links: [
        { label: l.partners, href: `/${locale}#partners` },
        { label: l.contact, href: `/${locale}/contact` },
      ],
    },
    {
      title: t.footer.colLegal,
      links: [
        { label: l.privacy, href: `/${locale}/privacy` },
        { label: l.terms, href: `/${locale}/terms` },
        { label: l.offer, href: `/${locale}/offer` },
      ],
    },
  ];

  const socials = [
    { href: site.social.telegram, Icon: IconTelegram, label: 'Telegram' },
    { href: site.social.instagram, Icon: IconInstagram, label: 'Instagram' },
    { href: site.social.facebook, Icon: IconFacebook, label: 'Facebook' },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-ink-200/70 bg-surface">
      <div className="shell py-11 md:py-14">
        <div className="grid gap-9 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-8">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-600">{t.footer.blurb}</p>

            <div className="mt-6 flex gap-2">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-canvas text-ink-600 transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:bg-brand-500 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-display text-[0.82rem] font-extrabold uppercase tracking-[0.12em] text-ink-400">
                {col.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.95rem] font-medium text-ink-600 transition-colors duration-200 hover:text-brand-700"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-ink-200/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.88rem] text-ink-400">
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-[0.88rem] font-medium text-ink-600 transition-colors hover:text-brand-700"
            >
              <IconMail className="h-4 w-4" />
              {site.email}
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              className="flex items-center gap-2 text-[0.88rem] font-medium text-ink-600 transition-colors hover:text-brand-700"
            >
              <IconPhone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
