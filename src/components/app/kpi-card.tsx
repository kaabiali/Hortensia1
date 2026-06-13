'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface KPICardProps {
  label: string
  value: number
  icon: React.ReactNode
  color: string
  bgColor: string
  prefix?: string
  suffix?: string
  delay?: number
}

export function KPICard({ label, value, icon, color, bgColor, prefix, suffix, delay = 0 }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return
    const duration = 800
    const steps = 30
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.round(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [hasAnimated, value])

  const formatted = displayValue.toLocaleString()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ backgroundColor: bgColor }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
      </div>
      <div className="mt-3">
        <div
          className="text-2xl font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {prefix}{formatted}{suffix}
        </div>
        <div className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">
          {label}
        </div>
      </div>
    </motion.div>
  )
}
