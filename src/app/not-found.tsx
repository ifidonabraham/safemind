import Link from "next/link";

import { buttonClassName } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/status";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-16">
      <EmptyState
        title="That page is not here"
        description="The link may be old. You can go back to SafeMind."
        action={
          <Link href="/" className={buttonClassName("primary")}>
            Back to SafeMind
          </Link>
        }
      />
    </main>
  );
}
