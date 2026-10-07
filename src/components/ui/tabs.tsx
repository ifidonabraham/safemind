"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { EmptyState } from "@/components/ui/status";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

export function Tabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const baseId = useId();
  const [active, setActive] = useState(tabs[0]?.id ?? "");

  if (tabs.length === 0) {
    return (
      <EmptyState
        title="Nothing in these tabs"
        description="There is no section to show here yet."
      />
    );
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = tabs.findIndex((tab) => tab.id === active);
    if (current < 0) return;
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    const tab = tabs[next];
    if (!tab) return;
    setActive(tab.id);
    document.getElementById(`${baseId}-${tab.id}`)?.focus();
  }

  const selected = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="flex gap-2 overflow-x-auto"
      >
        {tabs.map((tab) => {
          const selectedTab = tab.id === selected?.id;
          return (
            <button
              key={tab.id}
              id={`${baseId}-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selectedTab}
              aria-controls={`${baseId}-${tab.id}-panel`}
              tabIndex={selectedTab ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center rounded-xl px-4 text-base font-medium",
                selectedTab
                  ? "bg-primary text-on-primary"
                  : "bg-surface-alt text-ink",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {selected ? (
        <div
          role="tabpanel"
          id={`${baseId}-${selected.id}-panel`}
          aria-labelledby={`${baseId}-${selected.id}`}
          className="mt-4 text-base text-ink"
        >
          {selected.content}
        </div>
      ) : null}
    </div>
  );
}
