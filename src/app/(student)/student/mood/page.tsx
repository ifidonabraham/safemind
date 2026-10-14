import type { Metadata } from "next";

import { MoodScreen } from "@/components/app/mood-screen";

export const metadata: Metadata = {
  title: "Check in",
  description: "A private mood check-in, a short history, and your trend.",
};

export default function MoodPage() {
  return <MoodScreen />;
}
