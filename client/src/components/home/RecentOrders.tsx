import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { getOrders } from "@/lib/data/services/orders";
import { getCurrentUser } from "@/lib/data/services/auth";
import { formatPrice, formatRelative } from "@/lib/utils";

/**
 * Server component — pulls recent orders from the service layer.
 * Only rendered for signed-in users (per UX playbook §2.1 — returning-visitor shortcut).
 */
export async function RecentOrders() {
  const user = await getCurrentUser();
  if (!user) return null;

  const orders = await getOrders();
  const recent = orders.slice(0, 3);
  if (recent.length === 0) return null;

  return (
    <section className="bg-paper border-t border-line py-12 sm:py-14">
      <Container>
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-je-blue-navy mb-2.5">
              Welcome back
            </div>
            <h2 className="font-sans font-extrabold text-[22px] sm:text-[28px] leading-none tracking-[-0.025em]">
              Your <span className="font-serif italic font-medium text-je-blue-dark">recent</span> orders
            </h2>
          </div>
          <Link
            href="/account/orders"
            className="hidden sm:inline-flex items-center gap-1.5 text-[13px] text-ink font-medium hover:gap-2.5 transition-all"
          >
            All orders <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <ul className="flex gap-3.5 overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3">
          {recent.map((o) => (
            <li
              key={o.id}
              className="shrink-0 w-[280px] sm:w-auto rounded-[var(--r-md)] border border-line bg-white hover:border-ink transition-colors overflow-hidden"
            >
              <Link href={`/r/${o.restaurantSlug}`} className="block p-4">
                <div className="flex items-center justify-between">
                  <div className="font-sans font-bold text-[15px] tracking-[-0.01em] truncate">
                    {o.restaurantName}
                  </div>
                  <span className="text-[10px] text-je-grey-mid uppercase tracking-[0.1em] font-semibold">
                    {formatRelative(o.createdAt)}
                  </span>
                </div>
                <div className="mt-1 text-[12px] text-je-grey-mid truncate">
                  {o.lines.map((l) => `${l.quantity}× ${l.itemName}`).join(" · ")}
                </div>
                <div className="mt-3.5 flex items-center justify-between">
                  <span className="text-[13px] font-semibold">{formatPrice(o.totalPence)}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink text-paper px-3.5 py-1.5 text-[11px] font-semibold">
                    Reorder →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
