"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "glass" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export default function GlassButton({ 
  children, 
  variant = "glass",
  size = "md",
  className = "",
  onClick,
  disabled = false
}: GlassButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }

  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:from-blue-600 hover:to-blue-700",
    secondary: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600",
    glass: "bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 text-gray-900 dark:text-gray-100 hover:bg-white/20 dark:hover:bg-gray-800/20",
    outline: "bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  )
}