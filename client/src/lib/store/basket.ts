"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BasketLine } from "@/lib/data/types";

interface BasketState {
  lines: BasketLine[];
  isOpen: boolean;
  addLine: (line: BasketLine) => void;
  updateQty: (lineId: string, qty: number) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  /** Derived */
  itemCount: () => number;
  subtotalPence: () => number;
  /** Returns the (only) restaurant slug in basket, or null if mixed/empty. */
  restaurantSlug: () => string | null;
}

export const useBasket = create<BasketState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      addLine: (line) => {
        const existing = get().lines.find(
          (l) =>
            l.itemId === line.itemId &&
            JSON.stringify(l.modifierSelections) === JSON.stringify(line.modifierSelections),
        );
        if (existing) {
          const newQty = existing.quantity + line.quantity;
          const newTotal =
            (existing.basePricePence +
              existing.modifierSelections.reduce((s, m) => s + m.pricePence, 0)) *
            newQty;
          set({
            lines: get().lines.map((l) =>
              l.lineId === existing.lineId ? { ...l, quantity: newQty, totalPence: newTotal } : l,
            ),
            isOpen: true,
          });
        } else {
          set({ lines: [...get().lines, line], isOpen: true });
        }
      },
      updateQty: (lineId, qty) => {
        if (qty <= 0) {
          set({ lines: get().lines.filter((l) => l.lineId !== lineId) });
          return;
        }
        set({
          lines: get().lines.map((l) => {
            if (l.lineId !== lineId) return l;
            const unit =
              l.basePricePence + l.modifierSelections.reduce((s, m) => s + m.pricePence, 0);
            return { ...l, quantity: qty, totalPence: unit * qty };
          }),
        });
      },
      removeLine: (lineId) =>
        set({ lines: get().lines.filter((l) => l.lineId !== lineId) }),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
      itemCount: () => get().lines.reduce((n, l) => n + l.quantity, 0),
      subtotalPence: () => get().lines.reduce((s, l) => s + l.totalPence, 0),
      restaurantSlug: () => {
        const slugs = new Set(get().lines.map((l) => l.restaurantSlug));
        if (slugs.size === 1) return [...slugs][0];
        return null;
      },
    }),
    {
      name: "je:basket",
      partialize: (s) => ({ lines: s.lines }),
    },
  ),
);
