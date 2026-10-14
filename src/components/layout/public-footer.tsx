import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[42ch]">
            <p className="font-serif text-[22px] text-ink">SafeMind</p>
            <p className="mt-2 text-base text-ink-soft">
              A private place for students at the University of Lagos to check
              in, write, talk, and reach a real person.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-2">
            <Link
              href="/how-it-works"
              className="inline-flex min-h-11 items-center text-base font-medium text-primary underline decoration-primary underline-offset-4"
            >
              How SafeMind keeps you safe
            </Link>
            <Link
              href="/login"
              className="inline-flex min-h-11 items-center text-base font-medium text-ink"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex min-h-11 items-center text-base font-medium text-ink"
            >
              Start privately
            </Link>
          </nav>
        </div>
        <p className="text-sm text-ink-soft">
          Your journal and chats are yours. Admins see only anonymous totals.
          AI scales support. Humans provide care.
        </p>
      </div>
    </footer>
  );
}
