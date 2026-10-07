# DESIGN_SYSTEM.md

## 1. Feel
Calm, warm, trustworthy, human. Not clinical (no hospital blue/white), not alarming (no red unless truly urgent), not playful-childish. Think: a quiet room with good light. Local relevance: UNILAG students, mostly on phones, often on slow or metered data.

## 2. Tokens (Tailwind theme extension)
**Light**
| Token | Hex | Use |
|---|---|---|
| `bg` | `#FAF7F2` | page background (warm paper) |
| `surface` | `#FFFFFF` | cards |
| `surface-alt` | `#F1ECE3` | subtle panels |
| `ink` | `#1F2A2E` | primary text |
| `ink-soft` | `#5B6A6E` | secondary text |
| `primary` | `#2F6F6A` | deep teal: buttons, links |
| `primary-soft` | `#DCEBE8` | tints |
| `accent` | `#E59A6B` | warm coral-amber: highlights |
| `calm` | `#8FB8A8` | sage: positive/mood-up |
| `care` | `#C8643F` | attention (high-risk UI): warm, not alarm-red |
| `line` | `#E2DCD0` | borders |

**Dark** (`prefers-color-scheme` + toggle): `bg #121A1C`, `surface #1B2528`, `ink #EAF0EE`, `ink-soft #9FB0B0`, `primary #6FB8AF`, `line #2C3A3D`. All pairs must meet WCAG AA.

**Mood scale (1–5):** `#C8643F` → `#E59A6B` → `#D9C7A0` → `#8FB8A8` → `#2F6F6A`. Always pair color with an icon/label, never color alone.

## 3. Type
- Headings: **Fraunces** (warm serif), weights 500–600
- Body/UI: **DM Sans**, weights 400–600
- Load via `next/font` (self-hosted, `display: swap`). Fallback: `Georgia`, `system-ui`.
- Scale: 14 / 16 / 18 / 22 / 28 / 36 / 48. Body 16px min, line-height 1.6.

## 4. Shape, space, elevation
- Radius: 12px (inputs/buttons), 20px (cards), 999px (chips)
- Spacing scale: 4/8/12/16/24/32/48/64
- Shadows: very soft (`0 4px 24px rgba(31,42,46,.06)`); borders over heavy shadows
- Min tap target 44×44px. Max content width 1120px; reading width 65ch.

## 5. Motion
- Durations 200–300ms ease-out for UI; 4–8s slow loops for ambient.
- **Hero animation (landing):** slow "breathing" gradient orbs (teal/sage/amber) in layered SVG/CSS, ~6s inhale/exhale cycle. Pure CSS/SVG, under 30 KB, no video file. Optionally a subtle Three.js version later behind a feature flag.
- **Mood check-in:** selected face/orb gently scales and glows; no confetti.
- **Chat:** typing indicator = three soft pulsing dots; messages fade+rise 8px.
- **Page transitions:** quick fade (Framer Motion).
- **Respect `prefers-reduced-motion`:** disable ambient loops and transforms; keep opacity fades only.
- Never animate on crisis cards (keep them still, clear, readable).

## 6. Components (build in `components/ui`)
Button (primary/secondary/ghost/danger-soft), Input/Textarea, Select, Chip, Card, Modal/Sheet, Toast, Tabs, Badge (risk level), Avatar (initial/alias), Skeleton, EmptyState, ErrorState, Banner (info/care), ProgressDots, MoodPicker, BreathingOrb, ChatBubble, RiskBadge, StatCard, ChartCard.

## 7. Layout patterns
- Student app: mobile-first, bottom nav on small screens (Home, Mood, Chat, Journal, Support), left sidebar on desktop.
- Counsellor/Admin: desktop-first dashboards, left sidebar, dense but calm tables.
- Persistent small **"Need help now?"** link in the student shell, always one tap to the crisis card.

## 8. Copy tone
- Plain, warm, short. Second person. No jargon. Nigerian-English friendly; avoid heavy slang.
- Say "support", "check-in", "talk to someone", "feeling low". 
- **Never use:** patient, disorder, diagnosis, treatment, "you have/are depressed/anxious", "mentally ill", "suffering from".
- Examples:
  - Landing H1: "A quiet place to put your thoughts down — and reach a real person when you need one."
  - Privacy line: "Your journal and chats are yours. Admins see only anonymous totals."
  - Empty mood: "No check-ins yet. How are you feeling right now?"
  - Escalation notice: "A trained counsellor may look at this part of our conversation to help keep you safe. You can read how this works anytime."
  - AI disclosure: "I'm an AI companion, not a counsellor. I can listen, and help you reach people who can help."

## 9. Performance and accessibility budgets
- LCP < 2.5s on mid-range phone over 4G; landing JS < 120 KB gz
- Images: WebP/AVIF, `next/image`; no autoplay video
- Lazy-load charts, Framer Motion on heavy routes
- Keyboard-only usable; focus ring 2px `primary`; labels on all inputs; `aria-live` for chat and toasts
- Test with screen reader basics and 200% zoom

## 10. Icons/illustration
Lucide icons (rounded, 1.75 stroke). Illustration: simple organic shapes in token colors; no stock photos of distressed people; no brain/head-silhouette clichés.
