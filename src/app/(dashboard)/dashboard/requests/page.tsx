import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { RequestsPageClient } from '@/components/app/requests-page-client'

export const dynamic = 'force-dynamic'

export default async function RequestsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const requests = await db.projectRequest.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  const mapped = requests.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    budget: r.budget,
    status: r.status,
    createdAt: r.createdAt,
  }))

  return <RequestsPageClient requests={mapped} />
}
