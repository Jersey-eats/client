import Link from "next/link";
import { Clock, Star } from "lucide-react";
import type { RestaurantCard as TRestaurantCard } from "@/lib/data/types";
import { formatDuration, formatPrice } from "@/lib/utils";

export function RestaurantCard({ r }: { r: TRestaurantCard }) {
  return (
    <Link
      href={`/r/${r.slug}`}
      className={`group relative flex flex-col rounded-[var(--r-lg)] border border-line bg-white overflow-hidden transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_16px_40px_rgba(26,22,20,0.08)] ${
        r.openNow ? "" : "opacity-65"
      }`}
    >
      <div
        className="aspect-[16/10] relative"
        style={{ background: r.heroImage }}
        aria-hidden
      >
        {r.popular && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.12em] uppercase bg-white/85 backdrop-blur-sm text-ink px-2.5 py-1 rounded-full">
            Popular
          </span>
        )}
        <span className="absolute top-3 right-3 text-[11px] font-semibold text-ink bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-full inline-flex items-center gap-1">
          <Star className="size-3 fill-je-amber text-je-amber" /> {r.rating.toFixed(1)}
        </span>
        {!r.openNow && (
          <span className="absolute bottom-3 left-3 text-[11px] font-semibold tracking-[0.08em] uppercase bg-ink text-paper px-2.5 py-1 rounded-full">
            Closed
          </span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-sans font-bold text-[16px] tracking-[-0.01em] text-ink group-hover:text-je-blue-navy transition-colors">
            {r.name}
          </h3>
        </div>
        <div className="mt-1 text-[12px] text-je-grey-mid">
          {r.cuisines.join(" · ")}
          {r.reviewCount ? <span className="ml-1">· {r.reviewCount} reviews</span> : null}
        </div>
        <div className="mt-3 flex items-center justify-between text-[12px] text-je-charcoal/80">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-je-blue-navy" />
            {formatDuration(r.deliveryMins)}
          </span>
          <span className="tabular-nums">
            {formatPrice(r.feePence)} delivery
          </span>
          <span className="text-je-grey-mid">Min {formatPrice(r.minOrderPence)}</span>
        </div>
      </div>
    </Link>
  );
}
