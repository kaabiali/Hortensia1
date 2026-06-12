'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { requestSchema } from '@/lib/validations'
import { createRequest, updateRequest } from '@/actions/requests'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type FormValues = z.infer<typeof requestSchema>

interface RequestFormProps {
  defaultValues?: Partial<FormValues>
  requestId?: string
}

export function RequestForm({ defaultValues, requestId }: RequestFormProps) {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(requestSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      budget: undefined as unknown as number,
      status: 'pending',
      ...defaultValues,
    },
  })

  async function onSubmit(data: FormValues) {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('budget', String(data.budget))
    formData.append('status', data.status)

    let result
    if (requestId) {
      result = await updateRequest(requestId, formData)
    } else {
      result = await createRequest(formData)
    }

    if (result.error) {
      form.setError('root', { message: result.error })
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Brand identity redesign" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    className="flex min-h-[100px] w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-[var(--text-faint)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe what you need..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget (USD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      style={{ fontFamily: 'var(--font-mono)' }}
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {form.formState.errors.root && (
            <p className="text-sm text-[var(--red)]">
              {form.formState.errors.root.message}
            </p>
          )}

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? 'Saving...'
                : requestId
                  ? 'Update Request'
                  : 'Create Request'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
