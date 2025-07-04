"use client"

interface EnhancedProgressBarProps {
  value: number
  className?: string
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
  color?: "blue" | "emerald" | "amber" | "rose"
}

export function EnhancedProgressBar({
  value,
  className = "",
  showLabel = true,
  size = "md",
  color = "blue",
}: EnhancedProgressBarProps) {
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  }

  const colorClasses = {
    blue: "bg-blue-500 dark:bg-blue-400",
    emerald: "bg-emerald-500 dark:bg-emerald-400",
    amber: "bg-amber-500 dark:bg-amber-400",
    rose: "bg-rose-500 dark:bg-rose-400",
  }

  const getBgColor = (value: number) => {
    if (value >= 70) return colorClasses.emerald
    if (value >= 40) return colorClasses.amber
    return colorClasses.rose
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} transition-all duration-500 ease-out rounded-full ${
            color === "blue" ? colorClasses[color] : getBgColor(value)
          }`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[3rem] text-right">{value}%</span>
      )}
    </div>
  )
}
