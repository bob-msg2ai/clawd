'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard, MetricCard, LiveIndicator, StatusBadge } from '@/components/ui/glass'
import { Server, Bot, Clock, DollarSign, FileText, Activity, CheckCircle, AlertCircle } from 'lucide-react'
import { formatNumber, formatDuration } from '@/lib/utils'

interface SystemState {
  services: Array<{
    name: string
    status: 'online' | 'offline' | 'idle'
    port: number
    lastCheck: string
  }>
}

interface AgentState {
  count: number
  healthy: number
  unhealthy: number
  activeSubAgents: number
}

interface CronState {
  jobs: Array<{
    name: string
    schedule: string
    lastStatus: 'success' | 'error'
    lastRun: string
    consecutiveErrors: number
  }>
}

interface RevenueState {
  current: number
  burn: number
  net: number
}

interface ContentPipeline {
  draft: number
  review: number
  approved: number
  published: number
}

export default function HomePage() {
  const [systemState, setSystemState] = useState<SystemState | null>(null)
  const [agentState, setAgentState] = useState<AgentState | null>(null)
  const [cronState, setCronState] = useState<CronState | null>(null)
  const [revenue, setRevenue] = useState<RevenueState | null>(null)
  const [contentPipeline, setContentPipeline] = useState<ContentPipeline | null>(null)
  const [quickStats, setQuickStats] = useState({
    totalTasks: 0,
    pendingApprovals: 0,
    activeSessions: 0,
    uptime: 0,
  })
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const fetchData = async () => {
    try {
      const [systemRes, agentsRes, cronRes, revenueRes, contentRes, statsRes] = await Promise.all([
        fetch('/api/system-state'),
        fetch('/api/agents'),
        fetch('/api/cron-health'),
        fetch('/api/revenue'),
        fetch('/api/content-pipeline'),
        fetch('/api/quick-stats'),
      ])

      if (systemRes.ok) setSystemState(await systemRes.json())
      if (agentsRes.ok) setAgentState(await agentsRes.json())
      if (cronRes.ok) setCronState(await cronRes.json())
      if (revenueRes.ok) setRevenue(await revenueRes.json())
      if (contentRes.ok) setContentPipeline(await contentRes.json())
      if (statsRes.ok) setQuickStats(await statsRes.json())

      setLastRefresh(new Date())
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Dashboard Overview</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <LiveIndicator interval={15} />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Tasks"
          value={formatNumber(quickStats.totalTasks)}
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <MetricCard
          title="Pending Approvals"
          value={quickStats.pendingApprovals}
          status={quickStats.pendingApprovals > 0 ? 'warning' : 'positive'}
          icon={<AlertCircle className="w-5 h-5" />}
        />
        <MetricCard
          title="Active Sessions"
          value={quickStats.activeSessions}
          icon={<Activity className="w-5 h-5" />}
        />
        <MetricCard
          title="Uptime"
          value={formatDuration(quickStats.uptime)}
          icon={<Clock className="w-5 h-5" />}
        />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* System Health */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              System Health
            </h3>
            <StatusBadge status="online" text={systemState?.services.every(s => s.status === 'online') ? 'All Systems OK' : 'Issues Detected'} pulse />
          </div>
          <div className="space-y-3">
            {systemState?.services.map((service) => (
              <div key={service.name} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                <div>
                  <p className="text-sm text-zinc-300">{service.name}</p>
                  <p className="text-xs text-zinc-600 font-mono">Port {service.port}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={service.status} />
                  <p className="text-[10px] text-zinc-600 mt-1">{new Date(service.lastCheck).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Agent Status */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              Agent Status
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white/[0.03] rounded-xl">
              <p className="text-2xl font-semibold text-zinc-100 font-mono">{agentState?.count || 0}</p>
              <p className="text-xs text-zinc-500">Total Agents</p>
            </div>
            <div className="p-3 bg-white/[0.03] rounded-xl">
              <p className="text-2xl font-semibold text-emerald-400 font-mono">{agentState?.activeSubAgents || 0}</p>
              <p className="text-xs text-zinc-500">Active Sub-Agents</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-zinc-400">{agentState?.healthy || 0} Healthy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-zinc-400">{agentState?.unhealthy || 0} Unhealthy</span>
            </div>
          </div>
        </GlassCard>

        {/* Cron Health */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Cron Health
            </h3>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {cronState?.jobs.slice(0, 5).map((job) => (
              <div key={job.name} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                <div className="min-w-0">
                  <p className="text-sm text-zinc-300 truncate">{job.name}</p>
                  <p className="text-xs text-zinc-600 font-mono">{job.schedule}</p>
                </div>
                <div className="flex items-center gap-2">
                  {job.consecutiveErrors > 0 && (
                    <span className="text-[10px] text-red-400">{job.consecutiveErrors} errors</span>
                  )}
                  <span className={cn('w-2 h-2 rounded-full', job.lastStatus === 'success' ? 'bg-emerald-500' : 'bg-red-500')} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Revenue Tracker */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Revenue Tracker
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-zinc-500">Current Revenue</p>
              <p className="text-2xl font-semibold text-emerald-400 font-mono">
                ${revenue?.current.toLocaleString() || '0'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-500">Monthly Burn</p>
                <p className="text-lg font-medium text-red-400 font-mono">
                  -${revenue?.burn.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Net</p>
                <p className={cn('text-lg font-medium font-mono', (revenue?.net || 0) >= 0 ? 'text-emerald-400' : 'text-red-400')}>
                  {revenue && revenue.net >= 0 ? '+' : ''}${revenue?.net.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Content Pipeline */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              Content Pipeline
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Draft', value: contentPipeline?.draft || 0, color: 'text-zinc-400' },
              { label: 'Review', value: contentPipeline?.review || 0, color: 'text-amber-400' },
              { label: 'Approved', value: contentPipeline?.approved || 0, color: 'text-emerald-400' },
              { label: 'Published', value: contentPipeline?.published || 0, color: 'text-cyan-400' },
            ].map((stage) => (
              <div key={stage.label} className="text-center p-3 bg-white/[0.03] rounded-xl">
                <p className={cn('text-xl font-semibold font-mono', stage.color)}>{stage.value}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">{stage.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Recent Activity */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Recent Activity
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { action: 'Task completed', target: 'Email processing', time: '2m ago', type: 'success' },
              { action: 'Agent spawned', target: 'Research sub-agent', time: '5m ago', type: 'info' },
              { action: 'Cron executed', target: 'Daily report', time: '15m ago', type: 'success' },
              { action: 'File updated', target: 'MEMORY.md', time: '32m ago', type: 'info' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0">
                <span className={cn('w-2 h-2 rounded-full', item.type === 'success' ? 'bg-emerald-500' : 'bg-cyan-500')} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-300">{item.action}</p>
                  <p className="text-xs text-zinc-500 truncate">{item.target}</p>
                </div>
                <span className="text-xs text-zinc-600">{item.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

import { cn } from '@/lib/utils'
