"use client";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/status";

export default function DevUiError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 py-16">
      <ErrorState
        title="The showcase did not load"
        description="You can try again."
        action={<Button onClick={reset}>Try again</Button>}
      />
    </div>
  );
}
