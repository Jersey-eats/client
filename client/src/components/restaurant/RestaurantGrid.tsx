"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useParish } from "@/lib/store/parish";
import { parishName } from "@/lib/data/services/parishes";
import { getRestaurants } from "@/lib/data/services/restaurants";
import { RestaurantCard } from "./RestaurantCard";
import type { RestaurantCard as TCard } from "@/lib/data/types";

export function RestaurantGrid() {
  const parish = useParish((s) => s.parish);
  const search = useSearchParams();
  const cuisine = search.get("cuisine") ?? undefined;
  const openNow = search.get("open") === "1";
  const sort = (search.get("sort") as "top_rated" | "fastest") ?? "top_rated";

  const [rows, setRows] = useState<TCard[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await getRestaurants({
        parish: parish ?? undefined,
        openNow,
        cuisine,
        sort,
      });
      if (!cancelled) setRows(data);
    })();
    return () => {
      cancelled = true;
    };
  }, [parish, cuisine, openNow, sort]);

  if (rows === null) {
    return (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 py-8">
        {[...Array(6)].map((_, i) => (
          <li
            key={i}
            className="rounded-[var(--r-lg)] border border-line bg-white overflow-hidden"
          >
            <div className="aspect-[16/10] bg-je-off-white animate-pulse" />
            <div className="p-4 flex flex-col gap-2">
              <div className="h-4 w-3/5 rounded bg-je-off-white animate-pulse" />
              <div className="h-3 w-2/5 rounded bg-je-off-white animate-pulse" />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="size-16 mx-auto rounded-full bg-je-blue/15 inline-flex items-center justify-center text-2xl">
          🐄
        </div>
        <h3 className="mt-5 font-sans font-bold text-[22px] tracking-[-0.02em]">
          No restaurants delivering{" "}
          {parish ? (
            <>
              to <span className="font-serif italic text-je-blue-dark">{parishName(parish)}</span>
            </>
          ) : (
            "here yet"
          )}
          .
        </h3>
        <p className="mt-2 text-[13px] text-je-grey-mid max-w-[320px] mx-auto">
          Try another parish, or check back at peak times — kitchens open and close around the island.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 py-8 je-fade">
      {rows.map((r) => (
        <li key={r.id}>
          <RestaurantCard r={r} />
        </li>
      ))}
    </ul>
  );
}
