"use client";

import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useBasket } from "@/lib/store/basket";
import { formatPrice } from "@/lib/utils";
import type { BasketLine } from "@/lib/data/types";

export function BasketDrawer() {
  const isOpen = useBasket((s) => s.isOpen);
  const close = useBasket((s) => s.close);
  const lines = useBasket((s) => s.lines);
  const updateQty = useBasket((s) => s.updateQty);
  const removeLine = useBasket((s) => s.removeLine);
  const clear = useBasket((s) => s.clear);
  const subtotal = useBasket((s) => s.subtotalPence());

  const groups = useMemo(() => groupByRestaurant(lines), [lines]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-label="Your basket"
            className="absolute right-0 top-0 h-full w-full sm:max-w-[440px] bg-[var(--modal-bg)] flex flex-col shadow-[-24px_0_60px_rgba(26,22,20,0.2)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 36 }}
          >
            <header className="flex items-center justify-between p-5 border-b border-line">
              <h2 className="font-sans font-bold text-[22px] leading-none tracking-[-0.02em]">
                Your basket{" "}
                <span className="text-je-grey-mid font-medium tabular-nums">({lines.length})</span>
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close basket"
                className="size-9 rounded-full border border-line inline-flex items-center justify-center bg-white hover:border-ink transition-colors"
              >
                <X className="size-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5">
              {lines.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-3 text-je-grey-mid py-10">
                  <div className="size-16 rounded-full bg-je-blue/15 inline-flex items-center justify-center text-2xl">
                    🐄
                  </div>
                  <p className="text-[14px]">Nothing here yet — let's find you something delicious.</p>
                  <Link
                    href="/r"
                    onClick={close}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-[13px] font-medium"
                  >
                    Browse restaurants →
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {groups.map((g) => (
                    <section key={g.slug} className="flex flex-col gap-3">
                      <header className="flex items-baseline justify-between gap-3 px-0.5">
                        <h3 className="font-sans font-bold text-[13px] tracking-[-0.01em]">
                          {g.restaurantName}
                        </h3>
                        <span className="text-[10px] uppercase tracking-[0.16em] text-je-grey-mid font-semibold tabular-nums">
                          {g.lines.length} {g.lines.length === 1 ? "item" : "items"}
                        </span>
                      </header>
                      <ul className="flex flex-col gap-3">
                        {g.lines.map((l) => (
                          <li
                            key={l.lineId}
                            className="rounded-[var(--r-md)] border border-line bg-white p-3.5"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="font-sans font-semibold text-[15px] tracking-[-0.01em]">
                                  {l.itemName}
                                </div>
                                {l.modifierSelections.length > 0 && (
                                  <ul className="mt-1.5 flex flex-wrap gap-1">
                                    {l.modifierSelections.map((m) => (
                                      <li
                                        key={m.optionId}
                                        className="text-[11px] text-je-grey-mid px-2 py-0.5 rounded-full bg-je-off-white"
                                      >
                                        {m.optionName}
                                        {m.pricePence > 0 && ` +${formatPrice(m.pricePence)}`}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                              <div className="text-right shrink-0">
                                <div className="font-semibold text-[14px]">{formatPrice(l.totalPence)}</div>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <div className="inline-flex items-center rounded-full border border-line overflow-hidden">
                                <button
                                  type="button"
                                  className="size-8 inline-flex items-center justify-center hover:bg-je-off-white disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                  onClick={() => updateQty(l.lineId, l.quantity - 1)}
                                  disabled={l.quantity <= 1}
                                  aria-label="Decrease"
                                >
                                  <Minus className="size-3.5" />
                                </button>
                                <span className="w-7 text-center text-[13px] font-semibold">{l.quantity}</span>
                                <button
                                  type="button"
                                  className="size-8 inline-flex items-center justify-center hover:bg-je-off-white"
                                  onClick={() => updateQty(l.lineId, l.quantity + 1)}
                                  aria-label="Increase"
                                >
                                  <Plus className="size-3.5" />
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeLine(l.lineId)}
                                className="inline-flex items-center gap-1.5 text-[12px] text-je-coral hover:text-je-coral/80 transition-colors"
                              >
                                <Trash2 className="size-3.5" />
                                Remove
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              )}
            </div>

            {lines.length > 0 && (
              <footer className="border-t border-line p-5 flex flex-col gap-3 bg-white">
                <div className="flex items-center justify-between text-[13px] text-je-grey-mid">
                  <span>Subtotal</span>
                  <span className="font-semibold text-ink">{formatPrice(subtotal)}</span>
                </div>
                <div className="text-[11px] text-je-grey-mid">
                  Delivery & GST calculated at checkout.
                </div>
                <Link
                  href="/checkout"
                  onClick={close}
                  className="inline-flex items-center justify-center rounded-full bg-ink text-paper py-3.5 text-[14px] font-medium"
                >
                  Go to checkout · {formatPrice(subtotal)}
                </Link>
                <button
                  type="button"
                  onClick={clear}
                  className="text-[12px] text-je-grey-mid hover:text-je-coral self-center transition-colors"
                >
                  Clear basket
                </button>
              </footer>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type RestaurantGroup = {
  slug: string;
  restaurantName: string;
  lines: BasketLine[];
};

function groupByRestaurant(lines: BasketLine[]): RestaurantGroup[] {
  const bySlug = new Map<string, RestaurantGroup>();
  for (const l of lines) {
    const g = bySlug.get(l.restaurantSlug);
    if (g) {
      g.lines.push(l);
    } else {
      bySlug.set(l.restaurantSlug, {
        slug: l.restaurantSlug,
        restaurantName: l.restaurantName,
        lines: [l],
      });
    }
  }
  return [...bySlug.values()];
}
