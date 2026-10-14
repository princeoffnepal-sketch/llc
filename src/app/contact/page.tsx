import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { isInquiryType } from "@/lib/contact/schema";
import { isDeliveryConfigured } from "@/lib/contact/email";
import { Eyebrow } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Lami Ventures LLC about a digital project, a supplier or wholesale partnership, a resale opportunity, or a general question.",
  path: "/contact",
});

const nextSteps = [
  { title: "We read your message", body: "It comes straight to us — no ticketing system." },
  { title: "We follow up by email", body: "Usually with a few questions, or a time to talk." },
  { title: "We agree on next steps", body: "A proposal, a trial order, or a clear “not the right fit.”" },
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { inquiry } = await searchParams;
  const defaultInquiry = isInquiryType(inquiry) ? inquiry : null;
  const deliveryReady = isDeliveryConfigured();
  const { email, phone } = siteConfig.contact;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s <span className="font-serif font-normal italic">talk</span>.
          </>
        }
        lede="Whether you have a project in mind, a supply relationship to propose, or product to sell, start here. A few details help us respond usefully."
      />

      <section id="inquiry-form" aria-label="Contact form" className="bg-paper-2">
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {!deliveryReady ? (
              <div
                role="note"
                className="mb-6 rounded-xl border border-ink/20 bg-paper px-5 py-4 text-[0.95rem] leading-relaxed text-ink"
              >
                <strong className="font-medium">Heads up:</strong> our contact form isn’t connected to email delivery
                yet, so messages can’t be sent right now.
              </div>
            ) : null}
            <ContactForm defaultInquiry={defaultInquiry} />
          </div>

          <aside className="lg:col-span-5" aria-labelledby="next-steps-title">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>After you write</Eyebrow>
              <h2 id="next-steps-title" className="display mt-5 text-3xl sm:text-4xl">
                What happens next.
              </h2>
              <ol className="mt-8 border-t border-ink/15">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-ink/15 py-5">
                    <span className="font-mono text-xs leading-7 text-accent">0{i + 1}</span>
                    <div>
                      <h3 className="font-medium">{s.title}</h3>
                      <p className="mt-1 leading-relaxed text-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {email || phone ? (
                <div className="mt-10">
                  <h3 className="eyebrow text-muted">Prefer to reach us directly?</h3>
                  <ul className="mt-4 space-y-2">
                    {email ? (
                      <li>
                        <a href={`mailto:${email}`} className="font-medium underline underline-offset-4">
                          {email}
                        </a>
                      </li>
                    ) : null}
                    {phone ? (
                      <li>
                        <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="font-medium underline underline-offset-4">
                          {phone}
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </div>
              ) : null}

              <p className="mt-10 text-sm leading-relaxed text-muted">
                Please don’t include sensitive personal or financial information. We don’t accept attachments through
                this form — if files are useful, we’ll arrange that by email.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
