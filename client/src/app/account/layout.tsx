"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Lock, Receipt, User } from "lucide-react";

const NAV = [
  { href: "/account", label: "Profile", icon: User },
  { href: "/account/orders", label: "Orders", icon: Receipt },
  { href: "/account/security", label: "Security", icon: Lock },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <section className="bg-paper py-10 sm:py-14">
      <Container>
        <div className="mb-8 sm:mb-10">
          <div className="text-[10px] font-semibold tracking-[0.22em] uppercase text-je-blue-navy mb-2.5">
            Your account
          </div>
          <h1 className="font-sans font-extrabold text-[32px] sm:text-[44px] leading-[0.95] tracking-[-0.03em]">
            Hello <span className="font-serif italic font-medium text-je-blue-dark">again.</span>
          </h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] items-start">
          <aside className="lg:sticky lg:top-[80px]">
            <nav className="flex lg:flex-col gap-1 rounded-[var(--r-lg)] lg:bg-white lg:border lg:border-line lg:p-2 overflow-x-auto no-scrollbar">
              {NAV.map((n) => {
                const Icon = n.icon;
                const active = pathname === n.href;
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`inline-flex items-center gap-2.5 rounded-[var(--r-md)] px-3.5 py-2.5 text-[13px] font-medium shrink-0 transition-colors ${
                      active
                        ? "bg-ink text-paper"
                        : "hover:bg-je-off-white text-ink border border-line lg:border-transparent"
                    }`}
                  >
                    <Icon className="size-4" />
                    {n.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
          <div>{children}</div>
        </div>
      </Container>
    </section>
  );
}
