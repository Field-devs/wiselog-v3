"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  blur?: "sm" | "md" | "lg" | "xl"
}

export default function GlassCard({ 
  children, 
  className = "", 
  hover = false,
  blur = "xl" 
}: GlassCardProps) {
  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md", 
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl"
  }

  return (
    <div 
      className={cn(
        "bg-white/60 dark:bg-gray-800/60",
        blurClasses[blur],
        "border-white/20 dark:border-gray-700/30",
        "shadow-lg border rounded-lg",
        hover && "hover:shadow-2xl hover:-translate-y-1 transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  )
}