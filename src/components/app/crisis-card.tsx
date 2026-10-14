import Link from "next/link";

import { Button, buttonClassName } from "@/components/ui/button";

export function CrisisActions({ onDone }: { onDone?: () => void }) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <Link
        href="/student/support"
        className={buttonClassName("primary")}
        onClick={onDone}
      >
        Talk to someone now
      </Link>
      {onDone ? (
        <Button variant="secondary" onClick={onDone}>
          I&apos;m safe for now
        </Button>
      ) : null}
    </div>
  );
}

export function CrisisCopy() {
  return (
    <p className="max-w-[48ch] text-base text-ink">
      You can ask for a person on SafeMind. For someone on campus, the
      University of Lagos counselling centre is there for students.
    </p>
  );
}
