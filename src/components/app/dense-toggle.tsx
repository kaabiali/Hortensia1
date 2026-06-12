'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { List } from 'lucide-react'

interface DenseToggleProps {
  onToggle: (compact: boolean) => void
}

export function DenseToggle({ onToggle }: DenseToggleProps) {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('table-density')
    if (stored === 'compact') {
      setCompact(true)
      onToggle(true)
    }
  }, [onToggle])

  function handleToggle() {
    const next = !compact
    setCompact(next)
    localStorage.setItem('table-density', next ? 'compact' : 'comfortable')
    onToggle(next)
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle} title={compact ? 'Switch to comfortable' : 'Switch to compact'}>
      <List className="h-4 w-4" />
    </Button>
  )
}
