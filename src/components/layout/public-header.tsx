"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function PublicHeader() {
  const pathname = usePathname();
  const howCurrent = pathname === "/how-it-works";

  return (
    <header className="border-b border-line bg-bg">
      <div className="mx-auto flex w-full max-w-[1120px] flex-wrap items-center gap-2 px-4 py-3 sm:px-6">
        <Link href="/" className="font-serif text-[22px] font-medium text-ink">
          SafeMind
        </Link>
        <div className="ml-auto sm:order-3 sm:ml-0">
          <ThemeToggle />
        </div>
        <nav
          aria-label="Public"
          className="flex w-full min-w-0 flex-col gap-2 sm:order-2 sm:ml-auto sm:w-auto sm:flex-row"
        >
          <Link
            href="/how-it-works"
            aria-current={howCurrent ? "page" : undefined}
            className={buttonClassName(
              "ghost",
              cn(howCurrent && "bg-surface-alt"),
            )}
          >
            How it works
          </Link>
          <Link href="/register" className={buttonClassName("primary")}>
            Start privately
          </Link>
        </nav>
      </div>
    </header>
  );
}
