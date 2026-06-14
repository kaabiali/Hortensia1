'use client'

import Link from 'next/link'
import { AlertTriangle, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--danger-soft)]">
        <AlertTriangle className="h-7 w-7 text-[var(--danger)]" />
      </div>
      <h1 className="text-xl font-semibold text-[var(--text)]">Something went wrong</h1>
      <p className="mt-1 max-w-sm text-sm text-[var(--text-muted)]">
        We encountered an error loading this page. Please try again.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Button size="sm" onClick={reset}>
          Try again
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <Home className="mr-1.5 h-4 w-4" />
            Go home
          </Link>
        </Button>
      </div>
    </div>
  )
}
