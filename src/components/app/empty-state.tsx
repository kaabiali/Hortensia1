import Link from 'next/link'
import { Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-[var(--bg-subtle)] p-4">
        <Inbox className="h-10 w-10 text-[var(--text-faint)]" />
      </div>
      <h3 className="text-lg font-medium text-[var(--text)]">No requests yet</h3>
      <p className="mt-1 text-sm text-[var(--text-muted)] max-w-sm">
        Create your first project request to get started.
      </p>
      <Button className="mt-6" asChild>
        <Link href="/dashboard/new">New Request</Link>
      </Button>
    </div>
  )
}
