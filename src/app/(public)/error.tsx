"use client";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/status";

export default function PublicError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 py-16 sm:px-6">
      <ErrorState
        title="This page did not load"
        description="You can try again. Nothing you typed here was saved."
        action={<Button onClick={reset}>Try again</Button>}
      />
    </div>
  );
}
