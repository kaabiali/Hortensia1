'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Inbox, BarChart3, LogOut, Flower2, Sparkles } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/app/theme-toggle'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/dashboard', label: 'Requests', icon: Inbox },
  { href: '/dashboard/insights', label: 'Insights', icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const user = session?.user
  const initials = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() ?? '?'

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[240px] flex-col border-r border-[var(--border)] bg-[var(--bg-card)]">
      <div className="flex items-center justify-between px-5 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Flower2 className="h-5 w-5 text-[var(--accent)]" />
          <span className="text-sm font-semibold">Hortensia</span>
        </Link>
        <ThemeToggle />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'border-l-2 border-[var(--accent)] bg-[var(--accent-dim)] pl-[10px] text-[var(--accent)]'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-[var(--border)] p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-[var(--text)]">
              {user?.name ?? 'User'}
            </p>
            <p className="truncate text-xs text-[var(--text-faint)]">
              {user?.email ?? ''}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="mt-3 w-full justify-start gap-2 text-[var(--text-muted)]"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  )
}
