import { MOCK_RESTAURANTS } from "../mock/restaurants";
import type { ParishCode, Restaurant, RestaurantCard } from "../types";

export interface DiscoveryFilters {
  parish?: ParishCode;
  openNow?: boolean;
  cuisine?: string; // single selected cuisine; 'all' = no filter
  sort?: "top_rated" | "fastest";
}

/**
 * @backend Supabase query:
 *   supabase
 *     .from('restaurants')
 *     .select('*, delivery_zones!inner(parish, fee_pence, min_order_pence)')
 *     .eq('active', true)
 *     .contains('delivery_zones.parish', [filters.parish])
 *   Apply cuisine filter: `.contains('cuisines', [filters.cuisine])`
 *   Apply openNow: `.eq('open_now', true)`
 *   Sort by rating desc or delivery_mins asc.
 * @params filters — parish, open-now, cuisine, sort
 * @returns Card-projected restaurant list with parish-specific fee/min.
 */
export async function getRestaurants(filters: DiscoveryFilters = {}): Promise<RestaurantCard[]> {
  let rows = [...MOCK_RESTAURANTS];

  if (filters.parish) {
    rows = rows.filter((r) => r.deliveryZones.some((z) => z.parish === filters.parish));
  }
  if (filters.openNow) {
    rows = rows.filter((r) => r.openNow);
  }
  if (filters.cuisine && filters.cuisine !== "all") {
    rows = rows.filter((r) =>
      r.cuisines.some((c) => c.toLowerCase() === filters.cuisine?.toLowerCase()),
    );
  }

  const sort = filters.sort ?? "top_rated";
  if (sort === "top_rated") rows.sort((a, b) => b.rating - a.rating);
  if (sort === "fastest") rows.sort((a, b) => a.deliveryMins - b.deliveryMins);

  // Closed always render last (per docs)
  rows.sort((a, b) => Number(b.openNow) - Number(a.openNow));

  return rows.map((r) => {
    const zone = filters.parish
      ? r.deliveryZones.find((z) => z.parish === filters.parish)
      : r.deliveryZones[0];
    return {
      id: r.id,
      slug: r.slug,
      name: r.name,
      cuisines: r.cuisines,
      heroImage: r.heroImage,
      rating: r.rating,
      reviewCount: r.reviewCount,
      deliveryMins: r.deliveryMins,
      feePence: zone?.feePence ?? 0,
      minOrderPence: zone?.minOrderPence ?? r.minOrderPence,
      openNow: r.openNow,
      popular: r.popular,
    } satisfies RestaurantCard;
  });
}

/**
 * @backend supabase.from('restaurants').select('*').eq('slug', slug).single()
 */
export async function getRestaurantBySlug(slug: string): Promise<Restaurant | null> {
  return MOCK_RESTAURANTS.find((r) => r.slug === slug) ?? null;
}

/**
 * All cuisines across the catalogue — used for filter chips.
 * @backend SELECT DISTINCT unnest(cuisines) FROM restaurants;
 */
export async function getCuisines(): Promise<string[]> {
  const all = new Set<string>();
  MOCK_RESTAURANTS.forEach((r) => r.cuisines.forEach((c) => all.add(c)));
  return Array.from(all).sort();
}
