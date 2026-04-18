import Link from "next/link";
import { CowMark } from "./CowMark";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className, size = 28, showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 font-sans font-bold text-ink tracking-[-0.015em]",
        className,
      )}
    >
      <CowMark size={size} />
      {showText && <span className="text-[15px]">Jersey Eats</span>}
    </Link>
  );
}
