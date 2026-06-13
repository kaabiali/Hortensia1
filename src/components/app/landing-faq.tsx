'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'How does the client portal work?',
    a: 'Once you create an account, your clients get access to a private dashboard where they can submit requests, track progress, and communicate with your team in real time.',
  },
  {
    q: 'Can I customize the portal with my branding?',
    a: 'Yes. You can customize colors, logo, and domain to match your agency\'s brand. White-label options are available on our Pro plan.',
  },
  {
    q: 'Is there a limit on how many clients I can add?',
    a: 'Our Starter plan includes up to 3 active clients. The Pro plan supports unlimited clients and team members. Enterprise plans are also available.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, PayPal, and bank transfers for annual plans. All plans include a 14-day free trial with no credit card required.',
  },
  {
    q: 'Can I migrate my existing projects?',
    a: 'Absolutely. We provide import tools for CSV, Trello, Asana, and Monday.com. Our support team can also assist with custom migrations.',
  },
]

export function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="border-t border-[var(--border)] py-20">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-lg text-[var(--text-muted)]">
            Everything you need to know about the product.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-12 space-y-2"
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--bg-subtle)]"
              >
                {faq.q}
                <ChevronDown
                  className={`h-4 w-4 text-[var(--text-muted)] transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[var(--border)] px-5 py-4 text-sm text-[var(--text-muted)] leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
