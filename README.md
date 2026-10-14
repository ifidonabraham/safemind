# SafeMind

Privacy-first mental wellness platform for University of Lagos students. The spec pack is in `docs/`. Coding rules are in `AGENTS.md`.

The site is the product look: landing, sign-up, and the student screens for check-in, journal, chat, and human support. Screen data stays in the browser until the database phase.

Open `/` for the landing page, `/register` to enter, and `/student` for home. `/dev/ui` previews components in development only.

## Scripts

- `npm run dev`
- `npm run typecheck`
- `npm run lint`
- `npm run test`

`GET /api/v1/health` returns `{ "data": { "status": "ok" }, "error": null }`.

Copy `.env.example` to `.env.local` before wiring Supabase. The health route does not need those values.
