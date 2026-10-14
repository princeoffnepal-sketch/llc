import { contactHref } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow, Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { CommerceGlyph } from "@/components/visuals/DivisionGlyphs";

export const metadata = pageMetadata({
  title: "Commerce & Partnerships",
  description:
    "Lami Ventures resells Pokémon cards and collectibles, smartphones, GPUs, and computer hardware, and is building relationships with suppliers, wholesalers, and distributors.",
  path: "/commerce",
});

const categories = [
  {
    title: "Pokémon cards & collectibles",
    body: "Singles, sealed product, and collections. We look for authentic items in clearly described condition.",
  },
  {
    title: "Smartphones & consumer devices",
    body: "iPhones and other consumer electronics, new or pre-owned. Condition, lock status, and provenance all matter to us.",
  },
  {
    title: "GPUs, components & related technology",
    body: "Graphics cards, processors, memory, storage, and other parts for builders and upgraders.",
  },
];

const conversations = [
  {
    title: "Sourcing & supply",
    body: "You have consistent access to product in our categories and want a dependable buyer.",
  },
  {
    title: "Purchasing opportunities",
    body: "Lots, collections, overstock, or one-off inventory you’d like to move.",
  },
  {
    title: "Ongoing relationships",
    body: "Recurring orders with terms that develop as trust and volume grow.",
  },
  {
    title: "Reseller collaboration",
    body: "Trades, referrals, and shared opportunities with other independent sellers.",
  },
];

const firstMessage = [
  "What you supply or have available",
  "Typical quantities and how often",
  "Condition, grading, or sealed status",
  "Where you’re located and how you ship",
  "How you prefer to work — terms, payment, minimums",
];

export default function CommercePage() {
  return (
    <>
      <PageHero
        eyebrow="Division B — Commerce & Partnerships"
        title={
          <>
            Technology and collectibles, <span className="font-serif font-normal italic">sourced</span> with care.
          </>
        }
        lede="Alongside our digital work, Lami Ventures resells collectibles, smartphones, and computer hardware. We’re now building relationships with suppliers and wholesale partners to support steady, long-term growth."
        actions={
          <>
            <LinkButton href={contactHref("partnership")}>Connect About a Partnership</LinkButton>
            <LinkButton href={contactHref("resale")} variant="secondary-dark">
              Offer a resale opportunity
            </LinkButton>
          </>
        }
      />

      <Section labelledBy="categories-title">
        <SectionHeader
          id="categories-title"
          index="01"
          eyebrow="Categories"
          title="What we deal in."
          intro="We stay within categories we know, so we can evaluate product accurately and price it fairly."
        />
        <ul className="mt-16 border-t border-ink/15 md:mt-20">
          {categories.map((c, i) => (
            <li
              key={c.title}
              data-reveal
              className="grid gap-3 border-b border-ink/15 py-8 md:grid-cols-12 md:items-baseline md:gap-6 md:py-10"
            >
              <span aria-hidden="true" className="font-mono text-xs text-accent md:col-span-1">
                0{i + 1}
              </span>
              <h3 className="display text-3xl sm:text-4xl md:col-span-6">{c.title}</h3>
              <p className="leading-relaxed text-muted md:col-span-5">{c.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="tint" labelledBy="status-title">
        <SectionHeader
          id="status-title"
          index="02"
          eyebrow="Where we are"
          title="Today, and where we’re heading."
          intro="We want partners to know exactly who they’re talking to."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line md:mt-20 md:grid-cols-2">
          <div data-reveal className="bg-paper p-8 sm:p-10 lg:p-12">
            <p className="eyebrow inline-flex items-center gap-2 text-ink">
              <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
              Current activity
            </p>
            <h3 className="display mt-6 text-3xl sm:text-4xl">Active resale</h3>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              We buy and resell within the categories above. Purchasing is selective, and each opportunity is evaluated
              on its own merits.
            </p>
          </div>
          <div data-reveal data-reveal-delay={0.08} className="bg-paper p-8 sm:p-10 lg:p-12">
            <p className="eyebrow inline-flex items-center gap-2 text-ink">
              <span aria-hidden="true" className="size-2 rounded-full border border-ink" />
              Building toward
            </p>
            <h3 className="display mt-6 text-3xl sm:text-4xl">Wholesale relationships</h3>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              Ongoing relationships with suppliers, wholesalers, and distributors who can support consistent
              sourcing — starting at a scale that makes sense for both sides.
            </p>
          </div>
        </div>
        <p data-reveal className="mt-8 max-w-2xl text-muted">
          We don’t operate a large wholesale network today, and we won’t claim to. We’re building one deliberately, with
          partners who value clear terms and reliable follow-through.
        </p>
      </Section>

      <Section id="partnerships" tone="dark" labelledBy="partnerships-title" className="grid-texture">
        <SectionHeader
          dark
          id="partnerships-title"
          index="03"
          eyebrow="Partnerships"
          title="Conversations we welcome."
          intro="If one of these describes you, we’d like to hear from you. A short first message is plenty."
        />
        <div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-12">
          <ul className="grid border-t border-white/15 sm:grid-cols-2 lg:col-span-8">
            {conversations.map((c, i) => (
              <li
                key={c.title}
                data-reveal
                data-reveal-delay={i * 0.06}
                className={`border-b border-white/15 py-8 sm:pr-8 ${i % 2 === 1 ? "sm:border-l sm:pl-8" : ""}`}
              >
                <h3 className="font-display text-2xl font-medium tracking-[-0.025em]">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{c.body}</p>
              </li>
            ))}
          </ul>
          <aside
            data-reveal
            aria-labelledby="first-message-title"
            className="rounded-2xl border border-white/12 bg-ink-2 p-7 sm:p-8 lg:col-span-4"
          >
            <Eyebrow dark>Helpful to include</Eyebrow>
            <h3 id="first-message-title" className="mt-4 font-display text-xl font-medium tracking-[-0.02em]">
              In your first message
            </h3>
            <ul className="mt-6 space-y-3 text-[0.97rem] text-paper/85">
              {firstMessage.map((item) => (
                <li key={item} className="flex gap-3 leading-snug">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-accent-soft" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <LinkButton href={contactHref("partnership")} className="w-full">
                Connect About a Partnership
              </LinkButton>
            </div>
          </aside>
        </div>
      </Section>

      <section aria-label="Brand notice" className="bg-paper">
        <div className="container-page py-12">
          <div className="flex flex-col gap-6 rounded-2xl border border-paper-line p-6 sm:flex-row sm:items-center sm:p-8">
            <CommerceGlyph className="h-16 w-auto shrink-0" />
            <p className="text-[0.95rem] leading-relaxed text-muted">
              <strong className="font-medium text-ink">Independent reseller.</strong> Lami Ventures LLC is not
              affiliated with, endorsed by, or an authorized dealer for The Pokémon Company, Nintendo, Apple, NVIDIA,
              or any other manufacturer. Brand and product names are used only to describe the items we deal in.
            </p>
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow="Partnerships"
        title={
          <>
            Let’s see if there’s a <span className="font-serif font-normal italic">fit</span>.
          </>
        }
        body="Tell us what you supply or what you have available. We’ll follow up to talk through details and next steps."
        primary={{ label: "Connect About a Partnership", href: contactHref("partnership") }}
        secondary={{ label: "Offer a resale opportunity", href: contactHref("resale") }}
      />
    </>
  );
}
