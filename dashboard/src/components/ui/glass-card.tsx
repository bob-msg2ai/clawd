import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function GlassCard({ children, className, hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { scale: 1.01, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl",
        "shadow-[0_4px_24px_-12px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-white/[0.08] bg-white/[0.025] backdrop-blur-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}