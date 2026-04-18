const STATS = [
  { num: "30+", label: "Restaurants" },
  { num: "12", label: "Parishes" },
  { num: "4.8★", label: "Avg rating" },
  { num: "<30m", label: "Delivery" },
] as const;

export function TrustStats() {
  return (
    <div className="mt-14 pt-9 border-t border-line flex flex-wrap justify-center gap-8 sm:gap-16">
      {STATS.map((s) => (
        <div key={s.label} className="text-center">
          <div className="font-serif italic font-medium text-[34px] leading-none tracking-[-0.02em] text-ink">
            {s.num}
          </div>
          <div className="mt-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-je-grey-mid">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
