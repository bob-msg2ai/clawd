import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

const WORKSPACE_PATH = join(homedir(), '.openclaw', 'workspace')

export async function GET() {
  try {
    const statePath = join(WORKSPACE_PATH, 'state', 'servers.json')
    
    let services = []
    try {
      const data = JSON.parse(readFileSync(statePath, 'utf-8'))
      services = data.services || []
    } catch {
      // Fallback mock data if file doesn't exist
      services = [
        { name: 'Gateway', status: 'online', port: 18789, lastCheck: new Date().toISOString() },
        { name: 'Agent RPC', status: 'online', port: 18790, lastCheck: new Date().toISOString() },
        { name: 'Canvas Host', status: 'online', port: 18793, lastCheck: new Date().toISOString() },
        { name: 'Tailscale Proxy', status: 'idle', port: 18794, lastCheck: new Date().toISOString() },
      ]
    }

    return NextResponse.json({ services })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read system state' },
      { status: 500 }
    )
  }
}
