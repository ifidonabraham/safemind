import { HeartHandshake, Lock, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { BreathingOrb } from "@/components/ui/breathing-orb";
import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: { absolute: "SafeMind" },
  description:
    "A quiet place for UNILAG students to put thoughts down and reach a real person.",
};

const values: Array<{
  title: string;
  body: string;
  icon: ReactNode;
}> = [
  {
    title: "Private",
    body: "Your journal and chats are yours. Admins see only anonymous totals.",
    icon: <Lock aria-hidden="true" className="size-6" strokeWidth={1.75} />,
  },
  {
    title: "Supported",
    body: "Check in, write, or talk when you want. You choose what happens next.",
    icon: (
      <MessageCircle aria-hidden="true" className="size-6" strokeWidth={1.75} />
    ),
  },
  {
    title: "Human-led",
    body: "If something looks serious, a trained counsellor can step in. You are told first.",
    icon: (
      <HeartHandshake
        aria-hidden="true"
        className="size-6"
        strokeWidth={1.75}
      />
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-10 right-[-30%] w-[34rem] sm:right-[-8%] sm:w-[42rem]">
          <BreathingOrb masked className="aspect-[4/3] w-full" />
        </div>
        <div className="relative mx-auto w-full max-w-[1120px] px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-20">
          <p className="text-sm font-medium text-primary">
            University of Lagos
          </p>
          <h1 className="mt-4 max-w-[18ch] text-[28px] text-ink sm:text-[36px] lg:text-[48px]">
            A quiet place to put your thoughts down — and reach a real person
            when you need one.
          </h1>
          <p className="mt-6 max-w-[42ch] text-lg text-ink">
            Check in, write, or talk. An AI companion can listen. A real person
            is there when you need one.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/register" className={buttonClassName("primary")}>
              Start privately
            </Link>
            <Link href="/how-it-works" className={buttonClassName("secondary")}>
              How SafeMind keeps you safe
            </Link>
          </div>
          <p className="mt-4 max-w-[42ch] text-sm text-ink-soft">
            Creating an account is the next part of this prototype.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-[28px] text-ink">What you can count on</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title}>
              <div className="text-primary">{value.icon}</div>
              <h3 className="mt-4 text-[22px] text-ink">{value.title}</h3>
              <p className="mt-2 text-base text-ink-soft">{value.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="mx-auto w-full max-w-[1120px] px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="text-[28px] text-ink">How SafeMind keeps you safe</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            <li className="text-base text-ink">
              Your journal and chats stay yours.
            </li>
            <li className="text-base text-ink">
              Admins see anonymous totals only. Groups smaller than 5 are
              hidden.
            </li>
            <li className="text-base text-ink">
              A counsellor may see part of a chat only if it is flagged for
              serious risk, and only after you are told.
            </li>
          </ul>
          <Link
            href="/how-it-works"
            className="mt-6 inline-flex min-h-11 items-center text-base font-medium text-primary underline decoration-primary underline-offset-4"
          >
            Read how this works
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 py-12 sm:px-6 sm:py-16">
        <Card className="bg-primary-soft">
          <h2 className="max-w-[20ch] text-[28px] text-ink">
            Your journal and chats are yours.
          </h2>
          <p className="mt-3 max-w-[48ch] text-base text-ink">
            Admins see only anonymous totals. You can start when you are ready.
          </p>
          <Link href="/register" className={buttonClassName("primary", "mt-6")}>
            Start privately
          </Link>
        </Card>
      </section>
    </>
  );
}
