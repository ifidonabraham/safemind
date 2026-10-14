"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ChatBubble, TypingIndicator } from "@/components/ui/chat-bubble";
import { MoodPicker } from "@/components/ui/mood-picker";

export function HomePreview() {
  const [feeling, setFeeling] = useState<number | null>(4);

  return (
    <div className="rise w-full max-w-md rounded-[28px] border border-line bg-surface p-4 shadow-soft sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-ink-soft">Good evening</p>
          <p className="font-serif text-[22px] text-ink">Your quiet place</p>
        </div>
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary-soft text-sm font-medium text-ink">
          You
        </span>
      </div>

      <div className="mt-4 rounded-[20px] border border-line bg-bg p-4">
        <MoodPicker value={feeling} onChange={setFeeling} />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <ChatBubble from="you">
          Exams start next week and I can&apos;t sleep.
        </ChatBubble>
        <ChatBubble from="companion">
          I&apos;m an AI companion, not a counsellor. I can listen, and help
          you reach people who can help.
        </ChatBubble>
        <TypingIndicator />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
        <p className="inline-flex items-center gap-2 text-sm text-ink-soft">
          <Lock className="size-4" strokeWidth={1.75} aria-hidden="true" />
          Only you can read your journal
        </p>
        <Link
          href="/how-it-works"
          className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline decoration-primary underline-offset-4"
        >
          Need help now?
        </Link>
      </div>
    </div>
  );
}
