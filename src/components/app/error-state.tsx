'use client'

import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface ErrorStateProps {
  message?: string
}

export function ErrorState({ message }: ErrorStateProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-[var(--red-soft)] p-4">
        <AlertCircle className="h-10 w-10 text-[var(--red)]" />
      </div>
      <h3 className="text-lg font-medium text-[var(--text)]">Something went wrong</h3>
      <p className="mt-1 text-sm text-[var(--text-muted)] max-w-sm">
        {message ?? 'An unexpected error occurred. Please try again.'}
      </p>
      <Button variant="outline" className="mt-6" onClick={() => router.refresh()}>
        Try again
      </Button>
    </div>
  )
}
