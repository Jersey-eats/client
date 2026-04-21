"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { getOrders } from "@/lib/data/services/orders";
import { getRestaurants } from "@/lib/data/services/restaurants";
import { useAuth } from "@/lib/store/auth";
import { formatPrice, formatRelative } from "@/lib/utils";
import type { Order } from "@/lib/data/types";

export function RecentOrders() {
  const user = useAuth((s) => s.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!user) return;
    Promise.all([getOrders(), getRestaurants()]).then(([all, restaurants]) => {
      setOrders(all.slice(0, 3));
      const map: Record<string, boolean> = {};
      restaurants.forEach((r) => {
        map[r.slug] = r.openNow;
      });
      setOpenMap(map);
    });
  }, [user]);

  if (!user || orders.length === 0) return null;

  return (
    <section className="bg-paper border-t border-line py-12 sm:py-14">
      <Container>
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-je-blue-navy mb-2.5">
              Welcome back
            </div>
            <h2 className="font-sans font-extrabold text-[22px] sm:text-[28px] leading-none tracking-[-0.025em]">
              Your <span className="font-serif italic font-medium text-je-blue-dark">recent</span> orders
            </h2>
          </div>
          <Link
            href="/account/orders"
            className="hidden sm:inline-flex items-center gap-1.5 text-[13px] text-ink font-medium hover:gap-2.5 transition-all"
          >
            All orders <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <ul className="flex gap-3.5 overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3">
          {orders.map((o) => {
            const isOpen = openMap[o.restaurantSlug] ?? true;
            return (
              <li
                key={o.id}
                className="shrink-0 w-[280px] sm:w-auto rounded-[var(--r-md)] border border-line bg-white hover:border-ink transition-colors overflow-hidden"
              >
                <Link href={`/r/${o.restaurantSlug}`} className="block p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className={`font-sans font-bold text-[15px] tracking-[-0.01em] truncate ${!isOpen ? "text-je-grey-mid" : ""}`}>
                      {o.restaurantName}
                    </div>
                    {isOpen ? (
                      <span className="shrink-0 text-[10px] text-je-grey-mid uppercase tracking-[0.1em] font-semibold">
                        {formatRelative(o.createdAt)}
                      </span>
                    ) : (
                      <span className="shrink-0 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] font-semibold bg-je-coral/10 text-je-coral px-2 py-0.5 rounded-full">
                        <Clock className="size-2.5" strokeWidth={2.5} />
                        Closed
                      </span>
                    )}
                  </div>
                  <div className={`mt-1 text-[12px] truncate ${!isOpen ? "text-je-grey-mid/70" : "text-je-grey-mid"}`}>
                    {o.lines.map((l) => `${l.quantity}× ${l.itemName}`).join(" · ")}
                  </div>
                  <div className="mt-3.5 flex items-center justify-between">
                    <span className={`text-[13px] font-semibold tabular-nums ${!isOpen ? "text-je-grey-mid" : ""}`}>
                      {formatPrice(o.totalPence)}
                    </span>
                    {isOpen ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink text-paper px-3.5 py-1.5 text-[11px] font-semibold">
                        Reorder →
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-line text-je-grey-mid px-3.5 py-1.5 text-[11px] font-semibold">
                        View menu
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
