import Link from "next/link";

const CHIPS = [
  { icon: "🍕", label: "Pizza tonight", cuisine: "Pizza" },
  { icon: "🍛", label: "Cosy curry", cuisine: "Indian", emphasis: true },
  { icon: "🐟", label: "Fish & chips", cuisine: "Fish & Chips" },
  { icon: "🥗", label: "Healthy bowls", cuisine: "Healthy" },
];

export function CuisineChips() {
  return (
    <div className="mt-5 flex justify-center gap-2.5 flex-wrap">
      {CHIPS.map((c) => (
        <Link
          key={c.label}
          href={`/r?cuisine=${encodeURIComponent(c.cuisine)}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/70 border border-line px-3.5 py-1.5 text-[12px] font-medium text-je-charcoal hover:bg-white hover:border-ink transition-colors"
        >
          <span aria-hidden>{c.icon}</span>
          {c.emphasis ? (
            <>
              <span className="font-serif italic font-medium text-je-blue-dark">Cosy</span>
              <span>curry</span>
            </>
          ) : (
            c.label
          )}
        </Link>
      ))}
    </div>
  );
}
