# SafeMind

Privacy-first mental wellness prototype for University of Lagos students. The spec pack is in `docs/`. Coding rules are in `AGENTS.md`.

This repository is at Phase 1: design system and public pages. Sign-up, data, and product tools are not built yet.

Open `/` for the landing page and `/how-it-works` for the safety explainer. `/dev/ui` previews components in development only.

## Scripts

- `npm run dev`
- `npm run typecheck`
- `npm run lint`
- `npm run test`

`GET /api/v1/health` returns `{ "data": { "status": "ok" }, "error": null }`.

Copy `.env.example` to `.env.local` before wiring Supabase. The health route does not need those values.
