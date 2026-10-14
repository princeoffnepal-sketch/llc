import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondary-dark" | "ghost-dark";

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-[0.95rem] font-medium tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-quint active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(0_0_0/0.2)] hover:bg-accent-strong",
  secondary: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "secondary-dark": "border border-white/20 text-paper hover:border-paper hover:bg-paper hover:text-ink",
  "ghost-dark": "text-paper hover:text-accent-soft",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`size-4 shrink-0 transition-transform duration-300 ease-out-quint group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
};

export function LinkButton({ variant = "primary", className, children, arrow = true, ...props }: LinkButtonProps) {
  return (
    <Link {...props} className={buttonClasses(variant, className)}>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

/** Inline text link with an animated underline. */
export function TextLink({
  className = "",
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "className"> & { className?: string; children: ReactNode }) {
  return (
    <Link
      {...props}
      className={`group inline-flex items-center gap-2 font-medium underline decoration-current/30 decoration-1 underline-offset-[6px] transition-[text-decoration-color,color] duration-300 hover:decoration-current ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}
