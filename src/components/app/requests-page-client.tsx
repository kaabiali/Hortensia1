'use client'

import { motion } from 'framer-motion'
import { RequestsTable } from '@/components/app/requests-table'

interface Request {
  id: string
  title: string
  description: string
  budget: number
  status: string
  createdAt: Date
}

export function RequestsPageClient({ requests }: { requests: Request[] }) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <h1 className="text-xl font-semibold text-[var(--text)]">Requests</h1>
        <p className="text-sm text-[var(--text-muted)]">
          {requests.length} {requests.length === 1 ? 'request' : 'requests'} total
        </p>
      </motion.div>
      <RequestsTable requests={requests} />
    </div>
  )
}
