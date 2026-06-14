import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Settings, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text)]">Settings</h1>
        <p className="text-sm text-[var(--text-muted)]">
          Manage your account and preferences.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] divide-y divide-[var(--border)]">
        {[
          { label: 'Profile', description: 'Your name, email, and avatar' },
          { label: 'Notifications', description: 'Email and in-app notification preferences' },
          { label: 'Appearance', description: 'Theme, density, and display options' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-[var(--bg-subtle)] cursor-pointer"
          >
            <div>
              <div className="text-sm font-medium text-[var(--text)]">{item.label}</div>
              <div className="text-xs text-[var(--text-muted)]">{item.description}</div>
            </div>
            <ChevronRight className="h-4 w-4 text-[var(--text-faint)]" />
          </div>
        ))}
      </div>
    </div>
  )
}
