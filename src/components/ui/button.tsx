import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger-soft";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary",
  secondary: "bg-primary-soft text-ink",
  ghost: "bg-transparent text-ink hover:bg-surface-alt",
  "danger-soft": "border border-care bg-care-soft text-care-ink",
};

export function buttonClassName(
  variant: ButtonVariant = "primary",
  className?: string,
): string {
  return cn(
    "inline-flex min-h-11 w-full max-w-full min-w-0 items-center justify-center gap-2 rounded-xl px-4 text-center text-base font-medium whitespace-normal transition-colors duration-200 ease-out sm:w-auto",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-primary",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName(variant, className)}
      {...props}
    />
  );
}
