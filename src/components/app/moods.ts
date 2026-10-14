export const moodMeta = [
  { value: 1, label: "Very low", color: "#C8643F" },
  { value: 2, label: "Low", color: "#E59A6B" },
  { value: 3, label: "Okay", color: "#D9C7A0" },
  { value: 4, label: "Good", color: "#8FB8A8" },
  { value: 5, label: "Steady", color: "#2F6F6A" },
] as const;

export function moodLabel(value: number): string {
  return moodMeta.find((item) => item.value === value)?.label ?? "Check-in";
}

export function moodColor(value: number): string {
  return moodMeta.find((item) => item.value === value)?.color ?? "#D9C7A0";
}
