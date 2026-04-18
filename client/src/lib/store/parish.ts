"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ParishCode } from "@/lib/data/types";

interface ParishState {
  parish: ParishCode | null;
  setParish: (p: ParishCode) => void;
  clear: () => void;
}

export const useParish = create<ParishState>()(
  persist(
    (set) => ({
      parish: null,
      setParish: (p) => set({ parish: p }),
      clear: () => set({ parish: null }),
    }),
    { name: "je:parish" },
  ),
);
