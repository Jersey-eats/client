"use client";

import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MOCK_PARISHES } from "@/lib/data/mock/parishes";
import { useParish } from "@/lib/store/parish";
import { parishName } from "@/lib/data/services/parishes";
import type { ParishCode } from "@/lib/data/types";

/**
 * Nav-bar parish pill: shows selected parish with a chevron, opens a portal
 * dropdown so it escapes the sticky header's stacking context.
 */
export function NavParishPicker() {
  const parish = useParish((s) => s.parish);
  const setParish = useParish((s) => s.setParish);

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 300 });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const width = Math.max(260, Math.min(320, window.innerWidth - 32));
      let left = rect.left;
      if (left + width > window.innerWidth - 16) {
        left = Math.max(16, window.innerWidth - width - 16);
      }
      setPos({ top: rect.bottom + 8, left, width });
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

  if (!mounted || !parish) return null;

  const popover = open
    ? createPortal(
        <div
          ref={popoverRef}
          role="dialog"
          aria-label="Choose parish"
          className="fixed z-[100] rounded-[var(--r-lg)] border border-line bg-white shadow-[0_24px_60px_rgba(26,22,20,0.18)] p-2.5 je-rise"
          style={{ top: pos.top, left: pos.left, width: pos.width }}
        >
          <div className="px-2 pt-1 pb-2">
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-je-grey-mid">
              Choose parish
            </span>
          </div>
          <ul role="listbox" aria-label="Parishes" className="grid grid-cols-2 gap-1 max-h-[320px] overflow-y-auto">
            {MOCK_PARISHES.map((p) => {
              const active = parish === p.code;
              return (
                <li key={p.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setParish(p.code as ParishCode);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-[var(--r-sm)] flex items-center justify-between gap-2 transition-colors ${
                      active ? "bg-ink text-paper" : "hover:bg-je-off-white text-ink"
                    }`}
                  >
                    <span className="text-[13px] font-medium">{p.name}</span>
                    <span className={`text-[11px] tabular-nums ${active ? "text-paper/60" : "text-je-grey-mid"}`}>
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
        className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-white/60 border border-line px-3 py-1.5 text-[12px] font-medium text-ink hover:bg-white transition-colors"
      >
        <MapPin className="size-3.5 text-je-blue-navy shrink-0" />
        <span>{parishName(parish)}</span>
        <ChevronDown
          className={`size-3 text-je-grey-mid transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={2.5}
        />
      </button>
      {popover}
    </>
  );
}
