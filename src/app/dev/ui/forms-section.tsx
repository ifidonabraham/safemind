"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Input, Select, Textarea } from "@/components/ui/inputs";
import { MoodPicker } from "@/components/ui/mood-picker";

const topics = [
  { value: "exams", label: "Exams" },
  { value: "sleep", label: "Sleep" },
  { value: "friends", label: "Friends" },
];

export function FormsSection() {
  const [topic, setTopic] = useState("exams");
  const [feeling, setFeeling] = useState<number | null>(null);

  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-[28px]">Controls</h2>
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger-soft">Danger soft</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Username"
          name="username"
          hint="No real name."
          placeholder="a quiet alias"
          autoComplete="username"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          error="Use at least 10 characters."
          autoComplete="new-password"
        />
        <Textarea
          label="Note"
          name="note"
          hint="Optional. Only you can read this later."
          placeholder="A few words is enough."
        />
        <Select label="Topic" name="topic" options={topics} />
      </div>
      <div className="flex flex-wrap gap-2">
        {topics.map((item) => (
          <Chip
            key={item.value}
            selected={topic === item.value}
            onClick={() => setTopic(item.value)}
          >
            {item.label}
          </Chip>
        ))}
      </div>
      <MoodPicker value={feeling} onChange={setFeeling} />
      {feeling === null ? (
        <p className="text-ink-soft">No check-in selected yet.</p>
      ) : null}
    </section>
  );
}
