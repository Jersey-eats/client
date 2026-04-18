import { Container } from "@/components/layout/Container";

const STEPS = [
  {
    n: "01",
    title: "Pick your parish",
    copy: "We filter the whole island down to the restaurants that actually deliver to you — no GPS-radius guesswork.",
  },
  {
    n: "02",
    title: "Choose your food",
    copy: "Browse menus, customise extras, build your basket. No account needed to look.",
  },
  {
    n: "03",
    title: "We bring it over",
    copy: "Pay in a tap, track the cow, enjoy. Reordering your favourite is two taps next time.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how" className="bg-paper py-16 sm:py-24">
      <Container>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 sm:mb-14">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-je-blue-navy mb-3">
              How it works
            </div>
            <h2 className="font-sans font-extrabold text-[28px] sm:text-[40px] leading-[1] tracking-[-0.03em] text-ink max-w-[440px]">
              Three taps to <span className="font-serif italic font-medium text-je-blue-dark">dinner.</span>
            </h2>
          </div>
          <p className="text-[13px] text-je-grey-mid max-w-[320px] leading-relaxed">
            Jersey Eats is built for the way the island actually works — parish by parish, kitchen by kitchen.
          </p>
        </div>

        <ol className="grid gap-6 sm:gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className="group relative rounded-[var(--r-lg)] border border-line bg-white p-6 sm:p-7 hover:border-ink transition-colors"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif italic font-medium text-[34px] leading-none text-je-blue-dark">
                  {s.n}
                </span>
                <span className="flex-1 border-t border-line" />
              </div>
              <h3 className="font-sans font-bold text-[19px] tracking-[-0.015em] mb-2">
                {s.title}
              </h3>
              <p className="text-[13px] text-je-charcoal/75 leading-relaxed">{s.copy}</p>
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden
                  className="hidden md:block absolute top-1/2 -right-2.5 -translate-y-1/2 size-5 rounded-full bg-paper border border-line text-je-grey-mid items-center justify-center text-[10px] flex"
                >
                  →
                </div>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
