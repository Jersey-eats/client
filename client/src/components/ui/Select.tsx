"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** Classes applied to the wrapper div (e.g. `mt-1` for label gap). */
  wrapperClassName?: string;
  "aria-label"?: string;
}

/**
 * Custom dropdown — looks like our text inputs but the listbox is
 * rendered into document.body via a portal and always positioned BELOW
 * the trigger. This avoids native `<select>` quirks (e.g. macOS opening
 * the menu above the field) and escapes stacking contexts from modals.
 */
export function Select({
  value,
  onChange,
  options,
  placeholder = "Select…",
  disabled,
  className,
  wrapperClassName,
  "aria-label": ariaLabel,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const [activeIndex, setActiveIndex] = useState(-1);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
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
      if (triggerRef.current?.contains(t) || listRef.current?.contains(t)) return;
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

  useEffect(() => {
    if (open) {
      const idx = options.findIndex((o) => o.value === value);
      setActiveIndex(idx >= 0 ? idx : 0);
    }
  }, [open, options, value]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < options.length) {
        onChange(options[activeIndex].value);
        setOpen(false);
      }
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  const selected = options.find((o) => o.value === value);

  const popover =
    open && mounted
      ? createPortal(
          <div
            ref={listRef}
            role="listbox"
            aria-label={ariaLabel}
            className="fixed z-[100] rounded-[var(--r-md)] border border-line bg-white shadow-[0_14px_40px_rgba(26,22,20,0.15)] max-h-[280px] overflow-y-auto je-rise"
            style={{ top: pos.top, left: pos.left, width: pos.width }}
          >
            <ul className="py-1.5">
              {options.map((o, i) => {
                const isSelected = o.value === value;
                const isActive = i === activeIndex;
                return (
                  <li key={o.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => {
                        onChange(o.value);
                        setOpen(false);
                        triggerRef.current?.focus();
                      }}
                      className={cn(
                        "w-full text-left flex items-center justify-between gap-2 px-3.5 py-2.5 text-[14px] transition-colors",
                        isSelected
                          ? "bg-ink text-paper"
                          : isActive
                            ? "bg-je-off-white text-ink"
                            : "text-ink hover:bg-je-off-white",
                      )}
                    >
                      <span>{o.label}</span>
                      {isSelected && <Check className="size-4" strokeWidth={3} />}
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
    <div className={cn("relative", wrapperClassName)}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleKey}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className={cn(
          "w-full rounded-[var(--r-md)] border border-line bg-white px-3.5 py-3 pr-10 text-[14px] text-left focus:border-ink outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        )}
      >
        <span className={cn(!selected && "text-je-grey-mid")}>
          {selected ? selected.label : placeholder}
        </span>
      </button>
      <ChevronDown
        aria-hidden
        className={cn(
          "absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-je-grey-mid pointer-events-none transition-transform",
          open && "rotate-180",
        )}
        strokeWidth={2.25}
      />
      {popover}
    </div>
  );
}
