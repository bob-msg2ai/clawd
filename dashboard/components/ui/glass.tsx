'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function GlassCard({ children, className, hover = false, onClick }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl',
        hover && 'hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

interface GlassPanelProps {
  children: React.ReactNode
  className?: string
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div className={cn('bg-white/[0.02] backdrop-blur-2xl border border-white/[0.06] rounded-2xl', className)}>
      {children}
    </div>
  )
}

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'idle' | 'warning' | 'error'
  text?: string
  pulse?: boolean
}

export function StatusBadge({ status, text, pulse = false }: StatusBadgeProps) {
  const colors = {
    online: 'bg-emerald-500',
    offline: 'bg-red-500',
    idle: 'bg-amber-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
  }

  return (
    <div className="flex items-center gap-2">
      <span className={cn('w-2 h-2 rounded-full', colors[status], pulse && 'animate-pulse-glow')} />
      {text && <span className="text-xs text-zinc-400">{text}</span>}
    </div>
  )
}

interface LiveIndicatorProps {
  interval?: number
}

export function LiveIndicator({ interval = 15 }: LiveIndicatorProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-xs font-medium text-emerald-400">AUTO {interval}S</span>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  status?: 'positive' | 'negative' | 'neutral'
}

export function MetricCard({ title, value, change, changeLabel, icon, status = 'neutral' }: MetricCardProps) {
  const changeColors = {
    positive: 'text-emerald-400',
    negative: 'text-red-400',
    neutral: 'text-zinc-400',
  }

  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-500 mb-1">{title}</p>
          <p className="text-2xl font-semibold text-zinc-100 font-mono">{value}</p>
          {change !== undefined && (
            <p className={cn('text-xs mt-1', changeColors[status])}>
              {change > 0 ? '+' : ''}{change}%
              {changeLabel && <span className="text-zinc-500 ml-1">{changeLabel}</span>}
            </p>
          )}
        </div>
        {icon && <div className="p-2 bg-white/[0.05] rounded-lg text-zinc-400">{icon}</div>}
      </div>
    </GlassCard>
  )
}
