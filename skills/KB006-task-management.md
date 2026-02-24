# 📚 Knowledge Base Entry

**KB ID:** KB006
**Created:** 2026-01-31 05:15 UTC
**Category:** System
**Topic:** Task Management System

## Question
"How do I manage tasks and track work?"

## Answer

**What is the Task Management System?**
A simple but powerful task tracking system that helps you:
- Create, read, update, and delete tasks
- Set priorities (low, medium, high, critical)
- Track status (todo, in-progress, done, blocked)
- Add tags to organize tasks
- View and filter tasks

**Storage:**
- File location: `/home/node/clawd/tasks/tasks.json`
- Format: JSON with task metadata

**Usage:**

### Add a Task
```bash
# Basic task
python3 /home/node/clawd/skills/task-manager.py add "Fix email credentials"

# With priority
python3 /home/node/clawd/skills/task-manager.py add "Deploy to Vercel" --priority high

# With tags
python3 /home/node/clawd/skills/task-manager.py add "Write blog post" --tag content --tag urgent
```

### List Tasks
```bash
# List all tasks
python3 /home/node/clawd/skills/task-manager.py list

# Filter by status
python3 /home/node/clawd/skills/task-manager.py list --status todo

# Filter by priority
python3 /home/node/clawd/skills/task-manager.py list --priority high
```

### Update a Task
```bash
# Change status
python3 /home/node/clawd/skills/task-manager.py update 1 --status in-progress

# Change priority
python3 /home/node/clawd/skills/task-manager.py update 1 --priority critical

# Change description
python3 /home/node/clawd/skills/task-manager.py update 1 --description "New description"
```

### Show Task Details
```bash
python3 /home/node/clawd/skills/task-manager.py show 1
```

### Delete a Task
```bash
python3 /home/node/clawd/skills/task-manager.py delete 1
```

**Priority Levels:**
- `low` - Nice to have, not urgent
- `medium` - Standard priority
- `high` - Important, should be done soon
- `critical` - Urgent, needs immediate attention

**Status Values:**
- `todo` - Not started yet
- `in-progress` - Currently working on
- `done` - Completed
- `blocked` - Can't proceed, waiting on something

**Output Example:**
```
📋 Tasks (2 total)
------------------------------------------------------------
⬜ [1] 🟠 Fix email credentials for Zoho Mail
   Status: todo | Priority: high | Created: 2026-01-31
⬜ [2] 🟠 Deploy Moltbot Command Center to Vercel
   Status: todo | Priority: high | Created: 2026-01-31
   Tags: deployment
------------------------------------------------------------
```

**Status:** ✅ Working (tested and validated on 2026-01-31 05:15 UTC)

## Use Cases

1. **Daily Planning:** Create tasks for the day with priorities
2. **Work Tracking:** Update task status as you work through items
3. **Project Management:** Track tasks across multiple projects using tags
4. **Morning Brief:** Review high-priority tasks at start of day
5. **Reporting:** List completed tasks for status updates

## Related Skills
- KB001: Email Sending (for task-related emails)
- KB005: Firecrawl Integration (for research tasks)

## Future Enhancements

- Add due dates to tasks
- Add dependencies between tasks
- Add reminders/notifications
- Export tasks to other formats (CSV, markdown)
- Integrate with calendar for time-based tasks
