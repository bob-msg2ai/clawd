import { NextResponse } from "next/server";
import type { Task } from "@/types";

const mockSuggestedTasks: Task[] = [
  {
    id: "task-1",
    title: "Review pending PRs",
    description: "Review 3 pull requests waiting for approval",
    status: "pending",
    priority: "high",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "task-2",
    title: "Update documentation",
    description: "Sync API docs with latest changes",
    status: "pending",
    priority: "medium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "task-3",
    title: "Optimize database queries",
    description: "Identify and fix slow queries in analytics module",
    status: "pending",
    priority: "medium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "task-4",
    title: "Schedule social posts",
    description: "Queue content for next week",
    status: "pending",
    priority: "low",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    return NextResponse.json(mockSuggestedTasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch suggested tasks" },
      { status: 500 }
    );
  }
}