import type { ParishCode } from "./parish";

/**
 * @backend Supabase table: public.restaurants
 */
export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  description: string;
  cuisines: string[];
  heroImage: string; // URL or gradient hint
  logo: string;
  rating: number; // 0–5
  reviewCount: number;
  deliveryMins: number; // estimate
  minOrderPence: number;
  address: string;
  phone: string;
  hours: string;
  gstNumber?: string;
  taxNote?: string;
  deliveryZones: DeliveryZone[];
  openNow: boolean;
  popular: boolean;
}

export interface DeliveryZone {
  parish: ParishCode;
  feePence: number;
  minOrderPence: number;
}

/** Card projection for grids (thinner payload) */
export interface RestaurantCard {
  id: string;
  slug: string;
  name: string;
  cuisines: string[];
  heroImage: string;
  rating: number;
  reviewCount: number;
  deliveryMins: number;
  feePence: number;
  minOrderPence: number;
  openNow: boolean;
  popular: boolean;
}
