import type { ReactNode } from "react";
import { stagger } from "@/lib/stagger";
import { Eyebrow } from "./Section";

/** Dark introductory band used at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="on-dark grid-texture relative overflow-hidden bg-ink text-paper" aria-labelledby="page-title">
      <div className="container-page grid gap-12 pt-16 pb-20 md:grid-cols-12 md:pt-24 md:pb-28 lg:pt-28">
        <div className={aside ? "md:col-span-7" : "md:col-span-10"}>
          <div className="enter" style={stagger(0)}>
            <Eyebrow dark>{eyebrow}</Eyebrow>
          </div>
          <h1
            id="page-title"
            className="display enter mt-7 text-[2.75rem] sm:text-6xl lg:text-[5rem]"
            style={stagger(1)}
          >
            {title}
          </h1>
          <p
            className="lede enter mt-8 max-w-2xl text-lg leading-relaxed text-mist md:text-xl"
            style={stagger(2)}
          >
            {lede}
          </p>
          {actions ? (
            <div className="enter mt-10 flex flex-wrap gap-3" style={stagger(3)}>
              {actions}
            </div>
          ) : null}
        </div>
        {aside ? <div className="enter-fade md:col-span-5 md:self-end">{aside}</div> : null}
      </div>
    </section>
  );
}
