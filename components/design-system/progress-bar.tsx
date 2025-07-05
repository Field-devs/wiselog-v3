"use client"

import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  color?: "blue" | "green" | "yellow" | "red" | "auto"
  showLabel?: boolean
  className?: string
}

export default function ProgressBar({ 
  value, 
  max = 100, 
  size = "md",
  color = "auto",
  showLabel = true,
  className = ""
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3"
  }

  const getColor = () => {
    if (color !== "auto") return color
    if (percentage >= 70) return "green"
    if (percentage >= 40) return "yellow"
    return "red"
  }

  const colorClasses = {
    blue: "bg-blue-500 dark:bg-blue-400",
    green: "bg-emerald-500 dark:bg-emerald-400", 
    yellow: "bg-amber-500 dark:bg-amber-400",
    red: "bg-red-500 dark:bg-red-400"
  }

  const selectedColor = getColor()

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "flex-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <div 
          className={cn(
            "transition-all duration-500 ease-out rounded-full",
            sizeClasses[size],
            colorClasses[selectedColor]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[3rem] text-right">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}