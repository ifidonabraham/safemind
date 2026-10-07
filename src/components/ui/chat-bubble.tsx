import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ChatBubbleProps = {
  from: "you" | "companion";
  children: ReactNode;
};

export function ChatBubble({ from, children }: ChatBubbleProps) {
  const yours = from === "you";

  return (
    <div className={cn("flex", yours ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "rise max-w-[min(100%,40ch)] rounded-[20px] px-4 py-3",
          yours
            ? "bg-primary text-on-primary"
            : "border border-line bg-surface text-ink",
        )}
      >
        <p
          className={cn(
            "text-sm font-medium",
            yours ? "text-on-primary" : "text-ink-soft",
          )}
        >
          {yours ? "You" : "AI companion"}
        </p>
        <div className="mt-1 text-base leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div
      className="flex w-fit items-center gap-1 rounded-full border border-line bg-surface px-4 py-3"
      role="status"
      aria-label="The companion is writing"
    >
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </div>
  );
}
