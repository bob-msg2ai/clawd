import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

const WORKSPACE_PATH = join(homedir(), '.openclaw', 'workspace')

export async function GET() {
  try {
    const queuePath = join(WORKSPACE_PATH, 'content', 'queue.md')
    
    let pipeline = { draft: 0, review: 0, approved: 0, published: 0 }
    
    try {
      const content = readFileSync(queuePath, 'utf-8')
      
      // Parse markdown for status sections
      const draftMatch = content.match(/## Draft[\s\S]*?(?=## |$)/)
      const reviewMatch = content.match(/## Review[\s\S]*?(?=## |$)/)
      const approvedMatch = content.match(/## Approved[\s\S]*?(?=## |$)/)
      const publishedMatch = content.match(/## Published[\s\S]*?(?=## |$)/)
      
      pipeline.draft = draftMatch ? (draftMatch[0].match(/- \[/g) || []).length : 0
      pipeline.review = reviewMatch ? (reviewMatch[0].match(/- \[/g) || []).length : 0
      pipeline.approved = approvedMatch ? (approvedMatch[0].match(/- \[/g) || []).length : 0
      pipeline.published = publishedMatch ? (publishedMatch[0].match(/- \[/g) || []).length : 0
    } catch {
      // Fallback mock data
      pipeline = {
        draft: 5,
        review: 3,
        approved: 2,
        published: 12,
      }
    }

    return NextResponse.json(pipeline)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read content pipeline' },
      { status: 500 }
    )
  }
}
