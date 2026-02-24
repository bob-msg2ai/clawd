"use client";

import { motion } from "framer-motion";

interface LiveIndicatorProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LiveIndicator({ className, size = "md" }: LiveIndicatorProps) {
  const sizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  return (
    <div className={className}>
      <motion.div
        className={`${sizeClasses[size]} rounded-full bg-emerald-400`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
        }}
      />
    </div>
  );
}