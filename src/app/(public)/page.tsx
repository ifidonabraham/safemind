import type { Metadata } from "next";
import Link from "next/link";

import { HomePreview } from "@/components/landing/home-preview";
import { PlatformSections } from "@/components/landing/platform-sections";
import { BreathingOrb } from "@/components/ui/breathing-orb";
import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: { absolute: "SafeMind" },
  description:
    "SafeMind is a private place for UNILAG students to check in, write, talk, and reach a real person. AI scales support. Humans provide care.",
};

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <BreathingOrb className="absolute -top-16 right-[-6rem] h-[28rem] w-[28rem] sm:top-[-4rem] sm:right-[-4rem] sm:h-[40rem] sm:w-[40rem]" />
        </div>
        <div className="hero-scrim pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid w-full max-w-[1120px] items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div>
            <p className="text-sm font-medium text-primary">
              University of Lagos
            </p>
            <h1 className="mt-4 max-w-[14ch] text-[36px] text-ink sm:text-[48px]">
              A quiet place to put your thoughts down — and reach a real person
              when you need one.
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg text-ink">
              Between silence and support, there is a gap. SafeMind fills it: a
              private place to check in, write, talk with an AI companion, and
              reach a peer or a counsellor. AI scales support. Humans provide
              care.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className={buttonClassName("primary")}>
                Start privately
              </Link>
              <Link
                href="/how-it-works"
                className={buttonClassName("secondary")}
              >
                How SafeMind keeps you safe
              </Link>
            </div>
          </div>
          <HomePreview />
        </div>
      </section>

      <PlatformSections />

      <section className="bg-surface-alt">
        <div className="mx-auto w-full max-w-[1120px] px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-[28px] text-ink sm:text-[36px]">
            How SafeMind keeps you safe
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            <li className="rounded-[20px] border border-line bg-surface p-6 text-base text-ink">
              Your journal and chats stay yours.
            </li>
            <li className="rounded-[20px] border border-line bg-surface p-6 text-base text-ink">
              Admins see anonymous totals only. Groups smaller than 5 are
              hidden.
            </li>
            <li className="rounded-[20px] border border-line bg-surface p-6 text-base text-ink">
              A counsellor may see part of a chat only if it is flagged, and
              only after you are told.
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

      <section className="mx-auto w-full max-w-[1120px] px-4 py-16 sm:px-6 sm:py-20">
        <Card className="bg-primary-soft">
          <h2 className="max-w-[18ch] text-[28px] text-ink sm:text-[36px]">
            Your journal and chats are yours.
          </h2>
          <p className="mt-3 max-w-[48ch] text-base text-ink">
            Admins see only anonymous totals. Start when you are ready.
          </p>
          <Link href="/register" className={buttonClassName("primary", "mt-6")}>
            Start privately
          </Link>
        </Card>
      </section>
    </>
  );
}
