'use client'

import { useMemo, useState, useTransition, useOptimistic } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table'
import { formatDistanceToNow } from 'date-fns'
import { ArrowUpDown, ChevronLeft, ChevronRight, Plus, Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusChip } from '@/components/app/status-chip'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { motion } from 'framer-motion'
import { updateRequestStatus, deleteRequest } from '@/actions/requests'
import { EmptyState } from '@/components/app/empty-state'
import { InlineError } from '@/components/app/inline-error'

interface Request {
  id: string
  title: string
  description: string
  budget: number
  status: string
  createdAt: Date
}

export function RequestsTable({ requests }: { requests: Request[] }) {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [, startTransition] = useTransition()
  const [actionError, setActionError] = useState<string | null>(null)

  const columnHelper = createColumnHelper<Request>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[var(--text-faint)] hover:text-[var(--text)] transition-colors"
          >
            Title
            <ArrowUpDown className="h-3 w-3" />
          </button>
        ),
        cell: ({ row }) => (
          <div className="min-w-0">
            <Link
              href={`/dashboard/${row.original.id}/edit`}
              className="text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors"
            >
              {row.original.title}
            </Link>
            <p className="truncate text-xs text-[var(--text-faint)] max-w-[240px]">
              {row.original.description}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor('budget', {
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[var(--text-faint)] hover:text-[var(--text)] transition-colors"
          >
            Budget
            <ArrowUpDown className="h-3 w-3" />
          </button>
        ),
        cell: ({ getValue }) => {
          const val = getValue()
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(val)
          return (
            <span
              className="text-sm text-[var(--text)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {formatted}
            </span>
          )
        },
      }),
      columnHelper.accessor('status', {
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[var(--text-faint)] hover:text-[var(--text)] transition-colors"
          >
            Status
            <ArrowUpDown className="h-3 w-3" />
          </button>
        ),
        cell: ({ row }) => {
          const [optimisticStatus, setOptimisticStatus] = useOptimistic(
            row.original.status
          )
          async function handleStatusChange(newStatus: string) {
            const prev = optimisticStatus
            setOptimisticStatus(newStatus)
            const result = await updateRequestStatus(
              row.original.id,
              newStatus as 'pending' | 'in_progress' | 'done'
            )
            if (result.error) {
              setOptimisticStatus(prev)
              setActionError(result.error)
            } else {
              router.refresh()
            }
          }
          return (
            <Select
              defaultValue={optimisticStatus}
              onValueChange={(val) =>
                startTransition(() => handleStatusChange(val))
              }
            >
              <SelectTrigger className="h-7 w-[130px] border-0 bg-transparent p-0 shadow-none focus:ring-0">
                <SelectValue>
                  <StatusChip
                    status={
                      optimisticStatus as 'pending' | 'in_progress' | 'done'
                    }
                  />
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          )
        },
      }),
      columnHelper.accessor('createdAt', {
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[var(--text-faint)] hover:text-[var(--text)] transition-colors"
          >
            Created
            <ArrowUpDown className="h-3 w-3" />
          </button>
        ),
        cell: ({ getValue }) => (
          <span
            className="text-xs text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {formatDistanceToNow(new Date(getValue()), { addSuffix: true })}
          </span>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-1">
            <Button variant="ghost" size="sm" className="h-7 text-xs text-[var(--text-muted)] hover:text-[var(--text)]" asChild>
              <Link href={`/dashboard/${row.original.id}/edit`}>
                View
              </Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-[var(--text-faint)] hover:text-[var(--danger)]">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete request</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete &ldquo;{row.original.title}&rdquo;? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" type="button">Cancel</Button>
                  <Button
                    variant="outline"
                    className="text-[var(--red)] hover:bg-[var(--red-soft)]"
                    onClick={async () => {
                      const result = await deleteRequest(row.original.id)
                      if (result.error) {
                        setActionError(result.error)
                      } else {
                        router.refresh()
                      }
                    }}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ),
      }),
    ],
    [columnHelper]
  )

  const data = useMemo(() => requests, [requests])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-faint)]" />
          <input
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Filter requests..."
            className="h-8 w-48 sm:w-64 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] pl-9 pr-3 text-xs text-[var(--text)] placeholder:text-[var(--text-faint)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
          />
        </div>
        <Button size="sm" asChild>
          <Link href="/dashboard/new">
            <Plus className="mr-1 h-3.5 w-3.5" />
            New Request
          </Link>
        </Button>
      </div>

          <div className="overflow-x-auto scrollbar-thin">
            {actionError && (
              <div className="px-5 pt-3">
                <InlineError message={actionError} id={actionError} />
              </div>
            )}
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-[var(--border)]">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-5 py-3 text-left"
                        style={{ width: header.getSize() ? `${header.getSize()}px` : undefined }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {requests.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={columns.length}>
                      <EmptyState />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {table.getRowModel().rows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="px-5 py-12 text-center text-sm text-[var(--text-muted)]"
                      >
                        No requests match your filter.
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row, i) => (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.02 }}
                        className="border-b border-[var(--border)] transition-colors hover:bg-[var(--bg-subtle)] last:border-0"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-5 py-3">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </motion.tr>
                    ))
                  )}
                </tbody>
              )}
            </table>
          </div>

      <div className="flex items-center justify-between border-t border-[var(--border)] px-5 py-2.5">
        <div className="text-xs text-[var(--text-faint)]">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
