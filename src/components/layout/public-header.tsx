"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const navLink =
  "inline-flex min-h-11 w-auto items-center justify-center rounded-xl px-3 text-base font-medium text-ink hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-primary";

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
          className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:order-2 sm:ml-auto sm:w-auto"
        >
          <Link
            href="/how-it-works"
            aria-current={howCurrent ? "page" : undefined}
            className={cn(navLink, howCurrent && "bg-surface-alt")}
          >
            How it works
          </Link>
          <Link href="/login" className={navLink}>
            Log in
          </Link>
          <Link href="/register" className={buttonClassName("primary")}>
            Start privately
          </Link>
        </nav>
      </div>
    </header>
  );
}
