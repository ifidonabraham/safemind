# KNOWN_GAPS.md

Honest list for the demo and for the coding AI. Update this after Phase 9. Do not hide a gap by inventing a feature.

## Accepted for the stakeholder prototype

| Gap | What the demo should say |
|---|---|
| Crisis contacts are placeholders (`verified: false`) | Counselling unit must supply verified UNILAG / Nigeria contacts before any real use. |
| SPAG eval set is 15 starter cases | Clinical advisors extend it, including Pidgin, Yoruba, Igbo, and Hausa-influenced English. |
| Single content-encryption key | Production plan is per-user keys via KMS. |
| Password hashing is bcrypt (Supabase) | Argon2id is the production target. |
| Rate limits are in-memory | Redis before pilot. |
| MFA is optional / may be UI-only | Not required to finish the demo path. |
| No WAF, IDS, Sentry, or pen test | Required before a real student pilot. |
| No legal review of consent / NDPA | Draft only. Do not collect real student data before sign-off. |
| Appointments use seeded static slots | Not a live calendar integration. |
| Peer matching is manual accept, not an algorithm | Fine for the demo. |
| Admin metrics can be seeded | Label synthetic. k≥5 suppression must still be real in the query. |
| Demo mode role switcher | Must be impossible in a production build. |

## Not in this prototype (later)

- Flutter app
- FastAPI (or NestJS) extraction of `/api/v1`
- Redis, Docker, Prometheus/Grafana, Sentry
- Per-user encryption keys
- Penetration test and incident-response runbook
- Multilingual SPAG evals signed off by advisors
- Advisor-reviewed crisis flows
- Pilot instrumentation and DPIA
- Payments, university licensing, grants workflow

## PRD acceptance criteria not met until pilot prep

From PRD §16. The prototype may demonstrate the behaviour. It does not satisfy these until the named review happens.

- Security testing completed before pilot launch
- Crisis resources and escalation reviewed by qualified mental-health/safety professionals
- Privacy notice, consent, and data-handling complete before sensitive data collection
- Risk/triage evaluated with qualified review, not only the starter harness
