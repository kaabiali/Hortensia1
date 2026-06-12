'use client'

import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Inbox, BarChart3, Plus, LogOut } from 'lucide-react'

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()

  const runCommand = useCallback(
    (command: () => void) => {
      onOpenChange(false)
      command()
    },
    [onOpenChange]
  )

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, onOpenChange])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
            <Inbox className="mr-2 h-4 w-4" />
            Requests
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/insights'))}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Insights
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/new'))}>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => signOut({ callbackUrl: '/' }))}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
