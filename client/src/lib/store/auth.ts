"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "@/lib/data/types";

interface AuthState {
  user: UserProfile | null;
  setUser: (u: UserProfile) => void;
  clear: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (u) => set({ user: u }),
      clear: () => set({ user: null }),
    }),
    { name: "je:auth" },
  ),
);
