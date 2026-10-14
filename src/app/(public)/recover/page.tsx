import type { Metadata } from "next";

import { RecoverForm } from "@/components/auth/account-forms";

export const metadata: Metadata = {
  title: "Recovery",
  description: "Use your SafeMind recovery code.",
};

export default function RecoverPage() {
  return <RecoverForm />;
}
