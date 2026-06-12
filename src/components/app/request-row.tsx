'use client'

import { useOptimistic, useTransition } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Pencil, Trash2 } from 'lucide-react'
import { StatusChip } from '@/components/app/status-chip'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateRequestStatus, deleteRequest } from '@/actions/requests'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface Request {
  id: string
  title: string
  description: string
  budget: number
  status: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

export function RequestRow({ request, compact }: { request: Request; compact: boolean }) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(request.status)

  async function handleStatusChange(status: string) {
    const prev = optimisticStatus
    setOptimisticStatus(status as 'pending' | 'in_progress' | 'done')
    const result = await updateRequestStatus(request.id, status as 'pending' | 'in_progress' | 'done')
    if (result.error) {
      setOptimisticStatus(prev)
    }
  }

  async function handleDelete() {
    const result = await deleteRequest(request.id)
    if (!result.error) {
      router.refresh()
    }
  }

  const formattedBudget = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(request.budget)

  return (
    <div
      className={`request-row group flex items-center gap-4 border-b border-[var(--border)] transition-colors hover:bg-[var(--bg-subtle)] ${compact ? 'py-2' : 'py-3'}`}
    >
      <div className="flex-1 min-w-0">
        <Link
          href={`/dashboard/${request.id}/edit`}
          className="text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors"
        >
          {request.title}
        </Link>
        <p className="truncate text-xs text-[var(--text-faint)]" title={request.description}>
          {request.description}
        </p>
      </div>

      <div className="hidden sm:block w-28">
        <span
          className="text-xs"
          style={{ fontFamily: 'var(--font-mono)' }}
          title={new Date(request.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        >
          {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
        </span>
      </div>

      <div className="w-24 text-right">
        <span
          className="text-xs"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {formattedBudget}
        </span>
      </div>

      <div className="w-28">
        <Select
          defaultValue={optimisticStatus}
          onValueChange={(val) => startTransition(() => handleStatusChange(val))}
        >
          <SelectTrigger className="h-7 border-0 bg-transparent p-0 shadow-none focus:ring-0">
            <SelectValue>
              <StatusChip status={optimisticStatus as 'pending' | 'in_progress' | 'done'} />
            </SelectValue>
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/${request.id}/edit`}>
            <Pencil className="h-3.5 w-3.5" />
          </Link>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-[var(--text-muted)] hover:text-[var(--red)]">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete request</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete &quot;{request.title}&quot;? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => {}}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
