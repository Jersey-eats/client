"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { MOCK_PARISHES } from "@/lib/data/mock/parishes";
import { useParish } from "@/lib/store/parish";
import { parishName } from "@/lib/data/services/parishes";
import type { ParishCode } from "@/lib/data/types";

/**
 * The O-style pill-shaped outlined parish bar.
 * On submit: persists selection, pushes /r (discovery) so the user sees
 * restaurants filtered by their parish.
 */
export function ParishBar() {
  const router = useRouter();
  const parish = useParish((s) => s.parish);
  const setParish = useParish((s) => s.setParish);
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!popoverRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const handleBrowse = () => {
    router.push("/r");
  };

  const handleSelect = (code: ParishCode) => {
    setParish(code);
    setOpen(false);
  };

  const label = parish ? parishName(parish) : "Select your parish";

  return (
    <div className="relative max-w-[480px] mx-auto w-full" ref={popoverRef}>
      <div className="bg-white border-[1.5px] border-ink rounded-full p-[7px] pl-6 flex items-center gap-4 shadow-[0_10px_30px_rgba(26,22,20,0.08)]">
        <MapPin className="size-[18px] shrink-0 text-je-blue-navy" />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex-1 min-w-0 text-left"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <div className="text-[10px] tracking-[0.14em] uppercase text-je-grey-mid font-semibold">
            Delivering to
          </div>
          <div className="font-sans font-semibold text-[15px] tracking-[-0.01em] flex items-center gap-1.5 truncate">
            {label}
            <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
        </button>
        <button
          type="button"
          onClick={handleBrowse}
          disabled={!parish}
          className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-3 text-[13px] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a221f] transition-colors"
        >
          Browse restaurants
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 bg-white border border-line rounded-[var(--r-lg)] shadow-[0_24px_50px_rgba(26,22,20,0.12)] p-2 je-rise">
          <ul role="listbox" aria-label="Parishes" className="max-h-[340px] overflow-y-auto grid grid-cols-2 gap-1">
            {MOCK_PARISHES.map((p) => {
              const active = parish === p.code;
              return (
                <li key={p.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => handleSelect(p.code)}
                    className={`w-full text-left px-3 py-2.5 rounded-[var(--r-sm)] flex items-center justify-between gap-2 transition-colors ${
                      active ? "bg-ink text-paper" : "hover:bg-je-off-white text-ink"
                    }`}
                  >
                    <span className="text-[13px] font-medium">{p.name}</span>
                    <span className={`text-[11px] ${active ? "text-paper/60" : "text-je-grey-mid"}`}>
                      {p.restaurantCount}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
