import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type StateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: StateProps) {
  return (
    <div className="rounded-[20px] border border-dashed border-line bg-surface px-6 py-10 text-center">
      <h2 className="text-[22px] text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-[45ch] text-base text-ink-soft">
        {description}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function ErrorState({ title, description, action }: StateProps) {
  return (
    <div
      role="alert"
      className="rounded-[20px] border border-care bg-care-soft px-6 py-10 text-center"
    >
      <h2 className="text-[22px] text-care-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-[45ch] text-base text-ink">
        {description}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

type BannerProps = {
  tone?: "info" | "care";
  title: string;
  children: ReactNode;
};

export function Banner({ tone = "info", title, children }: BannerProps) {
  const care = tone === "care";

  return (
    <aside
      className={cn(
        "rounded-[20px] border px-4 py-4 sm:px-6",
        care ? "border-care bg-care-soft" : "border-line bg-primary-soft",
      )}
    >
      <h2 className={cn("text-[22px]", care ? "text-care-ink" : "text-ink")}>
        {title}
      </h2>
      <div className="mt-2 max-w-[65ch] text-base text-ink">{children}</div>
    </aside>
  );
}
