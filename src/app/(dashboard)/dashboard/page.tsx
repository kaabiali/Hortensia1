import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { RequestListClient } from '@/components/app/request-list-client'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const requests = await db.projectRequest.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return <RequestListClient requests={requests} />
}
