"use client"

interface StatusIndicatorProps {
  status: "online" | "offline" | "active" | "inactive"
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function StatusIndicator({ status, size = "md", showLabel = true }: StatusIndicatorProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "online":
        return {
          color: "bg-emerald-500 dark:bg-emerald-400",
          label: "Online",
          textColor: "text-emerald-700 dark:text-emerald-300",
        }
      case "offline":
        return {
          color: "bg-gray-400 dark:bg-gray-500",
          label: "Offline",
          textColor: "text-gray-600 dark:text-gray-400",
        }
      case "active":
        return {
          color: "bg-green-500 dark:bg-green-400",
          label: "Ativo",
          textColor: "text-green-700 dark:text-green-300",
        }
      case "inactive":
        return {
          color: "bg-amber-500 dark:bg-amber-400",
          label: "Inativo",
          textColor: "text-amber-700 dark:text-amber-300",
        }
      default:
        return {
          color: "bg-gray-400",
          label: "Desconhecido",
          textColor: "text-gray-600",
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${sizeClasses[size]} ${config.color} rounded-full ring-2 ring-white dark:ring-gray-800 shadow-sm`}
      />
      {showLabel && <span className={`text-sm font-medium ${config.textColor}`}>{config.label}</span>}
    </div>
  )
}
