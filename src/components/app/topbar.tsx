'use client'

import { Search, Bell, Command } from 'lucide-react'
import { ThemeToggle } from '@/components/app/theme-toggle'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function Topbar({ onCommandOpen }: { onCommandOpen: () => void }) {
  const { data: session } = useSession()
  const user = session?.user
  const initials = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() ?? '?'

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onCommandOpen}
          className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 text-sm text-[var(--text-muted)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text)] w-48 sm:w-64"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search...</span>
          <div className="ml-auto hidden items-center gap-0.5 sm:flex">
            <kbd className="rounded border border-[var(--border)] bg-[var(--bg-subtle)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-faint)]">
              <Command className="inline h-2.5 w-2.5" />K
            </kbd>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative text-[var(--text-muted)]">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[var(--accent)] ring-2 ring-[var(--bg)]" />
        </Button>
        <Avatar className="h-7 w-7 ring-1 ring-[var(--border)] cursor-pointer">
          <AvatarFallback className="text-[10px] bg-[var(--bg-subtle)] text-[var(--text)]">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </motion.header>
  )
}
