import { cn } from "@/lib/utils";

type StatusType = "online" | "busy" | "offline" | "healthy" | "warning" | "critical" | "pending" | "in-progress" | "completed" | "failed";

interface StatusBadgeProps {
  status: StatusType;
  showDot?: boolean;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; color: string; dotColor: string }> = {
  online: { label: "Online", color: "text-emerald-400", dotColor: "bg-emerald-400" },
  busy: { label: "Busy", color: "text-amber-400", dotColor: "bg-amber-400" },
  offline: { label: "Offline", color: "text-red-400", dotColor: "bg-red-400" },
  healthy: { label: "Healthy", color: "text-emerald-400", dotColor: "bg-emerald-400" },
  warning: { label: "Warning", color: "text-amber-400", dotColor: "bg-amber-400" },
  critical: { label: "Critical", color: "text-red-400", dotColor: "bg-red-400" },
  pending: { label: "Pending", color: "text-zinc-400", dotColor: "bg-zinc-400" },
  "in-progress": { label: "In Progress", color: "text-blue-400", dotColor: "bg-blue-400" },
  completed: { label: "Completed", color: "text-emerald-400", dotColor: "bg-emerald-400" },
  failed: { label: "Failed", color: "text-red-400", dotColor: "bg-red-400" },
};

export function StatusBadge({ status, showDot = true, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showDot && (
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            config.dotColor,
            status === "online" || status === "healthy" || status === "completed"
              ? "animate-pulse shadow-[0_0_8px_currentColor]"
              : ""
          )}
        />
      )}
      <span className={cn("text-xs font-medium", config.color)}>{config.label}</span>
    </div>
  );
}