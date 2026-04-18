"use client";

import { useEffect, useState } from "react";
import type { OrderStatus } from "@/lib/data/types";

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: "received", label: "Received" },
  { key: "preparing", label: "Preparing" },
  { key: "out_for_delivery", label: "On its way" },
  { key: "delivered", label: "Delivered" },
];

export function OrderTracker({ status }: { status: OrderStatus }) {
  // Advance status locally for demo effect (mock data doesn't progress server-side)
  const [current, setCurrent] = useState<OrderStatus>(status);

  useEffect(() => {
    if (status === "delivered" || status === "cancelled") return;
    const sequence: OrderStatus[] = ["received", "preparing", "out_for_delivery", "delivered"];
    let idx = sequence.indexOf(current);
    const timer = setInterval(() => {
      idx = Math.min(idx + 1, sequence.length - 1);
      setCurrent(sequence[idx]);
      if (idx === sequence.length - 1) clearInterval(timer);
    }, 6000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeIdx = STEPS.findIndex((s) => s.key === current);

  return (
    <ol className="relative">
      <div className="absolute left-3 top-3 bottom-3 w-[2px] bg-line rounded-full" />
      <div
        className="absolute left-3 top-3 w-[2px] bg-ink rounded-full transition-all duration-700"
        style={{ height: `calc(${(activeIdx / (STEPS.length - 1)) * 100}% - 1.5rem)` }}
      />
      {STEPS.map((s, i) => {
        const done = i <= activeIdx;
        const isCurrent = i === activeIdx;
        return (
          <li key={s.key} className="relative pl-10 pb-7 last:pb-0">
            <span
              className={`absolute left-0 top-0 size-[26px] rounded-full inline-flex items-center justify-center text-[10px] font-semibold transition-colors ${
                done ? "bg-ink text-paper" : "bg-white text-je-grey-mid border border-line"
              }`}
            >
              {done ? "✓" : i + 1}
              {isCurrent && (
                <span className="absolute inset-0 rounded-full bg-ink animate-ping opacity-30" />
              )}
            </span>
            <div>
              <div
                className={`font-sans font-semibold text-[14px] tracking-[-0.01em] ${
                  done ? "text-ink" : "text-je-grey-mid"
                }`}
              >
                {s.label}
              </div>
              <div className="text-[12px] text-je-grey-mid mt-0.5">
                {i === 0 && "We've told the restaurant you're hungry."}
                {i === 1 && "Your food is being cooked — good things take minutes."}
                {i === 2 && "Your driver is heading your way."}
                {i === 3 && "Enjoy!"}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
