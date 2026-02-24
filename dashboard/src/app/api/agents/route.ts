import { NextResponse } from "next/server";
import type { Agent } from "@/types";

const mockAgents: Agent[] = [
  {
    id: "agent-1",
    name: "Research Agent",
    status: "online",
    type: "research",
    lastActive: new Date().toISOString(),
    tasksCompleted: 47,
    currentTask: "Analyzing market trends",
  },
  {
    id: "agent-2",
    name: "Code Agent",
    status: "busy",
    type: "development",
    lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    tasksCompleted: 89,
    currentTask: "Refactoring auth module",
  },
  {
    id: "agent-3",
    name: "Content Agent",
    status: "online",
    type: "content",
    lastActive: new Date().toISOString(),
    tasksCompleted: 34,
  },
  {
    id: "agent-4",
    name: "Scheduler Agent",
    status: "online",
    type: "automation",
    lastActive: new Date().toISOString(),
    tasksCompleted: 156,
  },
  {
    id: "agent-5",
    name: "Email Agent",
    status: "offline",
    type: "communication",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    tasksCompleted: 23,
  },
];

export async function GET() {
  try {
    return NextResponse.json(mockAgents);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch agents" },
      { status: 500 }
    );
  }
}