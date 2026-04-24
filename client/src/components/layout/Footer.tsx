"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "./Container";

/**
 * Global footer. On /checkout the full link grid is swapped for a
 * minimal bottom band — same treatment as the nav up top, so the user
 * stays focused on finishing their order and doesn't get distracted by
 * escape routes.
 */
export function Footer() {
  const pathname = usePathname();
  const isCheckout = pathname?.startsWith("/checkout");

  if (isCheckout) {
    return (
      <footer className="mt-12 bg-ink text-paper/70">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] tracking-[0.1em] uppercase">
          <span>© 2026 Jersey Eats · Channel Islands</span>
          <span className="font-serif italic normal-case tracking-normal text-paper/55">
            Secure checkout — your card details never touch our servers
          </span>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="mt-12 bg-ink text-paper/90">
      <Container className="py-14 grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Logo className="text-paper [&>span]:text-paper" />
          <p className="mt-4 text-[13px] leading-relaxed max-w-[260px] text-paper/60">
            The island's food, delivered well. A Jersey-built delivery marketplace, parish by parish.
          </p>
        </div>
        <FooterCol title="Jersey Eats" links={[
          { href: "/r", label: "Restaurants" },
          { href: "/#how", label: "How it works" },
          { href: "/account/orders", label: "Orders" },
          { href: "/account", label: "Account" },
        ]} />
        <FooterCol title="Support" links={[
          { href: "/#help", label: "Help centre" },
          { href: "mailto:support@jerseyeats.je", label: "support@jerseyeats.je" },
          { href: "tel:+441534123123", label: "01534 123 123" },
        ]} />
        <FooterCol title="Legal" links={[
          { href: "#", label: "Terms" },
          { href: "#", label: "Privacy" },
          { href: "#", label: "Cookies" },
          { href: "#", label: "For restaurants" },
        ]} />
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-paper/40 tracking-[0.1em] uppercase">
          <span>© 2026 Jersey Eats · Channel Islands</span>
          <span className="font-serif italic normal-case tracking-normal text-paper/60">
            Made with love by teacode.io
          </span>
        </Container>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="text-[10px] font-semibold tracking-[0.18em] text-paper/50 uppercase mb-3.5">
        {title}
      </div>
      <ul className="space-y-2.5 text-[13px]">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-paper/80 hover:text-paper transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
