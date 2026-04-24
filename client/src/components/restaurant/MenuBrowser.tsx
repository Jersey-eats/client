"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import type { MenuCategory, MenuItem, Restaurant } from "@/lib/data/types";
import { formatPrice } from "@/lib/utils";
import { ModifierPopup } from "./ModifierPopup";

interface Props {
  restaurant: Restaurant;
  menu: MenuCategory[];
}

export function MenuBrowser({ restaurant, menu }: Props) {
  const [active, setActive] = useState<string>(menu[0]?.id ?? "");
  const [popupItem, setPopupItem] = useState<MenuItem | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the top-most entry that's in view.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive((visible[0].target as HTMLElement).dataset.categoryId ?? active);
      },
      { rootMargin: "-140px 0px -50% 0px", threshold: 0 },
    );
    Object.values(sectionRefs.current).forEach((n) => n && io.observe(n));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu.length]);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      {menu.length > 1 && (
        <div className="sticky top-[76px] sm:top-[80px] z-30 bg-paper/90 backdrop-blur-md border-b border-line">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-3">
              {menu.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => scrollTo(c.id)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors border ${
                    active === c.id
                      ? "bg-ink text-paper border-ink"
                      : "bg-white text-ink border-line hover:border-ink"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-24">
        {menu.map((c) => (
          <section
            key={c.id}
            ref={(el) => {
              sectionRefs.current[c.id] = el;
            }}
            data-category-id={c.id}
            className="pt-10"
          >
            <header className="flex items-baseline mb-5 gap-2">
              <h2 className="font-sans font-extrabold text-[24px] sm:text-[28px] tracking-[-0.025em]">
                {c.name}
              </h2>
              <span className="text-[14px] font-medium text-je-grey-mid tabular-nums">
                ({c.items.length})
              </span>
            </header>
            <ul className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {c.items.map((it) => (
                <li key={it.id}>
                  <button
                    type="button"
                    onClick={() => setPopupItem(it)}
                    className="group w-full h-full text-left flex gap-4 items-start rounded-[var(--r-lg)] border border-line bg-white p-4 hover:border-ink hover:shadow-[0_10px_24px_rgba(26,22,20,0.06)] transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-sans font-bold text-[15px] tracking-[-0.01em] truncate">
                          {it.name}
                        </h3>
                        {it.dietary && it.dietary.length > 0 && (
                          <ul className="flex gap-1">
                            {it.dietary.map((d) => (
                              <li
                                key={d}
                                className="text-[9px] font-semibold tracking-[0.08em] uppercase bg-je-off-white text-je-grey-mid px-1.5 py-0.5 rounded-full"
                              >
                                {d}
                              </li>
                            ))}
                          </ul>
                        )}
                        {it.popular && (
                          <span className="text-[9px] font-semibold tracking-[0.12em] uppercase bg-je-blue/15 text-je-blue-navy px-1.5 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[12px] text-je-grey-mid leading-relaxed line-clamp-2">
                        {it.description}
                      </p>
                      <div className="mt-3">
                        <span className="text-[14px] font-semibold tabular-nums">
                          {formatPrice(it.pricePence)}
                        </span>
                      </div>
                    </div>
                    <div className="size-[88px] shrink-0 rounded-[var(--r-md)] bg-gradient-to-br from-je-blue/10 to-je-tan relative overflow-hidden">
                      {it.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={it.image}
                          alt={it.name}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      )}
                      <span className="absolute bottom-1.5 right-1.5 size-7 rounded-full bg-ink text-paper inline-flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="size-3.5" />
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <ModifierPopup
        item={popupItem ?? { id: "", name: "", description: "", pricePence: 0, modifierGroups: [] }}
        restaurant={{ id: restaurant.id, slug: restaurant.slug, name: restaurant.name, openNow: restaurant.openNow, hours: restaurant.hours }}
        open={popupItem != null}
        onClose={() => setPopupItem(null)}
      />
    </>
  );
}
