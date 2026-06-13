'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Sparkles, Loader2, Check, X } from 'lucide-react'
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
import { Card, CardContent } from '@/components/ui/card'

type FormValues = z.infer<typeof requestSchema>

interface RequestFormProps {
  defaultValues?: Partial<FormValues>
  requestId?: string
}

export function RequestForm({ defaultValues, requestId }: RequestFormProps) {
  const router = useRouter()
  const [isImproving, setIsImproving] = useState(false)
  const [suggestion, setSuggestion] = useState<{
    suggestedTitle: string
    refinedDescription: string
    scopeBullets: string[]
  } | null>(null)
  const [aiError, setAiError] = useState<string | null>(null)

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

  const title = form.watch('title')
  const description = form.watch('description')
  const canImprove = title.length >= 3 && description.length >= 10 && !isImproving

  async function handleImprove() {
    setIsImproving(true)
    setAiError(null)
    setSuggestion(null)

    try {
      const res = await fetch('/api/ai/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.error === 'ai_unavailable') {
          setAiError('AI is temporarily unavailable. You can still submit your request manually.')
        } else {
          setAiError('Something went wrong. Please try again.')
        }
        return
      }

      setSuggestion({
        suggestedTitle: data.suggestedTitle,
        refinedDescription: data.refinedDescription,
        scopeBullets: data.scopeBullets,
      })
    } catch {
      setAiError('AI is temporarily unavailable. You can still submit your request manually.')
    } finally {
      setIsImproving(false)
    }
  }

  function handleAccept() {
    if (!suggestion) return
    form.setValue('title', suggestion.suggestedTitle)
    form.setValue('description', suggestion.refinedDescription)
    setSuggestion(null)
    setAiError(null)
  }

  function handleDiscard() {
    setSuggestion(null)
    setAiError(null)
  }

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

          <div className="flex items-center justify-between">
            {aiError && (
              <p className="text-sm text-[var(--warning)]">{aiError}</p>
            )}
            <div className="ml-auto">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!canImprove}
                onClick={handleImprove}
              >
                {isImproving ? (
                  <>
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    Improving…
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                    Improve with AI
                  </>
                )}
              </Button>
            </div>
          </div>

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

      {suggestion && (
        <Card className="mt-5 border-[var(--accent)]/30">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[var(--accent)] to-purple-500">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)]">
                  AI Suggestion
                </span>
              </div>
            </div>

            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-faint)]">
                Suggested Title
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-2 text-sm font-medium text-[var(--text)]">
                {suggestion.suggestedTitle}
              </div>
            </div>

            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-faint)]">
                Refined Description
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-2 text-sm text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                {suggestion.refinedDescription}
              </div>
            </div>

            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-faint)]">
                Scope Suggestions
              </div>
              <ul className="space-y-1">
                {suggestion.scopeBullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2"
                  >
                    <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-[var(--success)]" />
                    <span className="text-xs text-[var(--text-muted)]">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-[var(--border)]">
              <Button size="sm" className="flex-1 h-8 text-xs" onClick={handleAccept}>
                <Check className="mr-1 h-3 w-3" />
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs"
                onClick={handleDiscard}
              >
                <X className="mr-1 h-3 w-3" />
                Discard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
