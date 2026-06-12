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

  const totalBudget = (byStatus as Array<{ _sum: { budget: number | null } }>).reduce((sum, s) => sum + (s._sum.budget ?? 0), 0)
  const averageBudget = totalRequests > 0 ? totalBudget / totalRequests : 0

  const dailyCounts = await db.$queryRaw<Array<{ day: string; count: number }>>`
    SELECT strftime('%Y-%m-%d', "createdAt") AS day, CAST(COUNT(*) AS INTEGER) AS count
    FROM "ProjectRequest"
    WHERE "userId" = ${userId}
      AND "createdAt" >= datetime('now', '-30 days')
    GROUP BY 1
    ORDER BY 1
  `

  const statusBreakdown = (byStatus as Array<{ status: string; _count: { id: number }; _sum: { budget: number | null } }>).map((s) => ({
    status: s.status,
    count: s._count.id,
    budget: s._sum.budget ?? 0,
  }))

  const averageTimeToInProgressRaw = await db.$queryRaw<Array<{ days: number | null }>>`
    SELECT AVG(
      julianday("updatedAt") - julianday("createdAt")
    ) AS days
    FROM "ProjectRequest"
    WHERE "userId" = ${userId}
      AND status = 'in_progress'
      AND "updatedAt" != "createdAt"
  `

  const avgDays = averageTimeToInProgressRaw[0]?.days
    ? Math.round(averageTimeToInProgressRaw[0].days * 10) / 10
    : null

  return (
    <InsightsClient
      totalRequests={totalRequests}
      averageBudget={averageBudget}
      dailyCounts={dailyCounts.map((d: { day: string; count: number }) => ({
        day: d.day,
        count: d.count,
      }))}
      statusBreakdown={statusBreakdown}
      averageTimeToInProgress={avgDays}
    />
  )
}
