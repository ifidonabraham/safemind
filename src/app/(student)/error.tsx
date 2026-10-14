"use client";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/status";

export default function StudentError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="This page did not load"
      description="You can try again. Your journal stays on this device."
      action={<Button onClick={reset}>Try again</Button>}
    />
  );
}
