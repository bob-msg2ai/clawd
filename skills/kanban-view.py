#!/usr/bin/env python3
"""
Kanban-style task board viewer

Shows tasks in columns: Todo, In Progress, On Hold, Done
"""
import json
import sys
from pathlib import Path

TASKS_FILE = Path("/home/node/clawd/tasks/tasks.json")

def load_tasks():
    """Load tasks from file"""
    if not TASKS_FILE.exists():
        return {"tasks": []}

    with open(TASKS_FILE, "r") as f:
        return json.load(f)

def print_kanban():
    """Print tasks in Kanban board format"""
    data = load_tasks()
    tasks = data.get("tasks", [])

    # Organize by status
    todo = [t for t in tasks if t["status"] == "todo"]
    in_progress = [t for t in tasks if t["status"] == "in-progress"]
    on_hold = [t for t in tasks if t["status"] == "blocked"]
    done = [t for t in tasks if t["status"] == "done"]

    # Priority emoji mapping
    priority_emoji = {
        "critical": "🔴",
        "high": "🟠",
        "medium": "🟡",
        "low": "🟢"
    }

    # Column width
    col_width = 35

    # Print header
    print("\n" + "=" * 140)
    print("📋 KANBAN TASK BOARD")
    print("=" * 140)
    print()

    # Column headers
    print(f"{'⬜ TODO':<{col_width}} {'🔄 IN PROGRESS':<{col_width}} {'🚧 ON HOLD':<{col_width}} {'✅ DONE':<{col_width}}")
    print("-" * 140)

    # Print tasks row by row (up to max tasks per column)
    max_tasks = max(len(todo), len(in_progress), len(on_hold), len(done), 5)

    for i in range(max_tasks):
        row_parts = []

        # TODO column
        if i < len(todo):
            task = todo[i]
            emoji = priority_emoji.get(task["priority"], "⚪")
            desc = task["description"][:col_width-4]
            row_parts.append(f"{emoji} [{task['id']}] {desc}")
        else:
            row_parts.append(" " * col_width)

        # IN PROGRESS column
        if i < len(in_progress):
            task = in_progress[i]
            emoji = priority_emoji.get(task["priority"], "⚪")
            desc = task["description"][:col_width-4]
            row_parts.append(f"{emoji} [{task['id']}] {desc}")
        else:
            row_parts.append(" " * col_width)

        # ON HOLD column
        if i < len(on_hold):
            task = on_hold[i]
            emoji = priority_emoji.get(task["priority"], "⚪")
            desc = task["description"][:col_width-4]
            row_parts.append(f"{emoji} [{task['id']}] {desc}")
        else:
            row_parts.append(" " * col_width)

        # DONE column
        if i < len(done):
            task = done[i]
            emoji = priority_emoji.get(task["priority"], "⚪")
            desc = task["description"][:col_width-4]
            row_parts.append(f"{emoji} [{task['id']}] {desc}")
        else:
            row_parts.append(" " * col_width)

        print("│".join(row_parts))

    print("-" * 140)

    # Column counts
    print(f"\n📊 Summary: {len(todo)} Todo | {len(in_progress)} In Progress | {len(on_hold)} On Hold | {len(done)} Done")
    print()

def main():
    print_kanban()

if __name__ == "__main__":
    main()
