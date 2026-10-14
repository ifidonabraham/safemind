"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { CrisisActions, CrisisCopy } from "@/components/app/crisis-card";
import { useLook, type ChatMessage } from "@/components/app/look-store";
import { Button } from "@/components/ui/button";
import { ChatBubble, TypingIndicator } from "@/components/ui/chat-bubble";
import { Textarea } from "@/components/ui/inputs";
import { Banner } from "@/components/ui/status";

const calmReplies = [
  "I hear you. If it would help, you can write this in your journal, or ask for a person.",
  "You do not have to sort this alone. I can listen, and help you reach people who can help.",
  "Thank you for saying it. A check-in or a few lines in your journal can sit beside this chat.",
];

function needsPerson(text: string) {
  return /\b(suicid|kill myself|end my life|want to die|self-harm|hurt myself)\b/i.test(
    text,
  );
}

export function ChatScreen() {
  const { state, addMessage, markEscalated } = useLook();
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const replyCount = useRef(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  function replyTo(text: string) {
    const flagged = needsPerson(text);
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      from: "companion",
      text: flagged
        ? "I'm glad you told me. A person should be with you for this. You can ask for someone now."
        : (calmReplies[replyCount.current % calmReplies.length] ??
          "I can listen, and help you reach people who can help."),
    };
    replyCount.current += 1;
    addMessage(message);
    if (flagged) markEscalated();
    setTyping(false);
  }

  function send() {
    const text = draft.trim();
    if (!text || typing) return;
    addMessage({ id: crypto.randomUUID(), from: "you", text });
    setDraft("");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      replyTo(text);
      return;
    }
    setTyping(true);
    timer.current = window.setTimeout(() => replyTo(text), 700);
  }

  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col">
      <h1 className="text-[28px] text-ink sm:text-[36px]">Companion</h1>
      <div className="mt-4">
        <Banner title="Before we talk">
          I&apos;m an AI companion, not a counsellor. I can listen, and help you
          reach people who can help.
        </Banner>
      </div>

      <div className="mt-4 flex flex-col gap-3" role="log" aria-live="polite">
        {state.messages.map((message) => (
          <ChatBubble key={message.id} from={message.from}>
            {message.text}
          </ChatBubble>
        ))}
        {typing ? <TypingIndicator /> : null}
      </div>

      {state.escalated ? (
        <div className="mt-4 rounded-[20px] border border-care bg-care-soft p-5">
          <h2 className="text-[22px] text-care-ink">A person may step in</h2>
          <p className="mt-2 text-base text-ink">
            A trained counsellor may look at this part of our conversation to
            help keep you safe. You can read how this works anytime.
          </p>
          <div className="mt-4">
            <CrisisCopy />
          </div>
          <CrisisActions />
          <p className="mt-4 text-sm text-ink-soft">
            <Link
              href="/how-it-works"
              className="font-medium text-primary underline decoration-primary underline-offset-4"
            >
              Read how this works
            </Link>
          </p>
        </div>
      ) : null}

      <form
        className="sticky bottom-24 z-10 mt-4 border-t border-line bg-bg pt-3 lg:bottom-0"
        onSubmit={(event) => {
          event.preventDefault();
          send();
        }}
      >
        <Textarea
          label="Message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              send();
            }
          }}
        />
        <Button type="submit" className="mt-3" disabled={!draft.trim() || typing}>
          Send
        </Button>
      </form>
    </div>
  );
}
