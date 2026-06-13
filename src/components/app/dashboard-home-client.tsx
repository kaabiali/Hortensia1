'use client'

import { Inbox, Clock, CheckCircle2, Activity } from 'lucide-react'
import { KPICard } from '@/components/app/kpi-card'
import { RequestsTable } from '@/components/app/requests-table'
import { motion } from 'framer-motion'

interface RecentRequest {
  id: string
  title: string
  description: string
  budget: number
  status: string
  createdAt: Date
}

interface DashboardHomeClientProps {
  activeRequests: number
  pending: number
  inProgress: number
  completed: number
  total: number
  recentRequests: RecentRequest[]
}

export function DashboardHomeClient({
  activeRequests,
  pending,
  inProgress,
  completed,
  total,
  recentRequests,
}: DashboardHomeClientProps) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <h1 className="text-xl font-semibold text-[var(--text)]">Dashboard</h1>
        <p className="text-sm text-[var(--text-muted)]">
          Overview of your project activity
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          label="Active Requests"
          value={activeRequests}
          icon={<Activity className="h-4 w-4" />}
          color="var(--accent)"
          bgColor="var(--accent-soft)"
          delay={0}
        />
        <KPICard
          label="Pending"
          value={pending}
          icon={<Inbox className="h-4 w-4" />}
          color="var(--warning)"
          bgColor="var(--warning-soft)"
          delay={0.05}
        />
        <KPICard
          label="In Progress"
          value={inProgress}
          icon={<Clock className="h-4 w-4" />}
          color="var(--accent)"
          bgColor="var(--accent-soft)"
          delay={0.1}
        />
        <KPICard
          label="Completed"
          value={completed}
          icon={<CheckCircle2 className="h-4 w-4" />}
          color="var(--success)"
          bgColor="var(--success-soft)"
          delay={0.15}
        />
      </div>

      <div className="mt-6">
        <RequestsTable requests={recentRequests} />
      </div>
    </div>
  )
}
