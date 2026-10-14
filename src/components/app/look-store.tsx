"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type MoodEntry = {
  id: string;
  value: number;
  note: string;
  tags: string[];
  when: string;
};

export type JournalEntry = {
  id: string;
  title: string;
  body: string;
  when: string;
};

export type ChatMessage = {
  id: string;
  from: "you" | "companion";
  text: string;
};

export type SupportRequest = {
  kind: "peer" | "professional";
  topic: string;
  urgency: string;
  status: string;
};

export type LookState = {
  alias: string;
  moods: MoodEntry[];
  trend: number[];
  journals: JournalEntry[];
  messages: ChatMessage[];
  escalated: boolean;
  support: SupportRequest | null;
};

const LOOK_KEY = "safemind-look";
const ALIAS_KEY = "safemind-alias";
const CLEARED_KEY = "safemind-cleared";

const sample: LookState = {
  alias: "Ada",
  moods: [
    {
      id: "m1",
      value: 2,
      note: "Could not sleep.",
      tags: ["Sleep"],
      when: "Yesterday",
    },
    {
      id: "m2",
      value: 3,
      note: "",
      tags: ["Exams"],
      when: "5 Oct",
    },
    {
      id: "m3",
      value: 4,
      note: "Quieter after a walk.",
      tags: ["Campus"],
      when: "4 Oct",
    },
  ],
  trend: [3, 4, 3, 2, 2, 3, 4, 3, 2, 3, 4, 4, 3, 4],
  journals: [
    {
      id: "j1",
      title: "Sunday night",
      body: "Exams start next week and I can't sleep. Writing it down makes the week feel smaller.",
      when: "Sunday",
    },
    {
      id: "j2",
      title: "After class",
      body: "Walked back across campus. Felt quieter after talking it through.",
      when: "4 Oct",
    },
  ],
  messages: [
    {
      id: "c1",
      from: "you",
      text: "Exams start next week and I can't sleep.",
    },
    {
      id: "c2",
      from: "companion",
      text: "That sounds heavy. You do not have to sort it alone. I can listen, or help you reach a peer or a counsellor.",
    },
  ],
  escalated: false,
  support: null,
};

const emptyState: LookState = {
  alias: "",
  moods: [],
  trend: [],
  journals: [],
  messages: [],
  escalated: false,
  support: null,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readState(raw: string | null, alias: string | null): LookState {
  if (!raw) return { ...sample, alias: alias || sample.alias };
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return { ...sample, alias: alias || sample.alias };
    const base = { ...sample, ...parsed } as LookState;
    return {
      ...base,
      alias: alias || base.alias || sample.alias,
      moods: Array.isArray(base.moods) ? base.moods : sample.moods,
      trend: Array.isArray(base.trend) ? base.trend : sample.trend,
      journals: Array.isArray(base.journals) ? base.journals : sample.journals,
      messages: Array.isArray(base.messages) ? base.messages : sample.messages,
      escalated: Boolean(base.escalated),
      support: base.support ?? null,
    };
  } catch {
    return { ...sample, alias: alias || sample.alias };
  }
}

const listeners = new Set<() => void>();
let cache = sample;
let loaded = false;

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readFromStorage(): LookState {
  const alias = sessionStorage.getItem(ALIAS_KEY);
  if (sessionStorage.getItem(CLEARED_KEY) === "1") {
    return { ...emptyState, alias: alias ?? "" };
  }
  return readState(sessionStorage.getItem(LOOK_KEY), alias);
}

function getSnapshot(): LookState {
  if (!loaded) {
    cache = readFromStorage();
    loaded = true;
  }
  return cache;
}

function getServerSnapshot(): LookState {
  return sample;
}

function commit(next: LookState) {
  cache = next;
  loaded = true;
  if (sessionStorage.getItem(CLEARED_KEY) !== "1") {
    sessionStorage.setItem(LOOK_KEY, JSON.stringify(next));
  }
  emit();
}

function update(recipe: (current: LookState) => LookState) {
  commit(recipe(getSnapshot()));
}

function readyOnClient() {
  return true;
}

function readyOnServer() {
  return false;
}

function subscribeReady() {
  return () => {};
}

export function prepareSpace(alias: string) {
  sessionStorage.setItem(ALIAS_KEY, alias);
  sessionStorage.removeItem(CLEARED_KEY);
  cache = readFromStorage();
  loaded = true;
  emit();
}

type LookContextValue = {
  ready: boolean;
  state: LookState;
  setAlias: (alias: string) => void;
  addMood: (entry: { value: number; note: string; tags: string[] }) => void;
  deleteMood: (id: string) => void;
  saveJournal: (entry: { id?: string; title: string; body: string }) => string;
  deleteJournal: (id: string) => void;
  addMessage: (message: ChatMessage) => void;
  markEscalated: () => void;
  requestSupport: (request: Omit<SupportRequest, "status">) => void;
  clearAll: () => void;
};

const LookContext = createContext<LookContextValue | null>(null);

export function LookProvider({ children }: { children: ReactNode }) {
  const ready = useSyncExternalStore(
    subscribeReady,
    readyOnClient,
    readyOnServer,
  );
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<LookContextValue>(
    () => ({
      ready,
      state,
      setAlias(alias) {
        const next = alias.trim();
        sessionStorage.setItem(ALIAS_KEY, next);
        update((current) => ({ ...current, alias: next }));
      },
      addMood(entry) {
        const item: MoodEntry = {
          id: crypto.randomUUID(),
          value: entry.value,
          note: entry.note.trim(),
          tags: entry.tags,
          when: "Just now",
        };
        update((current) => ({
          ...current,
          moods: [item, ...current.moods],
          trend: [...current.trend, entry.value].slice(-30),
        }));
      },
      deleteMood(id) {
        update((current) => ({
          ...current,
          moods: current.moods.filter((item) => item.id !== id),
        }));
      },
      saveJournal(entry) {
        const id = entry.id ?? crypto.randomUUID();
        update((current) => {
          const next: JournalEntry = {
            id,
            title: entry.title.trim(),
            body: entry.body.trim(),
            when: "Just now",
          };
          const exists = current.journals.some((item) => item.id === id);
          return {
            ...current,
            journals: exists
              ? current.journals.map((item) => (item.id === id ? next : item))
              : [next, ...current.journals],
          };
        });
        return id;
      },
      deleteJournal(id) {
        update((current) => ({
          ...current,
          journals: current.journals.filter((item) => item.id !== id),
        }));
      },
      addMessage(message) {
        update((current) => ({
          ...current,
          messages: [...current.messages, message].slice(-40),
        }));
      },
      markEscalated() {
        update((current) => ({ ...current, escalated: true }));
      },
      requestSupport(request) {
        const status =
          request.kind === "peer"
            ? "Waiting for a peer supporter"
            : "Waiting for a counsellor";
        update((current) => ({
          ...current,
          support: { ...request, status },
        }));
      },
      clearAll() {
        sessionStorage.setItem(CLEARED_KEY, "1");
        sessionStorage.removeItem(LOOK_KEY);
        sessionStorage.removeItem(ALIAS_KEY);
        commit(emptyState);
      },
    }),
    [ready, state],
  );

  return <LookContext.Provider value={value}>{children}</LookContext.Provider>;
}

export function useLook(): LookContextValue {
  const value = useContext(LookContext);
  if (!value) throw new Error("useLook must be used within LookProvider");
  return value;
}
