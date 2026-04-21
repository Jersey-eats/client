"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useBasket } from "@/lib/store/basket";
import { formatPrice } from "@/lib/utils";

export function BasketDrawer() {
  const isOpen = useBasket((s) => s.isOpen);
  const close = useBasket((s) => s.close);
  const lines = useBasket((s) => s.lines);
  const updateQty = useBasket((s) => s.updateQty);
  const removeLine = useBasket((s) => s.removeLine);
  const clear = useBasket((s) => s.clear);
  const subtotal = useBasket((s) => s.subtotalPence());

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
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-je-grey-mid font-semibold">
                  Your basket
                </div>
                <h2 className="font-sans font-bold text-[22px] leading-none mt-1.5 tracking-[-0.02em]">
                  {lines.length > 0 ? (
                    <>
                      {lines.length} {lines.length === 1 ? "item" : "items"}{" "}
                      <span className="font-serif italic font-medium text-je-blue-dark">ready</span>
                    </>
                  ) : (
                    <>It's <span className="font-serif italic font-medium text-je-blue-dark">empty</span></>
                  )}
                </h2>
              </div>
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
                <ul className="flex flex-col gap-3">
                  {lines.map((l) => (
                    <li
                      key={l.lineId}
                      className="rounded-[var(--r-md)] border border-line bg-white p-3.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[10px] uppercase tracking-[0.16em] text-je-grey-mid font-semibold">
                            {l.restaurantName}
                          </div>
                          <div className="font-sans font-semibold text-[15px] tracking-[-0.01em] mt-0.5">
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
                            className="size-8 inline-flex items-center justify-center hover:bg-je-off-white"
                            onClick={() => updateQty(l.lineId, l.quantity - 1)}
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
                          className="inline-flex items-center gap-1.5 text-[12px] text-je-grey-mid hover:text-je-coral transition-colors"
                        >
                          <Trash2 className="size-3.5" />
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
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
