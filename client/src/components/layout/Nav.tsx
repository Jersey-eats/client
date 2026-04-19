"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, Menu, User, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "./Container";
import { cn } from "@/lib/utils";
import { useParish } from "@/lib/store/parish";
import { parishName } from "@/lib/data/services/parishes";
import { NavParishPicker } from "./NavParishPicker";
import { useAuth } from "@/lib/store/auth";

/**
 * L-style two-zone minimal nav on cream backdrop with blur.
 * Shows the selected parish as an editable badge once the user has chosen one.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const parish = useParish((s) => s.parish);
  const user = useAuth((s) => s.user);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300",
        "backdrop-blur-[14px] supports-[backdrop-filter]:bg-mist/70 bg-mist",
        scrolled
          ? "border-b border-[color:rgba(27,110,138,0.18)] shadow-[0_2px_20px_rgba(20,26,30,0.05)]"
          : "border-b border-[color:rgba(27,110,138,0.08)]",
      )}
    >
      <Container className="flex items-center justify-between py-3.5 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-5">
          <Logo size={48} />
          <NavParishPicker />
        </div>

        <nav className="hidden md:flex items-center gap-5 text-[13px] font-medium text-je-charcoal">
          <Link href="/r" className="hover:text-ink transition-colors">Restaurants</Link>
          {user && <Link href="/account/orders" className="hover:text-ink transition-colors">Orders</Link>}
          <Link href="/#help" className="hover:text-ink transition-colors">Help</Link>
          {user ? (
            <Link
              href="/account"
              className="inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 text-[13px] font-medium text-ink hover:bg-ink hover:text-paper transition-colors"
            >
              <User className="size-3.5" />
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 text-[13px] font-medium text-ink hover:bg-ink hover:text-paper transition-colors"
            >
              <User className="size-3.5" />
              Sign in
            </Link>
          )}
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className="md:hidden inline-flex size-9 items-center justify-center rounded-full border border-line bg-white/60"
        >
          <Menu className="size-4" />
        </button>
      </Container>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-[360px] bg-mist p-6 flex flex-col gap-4 je-rise">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="size-9 rounded-full border border-line inline-flex items-center justify-center bg-white"
              >
                <X className="size-4" />
              </button>
            </div>
            <hr className="border-line" />
            {parish && (
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-white border border-line px-3 py-1.5 text-[13px] font-medium">
                <MapPin className="size-3.5 text-je-blue-navy" />
                {parishName(parish)}
              </div>
            )}
            <nav className="flex flex-col gap-1.5 text-[17px] font-semibold text-ink mt-2">
              <Link href="/r" onClick={() => setMobileOpen(false)} className="py-2">Restaurants</Link>
              {user && <Link href="/account/orders" onClick={() => setMobileOpen(false)} className="py-2">Orders</Link>}
              {user && <Link href="/account" onClick={() => setMobileOpen(false)} className="py-2">Account</Link>}
              <Link href="/#help" onClick={() => setMobileOpen(false)} className="py-2">Help</Link>
            </nav>
            <div className="mt-auto flex flex-col gap-2.5">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-ink text-paper py-3 text-[14px] font-medium"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-ink py-3 text-[14px] font-medium"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
