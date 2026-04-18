"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useBasket } from "@/lib/store/basket";
import { formatPrice } from "@/lib/utils";
import type { BasketLine, MenuItem, ModifierGroup, ModifierOption } from "@/lib/data/types";

interface Props {
  item: MenuItem;
  restaurant: { id: string; slug: string; name: string };
  open: boolean;
  onClose: () => void;
}

type Selections = Record<string /* groupId */, string[] /* optionIds */>;

/**
 * Modifier popup per UX playbook §2.3 and product docs §2.3.
 * Supports required + optional groups, min/max selections, and live price rollup.
 */
export function ModifierPopup({ item, restaurant, open, onClose }: Props) {
  const addLine = useBasket((s) => s.addLine);

  const [selections, setSelections] = useState<Selections>({});
  const [qty, setQty] = useState(1);

  // Reset whenever a new item is opened
  useEffect(() => {
    if (!open) return;
    const initial: Selections = {};
    for (const g of item.modifierGroups) {
      // Auto-select first option if required + single-select
      if (g.required && g.maxSelections === 1 && g.options.length > 0) {
        initial[g.id] = [g.options[0].id];
      } else {
        initial[g.id] = [];
      }
    }
    setSelections(initial);
    setQty(1);
  }, [item, open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const { valid, unitPence } = useMemo(() => {
    let valid = true;
    let add = 0;
    for (const g of item.modifierGroups) {
      const chosen = selections[g.id] ?? [];
      if (g.required && chosen.length < g.minSelections) valid = false;
      if (chosen.length > g.maxSelections) valid = false;
      for (const id of chosen) {
        const opt = g.options.find((o) => o.id === id);
        if (opt) add += opt.pricePence;
      }
    }
    return { valid, unitPence: item.pricePence + add };
  }, [item, selections]);

  const totalPence = unitPence * qty;

  const toggle = (g: ModifierGroup, o: ModifierOption) => {
    setSelections((prev) => {
      const current = prev[g.id] ?? [];
      const exists = current.includes(o.id);
      if (g.maxSelections === 1) {
        return { ...prev, [g.id]: exists ? [] : [o.id] };
      }
      if (exists) return { ...prev, [g.id]: current.filter((id) => id !== o.id) };
      if (current.length >= g.maxSelections) return prev;
      return { ...prev, [g.id]: [...current, o.id] };
    });
  };

  const addToBasket = () => {
    if (!valid) return;
    const mods = item.modifierGroups.flatMap((g) =>
      (selections[g.id] ?? []).map((id) => {
        const o = g.options.find((x) => x.id === id)!;
        return {
          groupId: g.id,
          groupName: g.name,
          optionId: o.id,
          optionName: o.name,
          pricePence: o.pricePence,
        };
      }),
    );
    const line: BasketLine = {
      lineId: `${item.id}-${Date.now()}`,
      itemId: item.id,
      itemName: item.name,
      restaurantId: restaurant.id,
      restaurantSlug: restaurant.slug,
      restaurantName: restaurant.name,
      quantity: qty,
      basePricePence: item.pricePence,
      modifierSelections: mods,
      totalPence,
    };
    addLine(line);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-labelledby="modifier-title"
            className="relative w-full sm:max-w-[520px] bg-paper rounded-t-[28px] sm:rounded-[var(--r-lg)] max-h-[92vh] flex flex-col shadow-[0_-24px_60px_rgba(26,22,20,0.25)]"
            initial={{ y: "100%", opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
          >
            <div className="p-5 sm:p-6 border-b border-line flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-je-grey-mid">
                  {restaurant.name}
                </div>
                <h2
                  id="modifier-title"
                  className="mt-1 font-sans font-bold text-[22px] tracking-[-0.02em] leading-[1.1]"
                >
                  {item.name}
                </h2>
                <p className="mt-1.5 text-[13px] text-je-charcoal/75 leading-relaxed">{item.description}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="size-9 shrink-0 rounded-full border border-line bg-white inline-flex items-center justify-center hover:border-ink transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {item.modifierGroups.length === 0 && (
                <p className="text-[13px] text-je-grey-mid italic font-serif">
                  No extras — just the classic.
                </p>
              )}
              {item.modifierGroups.map((g) => (
                <fieldset key={g.id}>
                  <legend className="flex items-center justify-between w-full mb-3">
                    <span className="font-sans font-semibold text-[14px] tracking-[-0.01em]">
                      {g.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-je-grey-mid font-semibold">
                      {g.required ? "Required" : "Optional"} · up to {g.maxSelections}
                    </span>
                  </legend>
                  <ul className="flex flex-col gap-2">
                    {g.options.map((o) => {
                      const selected = (selections[g.id] ?? []).includes(o.id);
                      return (
                        <li key={o.id}>
                          <button
                            type="button"
                            onClick={() => toggle(g, o)}
                            className={`w-full flex items-center justify-between gap-4 p-3.5 rounded-[var(--r-md)] border text-left transition-colors ${
                              selected
                                ? "bg-ink text-paper border-ink"
                                : "bg-white text-ink border-line hover:border-ink"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={`size-5 rounded-full border-[1.5px] inline-flex items-center justify-center ${
                                  selected ? "border-paper bg-je-blue text-ink" : "border-line"
                                }`}
                              >
                                {selected && <Check className="size-3" strokeWidth={3} />}
                              </span>
                              <span className="text-[14px] font-medium">{o.name}</span>
                            </span>
                            <span className={`text-[13px] tabular-nums ${selected ? "text-paper/80" : "text-je-grey-mid"}`}>
                              {o.pricePence > 0 ? `+${formatPrice(o.pricePence)}` : "Included"}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </fieldset>
              ))}
            </div>

            <footer className="border-t border-line p-5 sm:p-6 bg-white flex items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-line overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease"
                  className="size-10 inline-flex items-center justify-center hover:bg-je-off-white"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-8 text-center text-[14px] font-semibold tabular-nums">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  aria-label="Increase"
                  className="size-10 inline-flex items-center justify-center hover:bg-je-off-white"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={addToBasket}
                disabled={!valid}
                className="flex-1 inline-flex items-center justify-between gap-2 rounded-full bg-ink text-paper px-5 py-3.5 text-[14px] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a221f] transition-colors"
              >
                <span>Add to basket</span>
                <span className="tabular-nums">{formatPrice(totalPence)}</span>
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
