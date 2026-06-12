'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RequestRow } from '@/components/app/request-row'
import { RequestRowSkeleton } from '@/components/app/request-row-skeleton'
import { EmptyState } from '@/components/app/empty-state'
import { ErrorState } from '@/components/app/error-state'
import { DenseToggle } from '@/components/app/dense-toggle'

interface Request {
  id: string
  title: string
  description: string
  budget: number
  status: 'pending' | 'in_progress' | 'done'
  createdAt: Date
  updatedAt: Date
  userId: string
}

export function RequestListClient({ requests }: { requests: Request[] }) {
  const [compact, setCompact] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleToggle = useCallback((c: boolean) => {
    setCompact(c)
  }, [])

  if (error) {
    return <ErrorState message={error} />
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text)]">Requests</h1>
          <p className="text-sm text-[var(--text-muted)]">
            {requests.length} {requests.length === 1 ? 'request' : 'requests'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DenseToggle onToggle={handleToggle} />
          <Button size="sm" asChild>
            <Link href="/dashboard/new">
              <Plus className="mr-1.5 h-4 w-4" />
              New Request
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
        {requests.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="px-5">
            <div className={`flex items-center gap-4 border-b border-[var(--border)] text-xs font-medium text-[var(--text-faint)] uppercase tracking-wider ${compact ? 'py-2' : 'py-3'}`}>
              <div className="flex-1">Title</div>
              <div className="hidden sm:block w-28">Created</div>
              <div className="w-24 text-right">Budget</div>
              <div className="w-28">Status</div>
              <div className="w-16" />
            </div>
            {requests.map((request) => (
              <RequestRow key={request.id} request={request} compact={compact} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
