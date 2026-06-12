import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { InsightsClient } from '@/components/app/insights-client'

export const dynamic = 'force-dynamic'

export default async function InsightsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const userId = session.user.id

  const totalRequests = await db.projectRequest.count({
    where: { userId },
  })

  const byStatus = await db.projectRequest.groupBy({
    by: ['status'],
    where: { userId },
    _count: { id: true },
    _sum: { budget: true },
  })

  const totalBudget = byStatus.reduce((sum, s) => sum + (s._sum.budget ?? 0), 0)
  const averageBudget = totalRequests > 0 ? totalBudget / totalRequests : 0

  const dailyCounts = await db.$queryRaw<Array<{ day: Date; count: bigint }>>`
    SELECT DATE_TRUNC('day', "createdAt") AS day, COUNT(*)::int AS count
    FROM "ProjectRequest"
    WHERE "userId" = ${userId}
      AND "createdAt" >= NOW() - INTERVAL '30 days'
    GROUP BY 1
    ORDER BY 1
  `

  const statusBreakdown = byStatus.map((s) => ({
    status: s.status,
    count: s._count.id,
    budget: s._sum.budget ?? 0,
  }))

  const averageTimeToInProgressRaw = await db.$queryRaw<Array<{ days: number | null }>>`
    SELECT AVG(
      EXTRACT(EPOCH FROM (updatedAt - createdAt)) / 86400.0
    )::float AS days
    FROM "ProjectRequest"
    WHERE "userId" = ${userId}
      AND status = 'in_progress'
      AND updatedAt != createdAt
  `

  const avgDays = averageTimeToInProgressRaw[0]?.days
    ? Math.round(averageTimeToInProgressRaw[0].days * 10) / 10
    : null

  return (
    <InsightsClient
      totalRequests={totalRequests}
      averageBudget={averageBudget}
      dailyCounts={dailyCounts.map((d) => ({
        day: d.day.toISOString().slice(0, 10),
        count: Number(d.count),
      }))}
      statusBreakdown={statusBreakdown}
      averageTimeToInProgress={avgDays}
    />
  )
}
