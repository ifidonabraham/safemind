# ARCHITECTURE.md

## 1. Overview
```
Browser (Next.js UI)  ─┐
Flutter app (later)   ─┼──►  /api/v1/*  (route handlers)
                        │         │
                        │    src/server/services/*   ◄── business logic
                        │         │
                        │    ┌────┴─────────────┐
                        │  Supabase Postgres   SPAG pipeline ──► LLMProvider
                        │  (RLS, audit, views)   (validate→classify→respond→guard)
                        └──────── Realtime (counsellor queue, live chat)
```
**PROTOTYPE DECISION:** One Next.js app serves both UI and API to move fast. The PRD lists FastAPI; we keep the API boundary clean (`/api/v1`, OpenAPI-documented) so it can be extracted into FastAPI or NestJS later without changing clients.

## 2. Stack
| Layer | Choice |
|---|---|
| Web | Next.js App Router, React, TypeScript strict, Tailwind |
| API | Next.js route handlers under `/api/v1`, Zod-validated |
| DB/Auth/Realtime | Supabase (Postgres, Auth, RLS, Realtime) |
| AI | `LLMProvider` interface; provider chosen by env var |
| Charts/Motion | Recharts, Framer Motion |
| Deploy | Vercel + Supabase |
| Later | Flutter mobile, Redis, Docker, Prometheus/Grafana, Sentry |

## 3. Folder structure
```
src/
  app/
    (public)/            landing, privacy, about, login, register
    (student)/student/   home, mood, journal, chat, resources, support, settings
    (support)/support/   peer dashboard, sessions
    (counsellor)/counsellor/  queue, case/[id], appointments
    (admin)/admin/       overview, service-metrics, audit
    api/v1/              route handlers (see API_SPEC.md)
  components/
    ui/                  buttons, cards, inputs (design system)
    features/            mood, journal, chat, triage, charts
  server/
    services/            auth, mood, journal, conversation, risk, support, appointments, admin
    spag/                pipeline.ts, classifier.ts, guardrails.ts, prompts.ts, llm.ts, rules.ts
    security/            crypto.ts, audit.ts, rate-limit.ts, rbac.ts
    db/                  supabase clients, typed queries
  config/
    crisis-resources.ts  VERIFIED-ONLY contacts (placeholders until reviewed)
    risk-policy.ts       risk levels → actions mapping
  lib/                   shared types, zod schemas, utils
supabase/
  migrations/            SQL (schema + RLS + views)
  seed/                  synthetic data scripts
tests/
  spag/                  safety eval cases (JSON) + runner
docs/                    this spec pack
```

## 4. Roles and routes
| Role | Can access | Cannot access |
|---|---|---|
| student | own mood, journal, chats, support requests, appointments | anyone else's data |
| peer | assigned support sessions (messages in those sessions only) | journals, AI chats, other sessions |
| counsellor | escalated cases assigned/in queue, their appointments | unescalated private data, journals |
| admin | aggregate metrics, audit log, user counts by role | ANY content: journals, messages, mood notes |

Route guard: middleware checks session + role; unauthorized → redirect to the user's own home, never reveal that a route exists.

## 5. Auth (Privacy Mode)
- Sign-up with **username + password** (no real name, email optional).
- Implementation: Supabase Auth with a synthetic email `username@users.safemind.invalid`. Real email is optional and stored only if the user opts in for recovery.
- Without email, show a **one-time recovery code** at sign-up (user must confirm saved).
- Password policy: min 10 chars. Optional MFA (TOTP) in settings (PROTOTYPE: UI + Supabase TOTP if time allows).
- Consent screen at first login: store `consent_version` + timestamp. Block feature access until accepted.
- **Demo mode** (`NEXT_PUBLIC_DEMO_MODE=true`): shows a role switcher using pre-made demo accounts. Must be impossible to enable in production builds (guard with `NODE_ENV`).

## 6. Realtime
Supabase Realtime channels for: new escalations in the counsellor queue, support-session messages. Subscriptions are RLS-scoped.

## 7. Encryption
- TLS everywhere (platform default).
- **Application-level encryption** (AES-256-GCM) for journal bodies, message content, and mood notes using a server-side key from env (`CONTENT_ENCRYPTION_KEY`). PROTOTYPE: single key; production plan: per-user data keys via KMS.
- Passwords hashed by Supabase Auth (bcrypt). Production target per PRD: Argon2id.

## 8. Mobile readiness (build for it now)
- All features reachable through `/api/v1` with bearer-token auth (Supabase JWT).
- Maintain `openapi.yaml` generated from Zod schemas (e.g. `zod-to-openapi`).
- No business logic in React components.
- Keep API responses pagination-ready (`cursor`, `limit`).
- Standard envelope: `{ data, error: null }` or `{ data: null, error: { code, message } }`.
- Later: Flutter app consumes the same API; push via FCM/APNs replaces web Realtime for notifications.

## 9. Environment variables (`.env.example`)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server only
CONTENT_ENCRYPTION_KEY=           # 32-byte base64, server only
LLM_PROVIDER=                     # e.g. anthropic | openai | xai | mock
LLM_API_KEY=                      # server only
LLM_MODEL=
NEXT_PUBLIC_DEMO_MODE=false
```
`LLM_PROVIDER=mock` must work (deterministic canned replies) so the app runs without any key.
