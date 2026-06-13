'use client'

import { SessionProvider } from 'next-auth/react'
import { Sidebar } from '@/components/app/sidebar'
import { Topbar } from '@/components/app/topbar'
import { CommandPalette } from '@/components/app/command-palette'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false)
  const pathname = usePathname()

  const isNewRequest = pathname === '/dashboard/new'

  return (
    <SessionProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col lg:pl-[var(--sidebar-width)]">
          {!isNewRequest && <Topbar onCommandOpen={() => setCommandOpen(true)} />}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </SessionProvider>
  )
}
