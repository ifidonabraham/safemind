import { useId } from "react";

import { cn } from "@/lib/cn";

export function BreathingOrb({
  className,
  masked = false,
}: {
  className?: string;
  masked?: boolean;
}) {
  const rawId = useId().replace(/:/g, "");

  return (
    <div
      className={cn(
        "breathing-hero pointer-events-none",
        masked && "breathing-mask",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 640 480" className="h-full w-full">
        <defs>
          <radialGradient id={`${rawId}-teal`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2F6F6A" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#2F6F6A" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#2F6F6A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${rawId}-sage`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8FB8A8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8FB8A8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${rawId}-amber`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E59A6B" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#E59A6B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          className="orb orb-a"
          cx="250"
          cy="250"
          r="170"
          fill={`url(#${rawId}-teal)`}
        />
        <circle
          className="orb orb-b"
          cx="400"
          cy="270"
          r="140"
          fill={`url(#${rawId}-sage)`}
        />
        <circle
          className="orb orb-c"
          cx="330"
          cy="180"
          r="110"
          fill={`url(#${rawId}-amber)`}
        />
      </svg>
    </div>
  );
}
