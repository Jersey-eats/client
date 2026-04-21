import { Check } from "lucide-react";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  wrapperClassName?: string;
}

/**
 * Custom checkbox — hidden native input + styled square box so sizing,
 * borders, and focus rings match the text-input language. Use this
 * everywhere a checkbox appears; avoid raw `<input type="checkbox">`.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ className, label, wrapperClassName, ...props }, ref) {
    return (
      <label
        className={cn(
          "inline-flex items-center gap-3 cursor-pointer select-none",
          props.disabled && "cursor-not-allowed opacity-60",
          wrapperClassName,
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          {...props}
          className={cn("peer sr-only", className)}
        />
        <span
          aria-hidden
          className="size-5 shrink-0 rounded-[6px] border-[1.5px] border-line bg-white inline-flex items-center justify-center transition-colors peer-checked:bg-ink peer-checked:border-ink peer-checked:[&_svg]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2"
        >
          <Check
            className="size-3.5 text-paper opacity-0 transition-opacity"
            strokeWidth={3}
          />
        </span>
        {label != null && <span className="text-[13px] leading-snug">{label}</span>}
      </label>
    );
  },
);
