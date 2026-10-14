import { Lock, MessageCircle, Users } from "lucide-react";
import Link from "next/link";

import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const values = [
  {
    title: "Private",
    body: "Your journal and chats are yours. Admins see only anonymous totals.",
    icon: Lock,
  },
  {
    title: "Supported",
    body: "Check in, write, and talk with an AI companion that can listen and help you reach people.",
    icon: MessageCircle,
  },
  {
    title: "Human-led",
    body: "A peer or a counsellor steps in when you ask. If a chat is flagged, you are told before a person looks.",
    icon: Users,
  },
];

export function PlatformSections() {
  return (
    <section className="mx-auto w-full max-w-[1120px] px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="max-w-[18ch] text-[28px] text-ink sm:text-[36px]">
        Private, supported, and human-led
      </h2>
      <p className="mt-4 max-w-[48ch] text-lg text-ink">
        AI scales support. Humans provide care. Every step is meant to move
        you toward a person when you need one.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {values.map((value, index) => (
          <Card
            key={value.title}
            className="rise"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <value.icon
              className="size-6 text-primary"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <h3 className="mt-4 text-[22px] text-ink">{value.title}</h3>
            <p className="mt-2 text-base text-ink-soft">{value.body}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Link href="/register" className={buttonClassName("primary")}>
          Start privately
        </Link>
      </div>
    </section>
  );
}
