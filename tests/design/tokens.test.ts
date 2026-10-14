import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import { expect, test } from "vitest";

const root = process.cwd();
const css = readFileSync(path.join(root, "src/app/globals.css"), "utf8");

function blockAfter(
  marker: string,
  occurrence: number,
): Record<string, string> {
  let from = -1;
  for (let index = 0; index < occurrence; index += 1) {
    from = css.indexOf(marker, from + 1);
    if (from < 0) throw new Error(`Missing ${marker}`);
  }
  const end = css.indexOf("}", from);
  const body = css.slice(from, end);
  const tokens: Record<string, string> = {};
  for (const match of body.matchAll(/(--[a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g)) {
    const name = match[1];
    const value = match[2];
    if (name && value) tokens[name] = value.toLowerCase();
  }
  return tokens;
}

function lin(channel: number): number {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const raw = hex.replace("#", "");
  const red = lin(Number.parseInt(raw.slice(0, 2), 16));
  const green = lin(Number.parseInt(raw.slice(2, 4), 16));
  const blue = lin(Number.parseInt(raw.slice(4, 6), 16));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(foreground: string, background: string): number {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function expectContrast(
  tokens: Record<string, string>,
  foreground: string,
  background: string,
  minimum: number,
) {
  const fg = tokens[foreground];
  const bg = tokens[background];
  expect(fg, foreground).toBeTruthy();
  expect(bg, background).toBeTruthy();
  if (!fg || !bg) return;
  expect(
    contrast(fg, bg),
    `${foreground} on ${background}`,
  ).toBeGreaterThanOrEqual(minimum);
}

test("dark theme blocks stay in sync", () => {
  const forced = blockAfter("/* dark-tokens */", 1);
  const system = blockAfter("/* dark-tokens */", 2);
  expect(system).toEqual(forced);
});

test("text and control pairs meet WCAG AA", () => {
  const light = blockAfter("/* light-tokens */", 1);
  const dark = blockAfter("/* dark-tokens */", 1);
  const textPairs: Array<[string, string]> = [
    ["--ink", "--bg"],
    ["--ink", "--surface"],
    ["--ink", "--surface-alt"],
    ["--ink", "--primary-soft"],
    ["--ink", "--care-soft"],
    ["--ink-soft", "--bg"],
    ["--ink-soft", "--surface"],
    ["--ink-soft", "--surface-alt"],
    ["--on-primary", "--primary"],
    ["--primary", "--bg"],
    ["--primary", "--surface"],
    ["--care-ink", "--bg"],
    ["--care-ink", "--surface"],
    ["--care-ink", "--care-soft"],
  ];

  for (const [foreground, background] of textPairs) {
    expectContrast(light, foreground, background, 4.5);
    expectContrast(dark, foreground, background, 4.5);
  }

  expectContrast(light, "--ink-soft", "--primary-soft", 4.5);
  expectContrast(dark, "--ink-soft", "--primary-soft", 4.5);
  expectContrast(light, "--care", "--bg", 3);
  expectContrast(dark, "--care", "--bg", 3);
  expectContrast(dark, "--care", "--surface", 3);
  expect(contrast("#1f2a2e", light["--accent"] ?? "")).toBeGreaterThanOrEqual(
    4.5,
  );
  expect(contrast("#1f2a2e", light["--calm"] ?? "")).toBeGreaterThanOrEqual(
    4.5,
  );
  expect(contrast("#1f2a2e", dark["--accent"] ?? "")).toBeGreaterThanOrEqual(
    4.5,
  );
  expect(contrast("#1f2a2e", dark["--calm"] ?? "")).toBeGreaterThanOrEqual(4.5);
});

test("hero animation is CSS and stays under 30KB", () => {
  const orbPath = path.join(root, "src/components/ui/breathing-orb.tsx");
  expect(statSync(orbPath).size).toBeLessThan(30 * 1024);
  expect(css).toContain("@keyframes breathe");
  expect(css).not.toContain(".mp4");

  const publicDir = path.join(root, "public");
  const files = readdirSync(publicDir);
  expect(files.some((file) => /\.(mp4|webm|gif)$/i.test(file))).toBe(false);
});

function collectSources(directory: string, into: string[]) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) collectSources(full, into);
    else if (/\.(tsx|ts)$/.test(entry.name)) into.push(full);
  }
}

test("public copy avoids clinical labels and invented phone numbers", () => {
  const files: string[] = [path.join(root, "src/app/not-found.tsx")];
  for (const directory of [
    "src/app/(public)",
    "src/app/(student)",
    "src/components/layout",
    "src/components/landing",
    "src/components/app",
    "src/components/auth",
  ]) {
    collectSources(path.join(root, directory), files);
  }
  const banned =
    /\b(patient|disorder|diagnosis|treatment|depressed|anxious|mentally ill|suffering from|prototype|stakeholder)\b/i;
  const phone = /(?:\+\d{8,}|\b\d{3}[-. )\u2013]\d{3}[-. ]\d{4}\b)/;

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    expect(source, file).not.toMatch(banned);
    expect(source, file).not.toMatch(phone);
  }
});
