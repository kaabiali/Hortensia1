'use client'

import Link from 'next/link'
import { Flower2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/app/theme-toggle'
import { motion } from 'framer-motion'

export function LandingHeader() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]">
            <Flower2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Hortensia</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Get started</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
