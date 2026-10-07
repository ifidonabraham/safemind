import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "block animate-pulse rounded-xl bg-surface-alt motion-reduce:animate-none",
        className,
      )}
    />
  );
}
