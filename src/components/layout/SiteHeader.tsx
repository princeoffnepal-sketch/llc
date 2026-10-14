"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="on-dark sticky top-0 z-40 border-b border-white/[0.07] bg-ink text-paper">
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Wordmark className="text-[1.05rem]" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const active = pathname === item.href;
              if (item.href === "/contact") return null;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 text-[0.92rem] transition-colors duration-300 ${
                      active ? "text-paper" : "text-mist hover:text-paper"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-accent-soft transition-transform duration-500 ease-out-quint ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className="inline-flex min-h-10 items-center rounded-full border border-white/20 px-5 text-[0.92rem] font-medium transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink"
          >
            Contact
          </Link>
        </div>

        <MobileNav pathname={pathname} />
      </div>
    </header>
  );
}
