import type { Metadata } from "next";

import { RegisterForm } from "@/components/auth/account-forms";

export const metadata: Metadata = {
  title: "Start privately",
  description: "Create a private SafeMind account.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
