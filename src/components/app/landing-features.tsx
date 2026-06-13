'use client'

import { FileText, Users, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: FileText,
    title: 'Request Management',
    description: 'Submit, track, and manage project requests with real-time status updates. Never lose sight of where things stand.',
    color: 'var(--accent)',
    bgColor: 'var(--accent-soft)',
  },
  {
    icon: Users,
    title: 'Client Collaboration',
    description: 'Share updates, gather feedback, and keep everyone aligned. Your clients always know what to expect.',
    color: 'var(--success)',
    bgColor: 'var(--success-soft)',
  },
  {
    icon: Sparkles,
    title: 'AI Assistant',
    description: 'Smart suggestions for scoping, budgeting, and timelines. Write better briefs in half the time.',
    color: 'var(--warning)',
    bgColor: 'var(--warning-soft)',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
} as const

export function LandingFeatures() {
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
            Everything you need to run your agency
          </h2>
          <p className="mt-3 text-lg text-[var(--text-muted)]">
            From request intake to delivery, manage your entire workflow in one place.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-shadow duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: feature.bgColor }}
                >
                  <Icon className="h-5 w-5" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
