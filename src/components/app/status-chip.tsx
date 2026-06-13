const statusConfig = {
  pending: { label: 'Pending', bg: '#FEF3C7', color: '#B45309' },
  in_progress: { label: 'In Progress', bg: '#DBEAFE', color: '#1D4ED8' },
  done: { label: 'Done', bg: '#D1FAE5', color: '#047857' },
} as const

type Status = keyof typeof statusConfig

export function StatusChip({ status }: { status: Status }) {
  const config = statusConfig[status]
  if (!config) return null
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium leading-4"
      style={{
        backgroundColor: config.bg,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  )
}
