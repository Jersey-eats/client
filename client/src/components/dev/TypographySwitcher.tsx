"use client";

import { useEffect, useState } from "react";

type FontId = "montserrat" | "inter" | "jakarta" | "dm-sans";

const DEFAULT_FONT: FontId = "montserrat";

const FONTS: { id: FontId; label: string; cssFamily: string }[] = [
  { id: "montserrat", label: "Montserrat", cssFamily: "var(--font-montserrat)" },
  { id: "inter", label: "Inter", cssFamily: "var(--font-inter)" },
  { id: "jakarta", label: "Plus Jakarta Sans", cssFamily: "var(--font-jakarta)" },
  { id: "dm-sans", label: "DM Sans", cssFamily: "var(--font-dm-sans)" },
];

/**
 * Demo-only typography switcher. Writes `data-typography` on <html>
 * which is consumed by CSS overrides in globals.css. The decorative
 * italic (Fraunces / .font-serif) is untouched — only the sans/heading
 * font family changes.
 */
export function TypographySwitcher() {
  const [active, setActive] = useState<FontId>(DEFAULT_FONT);

  useEffect(() => {
    const saved = localStorage.getItem("je:typography");
    const valid = FONTS.some((f) => f.id === saved) ? (saved as FontId) : DEFAULT_FONT;
    setActive(valid);
    if (valid === DEFAULT_FONT) document.documentElement.removeAttribute("data-typography");
    else document.documentElement.setAttribute("data-typography", valid);
  }, []);

  const pick = (f: FontId) => {
    setActive(f);
    localStorage.setItem("je:typography", f);
    if (f === DEFAULT_FONT) {
      document.documentElement.removeAttribute("data-typography");
    } else {
      document.documentElement.setAttribute("data-typography", f);
    }
  };

  return (
    <div className="fixed bottom-5 left-[260px] z-50 inline-flex items-center gap-2.5 rounded-full bg-white/95 backdrop-blur border border-line px-3 py-2 shadow-[0_8px_24px_rgba(26,22,20,0.12)]">
      <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-je-grey-mid">
        Type
      </span>
      <div className="flex items-center gap-1">
        {FONTS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => pick(f.id)}
            aria-label={f.label}
            aria-pressed={active === f.id}
            title={f.label}
            className={`min-w-[34px] h-[26px] rounded-full px-2.5 text-[13px] font-semibold transition-all leading-none inline-flex items-center justify-center ${
              active === f.id
                ? "bg-ink text-paper ring-2 ring-offset-2 ring-offset-white ring-ink"
                : "bg-je-off-white text-ink opacity-70 hover:opacity-100"
            }`}
            style={{ fontFamily: f.cssFamily }}
          >
            Aa
          </button>
        ))}
      </div>
    </div>
  );
}
