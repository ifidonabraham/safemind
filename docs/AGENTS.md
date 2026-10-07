# AGENTS.md — Rules for the Coding AI

You are building **SafeMind**, a privacy-first mental wellness platform for UNILAG students. Read this file fully before writing any code. These rules override your defaults.

## 1. What we are building
A web prototype for a stakeholder demo. It must look finished, work end to end on the demo path, and be honest about what is simulated. Mobile (Flutter) comes later, so the backend must be reusable.

## 2. Locked stack
- **Framework:** Next.js (App Router) + React + TypeScript (`strict: true`)
- **Styling:** Tailwind CSS. Design tokens from `DESIGN_SYSTEM.md`
- **Database/Auth:** Supabase (Postgres + Auth + Realtime). Row Level Security ON for every table
- **Validation:** Zod on every API input and output
- **Charts:** Recharts. **Animation:** Framer Motion (+ CSS for the hero)
- **AI:** behind a `LLMProvider` interface in `src/server/spag/llm.ts`. Never call a model directly from a route or component
- **Deploy:** Vercel + Supabase
Do not add other frameworks or major libraries without asking.

## 3. Architecture rules (non-negotiable)
1. **API-first.** All business logic lives in `src/server/services/*` and is exposed via `/api/v1/*` route handlers (see `API_SPEC.md`). UI components call the API, never the database directly. This is what lets the mobile app reuse everything.
2. **No secrets on the client.** Only `NEXT_PUBLIC_*` vars are client-visible.
3. **Every API route:** authenticate → authorize by role → validate with Zod → run service → audit-log if sensitive → return the standard envelope.
4. **Roles:** `student`, `peer`, `counsellor`, `admin`. Enforce in both API and RLS.
5. **Admins can NEVER read** journals, messages, mood notes, or conversation content. Admins only read aggregate views (min group size 5). Enforce at the database level, not just the UI.
6. **Audit log** every sensitive action (see `SECURITY_PRIVACY.md`). Audit table is append-only.

## 4. Safety rules (non-negotiable)
1. **No diagnosis, ever.** No UI copy, AI output, or variable names may claim a user "has" depression/anxiety/etc. Do not use the words *patient*, *disorder*, *diagnosis*, *treatment* in user-facing copy.
2. **Every AI reply passes through the SPAG pipeline** (`SPAG_PIPELINE.md`) including output guardrails. No bypass paths, not even for testing.
3. **Fail toward safety.** If classification errors or times out, treat as `moderate` risk and show support options. Never silently drop a message.
4. **Crisis resources come from `src/config/crisis-resources.ts` only.** Never invent phone numbers, hotlines, or organizations. Unverified entries stay marked `verified: false`.
5. **Humans decide.** The system flags and routes. It never auto-contacts anyone outside the platform.
6. **Synthetic data only.** No real student data in the repo, seeds, or screenshots.

## 5. Code conventions
- Folder structure per `ARCHITECTURE.md`. Files under ~250 lines; split otherwise.
- Named exports; no `any` (use `unknown` + narrowing).
- Server code in `src/server/**` must never be imported by client components.
- Every page needs **loading, empty, error** states.
- Accessibility: semantic HTML, keyboard navigable, visible focus, WCAG AA contrast, `prefers-reduced-motion` respected.
- Performance: mobile-first, works on slow connections. Initial JS per route under 200 KB gzipped where feasible. Lazy-load charts and animation.
- Env vars documented in `.env.example`. Never commit `.env`.

## 6. How to work
- Do **one phase** at a time from `BUILD_PLAN.md`. Do not start the next phase.
- Prefer small, targeted edits over rewrites. Do not refactor unrelated code.
- Do not invent features, routes, or tables not in the docs. If something is ambiguous or missing, **ask** and list your assumption.
- After each phase: run `typecheck`, `lint`, and tests; report what passed; list anything simulated or skipped.
- Keep a running `CHANGELOG.md` (one line per meaningful change).

## 7. Definition of done (per phase)
- Acceptance checks in `BUILD_PLAN.md` pass
- Typecheck + lint clean
- Loading/empty/error states exist
- No rule in this file is violated
- Anything faked is labeled `// PROTOTYPE:` in code and listed in your report
