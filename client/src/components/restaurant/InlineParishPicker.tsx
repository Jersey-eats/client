"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MOCK_PARISHES } from "@/lib/data/mock/parishes";
import { useParish } from "@/lib/store/parish";
import { parishName } from "@/lib/data/services/parishes";
import type { ParishCode } from "@/lib/data/types";

/**
 * Inline, italic, underlined parish name that opens a popover to switch parish.
 * Renders the popover in a portal on document.body so it escapes any parent
 * stacking context (sticky filter bars, overflow-hidden wrappers, etc.).
 * Used inside the Discovery page H1 — e.g. "Tonight in {ParishPicker}."
 */
export function InlineParishPicker() {
  const parish = useParish((s) => s.parish);
  const setParish = useParish((s) => s.setParish);
  const clearParish = useParish((s) => s.clear);

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 320 });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Recompute position whenever the popover opens, on scroll, and on resize.
  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const width = Math.max(320, Math.min(360, window.innerWidth - 32));
      let left = rect.left;
      if (left + width > window.innerWidth - 16) {
        left = Math.max(16, window.innerWidth - width - 16);
      }
      setPos({ top: rect.bottom + 10, left, width });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || popoverRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (code: ParishCode) => {
    setParish(code);
    setOpen(false);
  };

  const label = mounted && parish ? parishName(parish) : "the island";

  const popover =
    open && mounted
      ? createPortal(
          <div
            ref={popoverRef}
            role="dialog"
            aria-label="Choose parish"
            className="fixed z-[100] rounded-[var(--r-lg)] border border-line bg-white shadow-[0_24px_60px_rgba(26,22,20,0.18)] p-2.5 je-rise"
            style={{ top: pos.top, left: pos.left, width: pos.width }}
          >
            <div className="flex items-center justify-between px-2 pt-1 pb-2">
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-je-grey-mid">
                Change parish
              </span>
              {parish && (
                <button
                  type="button"
                  onClick={() => {
                    clearParish();
                    setOpen(false);
                  }}
                  className="text-[12px] font-medium text-je-grey-mid hover:text-ink px-2 py-1 -mr-2 rounded-md hover:bg-je-off-white transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <ul
              role="listbox"
              aria-label="Parishes"
              className="grid grid-cols-2 gap-1 max-h-[360px] overflow-y-auto"
            >
              {MOCK_PARISHES.map((p) => {
                const active = parish === p.code;
                return (
                  <li key={p.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => select(p.code)}
                      className={`w-full text-left px-3 py-2.5 rounded-[var(--r-sm)] flex items-center justify-between gap-2 transition-colors ${
                        active ? "bg-ink text-paper" : "hover:bg-je-off-white text-ink"
                      }`}
                    >
                      <span className="text-[13px] font-sans font-medium not-italic tracking-normal">
                        {p.name}
                      </span>
                      <span
                        className={`text-[11px] font-sans not-italic tabular-nums ${
                          active ? "text-paper/60" : "text-je-grey-mid"
                        }`}
                      >
                        {p.restaurantCount}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="group font-serif italic font-medium tracking-normal text-je-blue-dark inline-flex items-baseline gap-1.5 underline decoration-je-blue-dark/35 decoration-[2px] underline-offset-[6px] hover:decoration-je-blue-dark hover:text-je-blue-navy transition-colors focus-visible:outline-none focus-visible:decoration-je-blue-navy"
      >
        <span>{label}.</span>
        <ChevronDown
          className={`size-[0.55em] shrink-0 self-center translate-y-[-0.05em] text-je-blue-dark/70 group-hover:text-je-blue-navy transition-transform ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2.5}
        />
      </button>
      {popover}
    </>
  );
}
