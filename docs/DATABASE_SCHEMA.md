# DATABASE_SCHEMA.md

Postgres via Supabase. All tables: `id uuid pk default gen_random_uuid()`, `created_at timestamptz default now()`. **RLS enabled on every table.** Deny by default.

## 1. Enums
```sql
create type user_role as enum ('student','peer','counsellor','admin');
create type risk_level as enum ('none','low','moderate','high','critical');
create type review_status as enum ('pending','in_review','resolved','dismissed');
create type channel as enum ('ai','peer','professional');
create type sender_type as enum ('user','ai','peer','counsellor','system');
create type request_type as enum ('peer','professional');
create type request_status as enum ('open','matched','in_session','completed','cancelled');
create type appt_status as enum ('requested','confirmed','completed','cancelled');
```

## 2. Tables

### profiles (extends auth.users)
`id uuid pk references auth.users`, `username text unique not null`, `role user_role default 'student'`, `display_name text null` (optional alias), `consent_version text null`, `consented_at timestamptz null`, `mfa_enabled bool default false`, `is_demo bool default false`, `last_active_at timestamptz`.

### mood_entries
`user_id`, `score smallint check (1..5)`, `tags text[]` (e.g. `{exams,sleep,money}`), `note_enc text null` (encrypted).

### journal_entries
`user_id`, `title_enc text null`, `body_enc text not null`, `deleted_at timestamptz null` (soft delete → hard purge job after 30 days; user "delete" must also support immediate hard delete).

### conversations
`user_id`, `channel channel`, `status text default 'active'`, `escalated bool default false`, `title text null`.

### messages
`conversation_id`, `sender_type sender_type`, `sender_id uuid null`, `content_enc text not null`.

### risk_assessments (SPAG output)
`conversation_id`, `message_id`, `level risk_level`, `signals text[]` (category names only, from `SPAG_PIPELINE.md`), `confidence numeric(3,2)`, `rule_triggered bool`, `summary text` (short, no verbatim quotes), `status review_status default 'pending'`, `assigned_to uuid null`, `reviewed_by uuid null`, `reviewed_at timestamptz null`, `outcome text null`, `outcome_note_enc text null`, `first_response_at timestamptz null`.

### support_requests
`user_id`, `type request_type`, `urgency risk_level default 'low'`, `status request_status default 'open'`, `assigned_to uuid null`, `source_assessment_id uuid null`, `topic text null`.

### support_sessions
`request_id`, `conversation_id`, `supporter_id`, `status text`, `started_at`, `ended_at`.

### appointments
`user_id`, `provider_id`, `slot_start timestamptz`, `slot_end timestamptz`, `status appt_status default 'requested'`, `mode text` (`chat|call|in_person`).

### provider_availability (PROTOTYPE: seeded static slots)
`provider_id`, `slot_start`, `slot_end`, `booked bool default false`.

### resources
`title`, `category` (`stress|sleep|exams|finance|relationships|burnout|general`), `body_md`, `read_minutes`, `published bool`.

### audit_logs (append-only)
`actor_id uuid null`, `actor_role user_role null`, `action text`, `target_type text`, `target_id uuid null`, `metadata jsonb` (no content, no PII), `ip_hash text null`. Revoke UPDATE/DELETE from all roles; insert via server only.

## 3. RLS policies (summary)
| Table | student | peer | counsellor | admin |
|---|---|---|---|---|
| profiles | own row | own + users in assigned sessions (username/alias only) | own + escalated users (alias only) | role/counts via view only |
| mood_entries, journal_entries | own CRUD | none | none | **none** |
| conversations/messages | own | only sessions they're assigned | only escalated, assigned/in queue | **none** |
| risk_assessments | none | none | read/update queue | **none** (aggregates via view) |
| support_requests | own | open peer requests | professional requests | **none** (aggregates) |
| appointments | own | none | own as provider | **none** (aggregates) |
| resources | read published | read | read/write | write |
| audit_logs | none | none | none | **read** |

Escalation consent: a counsellor sees an escalated conversation only after the student was shown the escalation notice (`escalated=true` set by the pipeline, notice logged in audit).

## 4. Aggregate views (admin-only, k-anonymity)
All views suppress any group with fewer than **5** users/rows (return null/"<5").
- `v_daily_active_users(day, count)`
- `v_mood_trend(week, avg_score, entries)` — campus-level, not per user
- `v_service_demand(week, request_type, count)`
- `v_response_times(week, p50_minutes, p90_minutes)` — from `risk_assessments.first_response_at`
- `v_support_completion(week, started, completed, rate)`
- `v_escalations(week, level, count)`
- `v_safety_incidents(week, severity, count)` — manual log entries

## 5. Indexes
`mood_entries(user_id, created_at desc)`, `journal_entries(user_id, created_at desc)`, `messages(conversation_id, created_at)`, `risk_assessments(status, level, created_at)`, `audit_logs(created_at desc, action)`.

## 6. Seed data (synthetic only) — `supabase/seed/`
- Roles: 1 admin, 2 counsellors, 3 peers, ~60 students (usernames like `quietriver42`; none resembling real people).
- 6 weeks of mood entries with a believable pattern: dips around mid-semester and exams, recovery after.
- 12 resources across categories (original, non-clinical wording).
- 4 demo conversations at different risk levels; 2 pending escalations for the counsellor queue.
- Provider availability for the next 14 days.
- Demo accounts: `demo_student`, `demo_peer`, `demo_counsellor`, `demo_admin` (flag `is_demo=true`; disabled when not in demo mode).
