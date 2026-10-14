"use client";

import {
  BookOpen,
  House,
  MessageCircle,
  SunMedium,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import { CrisisActions, CrisisCopy } from "@/components/app/crisis-card";
import { LookProvider, useLook } from "@/components/app/look-store";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Modal } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";

const items = [
  { href: "/student", label: "Home", icon: House, exact: true },
  { href: "/student/mood", label: "Mood", icon: SunMedium, exact: false },
  { href: "/student/chat", label: "Chat", icon: MessageCircle, exact: false },
  { href: "/student/journal", label: "Journal", icon: BookOpen, exact: false },
  { href: "/student/support", label: "Support", icon: Users, exact: false },
];

function isCurrent(pathname: string, href: string, exact: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ShellFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { ready, state } = useLook();
  const [helpOpen, setHelpOpen] = useState(false);
  const initial = (state.alias || "You").slice(0, 1).toUpperCase();

  return (
    <div className="min-h-dvh bg-bg lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-surface focus:px-4 focus:py-3"
      >
        Skip to content
      </a>
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line px-4 py-6 lg:flex">
        <Link href="/student" className="font-serif text-[22px] text-ink">
          SafeMind
        </Link>
        <nav aria-label="Your space" className="mt-8 flex flex-1 flex-col gap-1">
          {items.map((item) => {
            const current = isCurrent(pathname, item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-xl px-3 text-base",
                  current
                    ? "bg-primary-soft text-ink"
                    : "text-ink hover:bg-surface-alt",
                )}
              >
                <item.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-20 flex flex-wrap items-center gap-2 border-b border-line bg-bg px-4 py-3 lg:px-8">
          <Link href="/student" className="font-serif text-[22px] text-ink lg:hidden">
            SafeMind
          </Link>
          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            className="ml-auto inline-flex min-h-11 items-center text-sm font-medium text-care-ink lg:ml-0"
          >
            Need help now?
          </button>
          <div className="lg:ml-auto">
            <ThemeToggle />
          </div>
          <Link
            href="/student/settings"
            aria-label="Privacy and data"
            className="inline-flex size-11 items-center justify-center rounded-full bg-primary-soft text-sm font-medium text-ink"
          >
            {initial}
          </Link>
        </header>
        <main
          id="content"
          className="w-full min-w-0 flex-1 px-4 py-6 pb-28 lg:px-8 lg:pb-10"
        >
          {ready ? (
            <div key={pathname} className="page-enter">
              {children}
            </div>
          ) : (
            <div aria-busy="true">
              <span className="sr-only">Loading</span>
              <Skeleton className="h-8 w-40" />
              <Skeleton className="mt-6 h-36" />
              <Skeleton className="mt-4 h-36" />
            </div>
          )}
        </main>
        <nav
          aria-label="Your space"
          className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-line bg-bg lg:hidden"
        >
          {items.map((item) => {
            const current = isCurrent(pathname, item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-xs",
                  current ? "text-primary" : "text-ink-soft",
                )}
              >
                <item.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <Modal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        title="Need help now?"
      >
        <CrisisCopy />
        <CrisisActions onDone={() => setHelpOpen(false)} />
      </Modal>
    </div>
  );
}

export function StudentShell({ children }: { children: ReactNode }) {
  return (
    <LookProvider>
      <ShellFrame>{children}</ShellFrame>
    </LookProvider>
  );
}
