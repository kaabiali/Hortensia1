const statusConfig = {
  pending: { label: 'Pending', bg: 'var(--amber-soft)', color: 'var(--amber)' },
  in_progress: { label: 'In progress', bg: 'var(--accent-soft)', color: 'var(--accent)' },
  done: { label: 'Done', bg: 'var(--green-soft)', color: 'var(--green)' },
} as const

type Status = keyof typeof statusConfig

export function StatusChip({ status }: { status: Status }) {
  const config = statusConfig[status]
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        backgroundColor: config.bg,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  )
}
