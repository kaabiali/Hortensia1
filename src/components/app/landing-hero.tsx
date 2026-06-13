'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--text) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[var(--accent)]/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[var(--accent)]/3 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
              Now in public beta
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-[var(--text)] sm:text-5xl lg:text-[56px] lg:leading-[64px]">
              Manage client projects with{' '}
              <span className="text-[var(--accent)]">complete clarity</span>.
            </h1>
            <p className="mt-4 text-lg text-[var(--text-muted)] sm:text-xl leading-relaxed max-w-lg">
              A private portal where your clients see exactly what&apos;s happening with their work. Real-time updates, transparent communication.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Button size="lg" className="h-11 px-6 text-base shadow-sm" asChild>
                <Link href="/signup">
                  Start free trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

            </div>
            <div className="mt-6 flex items-center gap-6 text-xs text-[var(--text-faint)]">
              <span className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                No credit card
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Cancel anytime
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">
              <div className="flex items-center gap-1.5 border-b border-[var(--border)] px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--text-faint)]/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--text-faint)]/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--text-faint)]/30" />
                <div className="ml-3 flex-1 rounded-md bg-[var(--bg-subtle)] px-3 py-1">
                  <div className="h-2 w-32 rounded bg-[var(--text-faint)]/20" />
                </div>
              </div>
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="h-3 w-20 rounded bg-[var(--text-faint)]/20" />
                  <div className="h-6 w-20 rounded-md bg-[var(--accent)]/10" />
                </div>
                <div className="space-y-2">
                  {[60, 85, 45].map((w, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-3"
                    >
                      <div className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-[var(--success)]' : i === 1 ? 'bg-[var(--warning)]' : 'bg-[var(--accent)]'}`} />
                      <div className="flex-1">
                        <div className="h-2.5 w-3/4 rounded bg-[var(--text-faint)]/20" />
                        <div className="mt-1.5 h-2 w-1/2 rounded bg-[var(--text-faint)]/10" />
                      </div>
                      <div className="h-2 w-14 rounded bg-[var(--text-faint)]/15" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
              className="absolute -bottom-4 -left-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--success-soft)]">
                  <div className="h-3 w-3 rounded-full bg-[var(--success)]" />
                </div>
                <div>
                  <div className="text-xs font-medium text-[var(--text)]">3 active projects</div>
                  <div className="text-[10px] text-[var(--text-faint)]">Updated just now</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.55, ease: 'easeOut' }}
              className="absolute -top-3 -right-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hidden sm:block"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent-soft)]">
                  <div className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                </div>
                <div className="text-[10px] font-medium text-[var(--text)]">
                  98% satisfaction
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
