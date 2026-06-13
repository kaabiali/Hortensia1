'use client'

import { motion } from 'framer-motion'

export function LandingPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            See your dashboard in action
          </h2>
          <p className="mt-3 text-lg text-[var(--text-muted)]">
            Real-time overview of every project, request, and client interaction.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative mt-12"
        >
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-[var(--accent)]/5 via-transparent to-transparent blur-3xl" />
          <div className="glass rounded-2xl border border-[var(--border)] p-2 shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
            <div className="overflow-hidden rounded-xl border border-[var(--border)]">
              <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--text-faint)]/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--text-faint)]/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--text-faint)]/30" />
                <div className="ml-3 flex-1 rounded-md bg-[var(--bg-subtle)] px-3 py-1">
                  <div className="text-[10px] text-[var(--text-faint)]">app.hortensia.agency / dashboard</div>
                </div>
              </div>
              <div className="bg-[var(--bg)] p-5">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: 'Active Requests', value: '12', color: 'var(--accent)' },
                    { label: 'In Progress', value: '5', color: 'var(--warning)' },
                    { label: 'Completed', value: '28', color: 'var(--success)' },
                    { label: 'Pending', value: '7', color: 'var(--text-muted)' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-4"
                    >
                      <div className="text-xs font-medium text-[var(--text-muted)]">{stat.label}</div>
                      <div className="mt-1 text-2xl font-bold" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { title: 'Brand Identity Redesign', status: 'In Progress', color: 'var(--warning)' },
                    { title: 'SEO Audit & Strategy', status: 'Pending', color: 'var(--text-muted)' },
                    { title: 'Social Media Campaign', status: 'Done', color: 'var(--success)' },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3"
                    >
                      <span className="text-sm font-medium text-[var(--text)]">{item.title}</span>
                      <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
