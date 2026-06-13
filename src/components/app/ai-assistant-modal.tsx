'use client'

import { useState } from 'react'
import { Sparkles, X, Check, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { motion, AnimatePresence } from 'framer-motion'

interface AIResult {
  title: string
  description: string
  scope: string[]
}

export function AIAssistantModal({
  open,
  onOpenChange,
  currentTitle,
  currentDescription,
  onAccept,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentTitle: string
  currentDescription: string
  onAccept: (result: AIResult) => void
}) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AIResult | null>(null)
  const [accepted, setAccepted] = useState(false)

  async function handleImprove() {
    setLoading(true)
    setResult(null)
    setAccepted(false)

    // Simulate AI processing
    await new Promise((r) => setTimeout(r, 2000))

    setResult({
      title: currentTitle
        ? `Optimized: ${currentTitle}`
        : 'Brand Identity & Digital Presence Package',
      description: currentDescription
        ? `${currentDescription}\n\nEnhanced scope includes comprehensive brand strategy, visual identity system, and multi-platform asset delivery with measurable KPIs.`
        : 'A full-service branding and digital package including strategy, design, and implementation across web and social platforms.',
      scope: [
        'Brand strategy & positioning workshop',
        'Visual identity system (logo, colors, typography)',
        'Website design & development (up to 5 pages)',
        'Social media kit (templates for 3 platforms)',
        'Style guide documentation',
        '2 rounds of revisions per deliverable',
      ],
    })
    setLoading(false)
  }

  function handleAccept() {
    if (result) {
      setAccepted(true)
      onAccept(result)
      setTimeout(() => onOpenChange(false), 300)
    }
  }

  function handleRegenerate() {
    handleImprove()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[var(--accent)] to-purple-500">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <DialogTitle className="text-sm font-semibold text-[var(--text)]">
                AI Assistant
              </DialogTitle>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="flex h-6 w-6 items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-6 py-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="shimmer h-4 w-3/4 rounded" />
                <div className="shimmer h-3 w-full rounded" />
                <div className="shimmer h-3 w-5/6 rounded" />
                <div className="shimmer h-3 w-2/3 rounded" />
                <div className="mt-4 space-y-2">
                  <div className="shimmer h-3 w-1/3 rounded" />
                  <div className="shimmer h-3 w-full rounded" />
                  <div className="shimmer h-3 w-4/5 rounded" />
                </div>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-faint)]">
                    Suggested Title
                  </div>
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-2 text-sm font-medium text-[var(--text)]">
                    {result.title}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-faint)]">
                    Enhanced Description
                  </div>
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-2 text-sm text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                    {result.description}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-faint)]">
                    Scope Suggestions
                  </div>
                  <ul className="space-y-1">
                    {result.scope.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2"
                      >
                        <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-[var(--success)]" />
                        <span className="text-xs text-[var(--text-muted)]">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
                  <Button
                    size="sm"
                    className="flex-1 h-8 text-xs"
                    onClick={handleAccept}
                    disabled={accepted}
                  >
                    {accepted ? (
                      <>
                        <Check className="mr-1 h-3 w-3" />
                        Accepted
                      </>
                    ) : (
                      'Accept Suggestions'
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs"
                    onClick={handleRegenerate}
                  >
                    <RefreshCw className="mr-1 h-3 w-3" />
                    Regenerate
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 text-xs text-[var(--text-muted)]"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-4 text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-soft)] to-purple-500/10">
                  <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Get AI-powered suggestions for your project request.
                </p>
                <Button
                  size="sm"
                  onClick={handleImprove}
                  className="bg-gradient-to-r from-[var(--accent)] to-purple-500 text-white shadow-sm hover:from-[var(--accent-hover)] hover:to-purple-600"
                >
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  Improve with AI
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
