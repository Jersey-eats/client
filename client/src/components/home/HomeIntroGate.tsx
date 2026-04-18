"use client";

import { useEffect, useState } from "react";
import { useParish } from "@/lib/store/parish";

/**
 * Returning-visitor shortcut (per UX playbook §2.1):
 * If a parish is already persisted, show a subtle "continue" hint above the hero
 * rather than wholly bypassing the landing page. Full redirect is opt-in by tapping.
 */
export function HomeIntroGate() {
  const parish = useParish((s) => s.parish);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !parish) return null;
  return null; // decorative only — returning-user strip handles the real shortcut
}
