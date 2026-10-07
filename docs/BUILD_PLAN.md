# BUILD_PLAN.md — Phased Prompts for the Coding AI

Run **one phase at a time**. Paste `AGENTS.md` first in every new session. Attach only the docs listed. After each phase, run the checks, commit, then continue. Each prompt is copy-paste ready.

---
## Phase 0 — Scaffold
**Attach:** AGENTS.md, ARCHITECTURE.md
**Prompt:**
> Create the Next.js (App Router, TypeScript strict, Tailwind) project per ARCHITECTURE.md. Set up the folder structure, ESLint, Prettier, absolute imports (`@/`), `.env.example`, `CHANGELOG.md`, Supabase client helpers (browser, server, service-role), the standard API response envelope helpers, a Zod error-to-envelope mapper, and a `/api/v1/health` route. Add Vitest. No features yet.

**Done when:** `npm run dev`, `typecheck`, `lint`, `test` all pass; `/api/v1/health` returns the envelope.

---
## Phase 1 — Design system + landing
**Attach:** AGENTS.md, DESIGN_SYSTEM.md, SCREENS_AND_FLOWS.md (Public section)
**Prompt:**
> Implement the design tokens (light + dark) in Tailwind, fonts via next/font, and the base components in `components/ui` listed in DESIGN_SYSTEM.md §6. Build `/` (landing) with the breathing hero (CSS/SVG only), value blocks, safety strip and CTA, plus `/how-it-works`. Add a component showcase page at `/dev/ui` (dev only). Respect reduced motion. Copy tone per §8.

**Done when:** Landing passes AA contrast, works at 360px width, hero under 30 KB, Lighthouse performance ≥ 90 on mobile emulation.

---
## Phase 2 — Database + auth + consent
**Attach:** AGENTS.md, DATABASE_SCHEMA.md, ARCHITECTURE.md §5, API_SPEC.md (Auth), SECURITY_PRIVACY.md
**Prompt:**
> Write Supabase migrations for all enums, tables, indexes, RLS policies and aggregate views from DATABASE_SCHEMA.md. Implement pseudonymous auth (username + password via synthetic email), recovery code, consent gate, `/me`, role middleware, and the audit logger. Build `/register`, `/login`, `/recover`, the consent screen and role-based redirects. Implement `crypto.ts` (AES-256-GCM encrypt/decrypt helpers) with tests.

**Done when:** Test proves a student cannot read another student's rows (RLS + API); admin role cannot select from journals/messages/mood tables; audit rows written for register/login/logout/consent.

---
## Phase 3 — Mood + journal
**Attach:** AGENTS.md, API_SPEC.md (Mood, Journal), SCREENS_AND_FLOWS.md (Student), DESIGN_SYSTEM.md
**Prompt:**
> Implement mood and journal services, API routes and student pages. Mood: MoodPicker with tags and optional encrypted note, history, 30-day trend chart (Recharts, lazy-loaded). Journal: list, create, view, hard delete with confirmation; encrypt bodies; local draft autosave. Student shell with bottom nav (mobile) / sidebar (desktop) and the persistent "Need help now?" link.

**Done when:** Data is encrypted in the DB (verify raw column is not plaintext), delete is immediate and permanent, all empty/loading/error states exist.

---
## Phase 4 — SPAG + AI chat
**Attach:** AGENTS.md, SPAG_PIPELINE.md, API_SPEC.md (AI), SCREENS_AND_FLOWS.md (chat), DESIGN_SYSTEM.md
**Prompt:**
> Implement the SPAG pipeline in `src/server/spag/` exactly per SPAG_PIPELINE.md: rules scan, LLMProvider interface with MockProvider and one real provider, classification, merge (max of rules and LLM, fail to `moderate`), risk-policy mapping, level-aware prompts, output guardrails, persistence and audit. Build `POST /ai/conversation` and the student chat UI with AI disclosure, support-options chips, inline crisis card (from `config/crisis-resources.ts`, placeholder entries `verified:false`) and the escalation notice. Create the eval harness in `tests/spag/` with the 15 starter cases.

**Done when:** Eval runner reports zero false negatives on high/critical cases with the mock provider; every guardrail test blocks; app works with `LLM_PROVIDER=mock` and no API key.

---
## Phase 5 — Escalation + counsellor queue
**Attach:** AGENTS.md, SCREENS_AND_FLOWS.md (Counsellor, flow D), API_SPEC.md (Risk), DATABASE_SCHEMA.md
**Prompt:**
> Build the counsellor area: realtime queue (Supabase Realtime, RLS-scoped), case review page with limited conversation window and the Triage panel, actions (respond, resolve, dismiss with reason, assign, book), `first_response_at` capture, and audit entries for case open/update. Student sees status updates under Support.

**Done when:** A high-risk student message appears in the counsellor queue within ~2s; opening a case writes an audit row; counsellor cannot open un-escalated conversations.

---
## Phase 6 — Peer/professional support + appointments
**Attach:** AGENTS.md, API_SPEC.md (Support, Appointments), SCREENS_AND_FLOWS.md, DATABASE_SCHEMA.md
**Prompt:**
> Implement support requests, peer dashboard, session chat with Realtime, peer→counsellor escalation, completion + helpfulness, plus appointments with seeded availability (student slot picker, cancel, counsellor schedule).

**Done when:** Full flow E works across two browser sessions; peers cannot see anything outside assigned sessions.

---
## Phase 7 — Admin + audit
**Attach:** AGENTS.md, SCREENS_AND_FLOWS.md (Admin), DATABASE_SCHEMA.md §4, API_SPEC.md (Admin)
**Prompt:**
> Build the admin overview from the aggregate views only (k≥5 suppression), the "What admins can't see" page (data classes + blocked-attempt log from audit), the audit log viewer, and the manual safety-incident log.

**Done when:** A test proves admin API/DB access to content tables is denied and logged as `access.denied`; small groups render as "<5".

---
## Phase 8 — Seed + demo polish
**Attach:** AGENTS.md, DATABASE_SCHEMA.md §6, DEMO_SCRIPT.md
**Prompt:**
> Write synthetic seed scripts, demo accounts and the demo-mode role switcher (guarded against production). Add a "Reset demo data" script. Polish transitions, empty states and copy. Make sure every step of DEMO_SCRIPT.md works without errors, offline-safe with `LLM_PROVIDER=mock`.

**Done when:** The full 10-minute demo runs twice in a row from a reset with no manual fixes.

---
## Phase 9 — Security pass + deploy
**Attach:** AGENTS.md, SECURITY_PRIVACY.md
**Prompt:**
> Run the security checklist: IDOR tests across all routes, rate limits, headers (CSP, HSTS, X-Frame-Options), cookie flags, error-message uniformity, log scrubbing, dependency audit. Verify the production build refuses to start if demo mode is on or any displayed crisis entry is unverified (allow an explicit `ALLOW_PLACEHOLDER_CRISIS=true` override for the stakeholder demo only). Deploy to Vercel + Supabase and generate `openapi.yaml`.

**Done when:** Checklist items pass or are listed as known gaps in `KNOWN_GAPS.md`.

---
## Later (not in prototype)
Flutter app on the same `/api/v1`; FastAPI extraction; Redis rate limiting; WAF; per-user keys; pen test; multilingual SPAG evals (Pidgin, Yoruba, Igbo, Hausa); advisor-reviewed crisis flows; pilot instrumentation.
