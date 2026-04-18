"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Props {
  cuisines: string[];
}

export function DiscoveryFiltersBar({ cuisines }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const activeCuisine = search.get("cuisine") ?? "all";
  const openNow = search.get("open") === "1";
  const sort = (search.get("sort") as "top_rated" | "fastest") ?? "top_rated";

  const push = (next: URLSearchParams) => {
    const qs = next.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(search.toString());
    if (value == null) next.delete(key);
    else next.set(key, value);
    push(next);
  };

  return (
    <div className="sticky top-[64px] z-30 bg-paper/90 backdrop-blur-md border-b border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-3.5 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => setParam("open", openNow ? null : "1")}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-medium transition-colors ${
            openNow
              ? "bg-ink text-paper border-ink"
              : "bg-white text-ink border-line hover:border-ink"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${openNow ? "bg-je-blue" : "bg-je-green"} je-pulse`}
          />
          Open now
        </button>

        <div className="inline-flex rounded-full border border-line bg-white overflow-hidden">
          <button
            type="button"
            onClick={() => setParam("sort", "top_rated")}
            className={`px-3.5 py-2 text-[12px] font-medium ${sort === "top_rated" ? "bg-ink text-paper" : "hover:bg-je-off-white"}`}
          >
            Top rated
          </button>
          <button
            type="button"
            onClick={() => setParam("sort", "fastest")}
            className={`px-3.5 py-2 text-[12px] font-medium ${sort === "fastest" ? "bg-ink text-paper" : "hover:bg-je-off-white"}`}
          >
            Fastest
          </button>
        </div>

        <div className="flex-1 basis-full sm:basis-0 min-w-0 overflow-x-auto no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
          <div className="inline-flex gap-2">
            <button
              type="button"
              onClick={() => setParam("cuisine", null)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-medium border ${
                activeCuisine === "all"
                  ? "bg-ink text-paper border-ink"
                  : "bg-white text-ink border-line hover:border-ink"
              }`}
            >
              All
            </button>
            {cuisines.map((c) => {
              const active = c.toLowerCase() === activeCuisine.toLowerCase();
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setParam("cuisine", c)}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-medium border ${
                    active
                      ? "bg-ink text-paper border-ink"
                      : "bg-white text-ink border-line hover:border-ink"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
