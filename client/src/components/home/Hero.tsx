import { AtmosphereBlobs } from "./AtmosphereBlobs";
import { ParishBar } from "./ParishBar";
import { TrustStats } from "./TrustStats";
import { CuisineChips } from "./CuisineChips";
import { Container } from "@/components/layout/Container";

/**
 * The K × O × L hero. This is the locked visual direction.
 *
 *  - K · Inter 800 display type, Fraunces italic accent on one phrase
 *  - O · Centered hero, blurred tan/blue/coral atmosphere blobs,
 *        pill-shaped outlined parish bar, trust-signal stats row in Fraunces italic
 *  - L · Minimal nav lives in <Nav/> outside this hero
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist to-paper">
      <AtmosphereBlobs />

      <Container className="relative z-10 pt-16 pb-14 sm:pt-24 sm:pb-20 text-center">
        <div
          className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.24em] uppercase text-je-blue-navy mb-7 je-rise"
          style={{ animationDelay: "60ms" }}
        >
          <span aria-hidden className="w-7 h-px bg-je-blue-navy opacity-50" />
          Local · Jersey · Delivered
          <span aria-hidden className="w-7 h-px bg-je-blue-navy opacity-50" />
        </div>

        <h1
          className="font-sans font-extrabold text-ink text-[44px] sm:text-[64px] lg:text-[78px] leading-[0.95] tracking-[-0.04em] je-rise"
          style={{ animationDelay: "120ms" }}
        >
          Jersey's food,
          <br />
          <span className="font-serif italic font-medium text-je-blue-dark">delivered well.</span>
        </h1>

        <p
          className="mt-6 sm:mt-7 text-[15px] sm:text-[17px] leading-relaxed text-je-charcoal/75 max-w-[480px] mx-auto je-rise"
          style={{ animationDelay: "200ms" }}
        >
          30+ island kitchens across all 12 parishes. Pick where you are — we'll show you what's open tonight.
        </p>

        <div className="relative z-40 mt-9 sm:mt-10 je-rise" style={{ animationDelay: "280ms" }}>
          <ParishBar />
        </div>

        <div className="je-rise" style={{ animationDelay: "360ms" }}>
          <CuisineChips />
        </div>

        <div className="je-rise" style={{ animationDelay: "440ms" }}>
          <TrustStats />
        </div>
      </Container>
    </section>
  );
}
