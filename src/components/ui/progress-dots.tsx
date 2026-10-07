import { cn } from "@/lib/cn";

type ProgressDotsProps = {
  steps: string[];
  current: number;
  label: string;
};

export function ProgressDots({ steps, current, label }: ProgressDotsProps) {
  const safeCurrent = Math.min(Math.max(current, 0), steps.length - 1);
  const name = steps[safeCurrent] ?? "";

  return (
    <div>
      <p className="text-sm text-ink-soft">
        {label}: step {safeCurrent + 1} of {steps.length}
        {name ? `, ${name}` : ""}
      </p>
      <ol aria-hidden="true" className="mt-3 flex gap-2">
        {steps.map((step, index) => (
          <li
            key={step}
            className={cn(
              "h-2.5 w-8 rounded-full",
              index <= safeCurrent ? "bg-primary" : "bg-line",
            )}
          />
        ))}
      </ol>
    </div>
  );
}
