import { contactHref } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { TextLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { ClosingCta } from "@/components/ui/ClosingCta";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Lami Ventures LLC works across digital solutions and product resale, with a focus on practical execution, clear communication, and long-term relationships.",
  path: "/about",
});

const principles = [
  {
    title: "Practical execution",
    body: "We favor the simplest approach that solves the problem well. Fewer moving parts, fewer surprises, and work that holds up after it ships or ships out.",
  },
  {
    title: "Clear communication",
    body: "You’ll know what we’re doing, what it costs, and when to expect it. If something changes, we say so early — and if we’re not the right fit, we say that too.",
  },
  {
    title: "Long-term relationships",
    body: "We’d rather earn a second project or a repeat order than maximize a single one. Good clients and good partners are worth keeping.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Lami Ventures"
        title={
          <>
            One company. Two kinds of <span className="font-serif font-normal italic">work</span>.
          </>
        }
        lede="Lami Ventures LLC builds digital products for businesses and resells technology and collectibles. Different work, approached the same way: do what we say, communicate clearly, and think long-term."
      />

      <Section labelledBy="story-title">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader id="story-title" index="01" eyebrow="Why both" title="Closer than they look." className="md:grid-cols-1" />
          </div>
          <div data-reveal className="space-y-6 text-lg leading-relaxed text-muted md:col-span-7 md:pt-14">
            <p>
              Building software and trading technology have more in common than it seems. Both reward understanding
              what people actually need, paying attention to detail, and following through.
            </p>
            <p>
              On the digital side, we build websites, software, and AI automations that help businesses work with less
              friction. On the commerce side, we buy and resell collectibles, smartphones, and computer hardware — and
              we’re building relationships with suppliers and wholesalers as that business grows.
            </p>
            <p className="text-ink">
              Whichever side you meet us on, you’ll deal with the same company and the same standards.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 text-base">
              <TextLink href="/digital-solutions">Digital Solutions</TextLink>
              <TextLink href="/commerce">Commerce & Partnerships</TextLink>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="tint" labelledBy="principles-title">
        <SectionHeader
          id="principles-title"
          index="02"
          eyebrow="Principles"
          title="How we do business."
        />
        <ol className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-0">
          {principles.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              data-reveal-delay={i * 0.08}
              className={`border-t border-ink/15 pt-8 md:pr-10 ${i > 0 ? "md:border-l md:pl-10" : ""}`}
            >
              <p className="font-mono text-xs text-accent">0{i + 1}</p>
              <h3 className="display mt-5 text-3xl">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <ClosingCta
        title={
          <>
            Let’s start with a <span className="font-serif font-normal italic">conversation</span>.
          </>
        }
        body="Whether it’s a project, a partnership, or a question, the contact form is the fastest way to reach us."
        primary={{ label: "Discuss a Project", href: contactHref("digital") }}
        secondary={{ label: "Connect About a Partnership", href: contactHref("partnership") }}
      />
    </>
  );
}
