import { MOCK_ORDERS } from "../mock/orders";
import type { BasketLine, Order } from "../types";
import type { ParishCode } from "../types";

// In-memory runtime store for orders placed in this session
const SESSION_ORDERS: Order[] = [];

export interface PlaceOrderInput {
  restaurantId: string;
  restaurantName: string;
  restaurantSlug: string;
  lines: BasketLine[];
  subtotalPence: number;
  deliveryFeePence: number;
  gstPence: number;
  totalPence: number;
  paymentMethod: Order["paymentMethod"];
  deliveryAddress: {
    line1: string;
    line2?: string;
    parish: ParishCode;
    postcode?: string;
    note?: string;
  };
  contact: { phone: string; email: string };
}

/**
 * @backend
 *   supabase.rpc('place_order', { ... })  — server-side function that inserts
 *   into orders + order_lines atomically, applies payment intent, returns row.
 */
export async function placeOrder(input: PlaceOrderInput): Promise<Order> {
  const id = `o-${Date.now()}`;
  const order: Order = {
    id,
    orderNumber: `JE-${String(Math.floor(1000 + Math.random() * 9000))}`,
    createdAt: new Date().toISOString(),
    estimatedDeliveryAt: new Date(Date.now() + 30 * 60_000).toISOString(),
    status: "received",
    ...input,
  };
  SESSION_ORDERS.unshift(order);
  return order;
}

/**
 * @backend supabase.from('orders').select('*, order_lines(*)').eq('user_id', userId).order('created_at', { ascending: false })
 */
export async function getOrders(): Promise<Order[]> {
  return [...SESSION_ORDERS, ...MOCK_ORDERS];
}

/**
 * @backend supabase.from('orders').select('*, order_lines(*)').eq('id', id).single()
 */
export async function getOrder(id: string): Promise<Order | null> {
  return [...SESSION_ORDERS, ...MOCK_ORDERS].find((o) => o.id === id) ?? null;
}

/**
 * @backend supabase.from('orders').update({ rating_stars, rating_comment }).eq('id', id)
 */
export async function rateOrder(id: string, stars: number, comment?: string): Promise<void> {
  const target = [...SESSION_ORDERS, ...MOCK_ORDERS].find((o) => o.id === id);
  if (target) target.rating = { stars, comment };
}
