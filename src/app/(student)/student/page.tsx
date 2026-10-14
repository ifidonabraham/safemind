import type { Metadata } from "next";

import { HomeScreen } from "@/components/app/home-screen";

export const metadata: Metadata = {
  title: "Home",
  description: "Your check-in, a quiet suggestion, and a way to talk.",
};

export default function StudentHomePage() {
  return <HomeScreen />;
}
