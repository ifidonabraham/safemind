# SECURITY_PRIVACY.md

Maps PRD §12 to what the **prototype** implements, simulates, or defers. Anything faked is labeled `// PROTOTYPE:` in code and disclosed in the demo.

## 1. Status matrix
| PRD requirement | Prototype | Notes |
|---|---|---|
| TLS in transit | ✅ platform default | Vercel/Supabase |
| Encryption at rest | ✅ DB-level (Supabase) + ✅ app-level AES-256-GCM for journals, messages, mood notes | Single env key now; per-user keys via KMS later |
| RBAC / least privilege | ✅ API middleware + Postgres RLS | Test with cross-role access attempts |
| Secure auth + sessions | ✅ Supabase Auth, httpOnly cookies, short-lived JWT | |
| Optional MFA | 🟡 TOTP via Supabase if time allows | |
| Strong password hashing | 🟡 bcrypt (Supabase) | Argon2id at production migration |
| Audit logging | ✅ append-only table | See §3 |
| Rate limiting | 🟡 in-memory per instance | Redis later |
| WAF/IDS, threat monitoring | ⛔ deferred | Cloud WAF + Sentry in pilot phase |
| Data minimization | ✅ no real name/phone required | |
| Retention limits | 🟡 documented + soft-delete purge job stub | |
| Access/deletion | ✅ export + hard delete endpoints | |
| Pen testing | ⛔ deferred | Required before real pilot |
| Zero Trust | 🟡 re-verify session + role on every request | |

## 2. Data classification
| Class | Examples | Handling |
|---|---|---|
| Sensitive content | journal bodies, chat messages, mood notes | App-level encrypted; owner-only; never logged; never in analytics |
| Sensitive metadata | risk levels, signals, escalation status | Counsellor-visible only for escalated cases; aggregate for admin |
| Account data | username, role, consent version | Minimal; no real identity required |
| Operational | audit logs, metrics | Metadata only; no content or PII |

## 3. Audit log — must record
`auth.register`, `auth.login`, `auth.login_failed`, `auth.logout`, `auth.recover`, `consent.accept`, `journal.delete`, `account.delete`, `data.export`, `risk.escalated`, `risk.case_opened`, `risk.case_updated`, `support.accepted`, `support.escalated`, `appointment.cancel`, `admin.metrics_view`, `admin.audit_view`, `access.denied` (role/route/resource), `safety.incident_logged`.
Fields: actor id/role, action, target type/id, metadata (no content), `ip_hash` (salted hash). Append-only; no update/delete grants.

## 4. Logging rules
- Never log message content, journal text, passwords, tokens, or recovery codes (server logs included).
- Error reports must scrub request bodies.
- LLM requests: send only the conversation text needed; no username, no IDs. Disable provider-side training/retention where the provider allows. Document the provider's data policy in the pilot DPIA.

## 5. Privacy promises (UI copy must match behaviour)
1. Journals and chats are readable only by their owner.
2. Admins see anonymous totals only (groups under 5 hidden).
3. If the system detects possible serious risk, a trained counsellor may review the relevant part of the conversation. The student is told first.
4. Nothing is sold. No ads. No third-party analytics on content.
5. Users can export or delete everything, anytime.
Do not ship a promise the code does not enforce.

## 6. Consent (outline for legal review)
Versioned text covering: what we collect; AI limits (not a counsellor, not emergency service); human review on risk; who sees what; retention; rights (access, export, deletion); contact for complaints. Reference the Nigeria Data Protection Act (NDPA) in the draft and flag for legal confirmation. **Pending legal and clinical review. Do not use with real students before sign-off.**

## 7. Threat model (starter list)
- Cross-user data access (IDOR) → RLS + ownership checks + tests
- Admin overreach → no content policies, DB-level
- Prompt injection / jailbreak → rules floor, guardrails, SPAG evals
- Account takeover → rate limits, lockout/backoff, MFA option
- Data leakage via logs/LLM → logging rules §4
- Counsellor misuse → audit + case-open notices
- Enumeration via error messages → uniform auth errors
- Demo-mode leak to production → build-time guard

## 8. Pre-pilot checklist (not for prototype demo)
- [ ] Clinical/safety advisor review of crisis flows and SPAG evals
- [ ] Legal review: consent, NDPA compliance, data processing agreement with university
- [ ] Verified crisis contacts in config
- [ ] Penetration test + fixes
- [ ] Incident response plan and on-call human coverage for escalations (24/7 or clear hours disclosed)
- [ ] Per-user encryption keys, Argon2id, Redis rate limiting, WAF
- [ ] Data protection impact assessment
