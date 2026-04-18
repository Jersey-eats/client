import type { BasketLine } from "./menu";
import type { ParishCode } from "./parish";

export type OrderStatus = "received" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";

/**
 * @backend Supabase table: public.orders
 */
export interface Order {
  id: string;
  orderNumber: string; // e.g. "JE-2841"
  restaurantId: string;
  restaurantName: string;
  restaurantSlug: string;
  createdAt: string;
  estimatedDeliveryAt: string;
  deliveredAt?: string;
  status: OrderStatus;
  lines: BasketLine[];
  subtotalPence: number;
  deliveryFeePence: number;
  gstPence: number; // Jersey GST 5%
  totalPence: number;
  paymentMethod: "apple_pay" | "google_pay" | "card";
  deliveryAddress: {
    line1: string;
    line2?: string;
    parish: ParishCode;
    postcode?: string;
    note?: string;
  };
  contact: { phone: string; email: string };
  rating?: { stars: number; comment?: string };
}
