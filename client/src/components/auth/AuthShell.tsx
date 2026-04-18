import Link from "next/link";
import { CowMark } from "@/components/brand/CowMark";

interface Props {
  kicker: string;
  heading: React.ReactNode;
  sub: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Shared layout for login / register / verify — keeps K × O × L visual language.
 */
export function AuthShell({ kicker, heading, sub, children, footer }: Props) {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center bg-gradient-to-b from-mist to-paper py-14">
      <div className="je-blob" style={{ background: "var(--je-blue)", width: 340, height: 340, top: -60, left: -80, opacity: 0.45 }} />
      <div className="je-blob" style={{ background: "var(--je-blue)", width: 300, height: 300, bottom: -60, right: -60, opacity: 0.3 }} />

      <div className="relative z-10 mx-auto w-full max-w-[460px] px-5 text-center">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <CowMark size={72} />
          </Link>
        </div>

        <div className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.24em] uppercase text-je-blue-navy mb-6">
          <span aria-hidden className="w-6 h-px bg-je-blue-navy opacity-50" />
          {kicker}
          <span aria-hidden className="w-6 h-px bg-je-blue-navy opacity-50" />
        </div>

        <h1 className="font-sans font-extrabold text-[34px] sm:text-[44px] leading-[0.95] tracking-[-0.035em] text-ink">
          {heading}
        </h1>
        <p className="mt-4 text-[14px] text-je-charcoal/75 leading-relaxed max-w-[380px] mx-auto">
          {sub}
        </p>

        <div className="mt-8 text-left">{children}</div>

        {footer && (
          <p className="mt-7 text-[13px] text-je-grey-mid">
            {footer}
          </p>
        )}
      </div>
    </section>
  );
}
