import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/app/login-form'
import { Flower2 } from 'lucide-react'
import Link from 'next/link'

export default async function LoginPage() {
  const session = await auth()
  if (session?.user) redirect('/dashboard')

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center justify-center flex-1 px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]">
                <Flower2 className="h-4 w-4 text-white" />
              </div>
            </Link>
            <h1 className="text-2xl font-semibold text-[var(--text)]">Welcome back</h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Sign in to your client portal.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-sm">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
