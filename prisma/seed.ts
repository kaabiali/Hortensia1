import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('password123', 12)

  const demoUser = await db.user.upsert({
    where: { email: 'demo@hortensia.com' },
    update: {},
    create: {
      email: 'demo@hortensia.com',
      password,
      name: 'Demo User',
    },
  })

  const clientUser = await db.user.upsert({
    where: { email: 'client@hortensia.com' },
    update: {},
    create: {
      email: 'client@hortensia.com',
      password,
      name: 'Client User',
    },
  })

  const services = [
    { name: 'Brand Identity', description: 'Logo, typography, color palette, and brand guidelines.', order: 1 },
    { name: 'Web Development', description: 'Custom websites, landing pages, and web applications.', order: 2 },
    { name: 'SEO & Analytics', description: 'Search engine optimization and performance tracking.', order: 3 },
    { name: 'Social Media', description: 'Content strategy, management, and paid campaigns.', order: 4 },
  ]

  for (const service of services) {
    await db.service.upsert({
      where: { name: service.name },
      update: service,
      create: service,
    })
  }

  // Remove existing requests so the seed is idempotent
  await db.projectRequest.deleteMany()

  const requests = [
    {
      title: 'Rebrand homepage',
      description: 'Update the homepage with new brand guidelines and messaging.',
      budget: 3500,
      status: 'in_progress',
      userId: demoUser.id,
    },
    {
      title: 'SEO audit report',
      description: 'Full SEO audit with recommendations for improvement.',
      budget: 1200,
      status: 'done',
      userId: demoUser.id,
    },
    {
      title: 'Social media calendar',
      description: 'Monthly content calendar for Q3 across Instagram and LinkedIn.',
      budget: 800,
      status: 'pending',
      userId: demoUser.id,
    },
    {
      title: 'Landing page redesign',
      description: 'Redesign the lead generation landing page for better conversions.',
      budget: 2500,
      status: 'pending',
      userId: clientUser.id,
    },
    {
      title: 'Email template set',
      description: 'Design and build a set of 5 email templates in Mailchimp.',
      budget: 1500,
      status: 'in_progress',
      userId: clientUser.id,
    },
  ]

  for (const req of requests) {
    await db.projectRequest.create({ data: req })
  }

  console.log('Seed completed successfully')
  console.log('Users:')
  console.log('  demo@hortensia.com / password123')
  console.log('  client@hortensia.com / password123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
