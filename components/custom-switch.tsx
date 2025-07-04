"use client"

interface CustomSwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  color?: "blue" | "emerald" | "amber"
}

export function CustomSwitch({ checked, onCheckedChange, color = "blue" }: CustomSwitchProps) {
  const colorClasses = {
    blue: checked ? "bg-blue-400" : "bg-gray-200",
    emerald: checked ? "bg-emerald-400" : "bg-gray-200",
    amber: checked ? "bg-amber-400" : "bg-gray-200",
  }

  return (
    <button
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 ${colorClasses[color]}`}
      onClick={() => onCheckedChange(!checked)}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  )
}
