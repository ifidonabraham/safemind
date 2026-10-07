"use client";

import { SunMoon } from "lucide-react";
import { useEffect } from "react";

const STORAGE_KEY = "safemind-theme";

function storedTheme(): "light" | "dark" | null {
  const value = localStorage.getItem(STORAGE_KEY);
  return value === "light" || value === "dark" ? value : null;
}

function applyStoredTheme() {
  const root = document.documentElement;
  const theme = storedTheme();
  root.classList.remove("light", "dark");
  if (theme) root.classList.add(theme);
}

export function ThemeToggle() {
  useEffect(() => {
    applyStoredTheme();
  }, []);

  function toggle() {
    const current =
      storedTheme() ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-surface text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-primary"
    >
      <SunMoon className="size-5" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
