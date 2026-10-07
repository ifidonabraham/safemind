"use client";

import { useId } from "react";

import { cn } from "@/lib/cn";

const feelings = [
  { value: 1, label: "Very low", color: "#C8643F" },
  { value: 2, label: "Low", color: "#E59A6B" },
  { value: 3, label: "Okay", color: "#D9C7A0" },
  { value: 4, label: "Good", color: "#8FB8A8" },
  { value: 5, label: "Steady", color: "#2F6F6A" },
] as const;

type MoodPickerProps = {
  legend?: string;
  value: number | null;
  onChange: (value: number) => void;
  name?: string;
};

export function MoodPicker({
  legend = "How are you feeling right now?",
  value,
  onChange,
  name,
}: MoodPickerProps) {
  const generatedName = useId();
  const groupName = name ?? generatedName;

  return (
    <fieldset>
      <legend className="text-base font-medium text-ink">{legend}</legend>
      <div className="mt-4 grid grid-cols-5 gap-1">
        {feelings.map((feeling) => {
          const selected = value === feeling.value;
          return (
            <label
              key={feeling.value}
              className="flex cursor-pointer flex-col items-center gap-2 text-center"
            >
              <input
                type="radio"
                name={groupName}
                value={feeling.value}
                checked={selected}
                onChange={() => onChange(feeling.value)}
                className="peer sr-only"
              />
              <span
                data-selected={selected}
                className={cn(
                  "mood-orb size-11 rounded-full border border-line transition-transform duration-200 ease-out",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-solid peer-focus-visible:outline-primary",
                  selected &&
                    "ring-2 ring-primary ring-offset-2 ring-offset-bg",
                )}
                style={{ backgroundColor: feeling.color }}
              />
              <span className="text-sm leading-tight text-ink">
                {feeling.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
