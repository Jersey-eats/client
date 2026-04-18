import Image from "next/image";
import { cn } from "@/lib/utils";

interface CowMarkProps {
  size?: number;
  className?: string;
}

export function CowMark({ size = 28, className }: CowMarkProps) {
  return (
    <Image
      src="/JELogo.svg"
      alt="Jersey Eats"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      priority
    />
  );
}
