'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass'
import { Folder, File, ChevronRight, ChevronDown, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const fileTree = [
  {
    name: 'workspace',
    type: 'folder',
    children: [
      { name: 'AGENTS.md', type: 'file', size: '12 KB' },
      { name: 'SOUL.md', type: 'file', size: '8 KB' },
      { name: 'USER.md', type: 'file', size: '4 KB' },
      {
        name: 'tasks',
        type: 'folder',
        children: [
          { name: 'in-progress.md', type: 'file', size: '2 KB' },
          { name: 'completed.md', type: 'file', size: '15 KB' },
          { name: 'ideas.md', type: 'file', size: '6 KB' },
        ]
      },
      {
        name: 'state',
        type: 'folder',
        children: [
          { name: 'servers.json', type: 'file', size: '1 KB' },
          { name: 'crons.json', type: 'file', size: '2 KB' },
          { name: 'revenue.json', type: 'file', size: '1 KB' },
        ]
      }
    ]
  }
]

function FileItem({ item, depth = 0 }: { item: any; depth?: number }) {
  const [expanded, setExpanded] = useState(true)
  const isFolder = item.type === 'folder'

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer hover:bg-white/[0.04] transition-colors',
          depth > 0 && 'ml-4'
        )}
        onClick={() => isFolder && setExpanded(!expanded)}
      >
        {isFolder ? (
          <>
            {expanded ? <ChevronDown className="w-4 h-4 text-zinc-600" /> : <ChevronRight className="w-4 h-4 text-zinc-600" />}
            <Folder className="w-4 h-4 text-amber-400" />
          </>
        ) : (
          <>
            <span className="w-4" />
            <File className="w-4 h-4 text-zinc-500" />
          </>
        )}
        <span className="text-sm text-zinc-300">{item.name}</span>
        {item.size && <span className="text-xs text-zinc-600 ml-auto font-mono">{item.size}</span>}
      </div>
      {isFolder && expanded && item.children && (
        <div>
          {item.children.map((child: any, i: number) => (
            <FileItem key={i} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function FilesPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100">File Explorer</h1>
        <p className="text-sm text-zinc-500 mt-1">Browse agent workspace files</p>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <Home className="w-4 h-4" />
        <span>/</span>
        <span>.openclaw</span>
        <span>/</span>
        <span className="text-zinc-300">workspace</span>
      </div>

      {/* File Tree */}
      <GlassCard className="p-4">
        {fileTree.map((item, i) => (
          <FileItem key={i} item={item} />
        ))}
      </GlassCard>
    </div>
  )
}
