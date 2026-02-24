'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass'
import { Settings, Bell, Shield, Database, Globe, Key } from 'lucide-react'
import { cn } from '@/lib/utils'

const sections = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'database', label: 'Database', icon: Database },
  { id: 'network', label: 'Network', icon: Globe },
  { id: 'api', label: 'API Keys', icon: Key },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general')

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100">Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">Configure system preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all',
                  activeSection === section.id
                    ? 'bg-white/[0.08] text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <GlassCard className="p-6">
            {activeSection === 'general' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-zinc-100">General Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-zinc-400 block mb-2">System Name</label>
                    <input
                      type="text"
                      defaultValue="OpenClaw Mission Control"
                      className="w-full px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-zinc-400 block mb-2">Auto-Refresh Interval</label>
                    <select className="w-full px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                      <option>5 seconds</option>
                      <option selected>15 seconds</option>
                      <option>30 seconds</option>
                      <option>1 minute</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-t border-white/[0.06]">
                    <div>
                      <p className="text-sm text-zinc-300">Dark Mode</p>
                      <p className="text-xs text-zinc-500">Always use dark theme</p>
                    </div>
                    <div className="w-11 h-6 bg-emerald-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-zinc-100">Notification Settings</h3>
                <p className="text-sm text-zinc-500">Configure alert preferences</p>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-zinc-100">Security Settings</h3>
                <p className="text-sm text-zinc-500">Manage access controls and permissions</p>
              </div>
            )}

            {activeSection === 'database' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-zinc-100">Database Configuration</h3>
                <p className="text-sm text-zinc-500">Convex connection settings</p>
              </div>
            )}

            {activeSection === 'network' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-zinc-100">Network Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-zinc-400 block mb-2">Gateway Port</label>
                    <input
                      type="number"
                      defaultValue="18789"
                      className="w-full px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400 block mb-2">Tailscale Mode</label>
                    <select className="w-full px-4 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                      <option>Off</option>
                      <option selected>Proxy</option>
                      <option>Full</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'api' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-zinc-100">API Keys</h3>
                <p className="text-sm text-zinc-500">Manage external service credentials</p>
                
                <div className="space-y-3">
                  {['Moonshot API', 'OpenAI API', 'Convex'].map((service) => (
                    <div key={service} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                      <span className="text-sm text-zinc-300">{service}</span>
                      <button className="px-3 py-1.5 text-xs bg-white/[0.06] rounded-lg text-zinc-400 hover:text-zinc-200">
                        Configure
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
