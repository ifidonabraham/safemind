import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-line bg-surface p-6 shadow-soft",
        className,
      )}
      {...props}
    />
  );
}

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
};

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <article className="rounded-[20px] border border-line bg-surface p-6 shadow-soft">
      <h3 className="text-sm text-ink-soft">{label}</h3>
      <p className="mt-3 font-serif text-[36px] leading-none text-ink">
        {value}
      </p>
      {hint ? <p className="mt-3 text-sm text-ink-soft">{hint}</p> : null}
    </article>
  );
}

type ChartCardProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <section className="rounded-[20px] border border-line bg-surface p-6 shadow-soft">
      <h3 className="text-[22px] text-ink">{title}</h3>
      {description ? (
        <p className="mt-2 text-base text-ink-soft">{description}</p>
      ) : null}
      <div className="mt-4">
        {children ?? (
          <p className="text-base text-ink-soft">No chart to show yet.</p>
        )}
      </div>
    </section>
  );
}
