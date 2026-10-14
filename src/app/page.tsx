import Link from "next/link";
import { contactHref } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { stagger } from "@/lib/stagger";
import { Arrow, LinkButton, TextLink } from "@/components/ui/Button";
import { Eyebrow, Section, SectionHeader } from "@/components/ui/Section";
import { ClosingCta } from "@/components/ui/ClosingCta";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { CommerceGlyph, DigitalGlyph } from "@/components/visuals/DivisionGlyphs";
import { ProcessSteps } from "@/components/home/ProcessSteps";

export const metadata = pageMetadata({
  description:
    "Lami Ventures LLC builds websites, software, and AI automations, and resells collectibles, smartphones, and computer hardware. Talk to us about a project or a partnership.",
  path: "/",
});

const divisions = [
  {
    index: "A",
    title: "Digital Solutions",
    href: "/digital-solutions",
    linkLabel: "Explore Digital Solutions",
    body: "Websites, software products, and AI automations for businesses that want better tools and less manual work.",
    items: ["Custom websites & web applications", "Software products & internal tools", "AI automations & workflow integrations"],
    Glyph: DigitalGlyph,
  },
  {
    index: "B",
    title: "Commerce & Resale",
    href: "/commerce",
    linkLabel: "Explore Commerce & Partnerships",
    body: "Resale of collectibles and consumer technology, with a growing focus on supplier and wholesale relationships.",
    items: ["Pokémon cards & collectibles", "iPhones & consumer electronics", "Computer hardware & GPUs"],
    Glyph: CommerceGlyph,
  },
];

const capabilities = [
  {
    name: "Websites & web applications",
    body: "Fast, accessible sites and browser-based tools, built to be easy to update.",
    division: "Digital",
  },
  {
    name: "Software & internal tools",
    body: "Focused products and dashboards that replace spreadsheets and scattered workflows.",
    division: "Digital",
  },
  {
    name: "AI automations",
    body: "Practical automations that handle repetitive steps and connect the tools you already use.",
    division: "Digital",
  },
  {
    name: "Collectibles",
    body: "Pokémon cards, sealed product, and related collectibles.",
    division: "Commerce",
  },
  {
    name: "Smartphones & devices",
    body: "iPhones and other consumer electronics.",
    division: "Commerce",
  },
  {
    name: "Computer hardware",
    body: "GPUs, components, and related technology.",
    division: "Commerce",
  },
];

const partnerTypes = [
  { title: "Suppliers", body: "Reliable sources for collectibles, devices, and components." },
  { title: "Wholesalers", body: "Lot and bulk purchasing on terms that work for both sides." },
  { title: "Distributors", body: "Access to product lines as our volume develops." },
  { title: "Resellers", body: "Trades and collaboration with other independent sellers." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="on-dark grid-texture relative overflow-hidden bg-ink text-paper">
        <div className="container-page grid items-center gap-12 pt-14 pb-16 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-20">
          <div className="lg:col-span-7">
            <div className="enter" style={stagger(0)}>
              <Eyebrow dark>
                <span className="inline-flex items-center gap-3">
                  <span aria-hidden="true" className="size-1.5 bg-accent-soft" />
                  Lami Ventures LLC
                </span>
              </Eyebrow>
            </div>
            <h1
              id="hero-title"
              className="display mt-8 text-[3rem] sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]"
            >
              <span className="enter block" style={stagger(1)}>
                Building digital products.
              </span>
              <span className="enter block" style={stagger(2)}>
                Connecting{" "}
                <span className="font-serif font-normal tracking-[-0.01em] italic">opportunities</span>
                <span className="text-accent-soft">.</span>
              </span>
            </h1>
            <p
              className="lede enter mt-8 max-w-xl text-lg leading-relaxed text-mist md:text-xl"
              style={stagger(3)}
            >
              We build websites, software, and AI automations for businesses — and we buy and resell technology and
              collectibles, from Pokémon cards to GPUs. Two lines of work, held to the same standard.
            </p>
            <div className="enter mt-10 flex flex-wrap gap-3" style={stagger(4)}>
              <LinkButton href={contactHref("digital")}>Discuss a Project</LinkButton>
              <LinkButton href="/commerce#partnerships" variant="secondary-dark">
                Explore Partnerships
              </LinkButton>
            </div>
          </div>

          <div className="enter-fade relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <HeroVisual className="h-auto w-full" />
          </div>
        </div>

        <div className="border-t border-white/[0.08]">
          <div className="container-page grid sm:grid-cols-2">
            {divisions.map((d, i) => (
              <Link
                key={d.href}
                href={d.href}
                className={`enter group flex items-center justify-between gap-6 py-6 transition-colors sm:py-7 ${
                  i === 0 ? "border-b border-white/[0.08] sm:border-r sm:border-b-0 sm:pr-8" : "sm:pl-8"
                }`}
                style={stagger(5 + i)}
              >
                <span>
                  <span className="eyebrow text-accent-soft">Division {d.index}</span>
                  <span className="mt-2 block font-display text-xl font-medium tracking-[-0.02em] transition-colors group-hover:text-accent-soft">
                    {d.title}
                  </span>
                </span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-accent-soft group-hover:text-accent-soft">
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divisions */}
      <Section labelledBy="divisions-title">
        <SectionHeader
          id="divisions-title"
          index="01"
          eyebrow="What we do"
          title="Two divisions. One company."
          intro="Lami Ventures works on both sides of technology: building the software businesses run on, and trading the hardware and collectibles people want."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line md:mt-20 lg:grid-cols-2">
          {divisions.map((d, i) => (
            <article
              key={d.href}
              data-reveal
              data-reveal-delay={i * 0.1}
              className="flex flex-col bg-paper p-8 sm:p-10 lg:p-12"
            >
              <div className="flex items-start justify-between gap-6">
                <p className="eyebrow text-muted">Division {d.index}</p>
                <d.Glyph className="h-20 w-auto sm:h-24" />
              </div>
              <h3 className="display mt-8 text-4xl sm:text-5xl">{d.title}</h3>
              <p className="lede mt-5 max-w-md text-lg leading-relaxed text-muted">{d.body}</p>
              <ul className="mt-8 border-t border-paper-line">
                {d.items.map((item) => (
                  <li key={item} className="flex items-center gap-4 border-b border-paper-line py-4 text-[1.02rem]">
                    <span aria-hidden="true" className="size-1.5 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <TextLink href={d.href}>{d.linkLabel}</TextLink>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Capabilities */}
      <Section tone="tint" labelledBy="capabilities-title">
        <SectionHeader
          id="capabilities-title"
          index="02"
          eyebrow="Capabilities"
          title="What we can help with."
          intro="A focused set of services and product categories, so we can do each of them properly."
        />
        <dl className="mt-16 border-t border-ink/15 md:mt-20">
          {capabilities.map((c, i) => (
            <div
              key={c.name}
              data-reveal
              className="grid gap-2 border-b border-ink/15 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6 md:py-7"
            >
              <span aria-hidden="true" className="font-mono text-xs text-muted sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="font-display text-xl font-medium tracking-[-0.02em] sm:col-span-4 md:text-2xl">
                {c.name}
              </dt>
              <dd className="leading-relaxed text-muted sm:col-span-5">{c.body}</dd>
              <dd className="sm:col-span-2 sm:text-right">
                <span
                  className={`eyebrow inline-flex rounded-full border px-2.5 py-1 ${
                    c.division === "Digital" ? "border-accent/40 text-accent-strong" : "border-ink/25 text-ink"
                  }`}
                >
                  {c.division}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Partnerships */}
      <Section tone="dark" labelledBy="partners-title" className="grid-texture">
        <SectionHeader
          dark
          id="partners-title"
          index="03"
          eyebrow="Partnerships"
          title={
            <>
              Looking for the right <span className="font-serif font-normal italic">supply</span> partners.
            </>
          }
          intro="Our resale business is active today. As it grows, we want dependable relationships with suppliers, wholesalers, distributors, and resellers — built one conversation at a time."
        />
        <ul className="mt-16 grid border-t border-white/15 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {partnerTypes.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              data-reveal-delay={i * 0.06}
              className={`border-b border-white/15 py-8 sm:pr-8 lg:border-b-0 ${
                i > 0 ? "lg:border-l lg:pl-8" : ""
              } ${i % 2 === 1 ? "sm:border-l sm:pl-8 lg:pl-8" : ""}`}
            >
              <h3 className="font-display text-2xl font-medium tracking-[-0.025em]">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-mist">{p.body}</p>
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-mist">
            We’re early in building these relationships and say so plainly. If you value straightforward communication
            and steady growth, we’d like to talk.
          </p>
          <div className="flex flex-wrap gap-3">
            <LinkButton href={contactHref("partnership")}>Connect About a Partnership</LinkButton>
            <LinkButton href="/commerce#partnerships" variant="secondary-dark">
              Explore Partnerships
            </LinkButton>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section labelledBy="process-title">
        <SectionHeader
          id="process-title"
          index="04"
          eyebrow="How we start"
          title="A simple way to begin."
          intro="Every engagement — a client project or a supply relationship — starts the same way."
        />
        <div className="mt-16 md:mt-20">
          <ProcessSteps />
        </div>
      </Section>

      <ClosingCta
        title={
          <>
            Have a project or an <span className="font-serif font-normal italic">opportunity</span> in mind?
          </>
        }
        body="Tell us what you’re working on or what you have to offer, and we’ll follow up by email."
        primary={{ label: "Discuss a Project", href: contactHref("digital") }}
        secondary={{ label: "Connect About a Partnership", href: contactHref("partnership") }}
      />
    </>
  );
}
