import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { homedir } from "os";
import { join } from "path";
import type { SystemState } from "@/types";

export async function GET() {
  try {
    // Read workspace directory to calculate stats
    const workspacePath = join(homedir(), ".openclaw", "workspace");
    
    let fileCount = 0;
    let lastActivity = new Date().toISOString();
    
    try {
      const entries = await fs.readdir(workspacePath, { recursive: true });
      fileCount = entries.length;
      
      // Get stats of most recently modified file
      const stats = await fs.stat(workspacePath);
      lastActivity = stats.mtime.toISOString();
    } catch {
      // Directory might not exist yet
    }

    const systemState: SystemState = {
      status: "healthy",
      uptime: "3d 12h 45m",
      activeAgents: 4,
      pendingTasks: 12,
      completedTasks: 156,
      cpuUsage: 23,
      memoryUsage: 45,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(systemState);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch system state" },
      { status: 500 }
    );
  }
}