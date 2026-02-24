// Convex schema for Mission Control Dashboard

export default defineSchema({
  // Calendar events
  calendarEvents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.number(),
    type: v.string(), // 'meeting', 'task', 'reminder', 'deadline'
    color: v.optional(v.string()),
    createdBy: v.string(),
  })
    .index("by_startTime", ["startTime"])
    .index("by_type", ["type"]),

  // Activity logs
  activityLogs: defineTable({
    action: v.string(),
    target: v.string(),
    source: v.string(), // 'agent', 'system', 'user', 'cron'
    severity: v.string(), // 'info', 'success', 'warning', 'error'
    metadata: v.optional(v.any()),
    timestamp: v.number(),
  })
    .index("by_timestamp", ["timestamp"])
    .index("by_source", ["source"]),

  // Content items
  contentItems: defineTable({
    title: v.string(),
    status: v.string(), // 'draft', 'review', 'approved', 'published'
    type: v.string(), // 'blog', 'email', 'social', 'doc'
    author: v.string(),
    content: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_type", ["type"]),

  // Tasks
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    category: v.string(), // 'Revenue', 'Product', 'Community', 'Content', etc.
    priority: v.string(), // 'critical', 'high', 'medium', 'low'
    status: v.string(), // 'suggested', 'approved', 'in-progress', 'completed', 'rejected'
    reasoning: v.optional(v.string()),
    effort: v.string(), // 'Low', 'Medium', 'High'
    nextAction: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_category", ["category"])
    .index("by_priority", ["priority"]),

  // Chat messages
  chatMessages: defineTable({
    sessionId: v.string(),
    role: v.string(), // 'user', 'assistant', 'system'
    content: v.string(),
    channel: v.string(), // 'telegram', 'discord', 'webchat'
    senderId: v.optional(v.string()),
    timestamp: v.number(),
  })
    .index("by_sessionId", ["sessionId"])
    .index("by_timestamp", ["timestamp"]),
})
