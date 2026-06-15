# Project Map — Hortensia Client Portal

## [TECH_STACK]

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | 16.2.9 |
| Language | TypeScript | 5.9.3 |
| Styling | Tailwind CSS | 4.3.0 |
| UI Primitives | shadcn/ui (Radix + CVA) | — |
| ORM | Prisma | 7.8.0 |
| Database | PostgreSQL | 16 (alpine) |
| Auth | Auth.js (NextAuth v5) | 5.0.0-beta.31 |
| Forms | react-hook-form + Zod | 4.4.3 |
| Charts | Recharts | 3.8.1 |
| AI | groq-sdk | 1.2.1 |
| Package manager | pnpm | 11.6.0 |
| Container runtime | Docker | — |
| Base image | node | 20-alpine |
| DB image | postgres | 16-alpine |

## [SYSTEM_FLOW]

**Local development:**
```
docker compose up -d  →  PostgreSQL (:5432)
                           ↓
pnpm prisma:migrate   →  schema applied
pnpm prisma:seed      →  demo data loaded
                           ↓
pnpm dev              →  Next.js (:3000) → TurboPack HMR
```

**Production build:**
```
docker build .        →  multi-stage (deps → builder → runner)
                           ↓
docker run --env-file .env hortensia-portal
                           ↓
Next.js standalone     →  serves on :3000
```

**Auth flow:**
```
/login  →  Credentials provider  →  JWT token  →  proxy.ts guards /dashboard/*
```

**AI Improve flow:**
```
Client form → POST /api/ai/improve → Groq API (server-side)
→ suggestedTitle + refinedDescription + scopeBullets → accept/discard
```

## [ORPHANS & PENDING]

- Live deploy URL pending — not yet deployed to any host
- Prisma datasource: PostgreSQL (via Docker Compose)
- Groq streaming: deferred — non-streaming implementation used (< 20 lines overhead for streaming)
- BullMQ queue: not implemented, noted in ARCHITECTURE.md (A7 — AI Stretch Task)
