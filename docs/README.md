# SafeMind — Prototype Spec Pack (v0.1)

**Product:** AI-assisted, privacy-first mental wellness + human-support platform.
**Market:** University of Lagos (UNILAG). **Core principle:** AI scales support. Humans provide care.
**Current goal:** A working, polished **web prototype** to demo to UNILAG stakeholders. Mobile (Flutter) comes later.

## Files and read order

| # | File | Purpose |
|---|------|---------|
| 1 | `AGENTS.md` | Rules the coding AI must follow. Give this FIRST, every session. |
| 2 | `ARCHITECTURE.md` | Stack, folders, roles, routes, mobile-readiness |
| 3 | `DATABASE_SCHEMA.md` | Tables, enums, access rules, seed data |
| 4 | `API_SPEC.md` | `/api/v1` endpoints and shapes |
| 5 | `SPAG_PIPELINE.md` | The AI safety/triage layer (the core differentiator) |
| 6 | `DESIGN_SYSTEM.md` | Look, feel, tokens, motion, copy tone |
| 7 | `SCREENS_AND_FLOWS.md` | Every page per role, with states |
| 8 | `SECURITY_PRIVACY.md` | Privacy/security requirements for the prototype |
| 9 | `BUILD_PLAN.md` | Phased, copy-paste prompts for the coding AI |
| 10 | `DEMO_SCRIPT.md` | 10-minute stakeholder demo + Q&A prep |
| 11 | `PRODUCT_DECISIONS.md` | Where the prototype intentionally differs from the PRD |
| 12 | `KNOWN_GAPS.md` | What is faked, deferred, or not safe for real students yet |
| 13 | `CONSENT_DRAFT.md` | Consent screen copy. Pending legal review |
| 14 | `STAKEHOLDER_NOTES.md` | Blank capture sheet for the demo |
| 15 | `CHANGELOG.md` | One line per meaningful change |

## How to use with the coding AI

1. Start a session by pasting `AGENTS.md`.
2. Run **one phase at a time** from `BUILD_PLAN.md`. Attach only the docs that phase lists.
3. After each phase: run the acceptance checks, commit, then move on.
4. If the AI invents features or breaks a rule in `AGENTS.md`, point it back to the file.

## Source of truth

`SafeMind_PRD_MVP_1_0.pdf` is the product source of truth. If these docs conflict with it, the PRD wins, except where a doc says "PROTOTYPE DECISION".

## Open items (need human decisions)

- Verified Nigerian/UNILAG crisis contacts (from UNILAG counselling unit) — placeholders only until then.
- Final brand name/logo (using "SafeMind" for now).
- LLM provider and API key for the in-product assistant.
- Consent and privacy notice wording (needs legal/clinical review before any real users).
