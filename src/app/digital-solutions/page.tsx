import { contactHref } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { DigitalGlyph } from "@/components/visuals/DivisionGlyphs";

export const metadata = pageMetadata({
  title: "Digital Solutions",
  description:
    "Custom websites and web applications, software products and internal tools, and AI automations — built around the problem you actually have.",
  path: "/digital-solutions",
});

const services = [
  {
    id: "websites",
    title: "Custom websites & web applications",
    body: "Company sites, product pages, customer portals, and browser-based tools. We focus on clear structure, fast load times, and accessibility, so the site works for everyone who uses it.",
    work: [
      "Company and product websites",
      "Customer portals, booking, and quote flows",
      "Web apps with accounts, dashboards, and data",
      "Redesigns and rebuilds of existing sites",
    ],
    outcomes: [
      "A site that explains your business clearly",
      "Content you can update without a developer",
      "A foundation that’s ready to grow with you",
    ],
  },
  {
    id: "software",
    title: "Software products & internal tools",
    body: "When spreadsheets, email threads, and copy-paste become the system, a focused internal tool can replace them. We also help take product ideas from a rough concept to a working first version.",
    work: [
      "Internal dashboards and admin panels",
      "Inventory, order, and operations tools",
      "First versions of new software products",
      "Integrations between the systems you already use",
    ],
    outcomes: [
      "One place for information that’s currently scattered",
      "Fewer manual handoffs and copy-paste errors",
      "Software shaped around how your team actually works",
    ],
  },
  {
    id: "automation",
    title: "AI automations & workflow integrations",
    body: "We use AI where it’s genuinely useful — sorting, drafting, summarizing, and extracting — and pair it with conventional automation for the steps that need to be predictable.",
    work: [
      "Email and document processing",
      "Lead intake, routing, and follow-up",
      "Data extraction and cleanup",
      "Assistants connected to your own information",
    ],
    outcomes: [
      "Less time spent on repetitive tasks",
      "Quicker responses to customers and partners",
      "People reviewing the decisions that matter",
    ],
  },
];

const principles = [
  {
    title: "Start with the problem",
    body: "Before choosing tools, we make sure we understand the work, the people doing it, and what a good result looks like.",
  },
  {
    title: "Scope honestly",
    body: "We’ll tell you what’s realistic for your budget and timeline — including when something isn’t worth building.",
  },
  {
    title: "Build in visible steps",
    body: "You see working progress early and often, so feedback shapes the result instead of arriving at the end.",
  },
  {
    title: "Hand off cleanly",
    body: "You get the code, accounts, and documentation needed to run and extend what we build.",
  },
];

export default function DigitalSolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Division A — Digital Solutions"
        title={
          <>
            Better tools. <span className="font-serif font-normal italic">Less</span> busywork.
          </>
        }
        lede="We design and build websites, software products, and AI automations — scoped around the problem you actually have, and built to be maintained after launch."
        actions={
          <>
            <LinkButton href={contactHref("digital")}>Discuss a Project</LinkButton>
            <LinkButton href="#services" variant="secondary-dark" arrow={false}>
              See what we build
            </LinkButton>
          </>
        }
      />

      <Section id="services" labelledBy="services-title">
        <SectionHeader
          id="services-title"
          index="01"
          eyebrow="Services"
          title="Three ways we help."
          intro="Each engagement is sized to the work. Some start as a single page or automation; others grow into a full product."
        />

        <div className="mt-16 md:mt-24">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              data-reveal
              className="grid gap-10 border-t border-ink/15 py-12 md:grid-cols-12 md:gap-10 md:py-16"
            >
              <div className="md:col-span-5">
                <p className="font-mono text-xs text-accent">0{i + 1}</p>
                <h3 id={`${s.id}-title`} className="display mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">
                  {s.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="lede text-lg leading-relaxed text-muted">{s.body}</p>
                <div className="mt-10 grid gap-10 sm:grid-cols-2">
                  <div>
                    <h4 className="eyebrow text-muted">Typical work</h4>
                    <ul className="mt-4 space-y-3">
                      {s.work.map((w) => (
                        <li key={w} className="flex gap-3 leading-snug">
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-ink/40" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="eyebrow text-muted">What it can change</h4>
                    <ul className="mt-4 space-y-3">
                      {s.outcomes.map((o) => (
                        <li key={o} className="flex gap-3 leading-snug">
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-accent" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="tint" labelledBy="approach-title">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader id="approach-title" index="02" eyebrow="Approach" title="How we work." className="md:grid-cols-1" />
            <DigitalGlyph className="mt-12 hidden h-28 w-auto md:block" />
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line sm:grid-cols-2 md:col-span-7">
            {principles.map((p, i) => (
              <li key={p.title} data-reveal data-reveal-delay={i * 0.06} className="bg-paper-2 p-7 sm:p-8">
                <p className="font-mono text-xs text-muted">0{i + 1}</p>
                <h3 className="mt-6 font-display text-xl font-medium tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <ClosingCta
        eyebrow="Digital projects"
        title={
          <>
            A process to automate, or a product to <span className="font-serif font-normal italic">build</span>?
          </>
        }
        body="Share a few sentences about what you need. We’ll follow up to talk through scope and whether we’re the right fit."
        primary={{ label: "Discuss a Project", href: contactHref("digital") }}
      />
    </>
  );
}
