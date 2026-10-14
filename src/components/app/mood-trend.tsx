import { moodColor, moodLabel } from "@/components/app/moods";

export function MoodTrend({ values }: { values: number[] }) {
  if (values.length === 0) {
    return (
      <p className="text-base text-ink-soft">
        No check-ins yet. How are you feeling right now?
      </p>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${values.length * 24} 120`}
      role="img"
      aria-label="Mood over recent days. Taller bars are steadier days."
      className="h-32 w-full"
    >
      {values.map((value, index) => {
        const height = (Math.min(5, Math.max(1, value)) / 5) * 104;
        return (
          <rect
            key={`${index}-${value}`}
            x={index * 24 + 4}
            y={112 - height}
            width={16}
            height={height}
            rx={6}
            fill={moodColor(value)}
          >
            <title>{moodLabel(value)}</title>
          </rect>
        );
      })}
    </svg>
  );
}
