"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface AnimatedContainerProps {
  children: ReactNode
  animation?: "fadeIn" | "slideIn" | "scaleIn" | "slideUp"
  delay?: number
  duration?: number
  className?: string
}

export default function AnimatedContainer({ 
  children, 
  animation = "fadeIn",
  delay = 0,
  duration = 300,
  className = ""
}: AnimatedContainerProps) {
  const animationClasses = {
    fadeIn: "animate-in fade-in-0 slide-in-from-bottom-2",
    slideIn: "animate-in slide-in-from-left-4 fade-in-0",
    scaleIn: "animate-in zoom-in-95 fade-in-0",
    slideUp: "animate-in slide-in-from-bottom-4 fade-in-0"
  }

  return (
    <div 
      className={cn(
        animationClasses[animation],
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        animationFillMode: "both"
      }}
    >
      {children}
    </div>
  )
}