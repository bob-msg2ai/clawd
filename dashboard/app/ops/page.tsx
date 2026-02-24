'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass'
import { Server, GitBranch, Eye, Target, CheckCircle, XCircle, Clock } from 'lucide-react'
import { cn, formatRelativeTime } from '@/lib/utils'

const tabs = [
  { id: 'operations', label: 'Operations', icon: Server },
  { id: 'tasks', label: 'Tasks', icon: Target },
  { id: 'calendar', label: 'Calendar', icon: Clock },
]

// Mock data
const servers = [
  { name: 'Gateway', status: 'online', branch: 'main', lastDeploy: '2h ago' },
  { name: 'Agent RPC', status: 'online', branch: 'main', lastDeploy: '2h ago' },
  { name: 'Canvas Host', status: 'online', branch: 'feature/canvas-v2', lastDeploy: '1d ago' },
  { name: 'Tailscale Proxy', status: 'maintenance', branch: 'main', lastDeploy: '3d ago' },
]

const observations = [
  { id: 1, text: 'High memory usage detected in sub-agent spawning', time: '15m ago', severity: 'warning' },
  { id: 2, text: 'Daily revenue report generated successfully', time: '1h ago', severity: 'info' },
  { id: 3, text: 'New agent Zoe completed first task', time: '2h ago', severity: 'success' },
  { id: 4, text: 'Cron job backup-memory failed 2 consecutive times', time: '3h ago', severity: 'error' },
]

const priorities = [
  { id: 1, text: 'Fix memory leak in agent spawning', priority: 'critical', category: 'Product' },
  { id: 2, text: 'Update OpenClaw to v2026.2.13', priority: 'high', category: 'Operations' },
  { id: 3, text: 'Create marketing materials for launch', priority: 'high', category: 'Content' },
  { id: 4, text: 'Review Q1 revenue projections', priority: 'medium', category: 'Revenue' },
]

export default function OpsPage() {
  const [activeTab, setActiveTab] = useState('operations')

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100">Operations Center</h1>
        <p className="text-sm text-zinc-500 mt-1">Monitor and manage system operations</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/[0.06] pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-white/[0.08] text-zinc-100'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'operations' && (
          <motion.div
            key="operations"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            {/* Server Health */}
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-medium text-zinc-300">Server Health</h3>
              </div>
              <div className="space-y-3">
                {servers.map((server) => (
                  <div key={server.name} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                    <div>
                      <p className="text-sm text-zinc-300">{server.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <GitBranch className="w-3 h-3 text-zinc-600" />
                        <span className="text-xs text-zinc-600 font-mono">{server.branch}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        server.status === 'online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      )}>
                        {server.status}
                      </span>
                      <p className="text-[10px] text-zinc-600 mt-1">{server.lastDeploy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Observations Feed */}
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-medium text-zinc-300">Observations Feed</h3>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {observations.map((obs) => (
                  <div key={obs.id} className="flex items-start gap-3 py-2 border-b border-white/[0.04] last:border-0">
                    <span className={cn(
                      'w-2 h-2 rounded-full mt-1.5',
                      obs.severity === 'error' ? 'bg-red-500' :
                      obs.severity === 'warning' ? 'bg-amber-500' :
                      obs.severity === 'success' ? 'bg-emerald-500' : 'bg-cyan-500'
                    )} />
                    <div className="flex-1">
                      <p className="text-sm text-zinc-300">{obs.text}</p>
                      <p className="text-xs text-zinc-600 mt-1">{obs.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* System Priorities */}
            <GlassCard className="p-5 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-medium text-zinc-300">System Priorities</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {priorities.map((priority) => (
                  <div key={priority.id} className="flex items-start gap-3 p-3 bg-white/[0.03] rounded-xl">
                    <span className={cn(
                      'w-2 h-2 rounded-full mt-1.5',
                      priority.priority === 'critical' ? 'bg-red-500' :
                      priority.priority === 'high' ? 'bg-amber-500' : 'bg-cyan-500'
                    )} />
                    <div className="flex-1">
                      <p className="text-sm text-zinc-300">{priority.text}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] px-2 py-0.5 bg-white/[0.06] rounded-full text-zinc-500">
                          {priority.category}
                        </span>
                        <span className={cn(
                          'text-[10px] px-2 py-0.5 rounded-full uppercase',
                          priority.priority === 'critical' ? 'bg-red-500/10 text-red-400' :
                          priority.priority === 'high' ? 'bg-amber-500/10 text-amber-400' : 'bg-cyan-500/10 text-cyan-400'
                        )}>
                          {priority.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {activeTab === 'tasks' && (
          <motion.div
            key="tasks"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-zinc-300">Suggested Tasks</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs bg-white/[0.06] rounded-lg text-zinc-400 hover:text-zinc-200">All</button>
                  <button className="px-3 py-1.5 text-xs bg-white/[0.06] rounded-lg text-zinc-400 hover:text-zinc-200">Revenue</button>
                  <button className="px-3 py-1.5 text-xs bg-white/[0.06] rounded-lg text-zinc-400 hover:text-zinc-200">Product</button>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { category: '💰 Revenue', title: 'Review pricing strategy', reasoning: 'Conversion rate dropped 12% last week', effort: 'Medium', priority: 'High' },
                  { category: '🚀 Product', title: 'Implement agent memory v2', reasoning: 'Current system hitting scalability limits', effort: 'High', priority: 'Critical' },
                  { category: '📝 Content', title: 'Publish launch announcement', reasoning: 'Product ready for public release', effort: 'Low', priority: 'Medium' },
                  { category: '👥 Community', title: 'Respond to Discord questions', reasoning: '5 unanswered questions from potential customers', effort: 'Low', priority: 'Medium' },
                ].map((task, i) => (
                  <div key={i} className="p-4 bg-white/[0.03] rounded-xl hover:bg-white/[0.05] transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">{task.category}</p>
                        <h4 className="text-sm font-medium text-zinc-200">{task.title}</h4>
                        <p className="text-xs text-zinc-500 mt-1">{task.reasoning}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1.5 hover:bg-emerald-500/10 rounded-lg text-zinc-500 hover:text-emerald-400 transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-red-500/10 rounded-lg text-zinc-500 hover:text-red-400 transition-colors">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[10px] px-2 py-0.5 bg-white/[0.06] rounded-full text-zinc-500">{task.effort}</span>
                      <span className={cn(
                        'text-[10px] px-2 py-0.5 rounded-full',
                        task.priority === 'Critical' ? 'bg-red-500/10 text-red-400' :
                        task.priority === 'High' ? 'bg-amber-500/10 text-amber-400' : 'bg-cyan-500/10 text-cyan-400'
                      )}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {activeTab === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-zinc-300">Weekly Calendar</h3>
                <button className="px-3 py-1.5 text-xs bg-emerald-500/10 text-emerald-400 rounded-lg">+ New Event</button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-center">
                    <p className="text-xs text-zinc-500 mb-2">{day}</p>
                    <div className="aspect-square bg-white/[0.03] rounded-xl p-2">
                      {/* Mock events */}
                      {day === 'Mon' && (
                        <div className="w-full h-6 bg-emerald-500/20 rounded text-[8px] flex items-center justify-center text-emerald-400 mb-1">Standup</div>
                      )}
                      {day === 'Wed' && (
                        <div className="w-full h-6 bg-cyan-500/20 rounded text-[8px] flex items-center justify-center text-cyan-400">Review</div>
                      )}
                      {day === 'Fri' && (
                        <div className="w-full h-6 bg-purple-500/20 rounded text-[8px] flex items-center justify-center text-purple-400">Deploy</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
