import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-sm font-medium text-ink">
      {children}
    </span>
  );
}

export type RiskLevel = "none" | "low" | "moderate" | "high" | "critical";

const riskStyles: Record<RiskLevel, string> = {
  none: "bg-surface-alt text-ink",
  low: "bg-calm text-[#1f2a2e]",
  moderate: "bg-accent text-[#1f2a2e]",
  high: "bg-care-soft text-care-ink",
  critical: "border border-care bg-care-soft text-care-ink",
};

const riskLabels: Record<RiskLevel, string> = {
  none: "None",
  low: "Low",
  moderate: "Moderate",
  high: "High",
  critical: "Critical",
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        riskStyles[level],
      )}
    >
      {riskLabels[level]}
    </span>
  );
}
