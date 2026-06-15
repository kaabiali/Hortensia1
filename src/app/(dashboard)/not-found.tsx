'use client'

import Link from 'next/link'
import { FileQuestion, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-subtle)]">
        <FileQuestion className="h-7 w-7 text-[var(--text-faint)]" />
      </div>
      <h2 className="text-lg font-semibold text-[var(--text)]">Request not found</h2>
      <p className="mt-1 max-w-sm text-sm text-[var(--text-muted)]">
        The request you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Button className="mt-6" size="sm" asChild>
        <Link href="/dashboard">
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>
    </div>
  )
}
