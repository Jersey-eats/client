import { notFound } from "next/navigation";
import { Clock, MapPin, Phone, Star } from "lucide-react";
import { getRestaurantBySlug } from "@/lib/data/services/restaurants";
import { getMenu } from "@/lib/data/services/menu";
import { MenuBrowser } from "@/components/restaurant/MenuBrowser";
import { formatDuration, formatPrice } from "@/lib/utils";

export async function generateMetadata(props: PageProps<"/r/[slug]">) {
  const { slug } = await props.params;
  const r = await getRestaurantBySlug(slug);
  return { title: r ? r.name : "Restaurant" };
}

export default async function MenuPage(props: PageProps<"/r/[slug]">) {
  const { slug } = await props.params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) notFound();

  const menu = await getMenu(slug);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="aspect-[4/1] w-full relative"
          style={{ background: restaurant.heroImage }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
        </div>
        <div className="mx-auto max-w-6xl px-5 sm:px-8 -mt-16 sm:-mt-20 relative z-10">
          <div className="bg-paper border border-line rounded-[var(--r-lg)] p-5 sm:p-6 shadow-[0_24px_50px_rgba(26,22,20,0.08)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-je-blue-navy mb-2">
                  {restaurant.cuisines.join(" · ")}
                </div>
                <h1 className="font-sans font-extrabold text-[32px] sm:text-[42px] leading-[1] tracking-[-0.03em] text-ink">
                  {restaurant.name}
                </h1>
                <p className="mt-2.5 text-[14px] text-je-charcoal/80 max-w-[520px] leading-relaxed">
                  {restaurant.description}
                </p>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0 text-[12px] font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="size-3.5 fill-je-amber text-je-amber" />
                  {restaurant.rating.toFixed(1)}
                  <span className="text-je-grey-mid">· {restaurant.reviewCount} reviews</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5 text-je-blue-navy" />
                  {formatDuration(restaurant.deliveryMins)} delivery
                </span>
                <span className="text-je-grey-mid">
                  Min order {formatPrice(restaurant.minOrderPence)}
                </span>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-line flex flex-wrap gap-x-8 gap-y-2 text-[12px] text-je-charcoal/75">
              <span className="inline-flex items-start gap-2">
                <MapPin className="size-3.5 text-je-blue-navy mt-0.5 shrink-0" />
                {restaurant.address}
              </span>
              <a href={`tel:${restaurant.phone.replace(/\s/g, "")}`} className="inline-flex items-start gap-2 hover:text-ink">
                <Phone className="size-3.5 text-je-blue-navy mt-0.5 shrink-0" />
                {restaurant.phone}
              </a>
              <span className="inline-flex items-start gap-2">
                <Clock className="size-3.5 text-je-blue-navy mt-0.5 shrink-0" />
                {restaurant.hours}
              </span>
            </div>
          </div>
        </div>
      </section>

      <MenuBrowser restaurant={restaurant} menu={menu} />
    </>
  );
}
