import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SignupForm } from '@/components/app/signup-form'

export default async function SignupPage() {
  const session = await auth()
  if (session?.user) redirect('/dashboard')

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-[var(--text)]">Create an account</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Join your agency&apos;s client portal.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}
