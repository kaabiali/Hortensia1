'use client'

import Link from 'next/link'
import { Inbox, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function EmptyState({
  title = 'No requests yet',
  description = 'Create your first project request to get started.',
  actionLabel = 'New Request',
  actionHref = '/dashboard/new',
}: {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-subtle)]">
        <Inbox className="h-7 w-7 text-[var(--text-faint)]" />
      </div>
      <h3 className="text-base font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-[var(--text-muted)]">{description}</p>
      <Button className="mt-6" size="sm" asChild>
        <Link href={actionHref}>
          <Plus className="mr-1.5 h-4 w-4" />
          {actionLabel}
        </Link>
      </Button>
    </motion.div>
  )
}
