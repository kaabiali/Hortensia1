import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { RequestListClient, type RequestData } from '@/components/app/request-list-client'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const raw = await db.projectRequest.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  const requests: RequestData[] = raw.map((r: { id: string; title: string; description: string; budget: number; status: string; createdAt: Date; updatedAt: Date; userId: string }) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    budget: r.budget,
    status: r.status,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    userId: r.userId,
  }))

  return <RequestListClient requests={requests} />
}
