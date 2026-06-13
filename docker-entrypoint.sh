#!/bin/sh
set -e

# Apply pending database migrations (safe for production — no-op if already applied)
npx prisma migrate deploy

# Start the Next.js server
exec "$@"
