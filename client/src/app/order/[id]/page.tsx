import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { OrderTracker } from "@/components/order/OrderTracker";
import { RatingPrompt } from "@/components/order/RatingPrompt";
import { getOrder } from "@/lib/data/services/orders";
import { parishName } from "@/lib/data/services/parishes";
import { formatPrice } from "@/lib/utils";
import type { OrderStatus } from "@/lib/data/types";

const STATUS_LABEL: Record<OrderStatus, string> = {
  received: "Order placed",
  preparing: "Preparing",
  out_for_delivery: "On its way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const metadata = { title: "Order confirmed" };

export default async function OrderPage(props: PageProps<"/order/[id]">) {
  const { id } = await props.params;
  const order = await getOrder(id);
  if (!order) notFound();

  const eta = new Date(order.estimatedDeliveryAt);

  return (
    <section className="bg-paper py-10 sm:py-14 relative overflow-hidden">
      <div className="je-blob" style={{ background: "var(--je-blue)", width: 300, height: 300, top: -80, left: -60, opacity: 0.4 }} />
      <div className="je-blob" style={{ background: "var(--je-blue)", width: 260, height: 260, top: 40, right: -60, opacity: 0.25 }} />

      <Container className="relative z-10">
        <div className="max-w-[720px]">
          <div className="inline-flex items-center gap-2 bg-je-green/15 text-je-green-dark px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase mb-5">
            <span className="size-1.5 rounded-full bg-je-green je-pulse" />
            {STATUS_LABEL[order.status]}
          </div>
          <h1 className="font-sans font-extrabold text-[34px] sm:text-[54px] leading-[0.95] tracking-[-0.03em]">
            Nice one. <span className="font-serif italic font-medium text-je-blue-dark">Sit tight.</span>
          </h1>
          <p className="mt-4 text-[14px] text-je-charcoal/75 max-w-[420px] leading-relaxed">
            Order No. <strong className="text-ink">{order.orderNumber}</strong> — estimated delivery around{" "}
            <strong className="text-ink">
              {eta.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
            </strong>
            .
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_400px] items-start">
          <div className="flex flex-col gap-5">
            <div className="rounded-[var(--r-lg)] border border-line bg-white p-5 sm:p-6">
              <h2 className="font-sans font-bold text-[16px] tracking-[-0.01em] mb-5 flex items-center justify-between">
                Tracking
                <span
                  className="group relative inline-flex items-center gap-1.5 text-[11px] font-medium text-je-grey-mid cursor-help"
                  tabIndex={0}
                >
                  <Clock className="size-3.5" /> ~{Math.max(1, Math.round((eta.getTime() - Date.now()) / 60_000))} min
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute right-0 top-full mt-2 w-[220px] rounded-[var(--r-md)] bg-ink text-paper text-[11px] font-normal leading-relaxed px-3 py-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 transition-all duration-150 shadow-lg z-10 normal-case tracking-normal"
                  >
                    Estimated time until the driver arrives with your order.
                  </span>
                </span>
              </h2>
              <OrderTracker status={order.status} />
            </div>

            <div className="rounded-[var(--r-lg)] border border-line bg-white p-5 sm:p-6">
              <h2 className="font-sans font-bold text-[16px] tracking-[-0.01em] mb-4">Details</h2>
              <div className="flex flex-wrap gap-5 text-[12px] text-je-charcoal/80">
                <span className="inline-flex items-start gap-2">
                  <MapPin className="size-3.5 text-je-blue-navy mt-0.5" />
                  <span>
                    {order.deliveryAddress.line1}
                    {order.deliveryAddress.line2 ? `, ${order.deliveryAddress.line2}` : ""}
                    <br />
                    {parishName(order.deliveryAddress.parish)}
                    {order.deliveryAddress.postcode ? ` · ${order.deliveryAddress.postcode}` : ""}
                  </span>
                </span>
                {order.deliveryAddress.note && (
                  <span className="italic font-serif text-je-grey-mid">
                    "{order.deliveryAddress.note}"
                  </span>
                )}
              </div>
            </div>

            {order.status === "delivered" && (
              <RatingPrompt orderId={order.id} initialStars={order.rating?.stars} />
            )}
          </div>

          <aside className="rounded-[var(--r-lg)] border border-line bg-white p-5 sm:p-6">
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-je-blue-navy">
              Your order
            </div>
            <h2 className="mt-1.5 font-sans font-bold text-[18px] tracking-[-0.015em]">
              {order.restaurantName}
            </h2>
            <ul className="mt-4 flex flex-col gap-3 pb-4 border-b border-line">
              {order.lines.map((l) => (
                <li key={l.lineId} className="flex gap-2 text-[13px]">
                  <span className="text-je-grey-mid tabular-nums shrink-0">{l.quantity}×</span>
                  <span className="flex-1 min-w-0">
                    <span className="block">{l.itemName}</span>
                    {l.modifierSelections.length > 0 && (
                      <span className="block text-[11px] text-je-grey-mid">
                        {l.modifierSelections.map((m) => m.optionName).join(" · ")}
                      </span>
                    )}
                  </span>
                  <span className="tabular-nums font-semibold shrink-0">{formatPrice(l.totalPence)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-1.5 text-[13px]">
              <div className="flex justify-between"><dt className="text-je-grey-mid">Subtotal</dt><dd className="tabular-nums">{formatPrice(order.subtotalPence)}</dd></div>
              <div className="flex justify-between"><dt className="text-je-grey-mid">Delivery</dt><dd className="tabular-nums">{formatPrice(order.deliveryFeePence)}</dd></div>
              <div className="flex justify-between"><dt className="text-je-grey-mid">GST (5%)</dt><dd className="tabular-nums">{formatPrice(order.gstPence)}</dd></div>
            </dl>
            <div className="mt-4 pt-4 border-t border-line flex items-baseline justify-between">
              <span className="font-sans font-semibold text-[13px] uppercase tracking-[0.12em] text-je-grey-mid">Total</span>
              <span className="font-sans font-extrabold text-[22px] tabular-nums">{formatPrice(order.totalPence)}</span>
            </div>
            <div className="mt-5 flex flex-col gap-2.5">
              <Link href="/account/orders" className="inline-flex items-center justify-center gap-2 rounded-full border border-ink text-ink px-5 py-3 text-[13px] font-medium">
                View all orders
              </Link>
              <Link href="/r" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-paper px-5 py-3 text-[13px] font-medium">
                Order again
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
