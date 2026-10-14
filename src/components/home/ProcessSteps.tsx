const steps = [
  {
    title: "Connect",
    body: "Send a short note through the contact form: what you’re working on, what you need, or what you have to offer.",
  },
  {
    title: "Explore the fit",
    body: "We talk through goals, scope, and constraints, and are direct about whether we’re the right partner for it.",
  },
  {
    title: "Define next steps",
    body: "If it makes sense to move forward, we agree on a clear plan — a proposal, a trial order, or a first milestone.",
  },
];

export function ProcessSteps({ dark = false }: { dark?: boolean }) {
  return (
    <ol className="relative grid gap-0 md:grid-cols-3">
      {steps.map((step, i) => (
        <li
          key={step.title}
          data-reveal
          data-reveal-delay={i * 0.08}
          className={`relative border-t py-8 md:pr-10 ${dark ? "border-white/15" : "border-ink/15"}`}
        >
          <span
            aria-hidden="true"
            className={`absolute -top-[5px] left-0 size-[9px] rounded-full ${
              i === 0 ? "bg-accent" : dark ? "bg-ink ring-1 ring-white/40" : "bg-paper ring-1 ring-ink/40"
            }`}
          />
          <p className={`font-mono text-xs ${dark ? "text-accent-soft" : "text-accent"}`}>Step 0{i + 1}</p>
          <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.025em] md:text-[1.7rem]">{step.title}</h3>
          <p className={`mt-3 max-w-sm leading-relaxed ${dark ? "text-mist" : "text-muted"}`}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
