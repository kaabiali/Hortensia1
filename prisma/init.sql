-- Hortensia Portal — database init script
-- Auto-run by PostgreSQL on first container start via docker-entrypoint-initdb.d
-- Must stay in sync with prisma/migrations/

-- Prisma migration tracking — lets prisma migrate deploy skip already-applied migrations
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id" VARCHAR(36) NOT NULL,
    "checksum" VARCHAR(64) NOT NULL,
    "finished_at" TIMESTAMPTZ,
    "migration_name" VARCHAR(255) NOT NULL,
    "logs" TEXT,
    "rolled_back_at" TIMESTAMPTZ,
    "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "applied_steps_count" INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY ("id")
);

INSERT INTO "_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "started_at", "applied_steps_count")
SELECT
  '00000000-0000-0000-0000-000000000001',
  'fa5fb20b7bd8bc48dd5383bb447b8e672ac55db11d1b33f44c1aca36607ce44d',
  now(),
  '20260613125319_init',
  now(),
  1
WHERE NOT EXISTS (SELECT 1 FROM "_prisma_migrations" WHERE "migration_name" = '20260613125319_init');

-- CreateTable: User
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Service
CREATE TABLE IF NOT EXISTS "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable: ProjectRequest
CREATE TABLE IF NOT EXISTS "ProjectRequest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ProjectRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Service_name_key" ON "Service"("name");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "ProjectRequest_userId_idx" ON "ProjectRequest"("userId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "ProjectRequest_userId_createdAt_idx" ON "ProjectRequest"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "ProjectRequest" ADD CONSTRAINT "ProjectRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Seed: demo users
INSERT INTO "User" ("id", "email", "password", "name") VALUES
  ('user_demo',    'demo@hortensia.com',    '$2b$12$aXNyCdN21XjNlokTnksKuuFvGPIj/GS/VcMJTe0M/FZlCIPjJPgbu', 'Demo User'),
  ('user_client',  'client@hortensia.com',  '$2b$12$aXNyCdN21XjNlokTnksKuuFvGPIj/GS/VcMJTe0M/FZlCIPjJPgbu', 'Client User')
ON CONFLICT ("email") DO NOTHING;

-- Seed: services
INSERT INTO "Service" ("id", "name", "description", "order") VALUES
  ('svc_brand',       'Brand Identity',  'Logo, typography, color palette, and brand guidelines.', 1),
  ('svc_web',         'Web Development', 'Custom websites, landing pages, and web applications.', 2),
  ('svc_seo',         'SEO & Analytics', 'Search engine optimization and performance tracking.', 3),
  ('svc_social',      'Social Media',    'Content strategy, management, and paid campaigns.', 4)
ON CONFLICT ("name") DO NOTHING;

-- Seed: project requests
INSERT INTO "ProjectRequest" ("id", "title", "description", "budget", "status", "createdAt", "updatedAt", "userId") VALUES
  ('req_1', 'Rebrand homepage',       'Update the homepage with new brand guidelines and messaging.',     3500, 'in_progress', NOW(), NOW(), 'user_demo'),
  ('req_2', 'SEO audit report',       'Full SEO audit with recommendations for improvement.',             1200, 'done',         NOW(), NOW(), 'user_demo'),
  ('req_3', 'Social media calendar',  'Monthly content calendar for Q3 across Instagram and LinkedIn.',   800, 'pending',      NOW(), NOW(), 'user_demo'),
  ('req_4', 'Landing page redesign',  'Redesign the lead generation landing page for better conversions.', 2500, 'pending',      NOW(), NOW(), 'user_client'),
  ('req_5', 'Email template set',     'Design and build a set of 5 email templates in Mailchimp.',        1500, 'in_progress',  NOW(), NOW(), 'user_client')
ON CONFLICT ("id") DO NOTHING;
