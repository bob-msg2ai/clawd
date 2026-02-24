#!/usr/bin/env python3
"""
Task Management System - Create, read, update, delete tasks

Usage:
    python3 task-manager.py add "Task description" --priority high
    python3 task-manager.py list
    python3 task-manager.py update <task_id> --status done
    python3 task-manager.py delete <task_id>
"""
import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

TASKS_FILE = Path("/home/node/clawd/tasks/tasks.json")

PRIORITIES = ["low", "medium", "high", "critical"]
STATUSES = ["todo", "in-progress", "done", "blocked"]

def load_tasks():
    """Load tasks from file"""
    if not TASKS_FILE.exists():
        TASKS_FILE.parent.mkdir(parents=True, exist_ok=True)
        return {"tasks": [], "last_id": 0}

    with open(TASKS_FILE, "r") as f:
        return json.load(f)

def save_tasks(data):
    """Save tasks to file"""
    with open(TASKS_FILE, "w") as f:
        json.dump(data, f, indent=2)

def add_task(description, priority="medium", tags=None):
    """Add a new task"""
    data = load_tasks()
    data["last_id"] += 1

    task = {
        "id": data["last_id"],
        "description": description,
        "priority": priority,
        "status": "todo",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
        "tags": tags or []
    }

    data["tasks"].append(task)
    save_tasks(data)

    print(f"✅ Task #{task['id']} added: {description}")
    return task

def list_tasks(filter_status=None, filter_priority=None):
    """List all tasks with optional filters"""
    data = load_tasks()
    tasks = data["tasks"]

    # Apply filters
    if filter_status:
        tasks = [t for t in tasks if t["status"] == filter_status]
    if filter_priority:
        tasks = [t for t in tasks if t["priority"] == filter_priority]

    # Sort by priority and created date
    priority_order = {"critical": 0, "high": 1, "medium": 2, "low": 3}
    tasks.sort(key=lambda t: (priority_order.get(t["priority"], 99), t["created_at"]))

    if not tasks:
        print("📋 No tasks found")
        return

    # Print tasks
    print(f"\n📋 Tasks ({len(tasks)} total)")
    print("-" * 60)

    for task in tasks:
        status_icon = {
            "todo": "⬜",
            "in-progress": "🔄",
            "done": "✅",
            "blocked": "🚧"
        }.get(task["status"], "?")

        priority_color = {
            "critical": "🔴",
            "high": "🟠",
            "medium": "🟡",
            "low": "🟢"
        }.get(task["priority"], "⚪")

        print(f"{status_icon} [{task['id']}] {priority_color} {task['description'][:60]}{'...' if len(task['description']) > 60 else ''}")
        print(f"   Status: {task['status']} | Priority: {task['priority']} | Created: {task['created_at'][:10]}")
        if task.get("tags"):
            print(f"   Tags: {', '.join(task['tags'])}")

    print("-" * 60)

def update_task(task_id, status=None, priority=None, description=None):
    """Update a task"""
    data = load_tasks()

    for task in data["tasks"]:
        if task["id"] == task_id:
            if status:
                task["status"] = status
            if priority:
                task["priority"] = priority
            if description:
                task["description"] = description

            task["updated_at"] = datetime.now().isoformat()
            save_tasks(data)

            print(f"✅ Task #{task_id} updated")
            return True

    print(f"❌ Task #{task_id} not found")
    return False

def delete_task(task_id):
    """Delete a task"""
    data = load_tasks()

    for i, task in enumerate(data["tasks"]):
        if task["id"] == task_id:
            del data["tasks"][i]
            save_tasks(data)

            print(f"✅ Task #{task_id} deleted: {task['description']}")
            return True

    print(f"❌ Task #{task_id} not found")
    return False

def show_task(task_id):
    """Show details of a specific task"""
    data = load_tasks()

    for task in data["tasks"]:
        if task["id"] == task_id:
            print(f"\n📋 Task #{task['id']}")
            print("=" * 50)
            print(f"Description: {task['description']}")
            print(f"Status: {task['status']}")
            print(f"Priority: {task['priority']}")
            print(f"Created: {task['created_at']}")
            print(f"Updated: {task['updated_at']}")
            if task.get("tags"):
                print(f"Tags: {', '.join(task['tags'])}")
            print("=" * 50)
            return

    print(f"❌ Task #{task_id} not found")

def main():
    parser = argparse.ArgumentParser(description="Task Management System")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Add command
    add_parser = subparsers.add_parser("add", help="Add a new task")
    add_parser.add_argument("description", help="Task description")
    add_parser.add_argument("--priority", choices=PRIORITIES, default="medium", help="Task priority")
    add_parser.add_argument("--tag", action="append", help="Add tags to task")

    # List command
    list_parser = subparsers.add_parser("list", help="List all tasks")
    list_parser.add_argument("--status", choices=STATUSES, help="Filter by status")
    list_parser.add_argument("--priority", choices=PRIORITIES, help="Filter by priority")

    # Update command
    update_parser = subparsers.add_parser("update", help="Update a task")
    update_parser.add_argument("task_id", type=int, help="Task ID")
    update_parser.add_argument("--status", choices=STATUSES, help="New status")
    update_parser.add_argument("--priority", choices=PRIORITIES, help="New priority")
    update_parser.add_argument("--description", help="New description")

    # Delete command
    delete_parser = subparsers.add_parser("delete", help="Delete a task")
    delete_parser.add_argument("task_id", type=int, help="Task ID")

    # Show command
    show_parser = subparsers.add_parser("show", help="Show task details")
    show_parser.add_argument("task_id", type=int, help="Task ID")

    args = parser.parse_args()

    # Execute command
    if args.command == "add":
        add_task(args.description, args.priority, args.tag)

    elif args.command == "list":
        list_tasks(args.status, args.priority)

    elif args.command == "update":
        update_task(args.task_id, args.status, args.priority, args.description)

    elif args.command == "delete":
        delete_task(args.task_id)

    elif args.command == "show":
        show_task(args.task_id)

    else:
        parser.print_help()

if __name__ == "__main__":
    main()
