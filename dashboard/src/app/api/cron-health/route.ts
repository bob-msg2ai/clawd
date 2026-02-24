import { NextResponse } from "next/server";
import type { CronJob } from "@/types";

const mockCronJobs: CronJob[] = [
  {
    id: "cron-1",
    name: "Daily Report Generation",
    schedule: "0 9 * * *",
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    nextRun: new Date(Date.now() + 1000 * 60 * 60 * 21).toISOString(),
    status: "healthy",
    successRate: 98,
  },
  {
    id: "cron-2",
    name: "Data Sync",
    schedule: "*/30 * * * *",
    lastRun: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    nextRun: new Date(Date.now() + 1000 * 60 * 15).toISOString(),
    status: "healthy",
    successRate: 100,
  },
  {
    id: "cron-3",
    name: "Backup Cleanup",
    schedule: "0 2 * * 0",
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    nextRun: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    status: "failed",
    successRate: 85,
  },
  {
    id: "cron-4",
    name: "Health Check",
    schedule: "*/5 * * * *",
    lastRun: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    nextRun: new Date(Date.now() + 1000 * 60 * 2).toISOString(),
    status: "healthy",
    successRate: 100,
  },
  {
    id: "cron-5",
    name: "Analytics Export",
    schedule: "0 */6 * * *",
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    nextRun: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
    status: "stalled",
    successRate: 92,
  },
];

export async function GET() {
  try {
    return NextResponse.json(mockCronJobs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cron health" },
      { status: 500 }
    );
  }
}