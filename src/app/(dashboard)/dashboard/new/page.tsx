import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { RequestForm } from '@/components/app/request-form'

export default async function NewRequestPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text)]">New Request</h1>
        <p className="text-sm text-[var(--text-muted)]">
          Submit a new project request.
        </p>
      </div>
      <RequestForm />
    </div>
  )
}
