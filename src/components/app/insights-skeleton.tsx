import { Skeleton } from '@/components/ui/skeleton'

export function InsightsSkeleton() {
  return (
    <div>
      <div className="mb-6">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="mt-1 h-4 w-48" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="mt-2 h-7 w-16" />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-4 h-64 w-full" />
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-4 h-64 w-full" />
        </div>
      </div>
    </div>
  )
}
