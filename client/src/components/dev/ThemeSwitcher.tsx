"use client";

import { useEffect, useState } from "react";

type ThemeId = "blue" | "sky" | "forest" | "olive" | "lime" | "amber";

const DEFAULT_THEME: ThemeId = "blue";

const THEMES: { id: ThemeId; label: string; swatch: string }[] = [
  { id: "blue", label: "Blue", swatch: "#397BFF" },
  { id: "sky", label: "Sky", swatch: "#5DBBD7" },
  { id: "forest", label: "Forest", swatch: "#2C6A4F" },
  { id: "olive", label: "Olive", swatch: "#A4C87C" },
  { id: "lime", label: "Lime", swatch: "#6BBC32" },
  { id: "amber", label: "Amber", swatch: "#FEBA00" },
];

/**
 * Demo-only palette switcher. Writes `data-theme` on <html> which is
 * consumed by CSS variable overrides in globals.css. The `sky` variant
 * is the default (no attribute) — it matches the Jersey Eats brand
 * signature blue. Preference persists via `localStorage:je:theme`;
 * the inline bootstrap script in layout.tsx applies it before React
 * hydrates (no FOUC).
 */
export function ThemeSwitcher() {
  const [active, setActive] = useState<ThemeId>(DEFAULT_THEME);

  useEffect(() => {
    const saved = localStorage.getItem("je:theme");
    const valid = THEMES.some((t) => t.id === saved) ? (saved as ThemeId) : DEFAULT_THEME;
    setActive(valid);
    if (valid === DEFAULT_THEME) document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", valid);
  }, []);

  const pick = (t: ThemeId) => {
    setActive(t);
    localStorage.setItem("je:theme", t);
    if (t === DEFAULT_THEME) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", t);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2.5 rounded-full bg-white/95 backdrop-blur border border-line px-3 py-2 shadow-[0_8px_24px_rgba(26,22,20,0.12)]">
      <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-je-grey-mid">
        Theme
      </span>
      <div className="flex items-center gap-1.5">
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => pick(t.id)}
            aria-label={t.label}
            aria-pressed={active === t.id}
            title={t.label}
            className={`size-5 rounded-full transition-all ${
              active === t.id
                ? "ring-2 ring-offset-2 ring-offset-white ring-ink scale-110"
                : "opacity-60 hover:opacity-100 hover:scale-105"
            }`}
            style={{ background: t.swatch }}
          />
        ))}
      </div>
    </div>
  );
}
