"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { prepareSpace } from "@/components/app/look-store";
import { BreathingOrb } from "@/components/ui/breathing-orb";
import { Button, buttonClassName } from "@/components/ui/button";
import { Input } from "@/components/ui/inputs";
import { ProgressDots } from "@/components/ui/progress-dots";

const CONSENT_KEY = "safemind-consent";

function recoveryCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  const chars = [...bytes]
    .map((value) => alphabet[value % alphabet.length] ?? "A")
    .join("");
  return `SM-${chars.slice(0, 4)}-${chars.slice(4)}`;
}

export function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [savedCode, setSavedCode] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  return (
    <AccountFrame
      title={step === 0 ? "Create your account" : "Save your recovery code"}
      lede={
        step === 0
          ? "A private place to check in, write, and reach a person. We do not ask for your real name."
          : "This code is the way back in if you forget your password. Save it somewhere only you can open."
      }
    >
      <ProgressDots
        steps={["Account", "Recovery code"]}
        current={step}
        label="Sign up"
      />
      {step === 0 ? (
        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (username.trim().length < 2) {
              setError("Choose a name with at least 2 characters.");
              return;
            }
            if (password.length < 8) {
              setError("Use at least 8 characters.");
              return;
            }
            if (!agreed) {
              setError("Please confirm the privacy notice before you continue.");
              return;
            }
            setError("");
            prepareSpace(username.trim());
            setCode(recoveryCode());
            setStep(1);
          }}
        >
          <Input
            label="Username"
            hint="This is the name on your home screen."
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Input
            label="Email, if you want one"
            type="email"
            autoComplete="email"
            hint="You can skip this."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label className="flex min-h-11 items-start gap-3 text-base text-ink">
            <input
              type="checkbox"
              className="mt-1 size-5 accent-primary"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
            />
            <span>
              I understand my journal stays mine, and a person may see a flagged
              chat only after I am told.
            </span>
          </label>
          {error ? <p className="text-sm text-care-ink">{error}</p> : null}
          <Button type="submit">Continue</Button>
        </form>
      ) : (
        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!savedCode) {
              setError("Confirm that you have saved the code.");
              return;
            }
            router.push("/login");
          }}
        >
          <p className="rounded-[20px] border border-line bg-surface-alt px-4 py-6 text-center font-serif text-[28px] tracking-wide text-ink">
            {code || "····"}
          </p>
          <label className="flex min-h-11 items-start gap-3 text-base text-ink">
            <input
              type="checkbox"
              className="mt-1 size-5 accent-primary"
              checked={savedCode}
              onChange={(event) => setSavedCode(event.target.checked)}
            />
            <span>I have saved this code.</span>
          </label>
          {error ? <p className="text-sm text-care-ink">{error}</p> : null}
          <Button type="submit">Continue to log in</Button>
        </form>
      )}
      <p className="mt-6 text-base text-ink-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary underline">
          Log in
        </Link>
      </p>
    </AccountFrame>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <AccountFrame
      title="Welcome back"
      lede="Log in to your private space."
    >
      <form
        className="mt-6 flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!username.trim() || !password) {
            setError("Enter your username and password.");
            return;
          }
          prepareSpace(username.trim());
          const accepted = sessionStorage.getItem(CONSENT_KEY) === "accepted";
          router.push(accepted ? "/student" : "/consent");
        }}
      >
        <Input
          label="Username"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error ? <p className="text-sm text-care-ink">{error}</p> : null}
        <Button type="submit">Log in</Button>
      </form>
      <p className="mt-6 flex flex-col gap-2 text-base">
        <Link href="/recover" className="font-medium text-primary underline">
          Use a recovery code
        </Link>
        <Link href="/register" className="text-ink-soft">
          Create an account
        </Link>
      </p>
    </AccountFrame>
  );
}

export function RecoverForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  return (
    <AccountFrame
      title="Use your recovery code"
      lede="Enter the code you saved when you created your account."
    >
      <form
        className="mt-6 flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!username.trim() || code.trim().length < 4) {
            setError("Enter your username and recovery code.");
            return;
          }
          prepareSpace(username.trim());
          router.push("/login");
        }}
      >
        <Input
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          label="Recovery code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
        {error ? <p className="text-sm text-care-ink">{error}</p> : null}
        <Button type="submit">Continue</Button>
      </form>
    </AccountFrame>
  );
}

export function ConsentGate() {
  const router = useRouter();

  return (
    <AccountFrame
      title="Before you continue"
      lede="Here is what SafeMind does with what you share."
    >
      <div className="mt-6 flex max-w-[65ch] flex-col gap-4 text-base text-ink">
        <p>
          We collect a username and password, an email only if you add one, and
          the check-ins, journal entries, and chats you write. We do not ask
          for your real name.
        </p>
        <p>
          I&apos;m an AI companion, not a counsellor. I can listen, and help you
          reach people who can help.
        </p>
        <p>
          You can read your journal and chats. Peer supporters only see sessions
          assigned to them. A trained counsellor may review the relevant part of
          a conversation if it is flagged. You are told before that happens.
          University admins see anonymous totals only. Groups smaller than 5 are
          hidden.
        </p>
        <p>
          We do not sell your data. We do not show ads. We do not contact anyone
          outside SafeMind. You can export your data or delete your account, or
          you can leave now.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={() => {
            sessionStorage.setItem(CONSENT_KEY, "accepted");
            router.push("/student");
          }}
        >
          Accept and continue
        </Button>
        <Link href="/" className={buttonClassName("secondary")}>
          Leave
        </Link>
      </div>
    </AccountFrame>
  );
}

function AccountFrame({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <BreathingOrb className="absolute top-[-12rem] right-[-8rem] h-[32rem] w-[32rem] opacity-80" />
      </div>
      <div className="relative mx-auto w-full max-w-xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-[36px] text-ink">{title}</h1>
        <p className="mt-3 text-lg text-ink">{lede}</p>
        {children}
      </div>
    </section>
  );
}
