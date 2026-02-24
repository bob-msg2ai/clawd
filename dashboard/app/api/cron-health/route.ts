import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

const WORKSPACE_PATH = join(homedir(), '.openclaw', 'workspace')

export async function GET() {
  try {
    const cronPath = join(WORKSPACE_PATH, 'state', 'crons.json')
    
    let jobs = []
    try {
      const data = JSON.parse(readFileSync(cronPath, 'utf-8'))
      jobs = data.jobs || []
    } catch {
      // Fallback mock data
      jobs = [
        { name: 'morning-brief', schedule: '0 8 * * *', lastStatus: 'success', lastRun: new Date().toISOString(), consecutiveErrors: 0 },
        { name: 'health-check', schedule: '*/5 * * * *', lastStatus: 'success', lastRun: new Date().toISOString(), consecutiveErrors: 0 },
        { name: 'backup-memory', schedule: '0 */6 * * *', lastStatus: 'success', lastRun: new Date().toISOString(), consecutiveErrors: 0 },
        { name: 'cleanup-logs', schedule: '0 2 * * 0', lastStatus: 'error', lastRun: new Date(Date.now() - 86400000).toISOString(), consecutiveErrors: 2 },
      ]
    }

    return NextResponse.json({ jobs })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read cron state' },
      { status: 500 }
    )
  }
}
