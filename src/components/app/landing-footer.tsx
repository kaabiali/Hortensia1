'use client'

import Link from 'next/link'
import { Flower2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Changelog', 'Documentation'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Help Center', 'Community', 'Status', 'Contact'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
}

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]">
                <Flower2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-[var(--text)]">Hortensia</span>
            </Link>
            <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
              The client portal that brings transparency to your agency workflow.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)]">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-6 sm:flex-row">
          <p className="text-xs text-[var(--text-faint)]">
            &copy; {new Date().getFullYear()} Hortensia Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-[var(--text-faint)] hover:text-[var(--text)] transition-colors">Twitter</Link>
            <Link href="#" className="text-xs text-[var(--text-faint)] hover:text-[var(--text)] transition-colors">GitHub</Link>
            <Link href="#" className="text-xs text-[var(--text-faint)] hover:text-[var(--text)] transition-colors">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
