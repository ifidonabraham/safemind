"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useLook } from "@/components/app/look-store";
import { Button, buttonClassName } from "@/components/ui/button";
import { Modal } from "@/components/ui/dialog";
import { Input, Textarea } from "@/components/ui/inputs";
import { EmptyState } from "@/components/ui/status";
import { useToast } from "@/components/ui/toast";

const DRAFT_KEY = "safemind-draft";

function initialDraft(
  entryId: string | null,
  existing: { title: string; body: string } | undefined,
) {
  if (existing) return { title: existing.title, body: existing.body };
  if (entryId || typeof window === "undefined") return { title: "", body: "" };
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return { title: "", body: "" };
    const draft = JSON.parse(raw) as { title?: string; body?: string };
    return {
      title: typeof draft.title === "string" ? draft.title : "",
      body: typeof draft.body === "string" ? draft.body : "",
    };
  } catch {
    return { title: "", body: "" };
  }
}

export function JournalListScreen() {
  const { state, deleteJournal } = useLook();
  const [pendingId, setPendingId] = useState<string | null>(null);

  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] text-ink sm:text-[36px]">Journal</h1>
          <p className="mt-2 inline-flex items-center gap-2 text-base text-ink-soft">
            <Lock className="size-4" strokeWidth={1.75} aria-hidden="true" />
            Only you can read this
          </p>
        </div>
        <Link href="/student/journal/new" className={buttonClassName("primary")}>
          New entry
        </Link>
      </div>

      {state.journals.length === 0 ? (
        <EmptyState
          title="Nothing written yet"
          description="Write something only you can read. You can delete it later."
          action={
            <Link href="/student/journal/new" className={buttonClassName("primary")}>
              New entry
            </Link>
          }
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {state.journals.map((entry) => (
            <li key={entry.id}>
              <article className="rounded-[20px] border border-line bg-surface p-5 shadow-soft">
                <p className="text-sm text-ink-soft">{entry.when}</p>
                <h2 className="mt-1 text-[22px] text-ink">
                  <Link href={`/student/journal/${entry.id}`} className="underline-offset-4 hover:underline">
                    {entry.title || "Untitled"}
                  </Link>
                </h2>
                <p className="mt-2 line-clamp-3 text-base text-ink-soft">
                  {entry.body}
                </p>
                <button
                  type="button"
                  onClick={() => setPendingId(entry.id)}
                  className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-care-ink"
                >
                  Delete
                </button>
              </article>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={pendingId !== null}
        onClose={() => setPendingId(null)}
        title="Delete this entry?"
      >
        <p>This cannot be undone.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="danger-soft"
            onClick={() => {
              if (pendingId) deleteJournal(pendingId);
              setPendingId(null);
            }}
          >
            Delete entry
          </Button>
          <Button variant="secondary" onClick={() => setPendingId(null)}>
            Keep it
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export function JournalEditorScreen({ entryId }: { entryId: string | null }) {
  const { state, saveJournal, deleteJournal } = useLook();
  const { push } = useToast();
  const router = useRouter();
  const existing = entryId
    ? state.journals.find((entry) => entry.id === entryId)
    : undefined;
  const [title, setTitle] = useState(
    () => initialDraft(entryId, existing).title,
  );
  const [body, setBody] = useState(() => initialDraft(entryId, existing).body);
  const [savedNote, setSavedNote] = useState("");
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (entryId || (!title && !body)) return;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ title, body }));
      setSavedNote("Saved on this device");
    }, 400);
    return () => window.clearTimeout(timer);
  }, [body, entryId, title]);

  if (entryId && !existing) {
    return (
      <EmptyState
        title="That entry is not here"
        description="It may have been deleted."
        action={
          <Link href="/student/journal" className={buttonClassName("primary")}>
            Back to journal
          </Link>
        }
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-[760px]">
      <h1 className="text-[28px] text-ink sm:text-[36px]">
        {entryId ? "Your entry" : "New entry"}
      </h1>
      <p className="mt-2 inline-flex items-center gap-2 text-base text-ink-soft">
        <Lock className="size-4" strokeWidth={1.75} aria-hidden="true" />
        Only you can read this
      </p>
      <form
        className="mt-6 flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!body.trim()) return;
          const id = saveJournal({
            id: entryId ?? undefined,
            title,
            body,
          });
          if (!entryId) sessionStorage.removeItem(DRAFT_KEY);
          push({ title: "Entry saved" });
          router.push(`/student/journal/${id}`);
        }}
      >
        <Input
          label="Title, if you want one"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Textarea
          label="What is on your mind?"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          required
        />
        <p className="min-h-6 text-sm text-ink-soft" aria-live="polite">
          {savedNote}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit">Save entry</Button>
          {entryId ? (
            <Button
              type="button"
              variant="danger-soft"
              onClick={() => setConfirming(true)}
            >
              Delete entry
            </Button>
          ) : null}
        </div>
      </form>
      <Modal
        open={confirming}
        onClose={() => setConfirming(false)}
        title="Delete this entry?"
      >
        <p>This cannot be undone.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="danger-soft"
            onClick={() => {
              if (entryId) deleteJournal(entryId);
              setConfirming(false);
              router.push("/student/journal");
            }}
          >
            Delete entry
          </Button>
          <Button variant="secondary" onClick={() => setConfirming(false)}>
            Keep it
          </Button>
        </div>
      </Modal>
    </div>
  );
}
