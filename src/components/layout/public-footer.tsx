import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-2 px-4 py-8 text-sm leading-relaxed text-ink-soft sm:px-6">
        <p>
          Stakeholder prototype for the University of Lagos. Not for real
          students yet.
        </p>
        <p>Pending legal and clinical review.</p>
        <Link
          href="/how-it-works"
          className="w-fit text-primary underline decoration-primary underline-offset-4"
        >
          How SafeMind keeps you safe
        </Link>
      </div>
    </footer>
  );
}
