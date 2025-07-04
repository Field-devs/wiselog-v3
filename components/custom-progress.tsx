"use client"

interface CustomProgressProps {
  value: number
  className?: string
  color?: "blue" | "emerald" | "amber" | "rose"
}

export function CustomProgress({ value, className = "", color = "blue" }: CustomProgressProps) {
  const colorClasses = {
    blue: "bg-blue-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    rose: "bg-rose-400",
  }

  return (
    <div className={`h-2 bg-gray-100 rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full transition-all duration-500 ease-out ${colorClasses[color]}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
