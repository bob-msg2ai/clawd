# 📚 Knowledge Base Entry

**KB ID:** KB007
**Created:** 2026-01-31 05:30 UTC
**Category:** System
**Topic:** Kanban Task Board

## Question
"How do I see tasks in a Kanban board format?"

## Answer

**What is Kanban Board?**
A visual task management system with columns for different states:
- **Todo** - Tasks not started yet
- **In Progress** - Tasks currently being worked on
- **On Hold** - Tasks blocked waiting on something
- **Done** - Completed tasks

**Usage:**

### View Kanban Board
```bash
python3 /home/node/clawd/skills/kanban-view-improved.py
```

### Example Output
```
📋 KANBAN TASK BOARD
==================================================================================================================================

⬜ TODO                         🔄 IN PROGRESS                  🚧 ON HOLD                      ✅ DONE
----------------------------------------------------------------------------------------------------------------------------------
  🟠 [1] Fix email credentials fo│                              │                              │  🟠 [2] Deploy Moltbot Command C
  🟢 [3] Create Kanban-style task│                              │                              │
----------------------------------------------------------------------------------------------------------------------------------

📊 Summary: 2 Todo | 0 In Progress | 0 On Hold | 1 Done
```

**Features:**
- ✅ Visual board with 4 columns
- ✅ Priority color coding (red=high, orange=medium, yellow=low, green=done)
- ✅ Task IDs for easy reference
- ✅ Truncated descriptions for clean layout
- ✅ Summary counts at bottom

**Combined with Task Manager:**
Kanban view uses the same task file as the task manager:
```bash
# Add a task
python3 /home/node/clawd/skills/task-manager.py add "New task" --priority high

# View in Kanban format
python3 /home/node/clawd/skills/kanban-view-improved.py

# Update task status
python3 /home/node/clawd/skills/task-manager.py update 1 --status in-progress

# View updated Kanban
python3 /home/node/clawd/skills/kanban-view-improved.py
```

**Status:** ✅ Working (tested and validated on 2026-01-31 05:30 UTC)

## Priority Colors
- 🔴 Critical - Urgent, needs immediate attention
- 🟠 High - Important, should be done soon
- 🟡 Medium - Standard priority
- 🟢 Low - Nice to have, not urgent

## Use Cases

1. **Daily Planning:** View all tasks in visual board
2. **Work Management:** Move tasks between columns as you work
3. **Team Coordination:** Share board with team members
4. **Progress Tracking:** See what's done vs what's pending
5. **Status Reviews:** Weekly review of completed vs blocked tasks

## Related Skills
- KB006: Task Management (CRUD operations)

## Future Enhancements

- Add due dates to tasks
- Add task dependencies
- Interactive board (move tasks with drag-and-drop)
- Web-based Kanban board
- Export Kanban to image/PDF
