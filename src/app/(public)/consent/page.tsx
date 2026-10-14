import type { Metadata } from "next";

import { ConsentGate } from "@/components/auth/account-forms";

export const metadata: Metadata = {
  title: "Before you continue",
  description: "What SafeMind collects, and who can see it.",
};

export default function ConsentPage() {
  return <ConsentGate />;
}
