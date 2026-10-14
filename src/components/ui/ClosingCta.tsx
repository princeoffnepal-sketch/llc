import type { ReactNode } from "react";
import { LinkButton } from "./Button";
import { Eyebrow } from "./Section";

export function ClosingCta({
  eyebrow = "Start a conversation",
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: ReactNode;
  body: ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section aria-labelledby="closing-cta" className="on-dark relative overflow-hidden bg-ink text-paper">
      <div className="container-page py-24 md:py-32">
        <div data-reveal className="grid gap-10 border-t border-white/10 pt-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow dark>{eyebrow}</Eyebrow>
            <h2 id="closing-cta" className="display mt-6 text-[2.6rem] sm:text-6xl lg:text-[4.5rem]">
              {title}
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-8 md:col-span-4">
            <p className="lede text-lg leading-relaxed text-mist">{body}</p>
            <div className="flex flex-wrap gap-3">
              <LinkButton href={primary.href}>{primary.label}</LinkButton>
              {secondary ? (
                <LinkButton href={secondary.href} variant="secondary-dark">
                  {secondary.label}
                </LinkButton>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
