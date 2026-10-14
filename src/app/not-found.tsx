import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="on-dark grid-texture bg-ink text-paper">
      <div className="container-page py-28 md:py-40">
        <Eyebrow dark index="404">
          Not found
        </Eyebrow>
        <h1 className="display mt-8 max-w-3xl text-5xl sm:text-7xl">This page doesn’t exist.</h1>
        <p className="mt-6 max-w-lg text-lg text-mist">The link may be outdated, or the address may have a typo.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton href="/">Back to home</LinkButton>
          <LinkButton href="/contact" variant="secondary-dark">
            Contact us
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
