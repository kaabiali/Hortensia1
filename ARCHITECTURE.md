# Architecture

## A1 — Server vs client components

- `app/(public)/page.tsx` → **Server Component**. Fetches services directly from DB via Prisma. ISR with `revalidate=3600`. No browser APIs needed.
- `app/(public)/error.tsx` → **Client Component**. Error boundary for the public site. Uses `useState` hooks. Needs interactivity for the reset/retry button.
- `app/(auth)/login/page.tsx` → **Server Component**. Checks session, renders client form. Minimal.
- `app/(auth)/signup/page.tsx` → **Server Component**. Same pattern as login.
- `app/(dashboard)/layout.tsx` → **Server Component**. Auth guard — calls `auth()` and redirects if unauthenticated. Wraps children in `DashboardShell` (client component for session context and sidebar).
- `app/(dashboard)/loading.tsx` → **Server Component** (RSC). Renders skeletons — no interactivity needed, pure markup.
- `app/(dashboard)/error.tsx` → **Client Component**. Error boundary. Uses hooks for the reset/retry button.
- `app/(dashboard)/dashboard/page.tsx` → **Server Component**. Fetches requests from DB via Prisma. Passes data to `DashboardHomeClient`.
- `app/(dashboard)/dashboard/requests/page.tsx` → **Server Component**. Fetches requests from DB via Prisma. Passes data to `RequestsPageClient`.
- `app/(dashboard)/dashboard/new/page.tsx` → **Server Component**. Renders `RequestForm` client component.
- `app/(dashboard)/dashboard/[id]/edit/page.tsx` → **Server Component**. Fetches single request with ownership check, passes to `RequestForm`.
- `src/components/app/landing-services.tsx` → **Server Component**. Receives services as props from parent page component. Pure rendering, no client hooks.
- `src/components/app/landing-contact.tsx` → **Server Component**. Pure rendering, no interactivity beyond a mailto link.
- `src/components/app/request-form.tsx` → **Client Component**. Uses `react-hook-form` with Zod resolver. Calls server actions.
- `src/components/app/login-form.tsx` → **Client Component**. Calls `signIn` from next-auth.
- `src/components/app/signup-form.tsx` → **Client Component**. Calls signup API, then auto-signs in.
- `src/components/app/sidebar.tsx` → **Client Component**. Uses `useSession`, `usePathname` for active state.
- `src/components/app/theme-toggle.tsx` → **Client Component**. Uses `useTheme` from next-themes.
- `src/components/app/command-palette.tsx` → **Client Component**. cmdk-based keyboard navigation.
- `src/components/app/dashboard-shell.tsx` → **Client Component**. Wraps sidebar + content in SessionProvider.
- `src/components/app/requests-table.tsx` → **Client Component**. Uses `useOptimistic`, `useTransition`, and `@tanstack/react-table` hooks.
- `src/components/app/empty-state.tsx` → **Client Component**. Uses framer-motion for entrance animation.
- `src/components/app/inline-error.tsx` → **Client Component**. Uses `useEffect` for auto-dismiss timer.

## A2 — Rendering strategy for the public landing page

ISR with `revalidate=3600`. Services data changes rarely (only when an admin updates them via Prisma Studio or seed). Pre-rendering gives fast initial load for unauthenticated visitors — no cold DB query on every visit. When an admin updates services, the cache invalidates within one hour at most.

If services were updated more frequently, SSR would be appropriate. For a marketing page that changes weekly at most, ISR is the right balance.

## A3 — Data fetching

- **Server components** fetch directly from Prisma — no API round-trip. The database connection is local (same network in production).
- **Client components** call server actions (`src/actions/requests.ts`) for mutations. Server actions run on the server with full DB access and session validation.
- **Why this pattern**: Avoids exposing a REST API surface to the browser, which reduces attack surface. Server actions are RPC-style — they can't be called from outside the Next.js origin without going through the auth layer.

## A4 — Scaling to 50,000 clients

**What breaks first:**
- The dashboard query (`findMany` with `where: { userId }`) has no index on `userId`. At 50k clients with 100+ requests each, this becomes a full table scan.

**Specific fixes:**
1. Add `@@index([userId])` to the `ProjectRequest` model in schema.prisma — already done in this codebase
2. Add `@@index([userId, createdAt])` for the Insights time-range query — already done in this codebase
3. Move the public landing page to a CDN edge cache (Vercel Edge / Cloudflare) — every visitor hitting the origin for static marketing content is wasted DB load
4. Add connection pooling via PgBouncer or Neon's built-in pooler — Next.js serverless functions open a new DB connection per invocation; 50k active users means hundreds of concurrent connections, which PostgreSQL cannot handle without pooling
5. Cache the Insights aggregations in Redis (or Vercel KV) with a 5-minute TTL — these are expensive GROUP BY queries that don't need real-time accuracy

## A5 — Security

| Attack | Defense | File |
|---|---|---|---|
| Unauthenticated dashboard access | `middleware.ts` redirects, layout re-checks session | `src/middleware.ts`, `src/app/(dashboard)/layout.tsx` |
| IDOR — reading another user's requests | All Prisma queries include `userId: session.user.id` | `src/actions/requests.ts` |
| Direct API calls bypassing UI | Every server action calls `auth()` before any DB operation | `src/actions/requests.ts` |
| SQL injection | Prisma parameterises all queries; raw SQL uses tagged template literals | `src/actions/requests.ts` |
| XSS | React escapes all output by default; no `dangerouslySetInnerHTML` used | All components |
| Secrets in client bundle | All sensitive env vars are server-only (no `NEXT_PUBLIC_` prefix) | `.env.example` |
| Weak passwords | Zod enforces min 8 chars; bcrypt with cost 12 hashes before storage | `src/lib/validations.ts`, `src/app/api/auth/signup/route.ts` |
| Unhandled errors crashing the UI | `error.tsx` boundaries catch thrown errors and show a retry UI instead of a blank white screen | `src/app/(dashboard)/error.tsx`, `src/app/(public)/error.tsx` |

## A6 — Deployment

**What gets built:**
`pnpm build` produces a `.next/standalone` directory via Next.js standalone output. The production Dockerfile copies this + static assets into a minimal Alpine image.

**Env vars — local vs prod:**
- Local: `.env` file with Docker Compose Postgres URL
- Production: env vars injected at container runtime — never baked into the image
- `NEXTAUTH_SECRET` must be a strong random string (`openssl rand -base64 32`)
- `DATABASE_URL` in prod points to managed Postgres (Neon, Supabase, or RDS)

**What differs between local and prod:**
- DB: Docker Compose Postgres locally → managed Postgres in production with SSL
- Caching: in-process in dev → Vercel Data Cache or Redis in production
- Secret management: `.env` file locally → environment variables in hosting platform

## A7 — AI Stretch Task

At 1,000 concurrent clicks, Groq's free tier (30 req/min) would rate-limit ~97% of requests, all returning 503 and falling back gracefully to manual submission; to absorb real traffic, add a server-side queue (e.g. BullMQ) with per-user rate limiting and switch to a paid Groq tier or self-hosted Ollama instance.

**Pre-launch checklist:**
- [ ] `docker build .` succeeds from a clean clone
- [ ] `NEXTAUTH_SECRET` is set and is not the example value
- [ ] DB has run migrations (`prisma migrate deploy` — not `prisma migrate dev`)
- [ ] No `.env` committed to the repo
- [ ] Test: log out, try to visit `/dashboard` directly — must redirect to `/login`
- [ ] Test: log in as User A, try `/dashboard/[id]` with User B's request ID — must 404 or 403
- [ ] Loading skeleton shows while dashboard data is fetching
- [ ] Error boundary renders a retry button instead of a blank page when a DB query fails
