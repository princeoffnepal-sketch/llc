import Link from "next/link";

type Props = { className?: string; asLink?: boolean };

/** Text-only wordmark: geometric "Lami", serif-italic "Ventures", and an accent mark. */
export function Wordmark({ className = "", asLink = true }: Props) {
  const content = (
    <span className={`inline-flex items-baseline gap-[0.28em] leading-none ${className}`}>
      <span className="font-display text-[1.32em] font-semibold tracking-[-0.045em]">Lami</span>
      <span className="font-serif text-[1.4em] italic tracking-[-0.01em]">Ventures</span>
      <span aria-hidden="true" className="ml-[0.05em] inline-block size-[0.36em] translate-y-[-0.05em] bg-accent" />
    </span>
  );
  if (!asLink) return content;
  return (
    <Link href="/" aria-label="Lami Ventures — home" className="rounded-sm">
      {content}
    </Link>
  );
}
