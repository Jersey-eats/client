const FOOD_IMAGES = [
  { url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=360&q=80", alt: "Pizza" },
  { url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=360&q=80", alt: "Curry" },
  { url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=360&q=80", alt: "Burger" },
  { url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=360&q=80", alt: "Healthy bowl" },
  { url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=360&q=80", alt: "Sushi" },
  { url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=360&q=80", alt: "Fish & chips" },
  { url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=360&q=80", alt: "Fresh salad" },
  { url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=360&q=80", alt: "Pizza slices" },
  { url: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=360&q=80", alt: "Pasta" },
  { url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=360&q=80", alt: "Noodles" },
];

/**
 * Decorative auto-scrolling marquee of food photos for the hero.
 * Doubles the image list so the track loops seamlessly (the keyframe
 * translates -50%, landing exactly on the start of the second copy).
 * Hover pauses the animation — see `.je-marquee-track` in globals.css.
 */
export function FoodMarquee() {
  const items = [...FOOD_IMAGES, ...FOOD_IMAGES];
  return (
    <div
      aria-hidden
      className="relative overflow-hidden w-full"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="je-marquee-track flex gap-3 w-max py-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="h-[120px] w-[160px] sm:h-[220px] sm:w-[300px] shrink-0 rounded-[var(--r-md)] overflow-hidden shadow-[0_6px_20px_rgba(20,26,30,0.10)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.url}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
