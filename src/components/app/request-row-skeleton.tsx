import { Skeleton } from '@/components/ui/skeleton'

export function RequestRowSkeleton({ compact }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-4 border-b border-[var(--border)] ${compact ? 'py-2' : 'py-3'}`}>
      <div className="flex-1 space-y-1">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-72" />
      </div>
      <div className="hidden sm:block">
        <Skeleton className="h-3 w-20" />
      </div>
      <div>
        <Skeleton className="h-3 w-16" />
      </div>
      <div>
        <Skeleton className="h-5 w-20 rounded-md" />
      </div>
      <div className="w-16" />
    </div>
  )
}
