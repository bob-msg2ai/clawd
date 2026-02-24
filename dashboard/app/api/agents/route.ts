import { NextResponse } from 'next/server'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

const WORKSPACE_PATH = join(homedir(), '.openclaw', 'workspace')
const AGENTS_PATH = join(homedir(), '.openclaw', 'agents')

export async function GET() {
  try {
    let agents = []
    let healthy = 0
    let unhealthy = 0
    
    try {
      const registryPath = join(WORKSPACE_PATH, 'agents', 'registry.json')
      const registry = JSON.parse(readFileSync(registryPath, 'utf-8'))
      agents = registry.agents || []
      
      // Count health
      agents.forEach((agent: any) => {
        if (agent.status === 'healthy' || agent.status === 'online') {
          healthy++
        } else {
          unhealthy++
        }
      })
    } catch {
      // Fallback mock data
      agents = [
        { id: 'main', name: 'Bob', status: 'healthy', model: 'kimi-k2.5', level: 4 },
        { id: 'zoe', name: 'Zoe', status: 'healthy', model: 'kimi-k2.5', level: 3 },
      ]
      healthy = 2
    }

    // Count active sub-agents from sessions
    let activeSubAgents = 0
    try {
      const sessionsPath = join(homedir(), '.openclaw', 'sessions')
      const sessions = readdirSync(sessionsPath)
      activeSubAgents = sessions.filter(s => s.includes('subagent')).length
    } catch {
      activeSubAgents = 0
    }

    return NextResponse.json({
      count: agents.length,
      healthy,
      unhealthy,
      activeSubAgents,
      agents,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read agent state' },
      { status: 500 }
    )
  }
}
