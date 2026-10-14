"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLook } from "@/components/app/look-store";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/dialog";
import { Input } from "@/components/ui/inputs";

export function SettingsScreen() {
  const { state, setAlias, clearAll } = useLook();
  const router = useRouter();
  const [alias, setAliasDraft] = useState(state.alias);
  const [confirming, setConfirming] = useState(false);

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "safemind.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col gap-6">
      <div>
        <h1 className="text-[28px] text-ink sm:text-[36px]">Privacy and data</h1>
        <p className="mt-2 text-base text-ink-soft">
          Your journal and chats are yours. Admins see only anonymous totals.
        </p>
      </div>

      <Card>
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!alias.trim()) return;
            setAlias(alias);
          }}
        >
          <Input
            label="Name on your home screen"
            hint="It does not have to be your real name."
            value={alias}
            onChange={(event) => setAliasDraft(event.target.value)}
          />
          <Button type="submit">Save name</Button>
        </form>
      </Card>

      <Card>
        <h2 className="text-[22px] text-ink">Appearance</h2>
        <div className="mt-4">
          <ThemeToggle />
        </div>
      </Card>

      <Card>
        <h2 className="text-[22px] text-ink">Your data</h2>
        <p className="mt-2 text-base text-ink-soft">
          Export a copy, or delete what is stored on this device.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary" onClick={exportData}>
            Export my data
          </Button>
          <Button variant="danger-soft" onClick={() => setConfirming(true)}>
            Delete account
          </Button>
        </div>
        <Link
          href="/how-it-works"
          className="mt-4 inline-flex min-h-11 items-center text-base font-medium text-primary underline decoration-primary underline-offset-4"
        >
          Who can see what
        </Link>
      </Card>

      <Modal
        open={confirming}
        onClose={() => setConfirming(false)}
        title="Delete your account?"
      >
        <p>This removes your check-ins, journal, and chats from this device.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="danger-soft"
            onClick={() => {
              clearAll();
              setConfirming(false);
              router.push("/");
            }}
          >
            Delete everything
          </Button>
          <Button variant="secondary" onClick={() => setConfirming(false)}>
            Keep my account
          </Button>
        </div>
      </Modal>
    </div>
  );
}
