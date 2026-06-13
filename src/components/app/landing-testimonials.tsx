'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'Hortensia transformed how we manage client work. Our team went from scattered emails to a single source of truth.',
    author: 'Sarah Chen',
    role: 'Creative Director, Pixelworks',
  },
  {
    quote: 'The transparency our clients get is incredible. They feel informed and involved without needing constant check-in calls.',
    author: 'Marcus Johnson',
    role: 'Founder, Designly Studio',
  },
  {
    quote: 'We cut our project management overhead by half. The AI assistant alone is worth the subscription.',
    author: 'Elena Rodriguez',
    role: 'Operations Lead, Brandflow',
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
} as const

export function LandingTestimonials() {
  return (
    <section className="border-t border-[var(--border)] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Loved by agencies worldwide
          </h2>
          <p className="mt-3 text-lg text-[var(--text-muted)]">
            See what our customers have to say about their experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={cardVariants}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-[var(--warning)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm text-[var(--text-muted)] leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-4 border-t border-[var(--border)] pt-3">
                <div className="text-sm font-medium text-[var(--text)]">{t.author}</div>
                <div className="text-xs text-[var(--text-faint)]">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
