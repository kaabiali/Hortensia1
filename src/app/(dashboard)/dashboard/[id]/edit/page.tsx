import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect, notFound } from 'next/navigation'
import { RequestForm } from '@/components/app/request-form'

export default async function EditRequestPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const { id } = await params

  const request = await db.projectRequest.findUnique({
    where: { id, userId: session.user.id },
  })

  if (!request) notFound()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text)]">Edit Request</h1>
        <p className="text-sm text-[var(--text-muted)]">
          Update your project request.
        </p>
      </div>
      <RequestForm
        requestId={request.id}
        defaultValues={{
          title: request.title,
          description: request.description,
          budget: request.budget,
          status: request.status as 'pending' | 'in_progress' | 'done',
        }}
      />
    </div>
  )
}
