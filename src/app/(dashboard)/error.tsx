'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--danger-soft)]">
        <AlertTriangle className="h-7 w-7 text-[var(--danger)]" />
      </div>
      <h2 className="text-lg font-semibold text-[var(--text)]">Something went wrong</h2>
      <p className="mt-1 max-w-sm text-sm text-[var(--text-muted)]">
        An unexpected error occurred. Please try again.
      </p>
      <Button className="mt-6" size="sm" onClick={reset}>
        <RefreshCw className="mr-1.5 h-4 w-4" />
        Try again
      </Button>
    </div>
  )
}
