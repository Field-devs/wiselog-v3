"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface StatusBadgeProps {
  status: "online" | "offline" | "active" | "inactive" | "success" | "warning" | "error"
  children: ReactNode
  size?: "sm" | "md" | "lg"
  showDot?: boolean
}

export default function StatusBadge({ 
  status, 
  children, 
  size = "md",
  showDot = true 
}: StatusBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm", 
    lg: "px-4 py-2 text-base"
  }

  const statusClasses = {
    online: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700",
    offline: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600",
    active: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
    inactive: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700",
    success: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
    error: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700"
  }

  const dotClasses = {
    online: "bg-emerald-500",
    offline: "bg-gray-400",
    active: "bg-green-500",
    inactive: "bg-amber-500", 
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500"
  }

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border font-medium",
      sizeClasses[size],
      statusClasses[status]
    )}>
      {showDot && (
        <span className={cn(
          "w-2 h-2 rounded-full",
          dotClasses[status]
        )} />
      )}
      {children}
    </span>
  )
}