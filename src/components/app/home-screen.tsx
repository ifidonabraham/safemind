"use client";

import Link from "next/link";
import { useState } from "react";

import { useLook } from "@/components/app/look-store";
import { MoodTrend } from "@/components/app/mood-trend";
import { buttonClassName } from "@/components/ui/button";
import { Card, ChartCard } from "@/components/ui/card";
import { MoodPicker } from "@/components/ui/mood-picker";
import { useToast } from "@/components/ui/toast";

export function HomeScreen() {
  const { state, addMood } = useLook();
  const { push } = useToast();
  const [feeling, setFeeling] = useState<number | null>(null);
  const name = state.alias || "there";

  return (
    <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-4">
      <div>
        <p className="text-sm text-ink-soft">Good evening</p>
        <h1 className="mt-1 text-[28px] text-ink sm:text-[36px]">
          Hello, {name}
        </h1>
      </div>

      <Card>
        <MoodPicker
          value={feeling}
          onChange={(value) => {
            setFeeling(value);
            addMood({ value, note: "", tags: [] });
            push({ title: "Check-in saved" });
          }}
        />
        <Link
          href="/student/mood"
          className="mt-4 inline-flex min-h-11 items-center text-base font-medium text-primary underline decoration-primary underline-offset-4"
        >
          Add a note
        </Link>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="flex flex-col">
          <h2 className="text-[22px] text-ink">Talk to SafeMind</h2>
          <p className="mt-2 text-base text-ink-soft">
            I&apos;m an AI companion, not a counsellor. I can listen, and help
            you reach people who can help.
          </p>
          <Link
            href="/student/chat"
            className={buttonClassName("primary", "mt-6")}
          >
            Open chat
          </Link>
        </Card>
        <Card>
          <p className="text-sm font-medium text-primary">Today&apos;s suggestion</p>
          <h2 className="mt-2 text-[22px] text-ink">
            A short pause before you study
          </h2>
          <p className="mt-2 text-base text-ink-soft">
            Step away from the screen for a few minutes, then come back to one
            small task.
          </p>
        </Card>
      </div>

      <ChartCard
        title="Recent days"
        description="Taller bars are steadier days."
      >
        <MoodTrend values={state.trend} />
        <Link
          href="/student/mood"
          className="mt-4 inline-flex min-h-11 items-center text-base font-medium text-primary underline decoration-primary underline-offset-4"
        >
          See check-ins
        </Link>
      </ChartCard>
    </div>
  );
}
