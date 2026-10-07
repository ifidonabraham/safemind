import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentSection } from "@/app/dev/ui/content-section";
import { FeedbackSection } from "@/app/dev/ui/feedback-section";
import { FormsSection } from "@/app/dev/ui/forms-section";

export const metadata: Metadata = {
  title: "UI showcase",
  robots: { index: false, follow: false },
};

export default function DevUiPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="mx-auto w-full max-w-[1120px] px-4 py-10 sm:px-6">
      <p className="text-sm font-medium text-primary">Development only</p>
      <h1 className="mt-2 text-[36px] text-ink">UI components</h1>
      <p className="mt-3 max-w-[65ch] text-ink-soft">
        Preview of the SafeMind design system. Sample figures are not real
        student data.
      </p>
      <div className="mt-12 flex flex-col gap-16">
        <FormsSection />
        <FeedbackSection />
        <ContentSection />
      </div>
    </main>
  );
}
