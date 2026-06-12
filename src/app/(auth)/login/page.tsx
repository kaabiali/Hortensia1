import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/app/login-form'

export default async function LoginPage() {
  const session = await auth()
  if (session?.user) redirect('/dashboard')

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-[var(--text)]">Welcome back</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Sign in to your client portal.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
