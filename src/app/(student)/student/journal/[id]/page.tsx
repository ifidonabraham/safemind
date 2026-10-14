import type { Metadata } from "next";

import { JournalEditorScreen } from "@/components/app/journal-screen";

export const metadata: Metadata = {
  title: "Journal entry",
};

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <JournalEditorScreen entryId={id} />;
}
