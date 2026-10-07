# SCREENS_AND_FLOWS.md

Every screen needs **loading, empty, error** states. "Priority": P0 = on the demo path, P1 = build if time allows.

## Public
| Route | Screen | P | Notes |
|---|---|---|---|
| `/` | Landing | P0 | Breathing hero, 3 value blocks (Private / Supported / Human-led), "How SafeMind keeps you safe" strip, privacy promise, CTA "Start privately" |
| `/how-it-works` | Safety & privacy explainer | P0 | Plain-language: what AI does, what humans do, who can see what (simple table), escalation notice. Key stakeholder page |
| `/privacy` | Privacy notice | P1 | Draft text, marked "pending legal review" |
| `/register` | Sign up | P0 | Username, password, optional email, consent checkbox, then recovery code screen (must confirm saved) |
| `/login` | Log in | P0 | Link to recovery. Demo mode: role switcher panel |
| `/recover` | Recovery | P1 | |

## Consent gate (first login)
Full-screen: short plain consent (what's collected, who sees what, escalation notice, right to delete/export). Accept → continue. Decline → log out. Version stored.

## Student (`/student/*`)
| Route | Screen | P | Content |
|---|---|---|---|
| `/student` | Home | P0 | Greeting by alias, mood check-in card, "Talk to SafeMind" card, today's suggestion (resource), mini mood trend, "Need help now?" |
| `/student/mood` | Mood | P0 | MoodPicker (1–5 + tags + optional note), history list, 30-day trend chart, "delete entry" |
| `/student/journal` | Journal list | P0 | Entries by date, new entry button, delete (confirm) |
| `/student/journal/new` & `/[id]` | Editor/view | P0 | Title optional, body, autosave draft locally, lock icon + "only you can read this" |
| `/student/chat` | AI chat | P0 | Conversation list, chat pane, AI disclosure banner, typing indicator, support-options chip row when flagged, crisis card inline when `showCrisisCard`, escalation notice when `escalated` |
| `/student/resources` | Resource library | P1 | Category chips, article reader (markdown) |
| `/student/support` | Get human support | P0 | Choose peer or professional, topic, urgency; request status tracker; session chat when matched |
| `/student/appointments` | Appointments | P1 | Slot picker, upcoming list, cancel |
| `/student/settings` | Privacy & data | P0 | Alias, theme, MFA toggle (P1), export my data, delete account, consent version, "who can see what" |
| Crisis card (component) | Reachable from everywhere | P0 | Calm, still, large text; verified contacts from config; "Talk to someone now" → support request; "I'm safe for now" dismiss |

## Peer supporter (`/support/*`)
| `/support` | Dashboard | P1 | Open peer requests (alias, topic, urgency only), my active sessions |
| `/support/session/[id]` | Session chat | P1 | Guidelines sidebar, "Escalate to counsellor" button with reason, end session |

## Counsellor (`/counsellor/*`)
| Route | Screen | P | Content |
|---|---|---|---|
| `/counsellor` | Queue | P0 | Table sorted by risk then age: RiskBadge, alias, time waiting, status, source (AI/peer-escalated). Realtime new-item toast. Filters |
| `/counsellor/case/[id]` | Case review | P0 | Conversation window (limited to relevant messages), **Triage panel** (level, signals, confidence, rules vs model), actions: Respond to student, Book appointment, Mark resolved, Dismiss with reason, Assign. Every open is audit-logged and shown as such |
| `/counsellor/appointments` | Schedule | P1 | |

## Admin (`/admin/*`)
| Route | Screen | P | Content |
|---|---|---|---|
| `/admin` | Overview | P0 | StatCards (active users, check-ins, supported users, avg human response time), mood trend, demand by support type, completion rate. Banner: "Aggregate data only. Groups under 5 are hidden." |
| `/admin/privacy` | "What admins can't see" | P0 | Visual proof: list of data classes and access status, with live attempt log of blocked reads (from audit). Demo moment |
| `/admin/audit` | Audit log | P0 | Filterable table of actions (metadata only) |
| `/admin/safety` | Safety incidents | P1 | Manual log + counts |

## Key flows

**A. Sign-up:** `/register` → recovery code → `/login` → consent gate → `/student`.

**B. Daily check-in:** Home → MoodPicker → save → toast → trend updates → optional "want to write about it?" → journal.

**C. AI chat, normal:** message → pipeline (none/low) → reply → optional resource chip.

**D. AI chat, escalation (demo centerpiece):**
1. Student sends a high-risk message.
2. Pipeline: rules/LLM → `high` → safe reply generated → guardrails pass.
3. Student sees: caring reply + crisis card + support options + escalation notice.
4. `RiskAssessment` created (pending), counsellor queue updates in realtime.
5. Counsellor opens case (audit logged) → reviews → responds/books → marks resolved.
6. `first_response_at` recorded → feeds admin response-time metric.
7. Student sees status update under "Support".

**E. Request peer support:** `/student/support` → choose peer → open request → peer accepts → session chat → either side ends → optional "was this helpful?" → completion counted.

**F. Delete my data:** Settings → Delete account → password confirm → all rows hard-deleted → logged (no content).

## Demo-mode role switcher
Floating panel (bottom-left), only if `NEXT_PUBLIC_DEMO_MODE=true` and `NODE_ENV !== 'production'`: "View as: Student · Peer · Counsellor · Admin". Switches session to the seeded demo account.
