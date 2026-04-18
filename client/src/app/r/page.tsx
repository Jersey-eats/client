import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { DiscoveryFiltersBar } from "@/components/restaurant/DiscoveryFiltersBar";
import { RestaurantGrid } from "@/components/restaurant/RestaurantGrid";
import { InlineParishPicker } from "@/components/restaurant/InlineParishPicker";
import { getCuisines } from "@/lib/data/services/restaurants";

export const metadata = { title: "Restaurants" };

export default async function DiscoveryPage() {
  const cuisines = await getCuisines();

  return (
    <>
      <section className="bg-gradient-to-b from-mist to-paper pt-8 sm:pt-14 pb-4 sm:pb-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div
            className="je-blob"
            style={{ background: "var(--je-blue)", width: 280, height: 280, top: -60, right: -40, opacity: 0.45 }}
          />
        </div>
        <Container className="relative z-10">
          <div className="text-[10px] font-semibold tracking-[0.24em] uppercase text-je-blue-navy mb-3">
            Discover
          </div>
          <h1 className="font-sans font-extrabold text-[32px] sm:text-[44px] leading-[0.95] tracking-[-0.03em] text-ink">
            Tonight in <InlineParishPicker />
          </h1>
          <p className="mt-3 text-[13px] sm:text-[14px] text-je-charcoal/75 max-w-[460px]">
            All restaurants that deliver to your parish. Open kitchens first, closed at the bottom.
          </p>
        </Container>
      </section>

      <Suspense>
        <DiscoveryFiltersBar cuisines={cuisines} />
      </Suspense>

      <Container>
        <Suspense>
          <RestaurantGrid />
        </Suspense>
      </Container>
    </>
  );
}
