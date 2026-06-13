'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function InlineError({ message, id }: { message: string; id?: string }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(timer)
  }, [message, id])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 rounded-lg border border-[var(--danger-soft)] bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1">{message}</span>
          <button
            onClick={() => setVisible(false)}
            className="flex h-5 w-5 items-center justify-center rounded hover:bg-[var(--danger)]/10"
          >
            <X className="h-3 w-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
