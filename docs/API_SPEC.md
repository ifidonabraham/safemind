# API_SPEC.md

Base path: `/api/v1`. JSON only. Auth: Supabase session cookie (web) or `Authorization: Bearer <jwt>` (mobile later).

## Conventions
- Success: `{ "data": <payload>, "error": null }`
- Error: `{ "data": null, "error": { "code": "VALIDATION_ERROR", "message": "...", "fields"?: {...} } }`
- Codes: `UNAUTHENTICATED` 401, `FORBIDDEN` 403, `NOT_FOUND` 404, `VALIDATION_ERROR` 422, `RATE_LIMITED` 429, `INTERNAL` 500.
- Lists: `?limit=20&cursor=<opaque>` → `{ items, nextCursor }`.
- Timestamps ISO 8601 UTC. IDs are UUIDs.
- Every route: auth → role check → Zod validate → service → audit (if marked 🔒) → respond.
- Rate limits (PROTOTYPE: in-memory): auth 5/min/IP, AI 20/min/user, others 60/min/user.

## Auth
| Method | Path | Body | Notes |
|---|---|---|---|
| POST | `/auth/register` | `{ username, password, email? , acceptConsent: true }` | Returns `{ user, recoveryCode }` (code shown once) 🔒 |
| POST | `/auth/login` | `{ username, password }` | 🔒 |
| POST | `/auth/logout` | – | 🔒 |
| POST | `/auth/recover` | `{ username, recoveryCode, newPassword }` | 🔒 |
| GET | `/me` | – | profile + role + consent status |
| POST | `/me/consent` | `{ version }` | 🔒 |
| DELETE | `/me` | `{ password }` | Account + all data deletion 🔒 |
| GET | `/me/export` | – | JSON export of own data 🔒 |

## Mood (student)
| POST | `/moods` | `{ score: 1-5, tags?: string[], note?: string(<=500) }` |
| GET | `/moods` | `?from&to&limit&cursor` → entries + `summary { avg, trend }` |

## Journal (student) 🔒 on delete
| POST | `/journals` | `{ title?, body }` |
| GET | `/journals` | list (decrypted server-side for owner only) |
| GET | `/journals/{id}` | single |
| DELETE | `/journals/{id}` | hard delete, immediate 🔒 |

## AI conversation (student)
| POST | `/ai/conversation` | `{ conversationId?: uuid, message: string(<=2000) }` |
Response:
```json
{ "data": {
  "conversationId": "uuid",
  "reply": { "id": "uuid", "text": "...", "createdAt": "..." },
  "safety": {
    "level": "none|low|moderate|high|critical",
    "showSupportOptions": true,
    "showCrisisCard": false,
    "escalated": false
  }
}, "error": null }
```
The client renders `safety.*` flags; it never decides risk itself. Never return raw signals or confidence to the student.
| GET | `/conversations` | list own |
| GET | `/conversations/{id}/messages` | own only |

## Risk / triage
| POST | `/risk/assess` | `{ conversationId, messageId }` | Internal-use + testable; counsellor/admin-test only. Normal flow runs inside `/ai/conversation`. |
| GET | `/risk/queue` | counsellor. `?status&level` sorted by level desc, age desc |
| GET | `/risk/{id}` | counsellor. Case detail: conversation excerpt window, signals, confidence 🔒 (access is audited) |
| PATCH | `/risk/{id}` | counsellor. `{ status, outcome?, note?, assignTo? }` 🔒 |

## Support (peer / professional)
| POST | `/support/request` | `{ type: "peer"|"professional", topic?, urgency? }` |
| GET | `/support/status` | student: own requests + status |
| GET | `/support/open` | peer/counsellor: open requests for their type |
| POST | `/support/{id}/accept` | peer/counsellor 🔒 |
| GET/POST | `/support/{id}/messages` | session chat (assigned supporter + student only) |
| POST | `/support/{id}/escalate` | peer → counsellor, `{ reason }` 🔒 |
| POST | `/support/{id}/complete` | `{ helpful?: boolean }` 🔒 |

## Appointments
| POST | `/appointments` | `{ providerId, slotStart, mode }` |
| GET | `/appointments` | own (student) or as provider (counsellor) |
| DELETE | `/appointments/{id}` | cancel 🔒 |
| GET | `/providers/availability` | `?from&to` |

## Resources
| GET | `/resources` | `?category` |
| GET | `/resources/crisis` | verified crisis contacts from config (flag `verified`) |

## Admin (aggregate only)
| GET | `/admin/metrics/overview` | DAU, mood trend, demand, completion, response times |
| GET | `/admin/metrics/{view}` | one of the views in `DATABASE_SCHEMA.md` |
| GET | `/admin/audit` | `?action&actor&from&to` (metadata only, no content) |
| POST | `/admin/safety-incidents` | manual incident log entry 🔒 |

## Zod
Define all request/response schemas in `src/lib/schemas/*.ts`; derive TypeScript types from them; generate `openapi.yaml` from them.
