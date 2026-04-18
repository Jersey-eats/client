import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export function Container({ size = "lg", className, ...rest }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-5 sm:px-8", sizes[size], className)}
      {...rest}
    />
  );
}
