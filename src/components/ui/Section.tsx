import type { ReactNode } from "react";

type Tone = "light" | "tint" | "dark";

const tones: Record<Tone, string> = {
  light: "bg-paper text-ink",
  tint: "bg-paper-2 text-ink",
  dark: "on-dark bg-ink text-paper",
};

export function Section({
  tone = "light",
  id,
  className = "",
  labelledBy,
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} ${className}`}>
      <div className="container-page py-20 md:py-28 lg:py-32">{children}</div>
    </section>
  );
}

/** Eyebrow with an index number, e.g. "01 — Divisions". */
export function Eyebrow({
  index,
  children,
  dark = false,
  className = "",
}: {
  index?: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${dark ? "text-mist" : "text-muted"} ${className}`}>
      {index ? <span className={dark ? "text-accent-soft" : "text-accent"}>{index}</span> : null}
      {index ? <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" /> : null}
      <span>{children}</span>
    </p>
  );
}

export function SectionHeader({
  id,
  index,
  eyebrow,
  title,
  intro,
  dark = false,
  className = "",
}: {
  id: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div data-reveal className={`grid gap-8 md:grid-cols-12 md:gap-10 ${className}`}>
      <div className="md:col-span-7">
        <Eyebrow index={index} dark={dark}>
          {eyebrow}
        </Eyebrow>
        <h2 id={id} className="display mt-6 text-[2.4rem] sm:text-5xl lg:text-[3.6rem]">
          {title}
        </h2>
      </div>
      {intro ? (
        <div className="md:col-span-5 md:self-end">
          <p className={`lede text-lg leading-relaxed ${dark ? "text-mist" : "text-muted"}`}>{intro}</p>
        </div>
      ) : null}
    </div>
  );
}
