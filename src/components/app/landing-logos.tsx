'use client'

import { motion } from 'framer-motion'

const logos = [
  'Acme Corp', 'Pixelworks', 'Designly', 'Brandflow', 'Studio Nine', 'Creativ'
]

export function LandingLogos() {
  return (
    <section className="border-y border-[var(--border)] py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-[var(--text-faint)]">
          Trusted by teams at
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4"
        >
          {logos.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="text-sm font-semibold text-[var(--text-faint)]/50 tracking-wider"
            >
              {name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
