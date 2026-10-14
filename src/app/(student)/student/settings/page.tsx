import type { Metadata } from "next";

import { SettingsScreen } from "@/components/app/settings-screen";

export const metadata: Metadata = {
  title: "Privacy and data",
  description: "Your name, your theme, and a copy of your data.",
};

export default function SettingsPage() {
  return <SettingsScreen />;
}
