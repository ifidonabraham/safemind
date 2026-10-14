import type { Metadata } from "next";

import { JournalEditorScreen } from "@/components/app/journal-screen";

export const metadata: Metadata = {
  title: "New journal entry",
  description: "Write something only you can read.",
};

export default function NewJournalPage() {
  return <JournalEditorScreen entryId={null} />;
}
