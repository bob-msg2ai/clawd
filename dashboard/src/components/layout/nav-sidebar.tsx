"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Activity,
  Bot,
  MessageSquare,
  Brain,
  FolderOpen,
  FileText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Operations", href: "/ops", icon: Activity },
  { name: "Agents", href: "/agents", icon: Bot },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Memory", href: "/memory", icon: Brain },
  { name: "Files", href: "/files", icon: FolderOpen },
  { name: "Logs", href: "/logs", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function NavSidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl"
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06]">
            <div className="h-3 w-3 rounded-full bg-zinc-100" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-zinc-100">OpenClaw</h1>
            <p className="text-[10px] text-zinc-500">Mission Control</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-white/[0.08] text-zinc-100"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-zinc-100" : "text-zinc-500 group-hover:text-zinc-300"
                  )}
                />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 h-8 w-0.5 rounded-full bg-zinc-100"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-zinc-400">System Online</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}