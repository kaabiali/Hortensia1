'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useEffect, useState } from 'react'
import { InsightsSkeleton } from '@/components/app/insights-skeleton'

interface InsightsClientProps {
  totalRequests: number
  averageBudget: number
  dailyCounts: Array<{ day: string; count: number }>
  statusBreakdown: Array<{ status: string; count: number; budget: number }>
  averageTimeToInProgress: number | null
}

const statusColors: Record<string, { color: string; bg: string }> = {
  pending: { color: '#d97706', bg: '#fffbeb' },
  in_progress: { color: '#4f46e5', bg: '#eef2ff' },
  done: { color: '#16a34a', bg: '#f0fdf4' },
}

const darkStatusColors: Record<string, { color: string; bg: string }> = {
  pending: { color: '#d97706', bg: '#1c1408' },
  in_progress: { color: '#818cf8', bg: '#1e1b3a' },
  done: { color: '#16a34a', bg: '#052e16' },
}

export function InsightsClient({
  totalRequests,
  averageBudget,
  dailyCounts,
  statusBreakdown,
  averageTimeToInProgress,
}: InsightsClientProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <InsightsSkeleton />
  }

  const isDark = document.documentElement.classList.contains('dark')
  const colors = isDark ? darkStatusColors : statusColors
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
  const textMuted = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim()

  const formattedBudget = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(averageBudget)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text)]">Insights</h1>
        <p className="text-sm text-[var(--text-muted)]">
          Overview of your project activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total requests" value={String(totalRequests)} />
        <StatCard label="Average budget" value={formattedBudget} mono />
        <StatCard
          label="Avg time to in progress"
          value={averageTimeToInProgress !== null ? `${averageTimeToInProgress}d` : 'N/A'}
          hint={
            averageTimeToInProgress !== null
              ? 'Average days from creation to start of work'
              : 'No requests in progress yet'
          }
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <h3 className="mb-4 text-sm font-medium text-[var(--text)]">
            Requests per day (last 30 days)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyCounts}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: textMuted }}
                  tickFormatter={(v: string) => v.slice(5)}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: textMuted }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={accentColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: accentColor }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <h3 className="mb-4 text-sm font-medium text-[var(--text)]">
            Breakdown by status
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="status"
                  tick={{ fontSize: 11, fill: textMuted }}
                  tickFormatter={(v: string) =>
                    v === 'in_progress' ? 'In progress' : v.charAt(0).toUpperCase() + v.slice(1)
                  }
                />
                <YAxis
                  tick={{ fontSize: 11, fill: textMuted }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {statusBreakdown.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={colors[entry.status]?.color ?? accentColor}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  mono,
  hint,
}: {
  label: string
  value: string
  mono?: boolean
  hint?: string
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
        {label}
      </p>
      <p
        className="mt-1 text-2xl font-semibold text-[var(--text)]"
        style={mono ? { fontFamily: 'var(--font-mono)' } : undefined}
      >
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-xs text-[var(--text-faint)]">{hint}</p>
      )}
    </div>
  )
}
