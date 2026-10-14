"use client";

import { useState } from "react";

import { useLook } from "@/components/app/look-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/inputs";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/cn";

const urgencies = ["When you can", "Today", "Need someone now"];

export function SupportScreen() {
  const { state, requestSupport } = useLook();
  const { push } = useToast();
  const [kind, setKind] = useState<"peer" | "professional" | null>(null);
  const [topic, setTopic] = useState("");
  const [urgency, setUrgency] = useState(urgencies[0] ?? "When you can");

  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col gap-6">
      <div>
        <h1 className="text-[28px] text-ink sm:text-[36px]">Get support</h1>
        <p className="mt-2 max-w-[48ch] text-base text-ink-soft">
          Ask for a peer supporter or a counsellor. They only see the session
          you open with them.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {(
          [
            ["peer", "Peer supporter", "A trained listener for a conversation."],
            [
              "professional",
              "Counsellor",
              "A qualified person when you want more than a listener.",
            ],
          ] as const
        ).map(([value, title, body]) => (
          <button
            key={value}
            type="button"
            aria-pressed={kind === value}
            onClick={() => setKind(value)}
            className={cn(
              "rounded-[20px] border p-5 text-left",
              kind === value
                ? "border-primary bg-primary-soft"
                : "border-line bg-surface",
            )}
          >
            <span className="text-[22px] text-ink">{title}</span>
            <span className="mt-2 block text-base text-ink-soft">{body}</span>
          </button>
        ))}
      </div>

      <Input
        label="What do you want to talk about?"
        hint="A few words is enough."
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
      />

      <fieldset>
        <legend className="text-base font-medium text-ink">How soon?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {urgencies.map((item) => (
            <Chip
              key={item}
              selected={urgency === item}
              onClick={() => setUrgency(item)}
            >
              {item}
            </Chip>
          ))}
        </div>
      </fieldset>

      <Button
        disabled={!kind || !topic.trim()}
        onClick={() => {
          if (!kind) return;
          requestSupport({ kind, topic: topic.trim(), urgency });
          push({ title: "Request sent" });
        }}
      >
        Send request
      </Button>

      {state.support ? (
        <Card>
          <p className="text-sm font-medium text-primary">Request status</p>
          <h2 className="mt-2 text-[22px] text-ink">{state.support.status}</h2>
          <p className="mt-2 text-base text-ink">
            {state.support.topic} · {state.support.urgency}
          </p>
          <p className="mt-2 text-base text-ink-soft">
            You will see a message here when someone accepts.
          </p>
        </Card>
      ) : null}
    </div>
  );
}
