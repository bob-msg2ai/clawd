export interface Agent {
  id: string;
  name: string;
  status: "online" | "busy" | "offline";
  type: string;
  lastActive: string;
  tasksCompleted: number;
  currentTask?: string;
}

export interface SystemState {
  status: "healthy" | "warning" | "critical";
  uptime: string;
  activeAgents: number;
  pendingTasks: number;
  completedTasks: number;
  cpuUsage: number;
  memoryUsage: number;
  lastUpdated: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  priority: "low" | "medium" | "high";
  assignee?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CronJob {
  id: string;
  name: string;
  schedule: string;
  lastRun: string;
  nextRun: string;
  status: "healthy" | "failed" | "stalled";
  successRate: number;
}

export interface RevenueData {
  date: string;
  amount: number;
  source: string;
}

export interface ContentItem {
  id: string;
  title: string;
  type: "article" | "video" | "podcast" | "social";
  status: "idea" | "draft" | "review" | "published";
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  agent?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  source: string;
}

export interface MemoryEntry {
  id: string;
  date: string;
  content: string;
  tags: string[];
  importance: "low" | "medium" | "high";
}

export interface FileEntry {
  name: string;
  path: string;
  type: "file" | "directory";
  size?: number;
  modified: string;
}