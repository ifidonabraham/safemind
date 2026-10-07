import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

export function Chip({ selected = false, className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex min-h-11 items-center rounded-full border px-4 text-base text-ink",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-primary",
        selected
          ? "border-primary bg-primary-soft"
          : "border-line bg-surface hover:bg-surface-alt",
        className,
      )}
      {...props}
    />
  );
}
