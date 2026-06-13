import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { DashboardHomeClient } from '@/components/app/dashboard-home-client'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const requests = await db.projectRequest.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  const activeRequests = requests.filter((r) => r.status !== 'done').length
  const pending = requests.filter((r) => r.status === 'pending').length
  const inProgress = requests.filter((r) => r.status === 'in_progress').length
  const completed = requests.filter((r) => r.status === 'done').length

  return (
    <DashboardHomeClient
      activeRequests={activeRequests}
      pending={pending}
      inProgress={inProgress}
      completed={completed}
      total={requests.length}
      recentRequests={requests.slice(0, 5).map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        budget: r.budget,
        status: r.status,
        createdAt: r.createdAt,
      }))}
    />
  )
}
