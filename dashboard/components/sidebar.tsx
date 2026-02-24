'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Activity,
  Bot,
  MessageSquare,
  Brain,
  FolderOpen,
  ScrollText,
  Settings,
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Home', href: '/' },
  { icon: Activity, label: 'Ops', href: '/ops' },
  { icon: Bot, label: 'Agents', href: '/agents' },
  { icon: MessageSquare, label: 'Chat', href: '/chat' },
  { icon: Brain, label: 'Memory', href: '/memory' },
  { icon: FolderOpen, label: 'Files', href: '/files' },
  { icon: ScrollText, label: 'Logs', href: '/logs' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="fixed left-0 top-0 z-40 h-full w-20 lg:w-64 bg-[#0a0a0a] border-r border-white/[0.06] flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">OC</span>
          </div>
          <span className="hidden lg:block font-semibold text-zinc-100">Mission Control</span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item, i) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
                  isActive
                    ? 'bg-white/[0.08] text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-zinc-300')} />
                <span className="hidden lg:block text-sm font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 w-0.5 h-6 bg-emerald-500 rounded-r-full"
                  />
                )}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Bottom Status */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="glass-card p-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden lg:block text-xs text-zinc-400">System Online</span>
          </div>
          <div className="hidden lg:block mt-2 text-[10px] text-zinc-600 font-mono">
            v2026.2.12
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
