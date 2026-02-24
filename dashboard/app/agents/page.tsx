'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass'
import { Bot, Brain, Sparkles, Shield, Zap, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'agents', label: 'Agents', icon: Bot },
  { id: 'models', label: 'Models', icon: Brain },
]

const agents = [
  {
    id: 'main',
    name: 'Bob',
    role: 'Primary Agent',
    model: 'kimi-k2.5',
    level: 4,
    status: 'active',
    description: 'General-purpose assistant with full system access',
    capabilities: ['Code', 'Research', 'Writing', 'Analysis'],
    subAgents: ['Research', 'Coding', 'Writing'],
  },
  {
    id: 'zoe',
    name: 'Zoe',
    role: 'Marketing Specialist',
    model: 'kimi-k2.5',
    level: 3,
    status: 'active',
    description: 'Specialized in marketing strategy and content creation',
    capabilities: ['Copywriting', 'Campaigns', 'Social Media', 'Analytics'],
    subAgents: ['Copywriter', 'Designer'],
  },
]

const models = [
  { name: 'kimi-k2.5', provider: 'Moonshot', cost: '$0.002/1K', routing: 'Default', failover: 'GLM-4.7' },
  { name: 'GLM-4.7', provider: 'Zhipu AI', cost: '$0.001/1K', routing: 'Fallback', failover: 'None' },
  { name: 'claude-opus-4', provider: 'Anthropic', cost: '$0.015/1K', routing: 'Deep Work', failover: 'claude-sonnet' },
  { name: 'claude-sonnet-4', provider: 'Anthropic', cost: '$0.003/1K', routing: 'Fast Tasks', failover: 'kimi-k2.5' },
]

export default function AgentsPage() {
  const [activeTab, setActiveTab] = useState('agents')
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100">Agent Management</h1>
        <p className="text-sm text-zinc-500 mt-1">Configure and monitor AI agents</p>
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
        {activeTab === 'agents' && (
          <motion.div
            key="agents"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Agent List */}
            <div className="lg:col-span-2 grid gap-4">
              {agents.map((agent) => (
                <GlassCard
                  key={agent.id}
                  hover
                  onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                  className={cn('p-5 cursor-pointer', selectedAgent === agent.id && 'border-emerald-500/30')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium text-zinc-100">{agent.name}</h3>
                          <span className={cn(
                            'px-2 py-0.5 rounded-full text-[10px] font-medium',
                            agent.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-500/10 text-zinc-400'
                          )}>
                            {agent.status}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-500">{agent.role}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-zinc-600 font-mono">{agent.model}</span>
                          <span className="text-xs text-zinc-600">L{agent.level}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            'w-1.5 h-4 rounded-full',
                            i < agent.level ? 'bg-emerald-500' : 'bg-white/[0.1]'
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {selectedAgent === agent.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-white/[0.06]">
                          <p className="text-sm text-zinc-400 mb-4">{agent.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-xs text-zinc-500 mb-2 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Capabilities
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {agent.capabilities.map((cap) => (
                                  <span key={cap} className="text-xs px-2 py-1 bg-white/[0.06] rounded-full text-zinc-400">
                                    {cap}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-xs text-zinc-500 mb-2 flex items-center gap-1">
                                <Users className="w-3 h-3" /> Sub-Agents
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {agent.subAgents.map((sub) => (
                                  <span key={sub} className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full">
                                    {sub}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <button className="flex-1 px-4 py-2 bg-white/[0.06] rounded-lg text-sm text-zinc-300 hover:bg-white/[0.1] transition-colors">
                              View Logs
                            </button>
                            <button className="flex-1 px-4 py-2 bg-white/[0.06] rounded-lg text-sm text-zinc-300 hover:bg-white/[0.1] transition-colors">
                              Configure
                            </button>
                            <button className="flex-1 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm hover:bg-emerald-500/20 transition-colors">
                              Spawn Sub-Agent
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <GlassCard className="p-5">
                <h4 className="text-sm font-medium text-zinc-300 mb-4">Agent Stats</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">Total Agents</span>
                    <span className="text-lg font-semibold text-zinc-100 font-mono">{agents.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">Active</span>
                    <span className="text-lg font-semibold text-emerald-400 font-mono">
                      {agents.filter(a => a.status === 'active').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">Avg Level</span>
                    <span className="text-lg font-semibold text-zinc-100 font-mono">
                      {(agents.reduce((acc, a) => acc + a.level, 0) / agents.length).toFixed(1)}
                    </span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <h4 className="text-sm font-medium text-zinc-300 mb-4">Actions</h4>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm hover:bg-emerald-500/20 transition-colors">
                    + Create New Agent
                  </button>
                  <button className="w-full px-4 py-2 bg-white/[0.06] text-zinc-300 rounded-lg text-sm hover:bg-white/[0.1] transition-colors">
                    Import Agent Config
                  </button>
                  <button className="w-full px-4 py-2 bg-white/[0.06] text-zinc-300 rounded-lg text-sm hover:bg-white/[0.1] transition-colors">
                    Export All Configs
                  </button>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {activeTab === 'models' && (
          <motion.div
            key="models"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-zinc-300">Model Inventory</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs bg-white/[0.06] rounded-lg text-zinc-400">All Providers</button>
                  <button className="px-3 py-1.5 text-xs bg-white/[0.06] rounded-lg text-zinc-400">Active Only</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500">Model</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500">Provider</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500">Cost</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500">Routing</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500">Failover</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-zinc-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {models.map((model) => (
                      <tr key={model.name} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Brain className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-zinc-300 font-mono">{model.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-zinc-400">{model.provider}</td>
                        <td className="py-3 px-4 text-sm text-zinc-400 font-mono">{model.cost}</td>
                        <td className="py-3 px-4">
                          <span className={cn(
                            'text-xs px-2 py-1 rounded-full',
                            model.routing === 'Default' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-cyan-500/10 text-cyan-400'
                          )}>
                            {model.routing}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-zinc-500 font-mono">{model.failover}</td>
                        <td className="py-3 px-4">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-xs text-zinc-400">Available</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
