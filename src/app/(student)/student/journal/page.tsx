import type { Metadata } from "next";

import { JournalListScreen } from "@/components/app/journal-screen";

export const metadata: Metadata = {
  title: "Journal",
  description: "Private entries only you can read.",
};

export default function JournalPage() {
  return <JournalListScreen />;
}
