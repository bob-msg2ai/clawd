'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard, GlassPanel } from '@/components/ui/glass'
import { MessageSquare, Send, Mic, MoreVertical, Phone, Video } from 'lucide-react'
import { cn, formatRelativeTime } from '@/lib/utils'

const tabs = [
  { id: 'chat', label: 'Chat' },
  { id: 'command', label: 'Command' },
]

const sessions = [
  { id: 'main', name: 'Main Session', channel: 'telegram', lastMessage: '2m ago', unread: 0 },
  { id: 'ops', name: 'Operations', channel: 'webchat', lastMessage: '15m ago', unread: 2 },
  { id: 'agent-zoe', name: 'Zoe (Agent)', channel: 'internal', lastMessage: '1h ago', unread: 0 },
  { id: 'discord-general', name: 'Discord General', channel: 'discord', lastMessage: '2h ago', unread: 5 },
]

const messages = [
  { id: 1, role: 'user', content: 'Can you check the system status?', time: '10:30 AM', channel: 'telegram' },
  { id: 2, role: 'assistant', content: 'All systems are operational. Gateway is online, 2 agents active, no pending approvals.', time: '10:31 AM', channel: 'telegram' },
  { id: 3, role: 'user', content: 'What about the cron jobs?', time: '10:32 AM', channel: 'telegram' },
  { id: 4, role: 'assistant', content: '4 cron jobs running. 3 successful, 1 error on backup-memory (2 consecutive failures). I recommend checking the logs.', time: '10:33 AM', channel: 'telegram' },
  { id: 5, role: 'user', content: 'Please generate a morning brief', time: '2m ago', channel: 'telegram' },
  { id: 6, role: 'assistant', content: 'Generating your morning brief...', time: 'Just now', channel: 'telegram', pending: true },
]

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState('chat')
  const [selectedSession, setSelectedSession] = useState('main')
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    // Mock send
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <div className="w-72 border-r border-white/[0.06] bg-[#0a0a0a] flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-white/[0.06]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 py-3 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'text-zinc-100 border-b-2 border-emerald-500'
                  : 'text-zinc-500 hover:text-zinc-300'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Session List */}
        <div className="flex-1 overflow-y-auto p-2">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setSelectedSession(session.id)}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all',
                selectedSession === session.id
                  ? 'bg-white/[0.08]'
                  : 'hover:bg-white/[0.04]'
              )}
            >
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                session.channel === 'telegram' ? 'bg-blue-500/10 text-blue-400' :
                session.channel === 'discord' ? 'bg-purple-500/10 text-purple-400' :
                session.channel === 'internal' ? 'bg-emerald-500/10 text-emerald-400' :
                'bg-zinc-500/10 text-zinc-400'
              )}>
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={cn('text-sm truncate', selectedSession === session.id ? 'text-zinc-100' : 'text-zinc-400')}>
                    {session.name}
                  </span>
                  {session.unread > 0 && (
                    <span className="w-5 h-5 bg-emerald-500 rounded-full text-[10px] flex items-center justify-center text-white font-medium">
                      {session.unread}
                    </span>
                  )}
                </div>
                <span className="text-xs text-zinc-600">{session.lastMessage}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0a0a0a]">
        {/* Header */}
        <div className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-100">
                {sessions.find(s => s.id === selectedSession)?.name}
              </h3>
              <p className="text-xs text-zinc-500">
                {sessions.find(s => s.id === selectedSession)?.channel} • Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/[0.06] rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-white/[0.06] rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors">
              <Video className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-white/[0.06] rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message, i) => {
              const isUser = message.role === 'user'
              const showDate = i === 0 || messages[i - 1].time !== message.time

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
                >
                  <div className={cn('max-w-[70%]', isUser ? 'items-end' : 'items-start')}>
                    {showDate && (
                      <p className="text-[10px] text-zinc-600 text-center mb-2">{message.time}</p>
                    )}
                    <div className={cn(
                      'px-4 py-3 rounded-2xl',
                      isUser
                        ? 'bg-emerald-500/20 text-emerald-100 rounded-br-md'
                        : 'bg-white/[0.06] text-zinc-200 rounded-bl-md'
                    )}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[10px] text-zinc-600">{message.channel}</span>
                      {message.pending && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={cn(
                'p-3 rounded-xl transition-all',
                isRecording ? 'bg-red-500/10 text-red-400' : 'bg-white/[0.06] text-zinc-400 hover:text-zinc-200'
              )}
            >
              <Mic className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="w-full px-4 py-3 bg-white/[0.06] rounded-xl text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
