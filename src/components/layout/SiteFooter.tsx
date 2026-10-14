import Link from "next/link";
import { contactHref, navigation, siteConfig } from "@/config/site";
import { Wordmark } from "@/components/ui/Wordmark";

export function SiteFooter() {
  const { contact, social, legalName } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark border-t border-white/[0.07] bg-ink text-paper">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Wordmark className="text-xl" />
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-mist">
            Digital solutions and technology commerce, under one company.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="eyebrow text-mist">Company</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            <li>
              <Link href="/" className="text-paper/85 transition-colors hover:text-paper">
                Home
              </Link>
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/85 transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="text-paper/85 transition-colors hover:text-paper">
                Privacy
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="eyebrow text-mist">Get in touch</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            <li>
              <Link href={contactHref("digital")} className="text-paper/85 transition-colors hover:text-paper">
                Start a digital project
              </Link>
            </li>
            <li>
              <Link href={contactHref("partnership")} className="text-paper/85 transition-colors hover:text-paper">
                Propose a partnership
              </Link>
            </li>
            {contact.email ? (
              <li>
                <a href={`mailto:${contact.email}`} className="text-paper/85 transition-colors hover:text-paper">
                  {contact.email}
                </a>
              </li>
            ) : null}
            {contact.phone ? (
              <li>
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="text-paper/85 transition-colors hover:text-paper">
                  {contact.phone}
                </a>
              </li>
            ) : null}
            {social.map((s) => (
              <li key={s.href}>
                <a href={s.href} rel="noopener noreferrer" target="_blank" className="text-paper/85 transition-colors hover:text-paper">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          {contact.address ? (
            <address className="mt-5 text-[0.95rem] not-italic leading-relaxed text-mist">
              {contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          ) : null}
        </div>
      </div>

      <div className="container-page flex flex-col gap-3 border-t border-white/[0.07] py-6 text-[0.8rem] text-mist sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {legalName}. All rights reserved.
        </p>
        <p className="max-w-xl sm:text-right">
          Product and brand names are used descriptively. We are not affiliated with or endorsed by their owners.
        </p>
      </div>
    </footer>
  );
}
