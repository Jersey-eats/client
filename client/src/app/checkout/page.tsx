import { Container } from "@/components/layout/Container";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <section className="bg-paper py-10 sm:py-16">
      <Container>
        <div className="mb-8 sm:mb-10">
          <div className="text-[10px] font-semibold tracking-[0.22em] uppercase text-je-blue-navy mb-2.5">
            Checkout
          </div>
          <h1 className="font-sans font-extrabold text-[32px] sm:text-[44px] leading-[0.95] tracking-[-0.03em]">
            One last thing, <span className="font-serif italic font-medium text-je-blue-dark">the good part.</span>
          </h1>
        </div>
        <CheckoutForm />
      </Container>
    </section>
  );
}
