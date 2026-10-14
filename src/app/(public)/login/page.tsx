import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/account-forms";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your SafeMind space.",
};

export default function LoginPage() {
  return <LoginForm />;
}
