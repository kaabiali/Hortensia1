# Hortensia Client Portal

A private client portal built for Hortensia Agency. Clients log in to manage and track their project requests.

## Stack

Next.js 16 · TypeScript · Tailwind CSS · shadcn/ui · Prisma · PostgreSQL · Auth.js · Docker

## Quick start (under 5 minutes)

### Prerequisites

- Node.js 20+
- pnpm (`npm i -g pnpm`)
- Docker Desktop

### Steps

```bash
# 1. Clone and install
git clone <your-repo-url> && cd hortensia-portal
pnpm install

# 2. Configure environment
cp .env.example .env

# 3. Start PostgreSQL
docker compose up -d

# 4. Run migrations and seed
pnpm setup

# 5. Start the dev server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Demo credentials

| Email | Password | Notes |
|---|---|---|
| demo@hortensia.com | password123 | Has 3 sample requests |
| client@hortensia.com | password123 | Has 2 sample requests |

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Build for production |
| `pnpm setup` | Generate Prisma client + run migrations + seed data |
| `pnpm prisma:seed` | Re-run the database seed |

## Infrastructure

### Local development

```bash
docker compose up -d
cp .env.example .env
pnpm install
pnpm setup
pnpm dev
```

### Docker build

```bash
docker build -t hortensia-portal .
docker run -p 3000:3000 --env-file .env hortensia-portal
```

### Live deploy (optional)

Deploy on Vercel (free) + Neon (free PostgreSQL).

#### Step 1 — Create a PostgreSQL database

1. Go to [neon.tech](https://neon.tech) and sign up for free
2. Create a new project (region: closest to you)
3. Copy the connection string — it looks like:
   ```
   postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

#### Step 2 — Push the project to GitHub

```bash
git remote add origin https://github.com/<your-username>/hortensia-portal.git
git push -u origin main
```

#### Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up for free
2. Click **Add New → Project** and import your GitHub repo
3. In **Environment Variables**, add:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Neon connection string (from step 1) |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` |
| `GROQ_API_KEY` | Your Groq API key (or leave placeholder) |

4. Click **Deploy**

#### Step 4 — Run database migrations

After deploy succeeds, run:

```bash
npx prisma migrate deploy
npx prisma db seed
```

#### Step 5 — Done

Your portal is live at `https://your-project.vercel.app`.

URL: <!-- TODO: add deployed URL here -->
