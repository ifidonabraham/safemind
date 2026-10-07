# PRODUCT_DECISIONS.md — Prototype vs PRD

Source of truth: `SafeMind_PRD_MVP_1.0.pdf`. If a spec conflicts with the PRD, the PRD wins, except where this file marks a **PROTOTYPE DECISION**.

These decisions exist so the web prototype can be demoed to UNILAG stakeholders without pretending the production stack is already built. Mobile (Flutter) comes later and must reuse `/api/v1`.

## Locked for the prototype

| PRD says | Prototype decision | Why |
|---|---|---|
| Web: Next.js, React, TypeScript, Tailwind | Same. App Router, `strict: true`. | Direct match. |
| Backend: FastAPI/Python or NestJS | One Next.js app serves UI and `/api/v1`. API boundary stays clean and OpenAPI-documented so it can be extracted later. | Speed for the stakeholder demo. Do not put business logic in React. |
| Database: PostgreSQL | Supabase Postgres + Auth + Realtime + RLS. | Auth, RLS, and realtime queue in one place. |
| Cache: Redis | In-memory rate limits. Labeled `// PROTOTYPE:`. | Redis before pilot, not before demo. |
| AI: Python, PyTorch, Hugging Face | `LLMProvider` interface. `mock` required. One real provider behind env (`xai` / `openai` / `anthropic`). | Demo must run with no API key. No model calls from components. |
| Mobile: Flutter/Dart | Not in this prototype. API is bearer-token ready. | Web first, as agreed. |
| Infra: Docker, AWS/GCP, Prometheus, Grafana, Sentry | Vercel + Supabase. Observability deferred. | Demo hosting. |
| Password hashing: Argon2id | Supabase bcrypt now. Argon2id at production migration. | Platform default. |
| Encryption at rest | DB-level + app-level AES-256-GCM for journals, messages, mood notes. Single server key. | Per-user KMS keys before any real student. |
| WAF/IDS, pen test | Deferred. Listed in `KNOWN_GAPS.md`. | Required before pilot, not for the demo. |

## Product rules that are not optional

From PRD §§5, 8, 9, 12, 14, 20. The coding AI must not weaken these.

1. No diagnosis. No clinical labels in UI, AI output, or variable names shown to users.
2. No claim of predicting a crisis with certainty.
3. No replacement of counsellors, doctors, or emergency services.
4. No autonomous contact outside the platform unless a later approved policy exists.
5. No sale of identifiable mental-health data. No ads. No third-party analytics on content.
6. Admins see aggregates only. Groups under 5 are hidden. Enforced in the database, not only the UI.
7. High-risk signals go to a human pathway. The student is told before a counsellor can read that part of the chat.
8. Crisis contacts come only from config. Unverified entries stay marked unverified. Do not invent Nigerian hotline numbers.
9. Synthetic data only in the repo, seeds, and screenshots.
10. Safety before growth. Humans before automation in critical situations.

## What “done” means for this prototype

A stakeholder can sit through `DEMO_SCRIPT.md` and see:

- a finished landing page (code animation, not a video file)
- pseudonymous sign-up and consent
- mood + private journal
- an AI reply that has passed SPAG
- a high-risk message appear in the counsellor queue
- an admin view that cannot open journals or chats

It does not mean the app is safe for real UNILAG students. That needs the pre-pilot checklist in `SECURITY_PRIVACY.md`.
