import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

const WORKSPACE_PATH = join(homedir(), '.openclaw', 'workspace')

export async function GET() {
  try {
    const revenuePath = join(WORKSPACE_PATH, 'state', 'revenue.json')
    
    let data
    try {
      data = JSON.parse(readFileSync(revenuePath, 'utf-8'))
    } catch {
      // Fallback mock data
      data = {
        current: 125000,
        burn: 45000,
        net: 80000,
        monthlyGrowth: 12.5,
      }
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read revenue data' },
      { status: 500 }
    )
  }
}
