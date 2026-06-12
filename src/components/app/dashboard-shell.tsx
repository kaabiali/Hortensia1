'use client'

import { SessionProvider } from 'next-auth/react'
import { Sidebar } from '@/components/app/sidebar'
import { useState } from 'react'
import { CommandPalette } from '@/components/app/command-palette'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <SessionProvider>
      <div className="flex h-screen">
        <Sidebar />
        <main className="ml-[240px] flex-1 overflow-y-auto px-8 py-6">
          <div className="mx-auto max-w-4xl">
            {children}
          </div>
        </main>
      </div>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </SessionProvider>
  )
}
