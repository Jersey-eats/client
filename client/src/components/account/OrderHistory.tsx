"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, Star } from "lucide-react";
import { getOrders } from "@/lib/data/services/orders";
import { parishName } from "@/lib/data/services/parishes";
import { formatPrice, formatRelative } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/data/types";

const STATUS_COLOURS: Record<OrderStatus, string> = {
  received: "bg-je-blue/15 text-je-blue-navy",
  preparing: "bg-je-blue/15 text-je-blue-navy",
  out_for_delivery: "bg-je-coral/15 text-je-coral",
  delivered: "bg-je-green/15 text-je-green-dark",
  cancelled: "bg-je-grey-light text-je-grey-mid",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  received: "Received",
  preparing: "Preparing",
  out_for_delivery: "On its way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function OrderHistory() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  if (!orders) {
    return (
      <ul className="flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <li key={i} className="h-24 rounded-[var(--r-lg)] border border-line bg-white animate-pulse" />
        ))}
      </ul>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-[var(--r-lg)] border border-line bg-white py-14 text-center">
        <div className="size-14 mx-auto rounded-full bg-je-blue/15 inline-flex items-center justify-center text-xl">🐄</div>
        <p className="mt-4 text-[14px] text-je-grey-mid">No orders yet — let's fix that.</p>
        <Link href="/r" className="mt-4 inline-flex rounded-full bg-ink text-paper px-5 py-2.5 text-[13px] font-medium">
          Browse restaurants →
        </Link>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {orders.map((o) => (
        <li key={o.id} className="rounded-[var(--r-lg)] border border-line bg-white p-5 hover:border-ink transition-colors">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-sans font-bold text-[16px] tracking-[-0.01em]">{o.restaurantName}</h3>
                <span
                  className={`text-[10px] font-semibold tracking-[0.08em] uppercase px-2 py-0.5 rounded-full ${STATUS_COLOURS[o.status]}`}
                >
                  {STATUS_LABEL[o.status]}
                </span>
                {o.rating && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-je-grey-mid">
                    <Star className="size-3 fill-je-amber text-je-amber" />
                    {o.rating.stars}
                  </span>
                )}
              </div>
              <div className="mt-1 text-[12px] text-je-grey-mid">
                <span className="tabular-nums font-mono">{o.orderNumber}</span>
                <span className="mx-2">·</span>
                {formatRelative(o.createdAt)}
                <span className="mx-2">·</span>
                {parishName(o.deliveryAddress.parish)}
              </div>
              <div className="mt-2 text-[12px] text-je-charcoal truncate max-w-[440px]">
                {o.lines.map((l) => `${l.quantity}× ${l.itemName}`).join(" · ")}
              </div>
            </div>
            <div className="flex items-start gap-3 shrink-0">
              <div className="text-right">
                <div className="font-sans font-bold text-[15px] tabular-nums">
                  {formatPrice(o.totalPence)}
                </div>
                <div className="text-[11px] text-je-grey-mid inline-flex items-center gap-1 mt-0.5">
                  <Clock className="size-3" />
                  ETA{" "}
                  {new Date(o.estimatedDeliveryAt).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3.5 pt-3.5 border-t border-line flex flex-wrap items-center justify-between gap-2">
            <Link href={`/order/${o.id}`} className="text-[12px] font-medium text-je-grey-mid hover:text-ink">
              View details →
            </Link>
            <Link
              href={`/r/${o.restaurantSlug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink text-paper px-3.5 py-1.5 text-[12px] font-semibold"
            >
              Reorder <ArrowRight className="size-3" />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
