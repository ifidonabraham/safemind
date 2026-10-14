import type { Metadata } from "next";

import { ChatScreen } from "@/components/app/chat-screen";

export const metadata: Metadata = {
  title: "Chat",
  description: "Talk with the SafeMind companion and reach a person if you need one.",
};

export default function ChatPage() {
  return <ChatScreen />;
}
