import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How Lami Ventures LLC handles information submitted through this website’s contact form.",
  path: "/privacy",
});

/** Marks owner-supplied details that are still missing from src/config/site.ts. */
function Pending({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.85em] text-accent-strong">[{children}]</mark>
  );
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="display mt-14 text-2xl sm:text-3xl">{children}</h2>;
}

export default function PrivacyPage() {
  const { privacy, legalName, name } = siteConfig;
  const isDraft = !privacy.effectiveDate;
  const effective = privacy.effectiveDate
    ? new Date(`${privacy.effectiveDate}T00:00:00`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy notice."
        lede="A plain-language explanation of what happens to the information you share with us through this website."
      />

      <section className="bg-paper">
        <div className="container-page py-16 md:py-24">
          <div className="max-w-3xl text-[1.05rem] leading-relaxed text-ink/85 [&_li]:mt-2 [&_p]:mt-5 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
            {isDraft ? (
              <div role="note" className="rounded-xl border border-ink/20 bg-paper-2 px-5 py-4 text-[0.95rem]">
                <strong className="font-medium text-ink">Draft.</strong> This notice has not been finalized. Items in
                brackets are awaiting confirmation.
              </div>
            ) : (
              <p className="text-muted">Effective {effective}.</p>
            )}

            <p>
              This notice covers the website operated by {legalName} (“{name},” “we,” “us”). We’ve kept it short
              because we collect very little.
            </p>

            <H2>What we collect</H2>
            <p>When you use the contact form, we receive:</p>
            <ul>
              <li>Your name and email address</li>
              <li>Your company name, if you choose to provide it</li>
              <li>The inquiry type you select and the message you write</li>
            </ul>
            <p>
              To protect the form from spam and abuse, we also process your IP address when you submit it. The address
              is converted into a one-way hashed identifier before it is used to limit repeated submissions, and that
              identifier expires after a short window (currently ten minutes).
            </p>
            <p>
              Like most websites, our hosting provider may automatically record basic technical information — such as
              IP address, browser type, and the pages requested — in server logs for security and reliability.
            </p>

            <H2>What we don’t do</H2>
            <ul>
              <li>We don’t use analytics, advertising trackers, or tracking cookies on this site.</li>
              <li>We don’t sell or rent your information, or share it for advertising.</li>
              <li>We don’t accept file uploads or ask for phone numbers or payment details through the form.</li>
            </ul>

            <H2>How we use it</H2>
            <p>
              We use what you submit only to read and respond to your inquiry, to continue a conversation you’ve
              started, and to keep the form free of spam.
            </p>

            <H2>Who processes it for us</H2>
            <p>A small number of service providers handle data on our behalf so the site and form can work:</p>
            <ul>
              <li>
                <strong className="font-medium text-ink">Email delivery:</strong> form submissions are sent to our inbox
                through Resend, an email delivery service.
              </li>
              <li>
                <strong className="font-medium text-ink">Website hosting:</strong>{" "}
                {privacy.hostingProvider ?? <Pending>hosting provider</Pending>}.
              </li>
              <li>
                <strong className="font-medium text-ink">Spam protection:</strong> hashed rate-limit identifiers may be
                stored with Upstash, a data storage provider.
              </li>
            </ul>
            <p>
              We may also disclose information if required by law or to protect our rights, our users, or the public.
            </p>

            <H2>How long we keep it</H2>
            <p>
              We keep inquiry emails for{" "}
              {privacy.retentionPeriod ?? <Pending>retention period, e.g. up to 24 months</Pending>}, or longer if they
              become part of an ongoing business relationship, and then delete them.
            </p>

            <H2>Your choices</H2>
            <p>
              You can ask us to access, correct, or delete the information you’ve sent us. Depending on where you live,
              you may have additional rights under local law
              {privacy.jurisdiction ? `, including the laws of ${privacy.jurisdiction}` : ""}. To make a request,{" "}
              {privacy.contactEmail ? (
                <>
                  email{" "}
                  <a href={`mailto:${privacy.contactEmail}`} className="underline underline-offset-4">
                    {privacy.contactEmail}
                  </a>
                </>
              ) : (
                <>
                  use our{" "}
                  <Link href="/contact?inquiry=general#inquiry-form" className="underline underline-offset-4">
                    contact form
                  </Link>{" "}
                  and choose “General”
                </>
              )}
              .
            </p>

            <H2>Children</H2>
            <p>This website is intended for businesses and adults. We don’t knowingly collect information from children.</p>

            <H2>Changes</H2>
            <p>
              If we change how we handle information, we’ll update this page and its effective date.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
