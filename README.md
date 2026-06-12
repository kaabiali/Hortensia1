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

1. Clone and install:
   ```bash
   git clone <your-repo-url> && cd hortensia-portal
   pnpm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   # Generate a secret: openssl rand -base64 32
   # Paste it as NEXTAUTH_SECRET in .env
   ```

3. Start the database and run migrations:
   ```bash
   docker compose up -d
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Start the dev server:
   ```bash
   pnpm dev
   ```

Visit [http://localhost:3000](http://localhost:3000)

## Demo credentials

| Email | Password | Notes |
|---|---|---|
| demo@hortensia.com | password123 | Has 3 sample requests |
| client@hortensia.com | password123 | Has 2 sample requests |

## Production build

```bash
docker build -t hortensia-portal .
docker run -p 3000:3000 \
  -e DATABASE_URL="your-prod-db-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  -e NEXTAUTH_URL="https://your-domain.com" \
  hortensia-portal
```

## Live URL
<!-- Add your deployed URL here if deployed -->
