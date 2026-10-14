"use client";

import { useState } from "react";

import { useLook } from "@/components/app/look-store";
import { moodLabel } from "@/components/app/moods";
import { MoodTrend } from "@/components/app/mood-trend";
import { Button } from "@/components/ui/button";
import { ChartCard } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Textarea } from "@/components/ui/inputs";
import { MoodPicker } from "@/components/ui/mood-picker";
import { EmptyState } from "@/components/ui/status";
import { useToast } from "@/components/ui/toast";

const tags = ["Sleep", "Exams", "Campus", "Friends", "Family", "Money"];

export function MoodScreen() {
  const { state, addMood, deleteMood } = useLook();
  const { push } = useToast();
  const [feeling, setFeeling] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(tag: string) {
    setSelected((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col gap-6">
      <div>
        <h1 className="text-[28px] text-ink sm:text-[36px]">Check in</h1>
        <p className="mt-2 text-base text-ink-soft">
          A simple note for you. You can delete it whenever you want.
        </p>
      </div>

      <div className="rounded-[20px] border border-line bg-surface p-6 shadow-soft">
        <MoodPicker value={feeling} onChange={setFeeling} />
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Chip
              key={tag}
              selected={selected.includes(tag)}
              onClick={() => toggle(tag)}
            >
              {tag}
            </Chip>
          ))}
        </div>
        <div className="mt-6">
          <Textarea
            label="Note, if you want one"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </div>
        <Button
          className="mt-4"
          disabled={feeling === null}
          onClick={() => {
            if (feeling === null) return;
            addMood({ value: feeling, note, tags: selected });
            setNote("");
            setSelected([]);
            push({ title: "Check-in saved" });
          }}
        >
          Save check-in
        </Button>
      </div>

      <ChartCard title="Last 30 days">
        <MoodTrend values={state.trend} />
      </ChartCard>

      <section>
        <h2 className="text-[22px] text-ink">History</h2>
        {state.moods.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="No check-ins yet"
              description="How are you feeling right now?"
            />
          </div>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {state.moods.map((entry) => (
              <li
                key={entry.id}
                className="rounded-[20px] border border-line bg-surface p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-medium text-ink">
                      {moodLabel(entry.value)}
                    </p>
                    <p className="text-sm text-ink-soft">{entry.when}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteMood(entry.id)}
                    className="inline-flex min-h-11 items-center text-sm font-medium text-care-ink"
                  >
                    Delete
                  </button>
                </div>
                {entry.tags.length > 0 ? (
                  <p className="mt-2 text-sm text-ink-soft">
                    {entry.tags.join(", ")}
                  </p>
                ) : null}
                {entry.note ? (
                  <p className="mt-2 text-base text-ink">{entry.note}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
