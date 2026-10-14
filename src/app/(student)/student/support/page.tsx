import type { Metadata } from "next";

import { SupportScreen } from "@/components/app/support-screen";

export const metadata: Metadata = {
  title: "Support",
  description: "Ask for a peer supporter or a counsellor.",
};

export default function SupportPage() {
  return <SupportScreen />;
}
