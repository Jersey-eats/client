"use client";

import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { useBasket } from "@/lib/store/basket";
import { formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";

/**
 * Persistent bottom bar shown on mobile when the basket has any items,
 * per UX playbook §2.4. Tapping opens the drawer. Hidden on /checkout
 * where the user is already reviewing and finalising the basket.
 */
export function BasketStickyBar() {
  const pathname = usePathname();
  const count = useBasket((s) => s.itemCount());
  const subtotal = useBasket((s) => s.subtotalPence());
  const open = useBasket((s) => s.open);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || count === 0) return null;
  if (pathname?.startsWith("/checkout")) return null;

  return (
    <button
      type="button"
      onClick={open}
      className="fixed bottom-4 left-4 right-4 z-30 md:left-auto md:right-6 md:bottom-6 md:w-[360px] rounded-full bg-ink text-paper shadow-[0_16px_40px_rgba(26,22,20,0.25)] pl-5 pr-2 py-2 flex items-center justify-between gap-3 je-rise"
      aria-label="Open basket"
    >
      <span className="inline-flex items-center gap-2.5">
        <span className="relative inline-flex size-7 items-center justify-center rounded-full bg-je-blue text-ink">
          <ShoppingBag className="size-3.5" />
        </span>
        <span className="text-[13px] font-medium">
          {count} {count === 1 ? "item" : "items"} · {formatPrice(subtotal)}
        </span>
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-paper text-ink px-3.5 py-1.5 text-[12px] font-semibold">
        View basket →
      </span>
    </button>
  );
}
