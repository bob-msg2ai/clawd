'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass'
import { Brain, Search, FileText, Calendar, Clock } from 'lucide-react'
import { cn, formatRelativeTime } from '@/lib/utils'

const memories = [
  { id: 1, title: 'User Preferences', category: 'Profile', date: '2024-02-13', size: '2.4 KB' },
  { id: 2, title: 'Project Goals 2024', category: 'Strategic', date: '2024-02-12', size: '8.1 KB' },
  { id: 3, title: 'API Keys & Credentials', category: 'Security', date: '2024-02-10', size: '1.2 KB' },
  { id: 4, title: 'Conversation History: Launch Planning', category: 'Chat', date: '2024-02-09', size: '45.2 KB' },
  { id: 5, title: 'System Configuration', category: 'Technical', date: '2024-02-08', size: '5.6 KB' },
]

export default function MemoryPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Memory Browser</h1>
          <p className="text-sm text-zinc-500 mt-1">Access and manage agent memory</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search memories..."
          className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>

      {/* Memory List */}
      <div className="grid gap-3">
        {memories.map((memory, i) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard hover className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-zinc-200">{memory.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-white/[0.06] rounded-full text-zinc-500">
                      {memory.category}
                    </span>
                    <span className="text-xs text-zinc-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {memory.date}
                    </span>
                    <span className="text-xs text-zinc-600 font-mono">{memory.size}</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/[0.06] rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.1] transition-colors">
                  View
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
